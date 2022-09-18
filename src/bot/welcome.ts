import { User } from "@prisma/client";
import Prisma from "../Prisma";
import { UserWithoutTeamInitialKeyboard, UserWithTeamInitialKeyboard } from "./keyboard/keyboard";
import Bot, { BotRequest } from "./bot";

export default async function handlePreInitial(req: BotRequest) {
  let keyboard = req.user.teamID === null
    ? UserWithoutTeamInitialKeyboard
    : UserWithTeamInitialKeyboard;

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