import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import * as jose from 'jose';
import Vk from '../../../Vk';
import { getJWTKey } from '../../../Auth.server';
import Prisma from '../../../Prisma';

export default async function handleCode(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405);
    res.send('Only POST allowed');
    return;
  }
  const { code } = req.query;
  const redirectUri = `${process.env.PPP_URL}/login`;
  const clientId = process.env.VK_CLIENT_ID;
  const clientSecret = process.env.VK_CLIENT_SECRET;

  const resp = await fetch(`https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`);
  const respBody = await resp.json();
  if (!resp.ok) {
    res.status(500);
    res.json({ error: respBody.error_description });
    return;
  }

  const userId = respBody.user_id;

  const userResp = await Vk.api.users.get({ user_ids: [userId], fields: ['domain'] });
  const vkUser = userResp[0];

  const user = await Prisma.user.upsert({
    create: {
      vkId: userId.toString(),
      firstName: vkUser.first_name,
      lastName: vkUser.last_name,
      vkUrl: `https://vk.com/${vkUser.domain}`,
    },
    update: {
      firstName: vkUser.first_name,
      lastName: vkUser.last_name,
      vkUrl: `https://vk.com/${vkUser.domain}`,
    },
    where: {
      vkId: userId.toString(),
    },
  });

  const cookies = new Cookies(req, res);
  const jwt = await new jose.SignJWT({
    vkID: userId,
    firstName: user.firstName,
    lastName: user.lastName,
  }).setProtectedHeader({ alg: 'PS256' })
    .setIssuedAt()
    .sign(getJWTKey());
  cookies.set('USER_TOKEN', jwt);

  res.status(200);
  res.send('OK');
}
