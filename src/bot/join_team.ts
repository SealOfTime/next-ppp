import Prisma from "../Prisma";
import { formatDate } from "../Util";
import Bot, { BotRequest } from "./bot";
import { BasicKeyboard, UserWithoutTeamInitialKeyboard, UserWithTeamInitialKeyboard } from "./keyboard/keyboard";
import { TeamCodeLength } from "./new_team";

export async function handleJoinTeamCode(req: BotRequest) {
  if (req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  if (req.message.length !== TeamCodeLength) {
    await Bot.sendMessage(req.user, BasicKeyboard,
      `В коде команды должно быть ${TeamCodeLength} буковок и циферок`);
    return;
  }
  
  const team = await Prisma.team.findFirst({
    where: {
      code: req.message,
    },
    include: {
      members: true,
    },
  });

  if (team.members.length >= 6) {
    await Bot.sendMessage(req.user, UserWithoutTeamInitialKeyboard,
      `Извини друг, но это команда уже заполнена. Попробуй создать свою или присоединиться к другой ;-)`);
    await Bot.changeState(req.user, 'INITIAL');
    return;
  }
  
  await Prisma.user.update({
    where: {
      vkId: req.user.vkId,
    },
    data: {
      teamID: team.id,
      botState: 'INITIAL',
    },
  });
  const response = `
  Добро пожаловать в команду "${team.name}"!
  Вы участвуете ${formatDate(team.participationDate)}
  
  Участники команды [${team.members.length}/6]:
  ${team.members.map((u) => `${u.firstName} ${u.lastName}\n`)}
  `;

  await Bot.sendMessage(req.user, UserWithTeamInitialKeyboard, response)
}