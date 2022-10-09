import { QuestDate, User } from "@prisma/client";
import Prisma from "../../Prisma";
import { formatDate, formatTime } from "../../Util";
import Bot, { BotRequest } from "../bot";
import { AdminKeyboard, BasicKeyboard, ChooseDateKeyboard, ChooseKeyboard, ConfirmationKeyboard, UserWithTeamInitialKeyboard } from "../keyboard/keyboard";

export const BroadcastHandlers: Record<string, (req: BotRequest) => void> = {
  'ADMIN/BROADCAST_DATE': handleBroadcastDate,
  'ADMIN/BROADCAST_TARGET': handleBroadcastTarget,
  'ADMIN/BROADCAST_TYPE': handleBroadcastType,
  'ADMIN/BROADCAST_MESSAGE': handleBroadcastContent,
  'ADMIN/BROADCAST_MESSAGE_CONFIRM': handleBroadcastContentConfirm,
}

async function getAvailableBroadcastDates(): Promise<QuestDate[]> {
  const today = new Date();
  today.setHours(0,0,0,0); // отсчитываем от 00:00:00.000

  const dates  = await Prisma.questDate.findMany({
    where: {
      date: {
        gte: today, 
      },
    }
  })

  return dates
}
export async function handleInitiateBroadcast(req: BotRequest) {
  const dates = await getAvailableBroadcastDates()
  await Bot.sendMessage(req.user, ChooseDateKeyboard(dates.map(d=>d.date)), 
    'Выбери дату квеста, для которой провести рассылку')
  await Bot.changeState(req.user, 'ADMIN/BROADCAST_DATE');
}

export async function handleBroadcastDate(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }
  
  const dates = await getAvailableBroadcastDates()
  const datesHumanReadable = new Map(dates.map(d => [formatDate(d.date), d]))
  
  const chosenDay = datesHumanReadable.get(req.message);
  if(chosenDay === undefined){
    await Bot.sendMessage(req.user, ChooseDateKeyboard(dates.map(d=>d.date)),
      'Прости, на эту дату не провести рассылку')
    return;
  }

  await Bot.sendMessage(req.user, ChooseKeyboard(['Всем', 'Капитанам']), "Кому достанется это сообщение?")
  await Bot.changeState(req.user, 'ADMIN/BROADCAST_TARGET', {date: chosenDay.date})
}

export async function handleBroadcastTarget(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  if(req.message !== 'Всем' && req.message !== 'Капитанам') {
    await Bot.sendMessage(req.user, ChooseKeyboard(['Всем', 'Капитанам']), "Кому достанется это сообщение?")
    return;
  }

  const botData = req.user.botData as any as {date: Date}

  await Bot.sendMessage(req.user, ChooseKeyboard(['Маршрут', 'Начало квеста', 'Кастомное сообщение']), 
    "Выбери рассылку: ")
  await Bot.changeState(req.user, 'ADMIN/BROADCAST_TYPE', {date: botData.date, target: req.message});
}

export async function handleBroadcastType(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  switch(req.message){
  case 'Маршрут':
    await handleTeamRoutesBroadcast(req)
    break;
  case 'Начало квеста':
    await handleQuestBroadcast(req);
    break;
  case 'Кастомное сообщение': 
    await Bot.sendMessage(req.user, BasicKeyboard, "Введи текст рассылки: ")
    await Bot.changeState(req.user, 'ADMIN/BROADCAST_MESSAGE', req.user.botData as any)
    break;
  default: 
    await Bot.sendMessage(req.user, ChooseKeyboard(['Маршрут', 'Начало квеста', 'Кастомное сообщение']), 
      "Выбери рассылку или не выбирай вообще: ")
    break;
  }
}
export async function handleBroadcastContent(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  const botData = req.user.botData as any as {date: Date, target: 'Всем' | 'Капитанам'};

  await Bot.sendMessage(req.user, ConfirmationKeyboard, `
Ты действительно хочешь отправить это сообщение?

${req.message}
`)
  await Bot.changeState(req.user, 'ADMIN/BROADCAST_MESSAGE_CONFIRM', {...botData, message: req.message})
}

export async function handleBroadcastContentConfirm(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  const botData = req.user.botData as any as {date: Date, target: 'Всем' | 'Капитанам', message: string};
  if(req.message === 'Нет') {
    await Bot.sendMessage(req.user, BasicKeyboard, "Напиши сообщение рассылки:")
    await Bot.changeState(req.user, 'ADMIN/BROADCAST_MESSAGE', {date: botData.date, target: botData.target})
    return;
  }

  if(req.message !== 'Да') {
    await Bot.sendMessage(req.user, ConfirmationKeyboard, "Да или нет")
    return;
  }

  let targets: User[] = (await Prisma.team.findMany({
    where: {
      participationDateID: botData.date,
    },
    select: {
      members: botData.target === 'Всем'
        ? true
        : { where: { role: 'CAPTAIN', }}
    }
  })).flatMap(t => t.members)

  for(const target of targets) {
    await Bot.sendMessage(target, UserWithTeamInitialKeyboard(target.role), botData.message)  
    await Bot.changeState(target, 'INITIAL')
  }

  await Bot.sendMessage(req.user, AdminKeyboard, "Разослали")
  await Bot.forward('', req)
}

async function handleTeamRoutesBroadcast(req: BotRequest) {
  const botData = req.user.botData as any as {date: Date, target: 'Всем' | 'Капитанам'};
  const teams = await Prisma.team.findMany({
    where:{
      participationDateID: botData.date,
    },
    include: {
      members: {
        where: {
          role: 'CAPTAIN',
        },
      },
      route: {
        include: {
          station: true,
        },
        orderBy: {
          supposedArrival: 'asc',
        },
      },
    },
  })
  
  for(const team of teams) {
    const broadcastMsg = `
Привет, капитан! Напоминаем, что квест "Первому Перваку Приготовиться" уже завтра, и мы решили скинуть тебе небольшую памятку, чтобы ответить на самые популярные вопросы.
Эта памятка будет полезна, если с сайтом возникнут проблемы.

1. Рекомендуем назначить команде время сбора за 15-20 минут до начала старта. Чтобы из-за опоздавших не выполнять первые задания в меньшем количестве игроков

2. Наш квест состоит из заданий на различных станциях. Всего 7 станций. Ты уже получил свою точку старта. Дальнейший маршрут команды будет отображён на сайте. Но на всякий случай мы высылаем ваш маршрут текстом, чтобы в случае неполадок с сайтом, вы знали где и во сколько вам нужно быть.

Станции строго привязаны ко времени. Поэтому старайтесь приходить вовремя и не нарушайте порядок прохождения станций.

3. Обратите внимание, что у вас есть дополнительные задания, которые можно выполнять паралельно с прохождением квеста. Их следует отправить в личные сообщения сообщества https://vk.com/first_student_ready
Их выполнение даст вам дополнительные баллы и позволит приблизиться к победе
Дедлайн доп заданий: 17:00

4. Не забудьте одеться по погоде, взять с собой хорошее настроение и настроиться на увлекательное приключение с любимыми героями!

---
Привязка по времени:
Первая станция начинается с 12:00
Вторая - в 12:30
И так каждые полчаса стартует новая станция. Не опаздывайте к времени начала

Номера станций и их геолокация:

${team.route.map((r, i)=>`${i+1}. ${r.station.name} (${r.station.lat}, ${r.station.lng})`)
    .join("\n")}`
    const captain = team.members[0]
    if(captain === undefined) {
      await Bot.sendMessage(req.user, undefined, `У команды ${team.name} нет капитана`)
      continue;
    }
  
    await Bot.sendMessage(captain, UserWithTeamInitialKeyboard(captain.role), broadcastMsg)
    await Bot.changeState(captain, 'INITIAL')
  }
  
  await Bot.sendMessage(req.user, undefined, "Закончили рассылку")
  await Bot.forward('', req)
}

export async function handleQuestBroadcast(req: BotRequest) {
  const botData = req.user.botData as any as {date: Date, target: 'Всем' | 'Капитанам'};
  const teams = (await Prisma.team.findMany({
    where: {
      participationDateID: botData.date,
    },
    include: {
      route: {
        include: {
          station: true,
        },
        orderBy: {
          supposedArrival: 'asc',
        },
        take: 1,
      },
      members: botData.target === 'Всем'
        ? true
        : { where: { role: 'CAPTAIN', }}
    }
  }))

  for(const team of teams) {
    const routePoint = team.route[0]
    const station = routePoint.station;
    for(const member of team.members) {
      await Bot.sendMessage(member, UserWithTeamInitialKeyboard(member.role), `
Твой квест начинается сегодня! 
Первая станция: "${station.name}" (${station.lat} ${station.lng}) в ${formatTime(routePoint.supposedArrival)}

Дополнительные задания на квест:
1. Сделайте фотографию Выборга
2. Найдите бабки и капусту
3. Сочините шансон про ППП
4. Спрячьте тело
5. Развалитесь

Пруфы выполнения заданий кидай в сообщения сообщества c хештегом #доп ;-)
`)
      await Bot.changeState(member, 'INITIAL')
    }
  }

  await Bot.sendMessage(req.user, BasicKeyboard, "Закончили")
  await Bot.forward('', req)
}