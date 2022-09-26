import slug from 'limax';
import Prisma from "../Prisma";
import { isPhone, makeid, unicodeLength } from "../Util";
import Bot, { BotRequest } from "./bot";
import { BasicKeyboard, ConfirmationKeyboard, ChooseDateKeyboard, UserWithTeamInitialKeyboard } from "./keyboard/keyboard";

export const TeamCodeLength = 8;

export async function handleNewTeamName(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req);
    return;
  }

  if (unicodeLength(req.message) > 40) {
    await Bot.sendMessage(req.user, BasicKeyboard, 'В названии команды должно быть не более 40 символов')
    return;
  }

  const teamWithSameSlug = await Prisma.team.findFirst({
    where: {
      id: slug(req.message),
    },
  })
  if(teamWithSameSlug !== null) {
    const response = `Команда с похожим именем уже существует, пожалуйста, выбери другое или слегка подкорректируй это`;

    await Bot.sendMessage(req.user, BasicKeyboard, response);
    return;
  }

  const response = `Введите свой номер телефона:
  (В случае ЧП организаторы оставляют за собой право связаться с вами с его помощью)`;
  
  await Bot.sendMessage(req.user, BasicKeyboard, response);
  await Bot.changeState(req.user, 'NEW_TEAM/PHONE', {name: req.message})
}

export async function handleNewTeamPhone(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req);
    return;
  }

  if (!isPhone(req.message)) {
    const response = `Пожалуйста, введите номер телефона. 
    Например, +7 (012) 345-67-89`;
    await Bot.sendMessage(req.user, BasicKeyboard, response)
    return;
  }

  const response = 'Хотите ли вы принять одиноких путников в свою команду, если в ней останется место?';
  await Bot.sendMessage(req.user, ConfirmationKeyboard, response)

  await Prisma.user.update({
    where: {
      vkId: req.user.vkId,
    },
    data: {
      phone: req.message,
      botState: 'NEW_TEAM/LEGIONARIES',
    },
  });
}

// TODO: replace
const HardcodedDates = [
  new Date(2022, 10, 2),
  new Date(2022, 10, 9),
]

export async function handleNewTeamLegionaries(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req);
    return;
  }

  let withLegionaries;
  switch (req.message) {
  case 'Да':
    withLegionaries = true;
    break;
  case 'Нет':
    withLegionaries = false;
    break;
  default:
    await Bot.sendMessage(req.user, ConfirmationKeyboard, 'Выбор прост: Да или Нет')
    return;
  }

  const response = `
  ${withLegionaries
    ? 'Вы согласились принимать в свои ряды легионеров!'
    : 'Вы отказались принимать в свои ряды легионеров 😔'}
Теперь выберите дату, в которую готовы принять участие:`;

  const teamsByDays = await Prisma.team.groupBy({
    by: ['participationDate'],
    _count: true,
  })

  //TODO: предусмотреть отсутствие дней

  const occupiedDays = teamsByDays.filter(d=>d._count >= 32).map(d=>d.participationDate)
  const freeDays = HardcodedDates.filter((d) => !occupiedDays.includes(d))

  await Bot.sendMessage(req.user, ChooseDateKeyboard(freeDays), response, )
  await Bot.changeState(req.user, 'NEW_TEAM/DATE', {
    name: (req.user.botData as any).name,
    withLegionaries,
  })
}


export async function handleNewTeamDate(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req);
    return;
  }

  const dateString = req.message;
  let date;
  switch (req.message) {
  case '02 октября':
    date = new Date(2022, 10, 2);
    break;
  case '09 октября':
    date = new Date(2022, 10, 9);
    break;
  default:
    await Bot.sendMessage(req.user, ChooseDateKeyboard(HardcodedDates),
      'Выбор прост: "02 октября" или "09 октября"')
    return;
  }

  const teamsByDays = await Prisma.team.groupBy({
    by: ['participationDate'],
    _count: true,
  })
  const teamsAtSelectedDay = teamsByDays.find(td=>td.participationDate===date)?._count || 0;
  console.log(teamsByDays)

  if(teamsByDays.length > 0 && teamsAtSelectedDay >= 32) {
    const occupiedDays = teamsByDays.filter(d=>d._count >= 32).map(d=>d.participationDate)
    const freeDays = HardcodedDates.filter((d) => !occupiedDays.includes(d))
    await Bot.sendMessage(req.user, ChooseDateKeyboard(freeDays),
      'Извини, в этот день участвует уже слишком много команд, попробуй выбрать другой')
    return;
  }

  const { name, withLegionaries } = req.user.botData as any;

  const team = await Prisma.team.create({
    data: {
      id: makeTeamID(name),
      name,
      legionariesAllowed: withLegionaries,
      participationDate: date,
      code: makeid(TeamCodeLength),
    },
  });
  
  await Prisma.user.update({
    where: {
      vkId: req.user.vkId,
    },
    data: {
      teamID: team.id,
      role: 'CAPTAIN',
      botState: 'INITIAL',
      botData: {},
    },
  });

  const response =`
  Твоя команда "${team.name}" зарегистрирована! 
  Вы будете принимать участие ${dateString}.
  Отправь этот код участникам своей команды, чтобы они могли присоединиться: 
  ${team.code}
  
  ${withLegionaries
    ? 'Кроме того ты разрешил одиноким игрокам присоединяться к твоей команде! Жди новых друзей!\n'
    : ''
}
  Ищи списки своей команды на сайте - https://ppp.itmo.online`;

  await Bot.sendMessage(req.user, UserWithTeamInitialKeyboard(req.user.role), response);
}

const makeTeamID = (teamName: string) => {
  const s = slug(teamName);
  if(s !== "") {
    return s;
  }

  return makeid(12);
}