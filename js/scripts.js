var gobSpeed = 1;
var score = 0;
var highScore = 0;
var timer = 60;
var goblinVectorX = 0;
var goblinVectorY = 0;

highscore = localStorage.getItem("highScore");
if(typeof(highScore) === undefined){
	highscore = 0;
}
localStorage.setItem("highScore", highScore); //include in collision 

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

var bgImage = new Image();
bgImage.src = "background.png";
var hero = new Image();
hero.src = "hero.png";
var heroLoc ={
	x: 240,
	y: 224
}
var goblin = new Image();
goblin.src = "monster.png";
var goblinLoc ={
	x: Math.floor(Math.random()*canvas.width),
	y: Math.floor(Math.random()*canvas.height)
}
var keysDown = [];
addEventListener("keydown", function(event){
	keysDown[event.keyCode] = true
});
addEventListener("keyup", function(event){
	delete keysDown[event.keyCode];
});

function updateHero(){
	console.log(heroLoc.x + "Hx " + heroLoc.y + "Hy " + goblinLoc.x + "Gx " + goblinLoc.y + "Gy");

	if(38 in keysDown){
		if(heroLoc.y > 30){
			heroLoc.y -= 5;
		}
	}
	if(40 in keysDown){
		if(heroLoc.y < 415){
			heroLoc.y += 5;
		}
	}
	if(37 in keysDown){
		if(heroLoc.x > 30 ){
			heroLoc.x -= 5;
		}
	}
	if(39 in keysDown){
		if(heroLoc.x < 450){
			heroLoc.x += 5;
		}
	}
	if(heroLoc.x >= (goblinLoc.x - 20) && heroLoc.x <= (goblinLoc.x + 20) && heroLoc.y >= (goblinLoc.y - 20) && heroLoc.y <= (goblinLoc.y + 20)){
		console.log("collision");
		score += 1;
		goblinLoc.x = Math.floor(Math.random()*canvas.width);
		goblinLoc.y = Math.floor(Math.random()*canvas.height);
		gobSpeed += 0.5;
		console.log("speed="+gobSpeed);
	}
}
setInterval(function(){
	goblinVectorX =	((Math.floor(Math.random()*4))-2)*gobSpeed;
	goblinVectorY = ((Math.floor(Math.random()*4))-2)*gobSpeed;
}, 700);

function updateGoblin(){
	goblinLoc.x += goblinVectorX;
	goblinLoc.y += goblinVectorY;
	if(goblinLoc.x < 16){
		goblinLoc.x = 496;
	}
	if(goblinLoc.x > 496){
		goblinLoc.x = 16;
	}
	if(goblinLoc.y < 16){
		goblinLoc.y = 464;
	}
	if(goblinLoc.y > 464){
		goblinLoc.y = 16;
	}
}

function draw(){
	context.drawImage(bgImage, 0, 0);
	context.drawImage(hero, heroLoc.x, heroLoc.y);
	context.drawImage(goblin, goblinLoc.x, goblinLoc.y);
	updateHero();
	updateGoblin();
	requestAnimationFrame(draw);
}


draw();