import { Role } from "@prisma/client";
import { Keyboard } from "vk-io";
import { formatDate } from "../../Util";
import { ResetButton, HelpMeButton, JoinTeamButton, LeaveTeamButton, MyTeamButton, NewTeamButton, NoButton, YesButton, BackButton } from "./buttons";

export const BasicKeyboard = Keyboard.keyboard([
  [HelpMeButton, ResetButton],
])

export const ConfirmationKeyboard = Keyboard.keyboard([
  [YesButton, NoButton], 
  [ResetButton],
])

export const CancelHelpKeyboard = Keyboard.keyboard([
  [BackButton],
])

export const UserWithoutTeamInitialKeyboard = Keyboard.keyboard([
  [JoinTeamButton, NewTeamButton],
]);

export const UserWithTeamInitialKeyboard = (role: Role) => Keyboard.keyboard([
  [MyTeamButton],
  [LeaveTeamButton]
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
  [ResetButton],
]).oneTime(true);