var background2, background2Img
var warrior1, warrior1Img
var warrior2, warrior2Img
var dagger,  daggerImg
var enemy, enemyImg
var invisibleGround2
var wall
var goldImg
var crownImg
var castle,castleImg
var invisibleCastle
var level2Score=0
var level2Death=0
var treasure
var END2=0
var PLAY2=1
var WIN2=2

var gameState=PLAY2

function preload(){
    enemyImg=loadImage("LEVEL2Img/enemy.png")
    daggerImg=loadImage("LEVEL2Img/knfe.png")
    warrior1Img=loadAnimation("LEVEL2Img/warrior2.png","LEVEL2Img/warrior1.png")
    warrior2Img=loadImage("LEVEL2Img/warrior1.png")
    goldImg=loadImage("LEVEL2Img/treasure1.png")
    crownImg=loadImage("LEVEL2Img/crown.png")
    background2Img=loadImage("LEVEL2Img/bg.jpg")
    castleImg=loadImage("LEVEL2Img/castle.png")
}
function setup(){
    createCanvas(1300,400)
    background2=createSprite(860,100,20,20)
  // background2.scale=0.1
    

warrior1=createSprite(240,240,20,20)
warrior1.addAnimation("walk",warrior1Img)
warrior1.scale=0.3
    warrior2=createSprite(240,240,20,20)
    warrior2.addImage(warrior2Img)
    warrior2.scale=0.3

    level2Death=0
    level2Score=0
    treasureGroup=new Group()
    enemyGroup=new Group()
    daggerGroup=new Group()
    invisibleCastleGroup=new Group()
}
function draw(){
    background(0)
    if(gameState===PLAY2){  
    levelTwo()
    spawnTreasure()
    spawnEnemy()
    if (daggerGroup.isTouching(enemyGroup)) {
      for(var k=0;k<enemyGroup.length;k++){
      if(enemyGroup.contains(enemyGroup.get(k))){
      if(daggerGroup.isTouching(enemyGroup.get(k))){
      enemyGroup.get(k).destroy();
      level2Score=level2Score+5
      }}}}
      if (enemyGroup.isTouching(daggerGroup)) {
        for(var k=0;k<daggerGroup.length;k++){
        if(daggerGroup.contains(daggerGroup.get(k))){
        if(enemyGroup.isTouching(daggerGroup.get(k))){
        daggerGroup.get(k).destroy();
        level2Score=level2Score+5
        }}}}
        if (wall.isTouching(enemyGroup)) {
          for(var k=0;k<enemyGroup.length;k++){
          if(enemyGroup.contains(enemyGroup.get(k))){
          if(wall.isTouching(enemyGroup.get(k))){
          enemyGroup.get(k).destroy();
          level2Death=level2Death+1
          }}}}
        if(warrior1.isTouching(invisibleCastleGroup)){
          gameState=WIN2
        }
        
        enemyGroup.collide(wall)

        if(frameCount%2000===0){
          castle=createSprite(1000,200,20,20)
          castle.addImage(castleImg)
          castle.scale=0.7
          castle.velocityX=-4
          invisibleCastle=createSprite(1000,250,20,20)
          invisibleCastle.velocityX=-4
          invisibleCastleGroup.add(invisibleCastle)
        }
  
       if(level2Death===1){
         gameState=END2
       }
        
      
    if(keyDown(RIGHT_ARROW)){
      createDagger()
    }
  }else if(gameState===END2){
   daggerGroup.destroyEach()
   treasureGroup.destroyEach()
  // wall.destroy()
   background2.velocityX=0
   if(keyDown("R")){
    restart2();
    
  enemyGroup.destroyEach()
 }
  }else if(gameState===WIN2){
    background2.velocityX=0
    wall.destroy()
    daggerGroup.destroyEach()
   treasureGroup.destroyEach()

  }
drawSprites()
textSize(20);
fill("GREEN");
text("TREASURE: "+ level2Score,250,30);

textSize(20);
fill("RED");
text("DEATH: "+ level2Death,150,30);
  
if(gameState===END2){
  textSize(40);
fill("RED");
text(" YOU LOST",400,200);
}
if(gameState===WIN2){
  textSize(40);
fill("green");
text(" YOU WIN",400,200);
}
}
function levelTwo(){
    
    background2.addImage(background2Img)
    background2.velocityX=-4
    if(background2.x < 300 )
  {
    background2.x = width/2;
  }
  invisibleGround2=createSprite(200,350,200,20)
  warrior2.collide(invisibleGround2)
  warrior1.visible=true
  warrior2.visible=false
  warrior2.velocityY = warrior2.velocityY + 0.8
  warrior1.y=warrior2.y
  invisibleGround2.visible=false
  wall=createSprite(500,200,20,400)
  if (keyDown(UP_ARROW)){
     warrior2.visible=true
   
    warrior1.visible=false
     warrior2.velocityY=-5
   }  
}
function restart2(){
  gameState=PLAY2
  background2.velocityX=-4
  level2Death=0
  level2Score=0
  

}
function spawnTreasure(){
  if (frameCount % 100 === 0) {
    treasure=createSprite(1300,50,20,20)
    treasure.velocityX=-7
    treasure.scale=0.3
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: treasure.addImage(crownImg);
      treasure.scale=0.2
              break;
      case 2:treasure.addImage(goldImg);
      treasure.scale=0.2
              break;
      default: break;
    }
  treasureGroup.add(treasure)
}
if (warrior1.isTouching(treasureGroup)||(warrior2.isTouching(treasureGroup))) {
  for(var k=0;k<treasureGroup.length;k++){
  if(treasureGroup.contains(treasureGroup.get(k))){
  if(warrior1.isTouching(treasureGroup.get(k))||(warrior2.isTouching(treasureGroup.get(k)))){
  treasureGroup.get(k).destroy();
  level2Score=level2Score+1
    } } }}
}
function spawnEnemy(){
  if (frameCount%200===0){
    enemy=createSprite(1300,250,20,20)
   enemy.y = Math.round(random(60, 280))
    enemy.addImage(enemyImg)
    enemy.scale=0.6
    enemy.velocityX=-5
    enemyGroup.add(enemy)
}

}
function createDagger(){
  var dagger = createSprite(200, 200, 60, 10);
  dagger.addImage(daggerImg);
  //dagger.x = 360;
  dagger.y = warrior2.y;
  
  dagger.velocityX = 4;
 // dagger.lifetime = 100;
  dagger.scale = 0.2;
  daggerGroup.add(dagger);

}

