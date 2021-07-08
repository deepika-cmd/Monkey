                           //MONKEY RUN
var PLAY=0;
var END;
var gameState=PLAY;

var monkey,monkey_running,monkey_confuse;

var bananaImage; 

var rockImage;

var bananaGroup,obstacleGroup;

var cityD,cityDayImg,cityNightImg;

var ground,groundImg;

var gameover,gameoverImg;
var restart,restartImg,restartB;

var score;

function preload(){
  
 //Monkey Animation Loaded
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_confuse=loadAnimation("confusedMonkey.png");
  
  //Banana Image 
  bananaImage = loadImage("banana.png");
  
  //Rock Image
  rockImage = loadImage("obstacle.png");
  
  //City Image
  cityDayImg=loadImage("city_day.jpg");
  cityNightImg=loadImage("city_night.jpg")
  
  //Ground Image
  groundImg=loadImage("ground.png");
 
  //Images To Restart The Game
  gameoverImg=loadImage("gameover.png");
  restartImg=loadImage("restart.png");
}



function setup() {
  //Canvas Created
  createCanvas(400,250);
  
  //Monkey Created
  monkey=createSprite(100,225,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("confuse",monkey_confuse);
  monkey.scale=0.1;
  monkey.debug=false;

  //Invisible Ground Created
  ground=createSprite(200,250,10,10);
  ground.addImage(groundImg);
  ground.scale=0.3;
  ground.visible=false;
  
  //Groups Created
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  //City Created
  cityD=createSprite(200,50,10,10);
  cityD.addImage("day",cityDayImg);
  cityD.addImage("night",cityNightImg);
  cityD.scale=3;
  //Depth given so monkey appears over the background image
  cityD.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  //Gameover Text Created
  gameover=createSprite(210,80,10,10);
  gameover.addImage(gameoverImg);
  gameover.scale=0.5;
  
  //Restart Icon Created
  restart=createSprite(210,130,10,10);
  restart.addImage(restartImg);
  restart.scale=0.1;
  
  //Invisible Restart Icon Created
  restartB=createSprite(210,130,35,35);
  restartB.visible=false;
  
  //Score created
  score=0;
}

function draw() {
  
  //Background created
  background(100)
  
  //GameState given ===PLAY
  if(gameState===PLAY){
    gameover.visible=false;
    restart.visible=false;
  
    //Changing speed of background with increasing score
    cityD.velocityX=-(6+(score/3));
    
    //Moving background
    if (cityD.x <-80){
    cityD.x = cityD.width/2;
    }
    
    //Monkey Jump
    if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -15;
    }
    
    //Banana & Rocks Spawned
    spawnBanana();
    spawnRock();
    
    //Gravity added to the monkey
    monkey.velocityY=monkey.velocityY + 0.8;
    
    //Giving Scores
    if(monkey.isTouching(bananaGroup)){
      score=score+1;
      bananaGroup.destroyEach();
    }
    
    //Ending Game
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
    
    //Changing background to night as score increases
    if(score>=10){
      cityD.changeImage("night",cityNightImg);
      cityD.scale=3;
    }
    
  }
  //GameState given === END
  else if(gameState===END){
    
    //City & Monkey velocity= 0
    cityD.velocityX=0;
    monkey.velocityY=0;
    
    //Reatart Icon= Visible
    restart.visible=true;
    gameover.visible=true;
    
    //Animation change to confuse
    monkey.changeAnimation("confuse",monkey_confuse);
    monkey.scale=0.3;
    
    //bananaGroup & obstacleGroup velocity=0
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    //bananaGroup & obstacleGroup= never destroy 
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    //Restarting Game
    if(mousePressedOver(restartB)){
      reset();
    }
  }
  
  //Monkey Collide with ground
  monkey.collide(ground);
  
  drawSprites();
  
  //Score text added
  textSize(20);
  fill("black");
  text("SURVIVAL TIME: "+score,120,30);
}

function reset(){
  
  //RESTARTING
  gameState=PLAY;
  
  cityD.changeImage("day",cityDayImg)
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  score=0;
  
  monkey.changeAnimation("running",monkey_running);
  monkey.scale=0.1;
}

function spawnBanana(){
  
  //Creating Banana
  if(World.frameCount%60===0){
    var banana=createSprite(405,90,10,10);
    banana.addImage(bananaImage);
    //giving random positions
    banana.y=Math.round(random(60,125));
    banana.scale=0.07;
    //setting velocity to increase with score
    banana.velocityX=-(6+(score/3));
    banana.lifetime=100;
    banana.depth=restart.depth;
    restart.depth=restart.depth+1;
    
    //setting collider
    banana.debug=false;
    banana.setCollider("rectangle",0,0,400,250);
  
    //banana added to group
    bananaGroup.add(banana);
  }
}

function spawnRock(){
  
  //Creating Rock
  if(World.frameCount%100===0){
    var rock=createSprite(415,225,20,20);
    rock.addImage(rockImage);
    rock.scale=0.1;
    //setting velocity to increase with score
    rock.velocityX=-(9+(score/4));
    rock.lifetime=100;
    
    //setting collider
    rock.debug=false;
    rock.setCollider("rectangle",0,0,500,385);
    
    //rock added to group
    obstacleGroup.add(rock);
  }  
}    