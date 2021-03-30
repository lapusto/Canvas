const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
let clear = document.getElementById("clear");
let random = document.getElementById("random");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#C0FFEE";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 80;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function randomDraw(e) {
  if (!isDrawing) return;
  if (!random.checked) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

function draw(e) {
  if (!isDrawing) return;
  if (random.checked) return;
  ctx.strokeStyle = document.getElementById("color").value;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.lineWidth = document.getElementById("size").value;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

clear.onclick = function () {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
};

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", randomDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
