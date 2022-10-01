import Prisma from "../../Prisma";
import { formatDate } from "../../Util";
import { handleInitiateTeamRoutesBroadcast } from "./broadcast";
import { handleInitSetTeamRoute } from "./routes";
import Bot, { BotRequest } from "../bot";
import { ChooseDateKeyboard, UserWithoutTeamInitialKeyboard, UserWithTeamInitialKeyboard } from "../keyboard/keyboard";
import { handleInitAddStation } from "./stations";

export async function handleAdmin(req: BotRequest) {
  switch(req.message) {
  case 'Рассылка маршрутов': await handleInitiateTeamRoutesBroadcast(req); break;
  case 'Задать маршрут команде': await handleInitSetTeamRoute(req); break;
  case 'Добавить станцию': await handleInitAddStation(req); break;
  }
}