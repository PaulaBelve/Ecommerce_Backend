const socket = io();

socket.on('products', (data) => console.log (data))