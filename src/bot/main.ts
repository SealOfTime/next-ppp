import Prisma from "../Prisma";
import { formatDate } from "../Util";
import { BasicKeyboard, ConfirmationKeyboard, UserWithoutTeamInitialKeyboard, UserWithTeamInitialKeyboard } from "./keyboard/keyboard";
import Bot, { BotRequest } from "./bot";
import { handleJoinLegionaries } from "./legionaries";
import { handleAdmin } from "./admin";

export default async function handleInitial(req: BotRequest) {
  if (req.user.role === 'ADMIN') {
    handleAdmin(req)
    return;
  }

  if (req.user.teamID !== null) {
    handleUserWithTeam(req)
    return;
  }

  handleUserWithoutTeam(req)
}

async function handleUserWithTeam(req: BotRequest) {
  switch (req.message) {
  case 'Моя команда': {
    const team = await Prisma.team.findFirst({
      where: {
        id: req.user.teamID,
      },
      include: {
        members: true,
      },
    });
  
    const response=  `
    Ты ${req.user.role === 'CAPTAIN' ? 'капитан' : 'член'} команды "${team.name}".
    Вы участвуете ${formatDate(team.participationDateID)}
    ${req.user.role === 'CAPTAIN' ? `Код приглашения ${team.code}` : ''}
    
    Участники команды [${team.members.length}/6]:
    ${team.members.map((u) => `${u.firstName} ${u.lastName}`).join('\n')}
    
    ${team.legionariesAllowed 
    ? 'В твоей команде в ближайшее время могут появиться новые участники ;-)' 
    : ''}`

    await Bot.sendMessage(req.user, UserWithTeamInitialKeyboard(req.user.role), response)
    break;
  }
  case 'Покинуть команду':{
    Bot.sendMessage(req.user, ConfirmationKeyboard, 
      "Вы действительно хотите покинуть свою команду? Места потом уже может не хватить...")
    Bot.changeState(req.user, 'LEAVE_TEAM/CONFIRMATION')
    break;
  }
  }

  return;
}

export async function handleConfirmLeaving(req: BotRequest){
  if (req.message === 'К началу') {
    await Bot.forward('', req);
    return;
  }

  switch (req.message) {
  case 'Да':
    await Prisma.user.update({
      where: {
        vkId: req.user.vkId,
      },
      data: {
        teamID: null,
        role: 'PLAYER',
        botState: 'INITIAL',
        botData: {},
      },
    })

    await Bot.sendMessage(req.user, UserWithoutTeamInitialKeyboard, 
      `Вы больше не состоите в команде`)

    const team = await Prisma.team.findFirst({
      where: {
        id: req.user.teamID,
      },
      include: {
        members: true,
      },
    })

    if(team === null) {
      return
    }

    if(team.members.length === 0) {
      await Prisma.team.delete({
        where: {
          id: team.id,
        }
      })
      return
    } 

    if(req.user.role==='CAPTAIN') {
      const leftMembers = team.members.map(m=>m.vkId)
      await Prisma.user.updateMany({
        where: {
          vkId: {
            in: leftMembers,
          },
        },
        data: {
          teamID: null,
          botState: '',
        }
      })

      await Prisma.team.delete({
        where: {
          id: team.id,
        }
      })

      await Bot.broadcastMessage(leftMembers, UserWithoutTeamInitialKeyboard, "Ваша команда распалась...");
      return;
    }

    break;
  case 'Нет':{
    Bot.forward('', req);
    break;
  }
  default:
    await Bot.sendMessage(req.user, ConfirmationKeyboard, 'Выбор прост: Да или Нет')
    return;
  }
}

async function handleUserWithoutTeam(req: BotRequest) {
  switch (req.message) {
  case 'Новая команда!':
    await Bot.sendMessage(req.user, BasicKeyboard,
      'Введи название команды:');
    await Bot.changeState(req.user, 'NEW_TEAM/NAME')
    break;
  case 'Присоединиться к команде':
    await Bot.sendMessage(req.user, BasicKeyboard,
      'Введи код входа, который тебе прислал капитан команды')
    await Bot.changeState(req.user, 'JOIN_TEAM/CODE')
    break;
  case 'Стать легионером':
    await handleJoinLegionaries(req);
    break;
  }
}