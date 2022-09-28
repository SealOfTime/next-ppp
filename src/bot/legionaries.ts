import Prisma from "../Prisma";
import { formatDate, isPhone } from "../Util";
import Bot, { BotRequest } from "./bot";
import { MAX_PLAYERS_IN_TEAM } from "./join_team";
import { BasicKeyboard, ChooseDateKeyboard, UserWithTeamInitialKeyboard } from "./keyboard/keyboard";

export async function handleJoinLegionaries(req: BotRequest) {
  await Bot.sendMessage(req.user, BasicKeyboard, 
    "Введи свой номер телефона, чтобы капитан команды, которую мы тебе подберём, смог связаться с тобой: ");
  await Bot.changeState(req.user, 'JOIN_LEGIONARIES/PHONE');
}

async function findTeamsWithVacantSpace() {
  const teams = await Prisma.team.findMany({
    include: {
      _count: {
        select: { members: true, }
      }
    },
    where: {
      legionariesAllowed: true,
      participationDate: {
        gt: new Date(),
      },
    },
  });

  const teamsWithVacantSpaces = teams.filter(t => t._count.members < MAX_PLAYERS_IN_TEAM);

  console.log(teams);
  console.log(teamsWithVacantSpaces);

  return teamsWithVacantSpaces
}

export async function handleJoinLegionariesPhone(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  if (!isPhone(req.message)) {
    const response = `Пожалуйста, введите номер телефона. 
    Например, +7 (012) 345-67-89`;
    await Bot.sendMessage(req.user, BasicKeyboard, response)
    return;
  }

  const teamsWithVacantSpaces = await findTeamsWithVacantSpace()
  const daysWithTeamsWithVacantSpaces = teamsWithVacantSpaces
    .map(t => t.participationDate.getTime())
    .filter((v, i, arr)=>arr.indexOf(v)===i)
    .map(t => new Date(t))
  console.log(daysWithTeamsWithVacantSpaces)

  await Prisma.user.update({
    where: {
      vkId: req.user.vkId,
    },
    data: {
      phone: req.message,
      botState:'JOIN_LEGIONARIES/DATE',
    },
  })

  await Bot.sendMessage(req.user, ChooseDateKeyboard(daysWithTeamsWithVacantSpaces), 
    "Выбери дату участия: ");
}

export async function handleJoinLegionariesDate(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  const teamsWithVacantSpaces = await findTeamsWithVacantSpace()
  const daysWithTeamsWithVacantSpaces = teamsWithVacantSpaces
    .map(t => t.participationDate.getTime())
    .filter((v, i, arr)=>arr.indexOf(v)===i)
    .map(t => new Date(t))
  console.log(daysWithTeamsWithVacantSpaces)

  let date;
  switch (req.message) {
  case '02 октября':
    date = new Date(2022, 10, 2);
    break;
  case '09 октября':
    date = new Date(2022, 10, 9);
    break;
  default:
    await Bot.sendMessage(req.user, ChooseDateKeyboard(daysWithTeamsWithVacantSpaces),
      'Выбор прост: "02 октября" или "09 октября"')
    return;
  }

  const teamsWithVacantSpacesChosenDay = teamsWithVacantSpaces.filter(t=>t.participationDate.getTime()===date.getTime())
  if(teamsWithVacantSpacesChosenDay.length === 0) {
    await Bot.sendMessage(req.user, ChooseDateKeyboard(daysWithTeamsWithVacantSpaces), 
      "На эту дату уже не осталось команд, выбери новую дату: ");
    return;
  }

  const team = teamsWithVacantSpacesChosenDay[Math.floor(Math.random()*teamsWithVacantSpacesChosenDay.length)]
  const captain = await Prisma.user.findFirst({
    where: {
      teamID: team.id,
      role: 'CAPTAIN',
    },
  })

  await Prisma.user.update({
    where: {
      vkId: req.user.vkId,
    },
    data: {
      botState: 'INITIAL',
      teamID: team.id,
    }
  });

  const response = `
Добро пожаловать в команду "${team.name}"!
Вы участвуете ${formatDate(team.participationDate)}

Твой капитан: @id${captain.vkId} (${captain.firstName} ${captain.lastName})
`
  await Bot.sendMessage(req.user, UserWithTeamInitialKeyboard(req.user.role), response);
  await Bot.sendMessage(captain, BasicKeyboard, `
К твоей команде присоединился легионер: @id${req.user.vkId}(${req.user.firstName} ${req.user.lastName})!

Поприветствуй его ;-)`)
}