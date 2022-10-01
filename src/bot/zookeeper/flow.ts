import { RoutePoint } from "@prisma/client";
import Prisma from "../../Prisma";
import { formatDate, formatTime } from "../../Util";
import Bot, { BotRequest } from "../bot";
import { ArrivedButton } from "../keyboard/buttons";
import { AttendanceKeyboard, BasicKeyboard, ChooseStationKeyboard, CompletionKeyboard } from "../keyboard/keyboard";

export async function handleInitFlow(req: BotRequest) {
  const stations = await Prisma.station.findMany()
  await Bot.sendMessage(req.user, ChooseStationKeyboard(stations), `
Привет! Выбери станцию, для которой ты хочешь фиксировать результаты.

Обрати внимание, что станции представлены в двух вариантах А и Б - это потоки участников. Т.е. в одно время на одной станции может участвовать сразу 2 команды. 
Если ты стоишь один, то это полный пиздец, пиши Ане. Если ты не один, то решите, кто из вас отвечает за поток А, а кто за поток Б и старайтесь не меняться. 
`)
  await Bot.changeState(req.user, 'ZOOKEEPER/CHOOSE_STATION')
}

export async function handleZookeperChooseStation(req: BotRequest) {
  if(req.message === 'К началу') {
    Bot.forward('', req);
    return;
  }

  const stations = await Prisma.station.findMany()
  const stationsByName = new Map(stations.map(s=>[s.internalName, s]))
  const chosen = stationsByName.get(req.message)
  if(chosen === undefined) {
    await Bot.sendMessage(req.user, ChooseStationKeyboard(stations), 
      `Станции "${req.message}" не существует`)
    return;
  }


  await Bot.changeState(req.user, 'ZOOKEEPER/WORK', {stationID: chosen.id})
  req.user.botData = {stationID: chosen.id};
  await handleZookeeperNextTeam(req);
}

export async function handleZookeeperNextTeam(req: BotRequest) {
  const stationID = (req.user.botData as any).stationID;
  const routePoint = await getNextRoutePointForStation(stationID);
  if(routePoint === null) {
    await Bot.sendMessage(req.user, BasicKeyboard, `На станции "${stationID}" больше нету команд!`)
    await Bot.forward('', req)
    return;
  }

  let keyboard = routePoint.arrivedAt === null 
    ? AttendanceKeyboard 
    : CompletionKeyboard;

  const captain = routePoint.team.members.filter(m=>m.role==='CAPTAIN')[0]
  if(captain === undefined) {
    console.error(`У команды ${routePoint.team.name} нет капитана`);
  }

  await Bot.sendMessage(req.user, keyboard, `
Станция "${routePoint.station.internalName}"
Команда "${routePoint.team.name}" прибудет в ${formatTime(routePoint.supposedArrival)} ${formatDate(routePoint.supposedArrival)}
Капитан: @id${captain?.vkId} (${captain?.firstName} ${captain?.lastName})
${routePoint.arrivedAt !== null ? `Время начала: ${formatTime(routePoint.arrivedAt)}` : ''}
`)
}

export async function handleZookeeperRecord(req: BotRequest) {
  if(req.message === 'К началу') {
    Bot.forward('', req);
    return;
  }

  const stationID = (req.user.botData as any).stationID;
  const routePoint = await getNextRoutePointForStation(stationID);
  if(routePoint === null) {
    await Bot.sendMessage(req.user, BasicKeyboard, "Кто-то оценил эту станцию раньше тебя)")
    await Bot.forward('', req)
    return;
  }

  if(routePoint.arrivedAt === null) {
    await handleTeamArrival(req, routePoint);
    return
  }

  if(routePoint.finishedAt === null) {
    await handleTeamResult(req, routePoint);
    return;
  }

  await Bot.sendMessage(req.user, BasicKeyboard, "Этой команде уже кто-то проставил результаты...")
  await handleZookeeperNextTeam(req);
}


async function handleTeamArrival(req: BotRequest, routePoint: RoutePoint) {
  switch(req.message) {
  case 'Пришли':
    await Prisma.routePoint.update({
      where: {
        supposedArrival_teamID_stationID: {
          stationID: routePoint.stationID,
          supposedArrival: routePoint.supposedArrival,
          teamID: routePoint.teamID,
        },
      },
      data: {
        missed: false,
        arrivedAt: new Date(),
      },
    })
    await Bot.sendMessage(req.user, CompletionKeyboard, `
Зафиксировал. 
Теперь нажми "Справились", когда команда успешно пройдёт твоё испытание или "Не справились", если провалится.`)
    return;
  case 'Не пришли':
    await Prisma.routePoint.update({
      where: {
        supposedArrival_teamID_stationID: {
          stationID: routePoint.stationID,
          supposedArrival: routePoint.supposedArrival,
          teamID: routePoint.teamID,
        },
      },
      data: {
        missed: true,
      },
    })
    await Bot.sendMessage(req.user, BasicKeyboard, "Ждём следующую команду!")
    await handleZookeeperNextTeam(req);
    return;
  }
}

async function handleTeamResult(req: BotRequest, routePoint: RoutePoint) {
  switch(req.message) {
  case 'Справились':
    await Prisma.routePoint.update({
      where: {
        supposedArrival_teamID_stationID: {
          stationID: routePoint.stationID,
          supposedArrival: routePoint.supposedArrival,
          teamID: routePoint.teamID,
        },
      },
      data: {
        completed: true,
        finishedAt: new Date(),
      },
    })
    await Bot.sendMessage(req.user, BasicKeyboard, `Зафиксировал.`)
    await handleZookeeperNextTeam(req);
    return;
  case 'Не справились':
    await Prisma.routePoint.update({
      where: {
        supposedArrival_teamID_stationID: {
          stationID: routePoint.stationID,
          supposedArrival: routePoint.supposedArrival,
          teamID: routePoint.teamID,
        },
      },
      data: {
        finishedAt: new Date(),
        completed: false,
      },
    })
    await Bot.sendMessage(req.user, BasicKeyboard, "Ждём следующую команду!")
    await handleZookeeperNextTeam(req);
    return;
  }
}

async function getNextRoutePointForStation(stationID: string) {
  return Prisma.routePoint.findFirst({
    where: {
      stationID: stationID,
      missed: false,
      OR: [
        {
          finishedAt: null,
        },
        {    
          arrivedAt: null,
        }
      ],
    },
    orderBy: {
      supposedArrival: 'asc',
    },
    include: {
      station: {
        select: {
          internalName: true,
        },
      },
      team: {
        include: {
          members: true,
        },
      },
    }
  })
}