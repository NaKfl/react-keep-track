import { WEB_SOCKET } from 'configs';
import io from 'socket.io-client';

const socket = io(WEB_SOCKET);

export default socket;
