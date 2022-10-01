import slug from "limax";


const PhoneRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
export function isPhone(s: string): boolean {
  return PhoneRegex.test(s);
}

const UnicodeCharacterRegex = /[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/gu;
export function unicodeLength(s: string): number {
  return UnicodeCharacterRegex.exec(s).length
}

export function formatTime(time: Date): string {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  return `${hours > 10 ? hours : `0${hours}`}:${minutes > 10 ? minutes : `0${minutes}`}`
}

export function formatDate(date: Date): string {
  const months = [
    'января', 'февраля',
    'марта', 'апреля', 'мая',
    'июнь', 'июль', 'август',
    'сентября', 'октября', 'ноября',
    'декабря',
  ];
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month = months[date.getMonth()];
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

export function makeSlugID(src: string){
  const s = slug(src);
  if(s !== "") {
    return s;
  }

  return makeid(12);
}