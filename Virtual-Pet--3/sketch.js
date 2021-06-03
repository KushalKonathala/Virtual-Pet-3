var dog, happyDog, hungryDog;
var database;
var foodS, foodStockRef;
var frameCountNow = 0;
var fedTime, lastFed, foodObject, currentTime;
var milk, input, name;
var gameState = "hungry";
var gameStateRef;
var bedroomImg, gardenImg, washroomImg, sleepImg, runImg;
var feed, addFood;
var input, button;

function preload()
{
  hungryDog = loadImage("images/dogImg1.png"); 
  happyDog = loadImage("images/dogImg.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  sleepImg = loadImage("images/Lazy.png");
  runImg = loadImage("images/running.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  foodObject = new Food();

  dog = createSprite(width/2 + 250,height/2,10,10);
  dog.addAnimation("hungry",hungryDog);
  dog.addAnimation("happy",happpyDog);
  dog.addAnimation("sleeping",sleepImg);
  dog.addAnimation("run",runImg);
  dog.scale = 0.3;

  feed = createButton("Feed the Dog!");
  feed.position(950,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food!");
  addFood.position(1000,145);
  addFood.mousePressed(addFoods);

  input = createInput("Pet name");
  input.position(950,120);
  button = createButton("Confirm");
  button.position(1000,145);
  button.mousePressed(createName);
}


function draw() {  
currentTime = hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObject.garden();
}

if()
fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
   lastFed = data.val();
})

fill(255);
textSize(20);

if(lastFed >= 12){
  text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
} else if(lastFed == 0){
  text("Last Feed : 12 AM", 350, 30);
} else{
  text("Last Feed : " + lastFed + " AM", 350, 30);
}

foodObject.display();
drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObject.updateFoodStock(foodObject.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodObject.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}