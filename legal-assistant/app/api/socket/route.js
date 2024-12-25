import { Server } from 'socket.io';

let io;

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req, res) => {
  if (req.method === 'GET') {
    if (!io) {
      io = new Server(res.socket.server);
      io.on('connection', (socket) => {
        console.log('a user connected');
        
        socket.on('message', (data) => {
          io.emit('newMessage', data);  // Emit to all connected clients
        });
        
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    }
    res.end();
  }
};

export default handler;
