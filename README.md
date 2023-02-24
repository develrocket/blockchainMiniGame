# Diamonds_Blockchain_Mining_Script

This is a JavaScript-based project that allows users to contribute to a decentralized calculation process to mine a hash. The project uses web sockets to enable communication between clients and the server. The mining process is divided into small tasks that all clients can contribute to at the same time.

# How it works

When a user accesses the website, they can see a button with emoji. When clicked, the button starts the mining process, which is divided into small tasks. The tasks are assigned to clients that connect to the server via a web socket. Each client contributes to the calculation process until the hash is found.

<img width="599" alt="image" src="https://user-images.githubusercontent.com/91114967/221302185-8686493e-ace6-493b-899a-fcde9141fb90.png">

The mining process is initiated when the "mining" button is clicked. The mining process consists of a loop that generates a random number. This number is used to determine the number of small tasks that the mining process will be divided into. The loop then sends each small task to a client via a web socket connection.

Each client receives a small task from the server and computes a hash value. If the computed hash value starts with a certain number of zeros, the client sends the result back to the server, and the mining process ends.

# Technologies Used

This project was built using:

- JavaScript
- HTML
- CSS
- Node.js
- Express
- Socket.IO

# Mining
The script generates a random hash when it starts. The goal is to mine the next block by finding a hash that starts with a certain number of leading zeroes. The number of leading zeroes is determined by the difficulty level, which can be changed by the player. During this process the script generates random diamonds that the user can catch clicking on button "TAKE DIAMOND".

<img width="613" alt="image" src="https://user-images.githubusercontent.com/91114967/221302262-7ca48c79-f11c-4942-bfdf-cbdd5b82f3d7.png">

If the player finds a valid hash, the game generates a new random hash, and the player can start mining the next block.
When the player finds a valid hash, the server log a string that start with @.

<img width="523" alt="image" src="https://user-images.githubusercontent.com/91114967/221302794-4fb787c0-0354-4076-867c-df7876ba5ad2.png">

# Decentralized Calculation

This project enables decentralized calculation by allowing multiple clients to contribute to the mining process at the same time. The mining process is divided into small tasks that are assigned to clients via web socket connections. This approach allows for greater processing power, making it more efficient to mine the hash.
