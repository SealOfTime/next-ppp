import { User } from "@prisma/client";
import Prisma from "../Prisma";
import { AdminKeyboard, UserWithoutTeamInitialKeyboard, UserWithTeamInitialKeyboard } from "./keyboard/keyboard";
import Bot, { BotRequest } from "./bot";

export default async function handlePreInitial(req: BotRequest) {
  if(req.user.role === 'ADMIN') {
    await handleWelcomeAdmin(req);
    return;
  }

  let keyboard = req.user.teamID === null
    ? UserWithoutTeamInitialKeyboard
    : UserWithTeamInitialKeyboard(req.user.role);

  const response = `
  Привет игрок!
  Готов присоединиться к игре?
  `;
  await Bot.sendMessage( req.user, keyboard, response);

  await Prisma.user.update({
    data: {
      botState: 'INITIAL',
    },
    where: {
      vkId: req.user.vkId,
    },
  });
}

async function handleWelcomeAdmin(req: BotRequest) {
  let keyboard = AdminKeyboard;
  
  const response = `Здарова, админ.`;
  await Bot.sendMessage( req.user, keyboard, response);

  await Prisma.user.update({
    data: {
      botState: 'INITIAL',
    },
    where: {
      vkId: req.user.vkId,
    },
  });
}