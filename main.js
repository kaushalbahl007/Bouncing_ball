const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
//Modelling a ball in our program.
//lots of ball bouncing around a screen.since ball behave  as a same way
//its makes sence to represent ball wiith a object.
//so we make a constructor of the object 


function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    
}
/* so we make constructor for the ball ,we want ther ball do something
for this we need to add method on it ,
so we add method on Ball()`s prototypes */

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};
/* updating the balls data */
/* so we need to update fumction of some kind , add update()  method to the ball() prototypes*/
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width){
        this.velX = -(this.velX);
     }
    if ((this.x - this.size) <= 0) {
        this.velX= -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y- this.size) <= 0) {
        this.velY = -(this.velY);
     }
    this.x += this.velX;
    this.y += this.velY;
 }
 /**
  animating the ball 
  first we need to store all ball then bopullate
  for following do , add it to the bottom of your code 
  */
let balls = [];
while (balls.length <200) {
    let size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 225) + ',' + random(0, 225) + ',' + random(0, 225) + ')',
        size
    );
    balls.push(ball);
}
// define collision detection 
Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

function loop(){
    ctx.fillStyle = 'rgb(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
        
    }
    requestAnimationFrame(loop);
}
loop();

/*Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}
balls[i].collisionDetect(); */