import Prisma from "../../Prisma";
import { makeid, makeSlugID } from "../../Util";
import Bot, { BotRequest } from "../bot";
import { AdminKeyboard, BasicKeyboard } from "../keyboard/keyboard";


export async function handleInitAddStation(req: BotRequest) {
  await Bot.sendMessage(req.user, BasicKeyboard, `
Введи, пожалуйста, данные о станции в формате:
<имя станции> - <внутреннее имя станции> - <широта> - <долгота>
`);

  await Bot.changeState(req.user, 'ADMIN/ADD_STATION');
}

export async function handleAddStation(req: BotRequest) {
  if(req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  const stationData = req.message.split(" - ")
  if(stationData.length !== 4) {
    await Bot.sendMessage(req.user, BasicKeyboard, 
      `Некорректный ввод: [${stationData.map(s=>`"${s}"`).join(", ")}]`)
    return;
  }

  const [name, internalName, latRaw, lngRaw] = stationData

  const lat = parseFloat(latRaw);
  const lng = parseFloat(lngRaw);

  const station = await Prisma.station.create({
    data: {
      id: `${makeSlugID(internalName)}-${makeid(6)}`,
      name: name,
      internalName: internalName,
      lat: lat,
      lng: lng,
    }
  })

  await Bot.sendMessage(req.user, AdminKeyboard, `Создали станцию ${station}`)
  await Bot.forward('', req)
}