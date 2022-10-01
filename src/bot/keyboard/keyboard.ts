import { Role, Station } from "@prisma/client";
import { Keyboard } from "vk-io";
import { formatDate } from "../../Util";
import { ResetButton, HelpMeButton, JoinTeamButton, LeaveTeamButton, MyTeamButton, NewTeamButton, NoButton, YesButton, BackButton, JoinLegionariesButton, AddStationButton, SetTeamRouteButton, BroadcastRoutesButton, ZookeeperBeginWorkButton, ArrivedButton, MissedButton, WellDoneButton, FailedButton } from "./buttons";

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
  [JoinLegionariesButton],
  [JoinTeamButton, NewTeamButton],
]);

export const UserWithTeamInitialKeyboard = (role: Role) => Keyboard.keyboard([
  [MyTeamButton],
  [LeaveTeamButton]
]);

export const ChooseDateKeyboard = (dates: Date[]) => Keyboard.keyboard([
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



export const AdminKeyboard = Keyboard.keyboard([
  [BroadcastRoutesButton], 
  [SetTeamRouteButton], 
  [AddStationButton],
]);

export const ChooseKeyboard = (labels: string[]) => Keyboard.keyboard([
  [
    ...labels.map(l=>
      Keyboard.textButton({
        label: l,
        payload: {
          button: 'choose',
          variant: l,
        },
        color: 'primary',
      }))
  ],
  [ResetButton],
]).oneTime(true);

export const ZookeeperKeyboard = Keyboard.keyboard([[ZookeeperBeginWorkButton]])

export const AttendanceKeyboard = Keyboard.keyboard([
  [ArrivedButton, MissedButton], 
  [ResetButton],
])

export const CompletionKeyboard = Keyboard.keyboard([
  [WellDoneButton, FailedButton],
  [ResetButton],
])