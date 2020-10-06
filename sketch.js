
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, survivaltime;
var ground,groundImage;
var invisible;
var invisibleGround;
var PLAY=1,END=0;
var RESTART,restartbutton, restartImg;
var gameState=PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(500,400);
  background('rgb(0,255,0)');
  

  ground = createSprite(250,370,1500,20);
  ground.velocityX=-6;
  ground.x = ground.width/2;
  ground.shapeColor="white";

  monkey=createSprite(80,380,20,20);
   monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  invisible=createSprite(250,200,500,7);
  invisible.visible=false;
   
   score=0;
   survivaltime=0;
  
  invisibleGround=createSprite(250,380,500,20);
  invisibleGround.visible=false;
  
  bananaGroup = createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background(220);

  monkey.collide(invisibleGround);
  monkey.collide(invisible);
  
  if(keyDown("space") && monkey.y>=390){
  monkey.velocityY=-12;
}
   monkey.velocityY=monkey.velocityY +0.8;

  if(monkey.isTouching(bananaGroup)){ 
    bananaGroup.destroyEach();
    score=score+1;}
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    gameState=END;}
  
  if(gameState===PLAY){
    if(keyDown("space") && monkey.y>=0){
      monkey.velocityY=-6;
  }
  food();
  drawobstacles();
    
  if(ground.x<0){
   ground.x=ground.width/2;
  }
  }
  
  if(gameState===END){
    fill("red");textSize(30);
    text("GAME OVER!!",150,230);
    monkey.x=1000;
    monkey.y=1000;
    monkey.velocityY=0;
    banana.velocityX=0;
    obstacleGroup.velocityX=0;
    ground.velocityX=0;
    survivaltime=0;
    obstacleGroup.setLifetimeEach();
    bananaGroup.setLifetimeEach();
    bananaGroup.destroyEach();

  }
  
  if(gameState===RESTART){
    monkey.x=80;
    monkey.y=420;
    monkey.velocityY=0;
    banana.velocityX=0;
    obstacleGroup.velocityX=0;
    ground.velocityX=0;
    survivaltime=0;
  }
  
  if(score===20){
  gameState=RESTART;}
  
  stroke("white");
  textSize(20);
  fill("black");
  text("score:"+score,300,50);
  
   stroke("white");
  textSize(20);
  fill("red");
  survivaltime= survivaltime+Math.ceil(frameRate()/60);
  text("Survival Time:"+survivaltime,300,20);

  createEdgeSprites();
  drawSprites();
}

function drawobstacles(){
  if(frameCount%200==0){
    obstacle=createSprite(480,355,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=150;
    obstacle.velocityX=-(6+score/10);
    obstacleGroup.add(obstacle);
  }}

function food(){
if(frameCount%80==0){
  banana=createSprite(480,random(260,250),20,20); 
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=150;
  banana.velocityX=-5;
  bananaGroup.add(banana);
   }
}

