import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleVkRedirect(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.VK_CLIENT_ID;
  const redirectUri = `${process.env.PPP_URL}/login`;
  const vkRedirect = `https://oauth.vk.com/authorize?response_type=code&display=popup&v=5.131&client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(vkRedirect);
}
