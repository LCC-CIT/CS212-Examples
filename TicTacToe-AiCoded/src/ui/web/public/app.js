let gameId = null;
let state = null;

const statusEl = document.getElementById("status");
const errorEl = document.getElementById("error");
const boardEl = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");

function statusText(currentState) {
  if (currentState.status === "WIN") {
    return `Winner: ${currentState.winner}`;
  }

  if (currentState.status === "DRAW") {
    return "Draw game";
  }

  return `Current turn: ${currentState.currentPlayer}`;
}

function render() {
  if (!state) {
    return;
  }

  statusEl.textContent = statusText(state);
  boardEl.innerHTML = "";

  state.board.forEach((value, index) => {
    const button = document.createElement("button");
    button.className = "cell";
    button.textContent = value ?? "";
    button.disabled = value !== null || state.status !== "IN_PROGRESS";
    button.addEventListener("click", () => makeMove(index));
    boardEl.appendChild(button);
  });
}

async function createGame() {
  errorEl.textContent = "";
  const response = await fetch("/api/games", { method: "POST" });
  const payload = await response.json();
  gameId = payload.id;
  state = payload.state;
  render();
}

async function makeMove(index) {
  errorEl.textContent = "";

  const response = await fetch(`/api/games/${gameId}/moves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index }),
  });

  const payload = await response.json();
  if (!response.ok) {
    errorEl.textContent = payload.error || "Move failed";
    if (payload.state) {
      state = payload.state;
      render();
    }
    return;
  }

  state = payload.state;
  render();
}

async function resetGame() {
  if (!gameId) {
    return;
  }

  errorEl.textContent = "";
  const response = await fetch(`/api/games/${gameId}/reset`, { method: "POST" });
  const payload = await response.json();

  if (!response.ok) {
    errorEl.textContent = payload.error || "Reset failed";
    return;
  }

  state = payload.state;
  render();
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", createGame);

createGame().catch((error) => {
  errorEl.textContent = error.message;
});
