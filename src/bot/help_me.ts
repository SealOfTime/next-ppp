import Vk from "../Vk";
import Bot, { BotRequest } from "./bot";
import { BasicKeyboard, CancelHelpKeyboard } from "./keyboard/keyboard";

export async function initHelpMe(req: BotRequest) {
  await Vk.api.messages.markAsImportantConversation({
    group_id: req.groupID,
    peer_id: req.peerID,
    important: 1,
  })
  await Bot.changeState(req.user, 'HELP_ME')
  await Bot.sendMessage(req.user, CancelHelpKeyboard, 
    'Опиши максимально подробно свою проблему. Вскоре тебе ответит первый освободившийся организатор ☺️')
}

export async function handleHelpMe(req: BotRequest) {
  if(req.payload?.button !== 'back') {
    return;
  }

  await Vk.api.messages.markAsImportantConversation({
    group_id: req.groupID,
    peer_id: req.peerID,
    important: 0,
  })
  await Bot.sendMessage(req.user, BasicKeyboard, 'Надеюсь, мы смогли тебе помочь ;)')
  await Bot.forward('', req)
}