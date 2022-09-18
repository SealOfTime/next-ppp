
export function formatDate(date: Date): string {
  const months = [
    'января', 'февраля',
    'марта', 'апреля', 'мая',
    'июнь', 'июль', 'август',
    'сентября', 'октября', 'ноября',
    'декабря',
  ];
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month = months[date.getMonth() - 1];
  return `${day} ${month}`;
}

export function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}