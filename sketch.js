var player,playerImg;
var ground,groundImg;
var zombie,zombie1mg1,zombieImg2;
var zombieGroup;
var edges;
var heartImg1,heartImg2,heartImg3;
var heart1,heart2,heart3;
var bullets = 70;
var life = 3;
var score = 0;
var bulletGroup,bullet,bulletImg;
var gameState = "fight";
var gameOverSound,bulletSound;

function preload(){
  playerImg = loadAnimation("images/p1.png", "images/p2.png","images/p3.png","images/p4.png",);
  groundImg=loadImage("images/background.jpg");
  zombieImg1 = loadImage("images/zombie1.png");
  zombieImg2 = loadImage("images/zombie2.png");
  heartImg1 = loadImage("images/heart1.png");
  heartImg2 = loadImage("images/heart2.png");
  heartImg3 = loadImage("images/heart3.png");
  bulletImg = loadImage("images/bullet.png");
  gameOverSound = loadSound("gameOver.mp3");
  bulletSound = loadSound("bulletSound.mp3");
}

function setup() {
  createCanvas(800,400);
  ground = createSprite(400,200,800,400);
  ground.addImage(groundImg);
  ground.velocityX = -8;
  ground.scale = 1.5;

  player=createSprite(200, 280, 50, 50);
  player.addAnimation("running",playerImg);
  player.scale=0.5
  //player.debug = true;

  heart1 = createSprite(640,40,20,20);
  heart1.visible=false;
  heart1.addImage("heart1",heartImg1);
  heart1.scale = 0.2;

  heart2 = createSprite(620,40,20,20);
  heart2.visible=false;
  heart2.addImage("heart2",heartImg2);
  heart2.scale = 0.2;

  heart3= createSprite(600,40,20,20);
  heart3.visible=true;
  heart3.addImage("heart3",heartImg3);
  heart3.scale = 0.2;

  bulletGroup = new Group();
  zombieGroup = new Group();
  edges = createEdgeSprites();

}

function draw() {
  background(0);  
  if(gameState === "fight")
 { 
   if(life ===3){
     heart3.visible=true;
     heart1.visible=false;
     heart2.visible=false;
   }

   if(life ===2){
    heart3.visible=false;
    heart1.visible=false;
    heart2.visible=true;
  }

  if(life ===1){
    heart3.visible=false;
    heart1.visible=true;
    heart2.visible=false;
  }

  if(life ===0){
    gameState = "lost";
  }
  if(score ===100){
    gameState = "won";
  }

  if(ground.x<300){
    ground.x = 400;
  }
  if(keyWentDown("space")) {
    bulletSound.play();
    bullet = createSprite(player.x +140,player.y-40,50,50);
    bullet.addImage(bulletImg);
    bullet.velocityX = 20;
    bullet.scale = 0.2;
    bulletGroup.add(bullet);
    bullets =  bullets-1;

  }
  if(bullets==0){
    gameState="bullet";
  }
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        score = score+10;
      }
    }
  }
  if(zombieGroup.isTouching(player)){
    for(var i =0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life = life-1;
      }
    }
  }

  
  spawnZombies();
}
  drawSprites();
  textSize(20);
  fill("white");
  text("Score: "+score,700,40);
  text("Lifes: "+life,700,80);

  if(gameState == "lost"){
    gameOverSound.play();
    textSize(50);
    fill("yellow");
    stroke("red");
    text("Game Over",300,200);
    zombieGroup.destroyEach();
    player.destory();
  }
  else if(gameState == "won"){
    textSize(50);
    fill("yellow");
    stroke("green");
    text("You Won",300,200);
    zombieGroup.destroyEach();
    player.destory();
  }
  else if (gameState =="bullet"){
    textSize(50);
    fill("yellow");
    stroke("black");
    text("You ran out of bullets",200,200);
    zombieGroup.destroyEach();
    player.destory();
    bulletGroup.destroyEach();
  }
  
}



function spawnZombies() {
  if(frameCount%200===0){
    zombie =  createSprite(850,290,50,50);
    zombie.velocityX = -6;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1 : zombie.addImage(zombieImg1);
      break;
      case 2 : zombie.addImage(zombieImg2);
      break;
      default:break;
    }
    zombie.scale = 0.8;
    zombie.lifetime = 800;
    zombieGroup.add(zombie);
    //zombie.debug = true;
    zombie.setCollider("rectangle",0,0,50,200);
  }
}

