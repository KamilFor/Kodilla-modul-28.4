// Basic imports
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
// Import server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Global Variables
const tasks = [];

// Static Folder
app.use(express.static(path.join(__dirname, 'client')));

app.use((req, res) => {
  res.status(404).send({ message: 'Error 404 not found' });
});

// Server IO Connection
io.on('connection', (socket) => {
  console.log('New user joined');
  // Emit UpdateData
  socket.emit('updateData', tasks);
  // Listener AddTask i RemoveTask
  socket.on('addTask', { taskName, eventTask });
  socket.on('removeTask', { taskId, eventTask });
});

// Server runing
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
