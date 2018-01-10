const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
// //color for rectangle
// c.fillStyle = 'rgba(255, 0, 0, 0.1)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(255, 255, 0, 0.1)';
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = 'rgba(255, 0, 255, 0.1)';
// c.fillRect(0, 0, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.1)';
// c.fillRect(300, 300, 300, 100);

// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// //add color
// c.strokeStyle = 'blue';
// c.stroke();

//Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'red';
// c.stroke();

// for(let i = 0; i < 30; i++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);
//   c.beginPath();
//   c.arc(x, y, 30, 1, Math.PI * 1.4, false);
//   console.log(`rgb(${r}, ${g}, ${b})`);
//   c.strokeStyle = `rgb(${r}, ${g}, ${b})`;
//   c.stroke();
// }
const mouse = {
  x: undefined,
  y: undefined,
}

const maxRadius = 40;
const minRadius = 1;
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius, r, g, b) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.r = r;
  this.g = g;
  this.b = b;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = `white`;
    c.stroke();
    c.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, .4)`;
    c.fill();
  }

  this.update = function() {
    if((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
      this.dx = -this.dx;
    }
    if(this.y+ this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //inactivity
    if(mouse.x - this.x < 50
      && mouse.x - this.x > -50
      && mouse.y - this.y < 50
      && mouse.y - this.y >-50) {
        if(this.radius < maxRadius) {
          this.radius += 1;
        }
    } else if(this.radius > this.minRadius){
      this.radius -= 1;
    }
    this.draw();
  }
}





let circleArray = [];
function init() {

  circleArray = [];
  for (let i = 0; i < 500; i++) {
    const radius = Math.floor(Math.random() * 10 + 1);
    //keep circles from getting caught on edges of screen
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;

    const dy = (Math.random() - 0.5) * 3;
    const dx = (Math.random() - 0.5) * 3;
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
  }
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

init();
animate();
