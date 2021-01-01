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

app.get('/', (req, res) => {
  res.send('index');
});

// Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Server IO Connection
io.on('connection', (socket) => {
  console.log('New user joined');

  // Update Data
  socket.emit('updateData', tasks);

  socket.on('updateData', (localTasks) => {
    // Trzeba poprawić ... dubluje się ..
    localTasks.map((item) => tasks.push(item));
  });

  //   // Listener AddTask i RemoveTask
  socket.on('addTask', (taskName) => {
    socket.broadcast.emit('addTask', taskName);
  });

  socket.on('removeTask', (id) => {
    socket.broadcast.emit('removeTask', id);
  });
  //   console.log(taskId);
});

app.use((req, res) => {
  res.status(404).send({ message: 'Error 404 not found' });
});

// Server runing
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
