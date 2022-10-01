import slug from 'limax';
import Prisma from "../Prisma";
import { formatDate, isPhone, makeid, makeSlugID, unicodeLength } from "../Util";
import Bot, { BotRequest } from "./bot";
import { BasicKeyboard, ConfirmationKeyboard, ChooseDateKeyboard, UserWithTeamInitialKeyboard } from "./keyboard/keyboard";

export const MAX_TEAMS_PER_DAY = 32;
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

  const days = await findDaysOpenForRegistartion();
  const response = `
  ${withLegionaries
    ? 'Вы согласились принимать в свои ряды легионеров!'
    : 'Вы отказались принимать в свои ряды легионеров 😔'}
Теперь выберите дату, в которую готовы принять участие:`;

  await Bot.sendMessage(req.user, ChooseDateKeyboard(days.map(d=>d.date)), response)
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

  const days = await findDaysOpenForRegistartion()
  const daysByHumanReadableName = new Map(days.map(d => [formatDate(d.date), d]))

  const chosenDay = daysByHumanReadableName.get(req.message);
  if(chosenDay === undefined){
    await Bot.sendMessage(req.user, ChooseDateKeyboard(days.map(d=>d.date)),
      'Прости, на эту дату уже закрыта регистрация, попробуй выбрать другую')
    return;
  }

  const { name, withLegionaries } = req.user.botData as any;

  const team = await Prisma.team.create({
    data: {
      id: makeSlugID(name),
      name,
      legionariesAllowed: withLegionaries,
      participationDateID: chosenDay.date,
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
  Вы будете принимать участие ${formatDate(chosenDay.date)}.
  Отправь этот код участникам своей команды, чтобы они могли присоединиться: 
  ${team.code}
  
  ${withLegionaries
    ? 'Кроме того ты разрешил одиноким игрокам присоединяться к твоей команде! Жди новых друзей!\n'
    : ''
}
  Ищи списки своей команды на сайте - https://ppp.itmo.online`;

  await Bot.sendMessage(req.user, UserWithTeamInitialKeyboard(req.user.role), response);
}

async function findDaysOpenForRegistartion() {
  const today = new Date();
  const days = (await Prisma.questDate.findMany({
    where: {
      registrationStart: {
        lte: today,
      },
      registrationEnd: {
        gte: today,
      },
    },
    include: {
      participatingTeams: true,
    },
  })).filter(d => d.participatingTeams.length < MAX_TEAMS_PER_DAY);

  return days
}