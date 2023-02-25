const socket = new WebSocket("ws://localhost:3000");

async function generateHash(array) {
  const countMax = array[0];
  const hash = array[1];
  document.querySelector("#progress").style.visibility = "visible";
  console.log(hash);
  const leadingZeros = 4;
  hideElement("generateHash");
  await verifyHash(hash, leadingZeros, countMax);
}

function hideElement(id) {
  const button = document.getElementById(id);
  button.style.display = "visible";
}

async function verifyHash(hash, leadingZeros, count) {
  let continueExecution = true;
  const progressBar = document.getElementById("bar");
  progressBar.style.width = "0%";
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

function sendMessage(message) {
  socket.send(JSON.stringify(message));
}

function showRandomDiamonds() {
  const diamonds = document.querySelectorAll(".diamond");
  const numDiamonds = Math.floor(Math.random() * 13) + 1;
  let i = 0;
  while (i < numDiamonds) {
    diamonds[i].style.visibility = "visible";
    i++;
  }
}
