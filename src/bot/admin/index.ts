import Prisma from "../../Prisma";
import { formatDate } from "../../Util";
import { BroadcastHandlers, handleInitiateBroadcast } from "./broadcast";
import { handleInitSetTeamRoute, handleSetTeamRoute, handleSetTeamRouteName } from "./routes";
import Bot, { BotRequest } from "../bot";
import { ChooseDateKeyboard, UserWithoutTeamInitialKeyboard, UserWithTeamInitialKeyboard } from "../keyboard/keyboard";
import { handleAddStation, handleInitAddStation } from "./stations";

export const AdminHandlers: Record<string, (r: BotRequest)=>void> = {
  'ADMIN/SET_TEAM_ROUTE/NAME': handleSetTeamRouteName, 
  'ADMIN/SET_TEAM_ROUTE': handleSetTeamRoute,
  'ADMIN/ADD_STATION': handleAddStation,
  ...BroadcastHandlers,
};

export async function handleAdmin(req: BotRequest) {
  switch(req.message) {
  case 'Рассылка': await handleInitiateBroadcast(req); break;
  case 'Задать маршрут команде': await handleInitSetTeamRoute(req); break;
  case 'Добавить станцию': await handleInitAddStation(req); break;
  }
}