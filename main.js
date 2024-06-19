const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
const mouse = { x : 0,y : 0}
const particlesArray = []
let hue = 0

canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20

window.onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function setClickDmns(e){
  mouse.x = e.clientX
  mouse.y = e.clientY
  initParticles()
}

function setMoveDmns(e) {
  mouse.x = e.clientX || e.touches[0].clientX
  mouse.y = e.clientY || e.touches[0].clientY
  initParticles()
}

canvas.addEventListener('click',setClickDmns)
canvas.addEventListener('mousemove',setMoveDmns)
canvas.addEventListener('touchmove',setMoveDmns)

const random = () => Math.random()

function getColor() {
  return 'hsl(' + hue + ',100%,50%)'
}


class Particle {
  constructor(){
    //this.x = random() * canvas.width
    //this.y = random() * canvas.height
    this.x = mouse.x
    this.y = mouse.y
    this.size = 10
    this.speedX = random() * 3 - 1.5
    this.speedY = random() * 3 - 1.5
    this.color = getColor()
  }
  update(){
    this.x += this.speedX
    this.y += this.speedY
    if(this.size > 0.2) this.size -= 0.1
  }
  draw(){
    ctx.fillStyle = this.color
    ctx.beginPath()
    // x, y, radius, start degree ,end degree
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}


function initParticles(){
  for(let x = 0; x < 10; x++){
    particlesArray.push(new Particle())
  }
}

function setParticle(){
  for (let x = 0; x < particlesArray.length; x++) {
    particlesArray[x].update()
    particlesArray[x].draw()
    
    for(let y = x; y < particlesArray.length; y++){
      const dx = particlesArray[x].x - particlesArray[y].x
      const dy = particlesArray[x].y - particlesArray[y].y
      const distance = Math.sqrt((dx * dx) + (dy * dy))
      if(distance < 50){
        ctx.beginPath()
        ctx.strokeStyle = particlesArray[x].color
        ctx.moveTo(particlesArray[x].x, particlesArray[x].y)
        ctx.lineTo(particlesArray[y].x, particlesArray[y].y)
        ctx.stroke()
      }
    }
    
    if(particlesArray[x].size < 0.3){
      particlesArray.splice(x,1)
      x--
    }
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  setParticle()
  hue += 1.5
  requestAnimationFrame(animate)
}

animate()