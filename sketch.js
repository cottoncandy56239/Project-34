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
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;

var fr;
var count;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');


}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  count = 0
  //btn 1
  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(390,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:200,y:90});
   rope2 = new Rope(7,{x:400,y:90});

  
  ground = new Ground(250,height,width,20);


  bunny = createSprite(400,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.6;

  
  fruit = Bodies.circle(300,300,20);
  fruit.scale = 3
  Matter.Composite.add(rope.body,fruit);
  

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
  }

 
  if(fruit!=null && fruit.position.y>=650)
  {

    fruit=null;
   }
  
}

function drop()
{

  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{

  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

