import { User } from '@prisma/client';
import { timeStamp } from 'console';
import { KeyboardBuilder } from 'vk-io';
import Prisma from '../Prisma';
import Vk from '../Vk';
import { handleTeamRoutesBroadcast } from './admin/broadcast';
import { handleSetTeamRoute, handleSetTeamRouteName } from './admin/routes';
import { handleAddStation } from './admin/stations';
import { handleHelpMe, initHelpMe } from './help_me';
import { handleJoinTeamCode } from './join_team';
import { HelpMeButton } from './keyboard/buttons';
import { handleJoinLegionaries, handleJoinLegionariesDate, handleJoinLegionariesPhone } from './legionaries';
import handleInitial, { handleConfirmLeaving } from './main';
import { handleNewTeamDate, handleNewTeamLegionaries, handleNewTeamName, handleNewTeamPhone } from './new_team';
import handlePreInitial from './welcome';
import { handleZookeeperNextTeam, handleZookeeperRecord, handleZookeperChooseStation } from './zookeeper/flow';

const MAX_RANDOM_ID = 2 ** 32 - 1;

const botHandlers: Record<string, (req: BotRequest) => void> = {
  '': handlePreInitial,
  INITIAL: handleInitial,
  'HELP_ME': handleHelpMe,
  'NEW_TEAM/NAME': handleNewTeamName,
  'NEW_TEAM/PHONE': handleNewTeamPhone,
  'NEW_TEAM/LEGIONARIES': handleNewTeamLegionaries,
  'NEW_TEAM/DATE': handleNewTeamDate,
  'JOIN_TEAM/CODE': handleJoinTeamCode,
  'JOIN_LEGIONARIES': handleJoinLegionaries,
  'JOIN_LEGIONARIES/PHONE': handleJoinLegionariesPhone,
  'JOIN_LEGIONARIES/DATE': handleJoinLegionariesDate,
  'LEAVE_TEAM/CONFIRMATION': handleConfirmLeaving,
  'ADMIN/TEAM_ROUTES_BROADCAST': handleTeamRoutesBroadcast,
  'ADMIN/SET_TEAM_ROUTE/NAME': handleSetTeamRouteName, 
  'ADMIN/SET_TEAM_ROUTE': handleSetTeamRoute,
  'ADMIN/ADD_STATION': handleAddStation,
  'ZOOKEEPER/CHOOSE_STATION': handleZookeperChooseStation,
  'ZOOKEEPER/WORK': handleZookeeperRecord,
};

export type BotRequest = {
  groupID: number,
  peerID: number,
  user: User,
  message: string,
  payload: Record<string, any>,
}

const Bot = {
  groupID: 0,
  setGroupID(groupID: number) {
    this.groupID = groupID;
  },

  async handleMessage(req: BotRequest) {
    if(req.payload?.button === 'help_me') {
      await initHelpMe(req)
      return;
    }

    if(this.groupID === 0) {
      this.setGroupID(req.groupID);
    }

    await botHandlers[req.user.botState](req);
  },

  async forward(state: string, req: BotRequest){
    await this.changeState(req.user, state)
    req.user.botState = state;
    await this.handleMessage(req)
  },

  async sendMessage(user: User,  keyboard: KeyboardBuilder, message: string) {
    await Vk.api.messages.send({
      random_id: Math.random() * MAX_RANDOM_ID,
      group_id: this.groupID,
      user_id: parseInt(user.vkId, 10),
      keyboard: keyboard,
      message: message,
    })
  },

  async broadcastMessage(userIds: string[], keyboard: KeyboardBuilder, message: string) {
    await Vk.api.messages.send({
      random_id: Math.random() * MAX_RANDOM_ID,
      group_id: this.groupID,
      user_ids: userIds.map(i => parseInt(i, 10)),
      keyboard: keyboard,
      message: message,
    })
  },

  async changeState(user: User, newState: string, newData?: Record<string, any>) {
    await Prisma.user.update({
      where: {
        vkId: user.vkId,
      },
      data: {
        botState: newState,
        botData: newData
      },
    });
  }
}

export default Bot;