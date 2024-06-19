const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
const mouse = { x : 0,y : 0}
const partuclesArray = []


canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20

window.onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function setClickDmns(e){
  mouse.x = e.clientX
  mouse.y = e.clientY
  console.log(mouse)
}

function setMoveDmns(e) {
  mouse.x = e.clientX || e.touches[0].clientX
  mouse.y = e.clientY || e.touches[0].clientY
  console.log(mouse)
}

canvas.addEventListener('click',setClickDmns)
canvas.addEventListener('mousemove',setMoveDmns)
canvas.addEventListener('touchmove',setMoveDmns)

const random = () => Math.random()

function getColor() {
   var r = random() * 256
   var g = random() * 256
   var b = random() * 256
   var rgb = "rgb(" + r + "," + g + "," + b + ")"
   return rgb
}


class Particle {
  constructor(){
    this.x = random() * canvas.width
    this.y = random() * canvas.height
    this.size = random() * 15
    this.speedX = random() * 3 - 1.5
    this.speedY = random() * 3 - 1.5
  }
  update(){
    this.x += this.speedX
    this.y += this.speedY
  }
  draw(c = getColor()){
    ctx.fillStyle = c
    ctx.beginPath()
    // x, y, radius, start degree ,end degree
    ctx.arc(this.x, this.y,this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}


function initParticles(){
  for(let x = 0; x < 2000; x++){
    partuclesArray.push(new Particle())
  }
}

initParticles()

function setParticle(){
  for (let x = 0; x < partuclesArray.length; x++) {
    partuclesArray[x].update()
    partuclesArray[x].draw()
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  setParticle()
  requestAnimationFrame(animate)
}

animate()