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
The verifyHash() function is the main function of the script that performs the actual mining of the hash. The function takes three arguments, hash, leadingZeros, and count. The hash argument is the initial hash that needs to be mined, leadingZeros is the number of zeros that need to be present at the beginning of the hash, and count is the number of calculations that need to be performed to mine the hash.

The function initializes the progress bar and calculates the maximum number of calculations that need to be performed based on the count argument. Then, the function enters a loop that continues until either the hash has the required number of leading zeros or the maximum number of calculations has been reached.

The loop performs a calculation by concatenating the hash with the current count and hashing the resulting data using the sha256() function. The progress bar is updated with the progress of the mining.

When the hash has been mined, the showRandomDiamonds() function is called to display a random number of diamonds on the screen. The function sends the calculated hash and the number of calculations performed to the server using the sendMessage() function, which sends the data to the server via web sockets. Finally, the takeDiamonds button is made visible, and the progress bar is hidden.

Overall, the verifyHash() function is an essential part of the script that performs the actual mining of the hash. It takes three arguments, initializes the progress bar, and updates it as the mining progresses.

<img width="613" alt="image" src="https://user-images.githubusercontent.com/91114967/221302262-7ca48c79-f11c-4942-bfdf-cbdd5b82f3d7.png">

If the player finds a valid hash, the game generates a new random hash, and the player can start mining the next block.
When the player finds a valid hash, the server log a string that start with @.

<img width="523" alt="image" src="https://user-images.githubusercontent.com/91114967/221302794-4fb787c0-0354-4076-867c-df7876ba5ad2.png">

# Decentralized Calculation

This project enables decentralized calculation by allowing multiple clients to contribute to the mining process at the same time. The mining process is divided into small tasks that are assigned to clients via web socket connections. This approach allows for greater processing power, making it more efficient to mine the hash.
