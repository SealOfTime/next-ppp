/* eslint-disable no-use-before-define */
import { NextApiRequest, NextApiResponse } from 'next';
import { VK } from 'vk-io';

const vk = new VK({
  token: process.env.VK_TOKEN,
});

const eventHandlers = {
  message_new: (b: any) => handleNewMessage(
    b.group_id,
    b.object.user_id,
    b.object.body,
    b.object.attachments,
  ),
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const handleEvent = eventHandlers[req.body.type];
  console.log(req.body);
  console.log(req.body.object.attachments);
  if (handleEvent !== undefined) {
    handleEvent(req.body);
  }

  res.status(200).send('ok');
}

const MAX_RANDOM_ID = 2 ** 32 - 1;

function handleNewMessage(groupId: number, userId: number, message: string) {
  console.log(userId, message);
  vk.api.messages.send({
    random_id: Math.random() * MAX_RANDOM_ID,
    group_id: groupId,
    user_id: userId,
    message,
  });
}
