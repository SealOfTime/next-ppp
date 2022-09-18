import { User } from '@prisma/client';
import { timeStamp } from 'console';
import { KeyboardBuilder } from 'vk-io';
import Prisma from '../Prisma';
import Vk from '../Vk';
import { handleJoinTeamCode } from './join_team';
import handleInitial, { handleConfirmLeaving } from './main';
import { handleNewTeamDate, handleNewTeamLegionaries, handleNewTeamName, handleNewTeamPhone } from './new_team';
import handlePreInitial from './welcome';

const MAX_RANDOM_ID = 2 ** 32 - 1;

const botHandlers: Record<string, (req: BotRequest) => void> = {
  '': handlePreInitial,
  INITIAL: handleInitial,
  'NEW_TEAM/NAME': handleNewTeamName,
  'NEW_TEAM/PHONE': handleNewTeamPhone,
  'NEW_TEAM/LEGIONARIES': handleNewTeamLegionaries,
  'NEW_TEAM/DATE': handleNewTeamDate,
  'JOIN_TEAM/CODE': handleJoinTeamCode,
  'LEAVE_TEAM/CONFIRMATION': handleConfirmLeaving,
};

export type BotRequest = {
  groupID: number,
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