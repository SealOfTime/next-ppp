import { VK } from 'vk-io';

const vk = new VK({
  token: process.env.VK_TOKEN,
});

export default vk;
