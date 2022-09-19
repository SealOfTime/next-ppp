/* eslint-disable no-use-before-define */
import { NextApiRequest, NextApiResponse } from 'next';
import { stderr } from 'process';
import Bot from '../../../bot/bot';
import Prisma from '../../../Prisma';
import Vk from '../../../Vk';

const eventHandlers = {
  confirmation: handleConfirmation,
  message_event: handleCallbackButton,
  message_new: handleNewMessage,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const handleEvent = eventHandlers[req.body.type];
  if (handleEvent === undefined) {
    stderr.write(`Неизвестное событие ${req.body.type}`);
    res.status(404).send('Not found');
    return;
  }

  await handleEvent(req, res);
}

async function handleConfirmation(req: NextApiRequest, res: NextApiResponse) {
  res.status(200);
  res.send(process.env.VK_CONFIRMATION_CODE);
}

async function handleNewMessage(req: NextApiRequest, res: NextApiResponse) {
  try{
    const userId = req.body.object.message.from_id;

    let user = await Prisma.user.findFirst({
      where: {
        vkId: userId.toString(),
      },
    });

    if (user === null) {
      const userResp = await Vk.api.users.get({ user_ids: [userId], fields: ['domain'] });
      const vkUser = userResp[0];

      user = await Prisma.user.create({
        data: {
          vkId: userId.toString(),
          firstName: vkUser.first_name,
          lastName: vkUser.last_name,
          vkUrl: `https://vk.com/${vkUser.domain}`,
        },
      });
    }

    let payload = {};
    try {
      payload = JSON.parse(req.body.object.message.payload)
    } catch(err){}

    await Bot.handleMessage({
      groupID: req.body.group_id,
      peerID: req.body.object.message.peer_id,
      message: req.body.object.message.text,
      payload: payload,
      user: user,
    });
  } catch(err) {
    console.error(err)
  }

  res.status(200).send('Ok');
}


async function handleCallbackButton(req: NextApiRequest, res: NextApiResponse) {
  try{
    const userId = req.body.object.user_id;

    let user = await Prisma.user.findFirst({
      where: {
        vkId: userId.toString(),
      },
    });

    if (user === null) {
      const userResp = await Vk.api.users.get({ user_ids: [userId], fields: ['domain'] });
      const vkUser = userResp[0];

      user = await Prisma.user.create({
        data: {
          vkId: userId.toString(),
          firstName: vkUser.first_name,
          lastName: vkUser.last_name,
          vkUrl: `https://vk.com/${vkUser.domain}`,
        },
      });
    }

    await Bot.handleMessage({
      groupID: req.body.group_id,
      peerID: req.body.object.peer_id,
      message: "",
      payload: req.body.object.payload,
      user: user,
    })
  }catch(err){console.error(err)}
  res.status(200).send('Ok')
}