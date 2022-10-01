import { Keyboard } from "vk-io";


export const MyTeamButton = Keyboard.textButton({
  label: 'Моя команда',
  payload: {
    button: 'my_team',
  },
  color: Keyboard.PRIMARY_COLOR,
})

export const JoinLegionariesButton =Keyboard.textButton({
  label: 'Стать легионером',
  payload: {
    button: 'join_legionaries',
  },
  color: Keyboard.PRIMARY_COLOR,
})

export const LeaveTeamButton =Keyboard.textButton({
  label: 'Покинуть команду',
  payload: {
    button: 'leave_team',
  },
})

export const JoinTeamButton = Keyboard.textButton({
  label: 'Присоединиться к команде',
  payload: {
    button: 'join_team',
  },
  color: Keyboard.SECONDARY_COLOR,
});
  
export const NewTeamButton = Keyboard.textButton({
  label: 'Новая команда!',
  payload: {
    button: 'new_team',
  },
  color: Keyboard.SECONDARY_COLOR,
});


export const HelpMeButton = Keyboard.callbackButton({
  label: 'Задать вопрос',
  payload: {
    button: 'help_me',
  },
  color: Keyboard.SECONDARY_COLOR,
});

export const BackButton = Keyboard.textButton({
  label: "Назад",
  payload: {
    button: 'back',
  },
  color: Keyboard.SECONDARY_COLOR,
})

export const ResetButton = Keyboard.textButton({
  label: 'К началу',
  payload: {
    button: 'restart',
  },
  color: Keyboard.SECONDARY_COLOR,
});
  
export const YesButton = Keyboard.textButton({
  label: 'Да',
  payload: {
    button: 'yes',
  },
  color: Keyboard.POSITIVE_COLOR,
});
  
export const NoButton = Keyboard.textButton({
  label: 'Нет',
  payload: {
    button: 'no',
  },
  color: Keyboard.NEGATIVE_COLOR,
});
  

// ADMIN


export const AddStationButton = Keyboard.textButton({
  label: 'Добавить станцию',
  payload: {
    button: 'add_station',
  },
  color: Keyboard.SECONDARY_COLOR,
});

export const SetTeamRouteButton = Keyboard.textButton({
  label: 'Задать маршрут команде',
  payload: {
    button: 'set_team_route',
  },
  color: Keyboard.SECONDARY_COLOR,
})

export const BroadcastRoutesButton = Keyboard.textButton({
  label: 'Рассылка маршрутов',
  payload: {
    button: 'broadcast_routes',
  },
  color: Keyboard.SECONDARY_COLOR,
})

export const ZookeeperBeginWorkButton = Keyboard.textButton({
  label: 'Приступить к работе',
  payload: {
    button: 'zookeeper_begin_work',
  },
  color: Keyboard.PRIMARY_COLOR,
})

export const ArrivedButton = Keyboard.textButton({
  label: 'Пришли',
  payload: {
    button: 'arrived',
  },
  color: Keyboard.POSITIVE_COLOR,
})

export const MissedButton = Keyboard.textButton({
  label: 'Не пришли',
  payload: {
    button: 'missed',
  },
  color: Keyboard.NEGATIVE_COLOR,
})

export const WellDoneButton = Keyboard.textButton({
  label: 'Справились',
  payload: {
    button: 'well_done',
  },
  color: Keyboard.POSITIVE_COLOR,
})

export const FailedButton = Keyboard.textButton({
  label: "Не справились",
  payload: {
    button: 'failed',
  },
  color: Keyboard.NEGATIVE_COLOR,
})