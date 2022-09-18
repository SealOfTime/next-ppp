import { Keyboard } from "vk-io";
import { formatDate } from "../../Util";
import { BackButton, JoinTeamButton, LeaveTeamButton, MyTeamButton, NewTeamButton, NoButton, YesButton } from "./buttons";


export const BasicKeyboard = Keyboard.keyboard([
  [BackButton],
])

export const ConfirmationKeyboard = Keyboard.keyboard([
  [YesButton, NoButton], 
  [BackButton],
])

export const UserWithoutTeamInitialKeyboard = Keyboard.keyboard([
  [JoinTeamButton, NewTeamButton],
]);

export const UserWithTeamInitialKeyboard = Keyboard.keyboard([
  [MyTeamButton, LeaveTeamButton],
]);

export const NewTeamDateKeyboard = (dates: Date[]) => Keyboard.keyboard([
  [
    ...dates.map(d=>
      Keyboard.textButton({
        label: formatDate(d),
        payload: {
          button: 'date',
          date: `${d.getDate()}.${d.getMonth()}`,
        },
        color: 'primary',
      }))
  ],
  [BackButton],
]).oneTime(true);