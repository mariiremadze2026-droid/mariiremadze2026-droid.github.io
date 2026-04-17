const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let keys = {};
let bullets = [];
let enemies = [];
let kills = 0;

document.addEventListener("keydown",(e)=>keys[e.key]=true);
document.addEventListener("keyup",(e)=>keys[e.key]=false);

let player = new Player();

for(let i=0;i<5;i++){
  enemies.push(new Enemy());
}

function update(){
  player.update();

  bullets.forEach(b=>b.update());
  enemies.forEach(e=>e.update(player));

  // collision bullet -> enemy
  bullets.forEach(b=>{
    enemies.forEach(e=>{
      if(dist(b,e)<20){
        e.hp -= 50;
        b.dead = true;

        if(e.hp<=0){
          kills++;
          e.respawn();
        }
      }
    });
  });

  bullets = bullets.filter(b=>!b.dead);

  document.getElementById("kills").innerText = kills;
  document.getElementById("hp").innerText = player.hp;
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  player.draw(ctx);
  bullets.forEach(b=>b.draw(ctx));
  enemies.forEach(e=>e.draw(ctx));
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

function dist(a,b){
  return Math.hypot(a.x-b.x,a.y-b.y);
}

// shooting
document.addEventListener("click",()=>{
  bullets.push(new Bullet(player.x,player.y,player.angle));
});

loop();