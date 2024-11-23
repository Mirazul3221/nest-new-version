// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let clients = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  clients.push(socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    clients = clients.filter(id => id !== socket.id);
  });

  socket.on('offer', (offer, to) => {
    io.to(to).emit('offer', offer, socket.id);
  });

  socket.on('answer', (answer, to) => {
    io.to(to).emit('answer', answer, socket.id);
  });

  socket.on('ice-candidate', (candidate, to) => {
    io.to(to).emit('ice-candidate', candidate, socket.id);
  });
});

server.listen(5000, () => {
  console.log('Signaling server running on http://localhost:5000');
});
