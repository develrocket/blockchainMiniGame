function startExecution() {
  //import { generateHash } from "./generateHash.js";
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

  getButton = document.querySelector("#generateHash");
  getButton.onclick = null;
}

function countDiamonds() {
  continueExecution = false;
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
