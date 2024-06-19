const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function drawCircle(x,y,c){
  ctx.strokeStyle = c
  ctx.fillStyle = c
  ctx.beginPath()
  // x, y, radius, start degree ,end degree
  ctx.arc(x,y,25,0,Math.PI * 2)
  ctx.fill()
}
function generateColor() {
   var r = Math.floor(Math.random() * 256);
   var g = Math.floor(Math.random() * 256);
   var b = Math.floor(Math.random() * 256);
   var rgb = "rgb(" + r + "," + g + "," + b + ")";
   return rgb;
}

for(let x=0; x < 30000;x++){
  const x = Math.random() * 3000
  const y = Math.random() * 3000
  drawCircle(x,y,generateColor())
}