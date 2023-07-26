const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const request = require('request');

// Serve the web interface
app.use(express.static('public'));

// Handle incoming connections from clients (web interface)
io.on('connection', socket => {
  console.log('Client connected');

  // Handle incoming data from clients (web interface)
  socket.on('data', data => {
    console.log('Received data:', data);

    // Send the data to the smart device(s)
    request.post({
      url: 'http://localhost:3001/data',
      body: data,
      json: true
    }, (error, response, body) => {
      if (error) {
        console.error('Error sending data:', error);
      } else {
        console.log('Data sent successfully:', body);
      }
    });
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Smart device code
const smartDeviceServer = require('http').createServer();
const smartDeviceIo = require('socket.io')(smartDeviceServer);

// Handle incoming connections from clients (server)
smartDeviceIo.on('connection', socket => {
  console.log('Server connected');

  // Handle incoming data from clients (server)
  socket.on('data', data => {
    console.log('Received data:', data);

    // Process the data (in this case, simulate a heartbeat)
    const heartbeat = Math.floor(Math.random() * 60) + 40; // simulate a heartbeat between 40 and 100 bpm

    // Send the processed data back to the server
    socket.emit('data', { heartbeat });
  });
});

// Start the smart device server
smartDeviceServer.listen(3001, () => {
  console.log('Smart device running on port 3001');
});