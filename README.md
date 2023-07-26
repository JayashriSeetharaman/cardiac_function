# cardiac_function

This code sets up two servers: one for the web interface on port 3000, and one for the smart device on port 3001. It uses the express package to serve static files from the public directory, and the socket.io package to handle real-time communication between the clients (web interface) and the server, and between the server and the smart device.

When a client (web interface) connects to the server, the server logs a message to the console. When the client sends data to the server (in this case, the current heartbeat rate), the server sends the data to the smart device using the request package, and logs a message to the console indicating whether the data was sent successfully or if there was an error.

When the smart device receives data from the server, it processes the data (in this case, simulating a heartbeat rate between 40 and 100 bpm), and sends the processed data back to the smart device. The smart device then sends the data to the clients (web interface) using Socket.io, and updates the results on the page.

To display the heart function data to the user in HTML, you can create sample.html file in the public directory with the following contents

This code uses Socket.io to listen for incoming data from the server and updates the HTML document with the new data. The id attribute of the p element is used to select the element using document.querySelector(), and the textContent property is used to update the text of the element with the new heartbeat rate.

To run this code:

Create a new directory for your project
Open a terminal in that directory and run npm init to create a package.json file
Install the required packages by running npm install express socket.io request
Create a public directory in your project directory, and add an index.html file to it with the above contents
Run the server code by running node server.js in the terminal
Open a web browser and go to http://localhost:3000Simulate sending data from a smart device by clicking the button on the page, and see the updated heartbeat display on the page.
