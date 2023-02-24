function startExecution() {
  const data = [];
  const socket = new WebSocket("ws://localhost:3000");

  socket.addEventListener("open", (event) => {
    console.log("WebSocket connection opened");
  });

  socket.addEventListener("message", (event) => {
    array = JSON.parse(event.data);
    console.log(array);
    generateHash(array);
  });

  function sendMessage(message) {
    socket.send(JSON.stringify(message));
  }

  const diamonds = document.querySelectorAll(".diamond");

  function showRandomDiamonds() {
    const numDiamonds = Math.floor(Math.random() * 13) + 1;
    let i = 0;
    while (i < numDiamonds) {
      diamonds[i].style.visibility = "visible";
      i++;
    }
  }

  function hideInputAndButton() {
    const button = document.getElementById("generateHash");
    button.style.display = "visible";
  }

  async function generateHash(array) {
    const countMax = array[0];
    const hash = array[1];
    document.querySelector("#progress").style.visibility = "visible";
    console.log(hash);
    const leadingZeros = 4;
    hideInputAndButton();
    const verifiedHash = await verifyHash(hash, leadingZeros, countMax);
  }

  let continueExecution = true;

  async function verifyHash(hash, leadingZeros, count) {
    const progressBar = document.getElementById("bar");
    progressBar.style.width = "0%";
    let diamondIndex = 0;
    countMax = Number(count) + 10000;
    console.log(countMax);
    while (
      count <= countMax &&
      hash.slice(0, leadingZeros) !== "0".repeat(leadingZeros)
    ) {
      if (!continueExecution) {
        console.log("Execution stopped.");
        break;
      }
      const data = `${hash}${count}`;
      hash = await sha256(data);
      progressBar.style.width = `${(count / countMax) * 100}%`;
      count++;
    }

    showRandomDiamonds();

    const dataToServer = [count - 1, hash];
    sendMessage(dataToServer);
    document.querySelector("#progress").style.visibility = "hidden";
    document.querySelector("#takeDiamonds").style.visibility = "visible";
  }

  async function sha256(str) {
    // Convert the string to a byte array
    const buffer = new TextEncoder().encode(str);
    // Calculate the hash of the byte array
    const hash = await crypto.subtle.digest("SHA-256", buffer);
    // Convert the hash to a hexadecimal string
    return hex(hash);
  }

  function hex(buffer) {
    // Convert the buffer to a hexadecimal string
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
      const value = view.getUint32(i);
      const stringValue = value.toString(16);
      const padding = "00000000";
      const paddedValue = (padding + stringValue).slice(-padding.length);
      hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
  }

  //return `${count - 1}: ${hash}`;
  function postArray(i, hash) {
    const array = [i, hash];
    console.log(array);
    const url = "http://localhost:8080/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(array),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  getButton = document.querySelector("#generateHash");
  getButton.onclick = null;
}

function stopExecution() {
  continueExecution = false;
}

function countDiamonds() {
  stopExecution();
  const diamonds = document.querySelectorAll(".diamond");
  let visibleCount = 0;

  // Count the visible diamonds
  for (let i = 0; i < diamonds.length; i++) {
    if (
      getComputedStyle(diamonds[i]).getPropertyValue("visibility") !== "hidden"
    ) {
      visibleCount++;
    }
    diamonds[i].style.visibility = "hidden";
  }

  // Display the number of diamonds earned
  const getButton = document.querySelector("#takeDiamonds");
  getButton.textContent = `YOU EARNED ${visibleCount} DIAMOND!`;

  // Disable the button onclick attribute
  getButton.onclick = null;
  location.reload();
}
