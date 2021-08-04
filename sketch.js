const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, wall1, wall2;

var jointLink1;
var stone1;

var box;

var stones = [];

var inv;

var stone11; 

var bridge, jointLink;

var bg;

var z1Img;

var zombie;

var breakButton;

var sad;

var collided =false;

function preload(){
 z1Img = loadImage("lib/zombie.png");
 bg = loadImage("lib/background.png");
 sad = loadImage("lib/sadZombie.png");
 //rock = loadImage("rock.png");

 //z1Img.playing = true;
 //sad.playing = true;
 //sad.looping = false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  

  ground = new base(200,400,100000,20);

  box = createSprite(700, 300, 800, 10);
  box.visible = false;

  zombie = createSprite(0, height - 110);
  zombie.addImage('walk',z1Img);
  zombie.addImage('sadly',sad);
  zombie.changeImage('walk');
  zombie.scale = 0.1;
  zombie.velocityX = 4;

  breakButton = createImg("lib/axe.png");
  breakButton.position(width - 150, height/2 - 50);
  breakButton.size(50, 50);
  breakButton.mouseClicked(handleMousePress);

  wall1 = new base(40, 350, 200, 200);
  wall2 = new base(700, 150, 300, 200);
  wall3 = new base(0, 150, 300, 200);

  inv = new invBase(350, 180, 1000, 20);

  bridge = new Bridge(27, {x:width - 120, y:300});

  Matter.Composite.add(bridge.body ,wall2);
  jointLink = new link(bridge, wall2);

  Matter.Composite.add(bridge.body ,wall1);
  jointLink = new link(bridge, wall1);

 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  //imageMode(CENTER);
  
}

function draw() {
  background(51);

  image(bg, 0, 0, width, height);

  bridge.show ();
  showstone1();
  //collidese();
  //ground.display();
 // wall1.display();
  //wall2.display();
  //wall3.display();

 if(box.isTouching(zombie)){
  zombie.changeImage('sadly');
  zombie.velocityX = 0;
  zombie.scale = 1;
 }


 
  

  for( var stone1 of stones){
    stone1.display();
    var pos = stone1.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);

    if(distance <= 50){
      zombie.velocityX = 0;
      Matter.body.setVelocity(stone1.body, {x:10, y:-10});
     
     //zombie.changeImage('sadly');
      collided = true;
    }
  }

  drawSprites();

  //inv.display();
  Engine.update(engine);



}



function showstone1(){
  if(stones.length < 8){
    var x = random(300, 350);
    var y = random(50,100);
    stone1 = new stone(x, y, 25);
    stones.push(stone1);


  }

  for(var i = 0; i < stones.length; i++){
    stones[i].display();
  }
}



  
/*function collide(){


      for( var stone1 of stones){
        stone1.display();
        var pos = stone1.body.position;
        var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    
        if(distance <= 50){
          zombie.velocityX = 0;
          Matter.body.setVelocity(stone1.body, {x:10, y:-10});
         
        // zombie.changeImage('sadly');
          collided = true;
        }
      }
}*/
    

function handleMousePress(){
  jointLink.detach();
  box.velocityY = 5
  inv.disapear();
  setTimeout(()=>{
    bridge.break();
  },1000)
}




