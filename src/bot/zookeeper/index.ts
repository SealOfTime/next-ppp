import Bot, { BotRequest } from "../bot";
import { handleInitFlow } from "./flow";


export async function handleZookeeper(req: BotRequest) {
  switch(req.message) {
  case 'Приступить к работе': await handleInitFlow(req); break;
  }
}