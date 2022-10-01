import Prisma from "../../Prisma";
import { formatDate } from "../../Util";
import Bot, { BotRequest } from "../bot";
import { ChooseDateKeyboard, UserWithTeamInitialKeyboard } from "../keyboard/keyboard";


export async function handleInitiateTeamRoutesBroadcast(req: BotRequest) {
  const today = new Date();
  const dates  = await Prisma.questDate.findMany({
    where: {
      date: {
        gte: today, 
      },
    }
  })
  
  Bot.sendMessage(req.user, ChooseDateKeyboard(dates.map(d=>d.date)), 
    'Выбери дату квеста, для которой провести рассылку маршрутов')
  Bot.changeState(req.user, 'ADMIN/TEAM_ROUTES_BROADCAST');
}
  
export async function handleTeamRoutesBroadcast(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }
  
  const today = new Date();
  const dates  = await Prisma.questDate.findMany({
    where: {
      date: {
        gte: today, 
      },
    },
  })
  
  const datesHumanReadable = new Map(dates.map(d => [formatDate(d.date), d]))
  
  const chosenDay = datesHumanReadable.get(req.message);
  if(chosenDay === undefined){
    await Bot.sendMessage(req.user, ChooseDateKeyboard(dates.map(d=>d.date)),
      'Прости, на эту дату не провести рассылку')
    return;
  }
  
  const teams = await Prisma.team.findMany({
    where:{
      participationDateID: chosenDay.date,
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
  }
  
  await Bot.sendMessage(req.user, undefined, "Закончили рассылку")
  await Bot.forward('', req)
}