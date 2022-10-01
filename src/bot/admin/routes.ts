import { Station } from "@prisma/client";
import Prisma from "../../Prisma";
import Bot, { BotRequest } from "../bot";
import { BasicKeyboard } from "../keyboard/keyboard";

export async function handleInitSetTeamRoute(req: BotRequest) {
  await Bot.sendMessage(req.user, BasicKeyboard, "Введи имя команды, для которой хочешь задать маршрут")
  await Bot.changeState(req.user, 'ADMIN/SET_TEAM_ROUTE/NAME');
}

export async function handleSetTeamRouteName(req: BotRequest) {
  if(req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  const team = await Prisma.team.findFirst({where: {name: req.message}}) 
  if(team === null) {
    await Bot.sendMessage(req.user, BasicKeyboard, `Команды с именем ${team.name} не существует`)
    return;
  }
  
  const stations = await Prisma.station.findMany();

  await Bot.sendMessage(req.user, BasicKeyboard, `
Введи маршрут команды в формате:

<Время прибытия на станцию> <Имя станция во внутреннем представлении>
<Время прибытия на станцию 2> <Имя>


Пример:
---
12:00 Заячий остров А
12:30 Грива А
---

Напомню имена всех станций во внутреннем представлении для твоего удобства:
${stations.map(s=>s.internalName).join(", ")}
`)
  await Bot.changeState(req.user, 'ADMIN/SET_TEAM_ROUTE', {'name': req.message})
}

export async function handleSetTeamRoute(req: BotRequest) {
  if(req.message === 'К началу') {
    await Bot.forward('', req)
    return;
  }

  const errors = [] as String[]

  const team = await Prisma.team.findFirst({
    where: {
      name: (req.user.botData as any).name,
    },
  })
  if(team === null) {
    await Bot.sendMessage(req.user, undefined, `Команда "${(req.user.botData as any).name}" уже не существует`)
    await Bot.forward('', req)
    return;
  }


  const stations = await Prisma.station.findMany();
  const stationsByName = new Map(stations.map(s=>[s.internalName, s]));

  const lines = req.message.split("\n");
  const routePoints = [] as {time: Date, station: Station}[]
  for(const line of lines) {
    let error = false;
    let rawTime: String, timeStr: String[], time: Date;
    try{
      rawTime = line.slice(0, 5);
      timeStr = rawTime.split(":").map(s=>s[0]==='0' ? s.slice(1) : s);
      const [hours, minutes] = timeStr.map(s=>parseInt(s as string));
      console.log(timeStr, hours, minutes)
      if(Number.isNaN(hours) || Number.isNaN(minutes)) {
        throw "неправильные числа";
      }

      time = new Date(
        team.participationDateID.getFullYear(),
        team.participationDateID.getMonth(),
        team.participationDateID.getDate(),
        hours,
        minutes
      );
    } catch(err) {
      error=true;
      errors.push(`Некорректное время: "${rawTime}", timeStr: "${timeStr?.join(", ")}", ошибка: ${err}`)
    }

    const stationName = line.slice(6).trim()
    const station = stationsByName.get(stationName)
    if(station === undefined) {
      error = true;
      errors.push(`Станция "${stationName}" не существует`)
    }
    
    if(error) {
      continue;
    }

    routePoints.push({time, station})
  }

  if(errors.length !== 0) {
    await Bot.sendMessage(req.user, BasicKeyboard, 
      `Не получилось задать маршрут. Ошибки:\n\n${errors.join('\n')}`)
    return;
  }

  for(const rp of routePoints) {
    await Prisma.routePoint.create({
      data: {
        supposedArrival: rp.time,
        stationID: rp.station.id,
        teamID: team.id,
      },
    })
  }

  const {route} = await Prisma.team.findFirst({
    where: {
      id: team.id,
    },
    select: {
      route: {
        include: {
          station: {
            select: {
              name: true,
              lat: true,
              lng: true,
            }
          }
        }
      },
    }
  })
  await Bot.sendMessage(req.user, undefined, `
Задали маршрут для команды ${team.name}:
${route.map((r, i)=>`${i}. ${r.station.name} (${r.station.lat}, ${r.station.lng})`)
    .join("\n")}
`)
  await Bot.forward('', req)
}