import {StateAppType} from "@/store/redux-store";


export const roomSelector = (state: StateAppType) => state.chat.room;
export const allRoomsSelector = (state: StateAppType) => state.chat.allRooms;
export const messagesFromOneRoomSelector = (state: StateAppType) => state.chat.messagesFromOneRoom;
export const statusSelector = (state: StateAppType) => state.chat.status;
export const createdSelector = (state: StateAppType) => state.chat.isCreated;