
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup, ground
var score = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 500)
monkey = createSprite(50, 450, 10, 10)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(400, 450, 1000, 10)
  ground.velocityX = -4
  FoodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
background("white")
if(ground.x < 0){
   ground.x = ground.width/2
   }
if(keyDown("space")){
  monkey.velocityY = -10
}  
  monkey.velocityY = monkey.velocityY + 0.8
  spawnFood();
  spawnObstacles();
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 1
  }
  stroke("black");
textSize(20);
fill("black");
text("Score :" +score, 100,50);        
  
 if(obstaclesGroup.isTouching(monkey)){
ground.velocityX = 0;
monkey.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);
} 
 monkey.collide(ground); 
 drawSprites(); 
  
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(80,120));
    food.addImage(bananaImage);
    food.scale = 0.05;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
    //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(food);
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,420,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage (obstacleImage)
  
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}





