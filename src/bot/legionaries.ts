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

async function findDaysWithVacantPlaces() {
  const today = new Date();
  const days = await Prisma.questDate.findMany({
    where: {
      registrationStart: {
        lte: today,
      },
      registrationEnd: {
        gte: today,
      },
    },
    include: {
      participatingTeams: {
        include: {
          members: true,
        },
      },
    },
  })
  days.forEach(d => 
    d.participatingTeams = d.participatingTeams.filter(
      t => t.members.length < MAX_PLAYERS_IN_TEAM,
    )
  );
  const daysWithTeamsWithVacantPlaces = days.filter(d => d.participatingTeams.length !== 0)

  return daysWithTeamsWithVacantPlaces
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

  const daysWithTeamsWithVacantSpaces = await findDaysWithVacantPlaces()

  await Prisma.user.update({
    where: {
      vkId: req.user.vkId,
    },
    data: {
      phone: req.message,
      botState:'JOIN_LEGIONARIES/DATE',
    },
  })

  await Bot.sendMessage(req.user, ChooseDateKeyboard(daysWithTeamsWithVacantSpaces.map(d=>d.date)), 
    "Выбери дату участия: ");
}

export async function handleJoinLegionariesDate(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  const daysWithTeamsWithVacantSpaces = await findDaysWithVacantPlaces()

  const daysByHumanReadableName = new Map(daysWithTeamsWithVacantSpaces.map(d => [formatDate(d.date), d]))

  const chosenDay = daysByHumanReadableName.get(req.message);
  if(chosenDay === undefined){
    await Bot.sendMessage(req.user, ChooseDateKeyboard(daysWithTeamsWithVacantSpaces.map(d=>d.date)),
      'Прости, на эту дату нету свободных команд, попробуй выбрать другую')
    return;
  }

  const randomTeamIdx = Math.floor(Math.random()*chosenDay.participatingTeams.length);
  const team = chosenDay.participatingTeams[randomTeamIdx];
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
Вы участвуете ${formatDate(team.participationDateID)}

Твой капитан: @id${captain.vkId} (${captain.firstName} ${captain.lastName})
`
  await Bot.sendMessage(req.user, UserWithTeamInitialKeyboard(req.user.role), response);
  await Bot.sendMessage(captain, UserWithTeamInitialKeyboard(req.user.role), `
К твоей команде присоединился легионер: @id${req.user.vkId}(${req.user.firstName} ${req.user.lastName})!

Поприветствуй его ;-)`)
}