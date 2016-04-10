var gobSpeed = 1;
var zomSpeed = 1;
var goblinVectorX = 0;
var goblinVectorY = 0;
var zombieVectorX = 0;
var zombieVectorY = 0;
var gameActive = true;
var highScore = localStorage.getItem("highScore");
if(highScore === null){
	highScore = 0;
	document.getElementById("high-score").innerHTML = "High Score: " + highScore;
}else{
	document.getElementById("high-score").innerHTML = "High Score: " + highScore;
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = 964;
canvas.height = 894
;

var bgImage1 = new Image();
bgImage1.src = "img/background1.png";
var bgImage2 = new Image();
bgImage2.src = "img/background2.png";
var bgImage3 = new Image();
bgImage3.src = "img/background3.png";
var bgImage4 = new Image();
bgImage4.src = "img/background4.png";

var hero = new Image();
hero.src = "img/hero.png";
var heroLoc = {
	x: 482,
	y: 447
}

var goblin = new Image();
goblin.src = "img/monster.png";
var goblinLoc = {
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
	if(38 in keysDown){
		if(heroLoc.y > 30){
			heroLoc.y -= 5;
		}
	}
	if(40 in keysDown){
		if(heroLoc.y < 829){
			heroLoc.y += 5;
		}
	}
	if(37 in keysDown){
		if(heroLoc.x > 30 ){
			heroLoc.x -= 5;
		}
	}
	if(39 in keysDown){
		if(heroLoc.x < 902){
			heroLoc.x += 5;
		}
	}
	if(heroLoc.x >= (goblinLoc.x - 20) && heroLoc.x <= (goblinLoc.x + 20) && heroLoc.y >= (goblinLoc.y - 20) && heroLoc.y <= (goblinLoc.y + 20)){
		score += 1;
		goblinLoc.x = Math.floor(Math.random()*canvas.width);
		goblinLoc.y = Math.floor(Math.random()*canvas.height);
		gobSpeed += 0.5;
		zomSpeed += 0.5;
		if(score > highScore){
			highScore = score;
			localStorage.setItem("highScore", highScore);
		}
		document.getElementById("wins").innerHTML = "Score: " + score;
		document.getElementById("high-score").innerHTML = "High Score: " + highScore;
	}
}

setInterval(function(){
	goblinVectorX =	((Math.ceil(Math.random()*3))-2)*gobSpeed;
	goblinVectorY = ((Math.ceil(Math.random()*3))-2)*gobSpeed;
}, 700);

function updateGoblin(){
	goblinLoc.x += goblinVectorX;
	goblinLoc.y += goblinVectorY;
	if(goblinLoc.x < 16){
		goblinLoc.x = 948;
	}
	if(goblinLoc.x > 948){
		goblinLoc.x = 16;
	}
	if(goblinLoc.y < 16){
		goblinLoc.y = 878;
	}
	if(goblinLoc.y > 878){
		goblinLoc.y = 16;
	}
}

setInterval(function(){
	if(gameActive === true){
		timer -= 1;
		document.getElementById("timer").innerHTML = "Time Left: " + timer;
		if(timer === 0){
			gameActive = false;
			document.getElementById("scoreboard").classList.add("red");
			document.getElementById("scoreboard").classList.remove("green");
		}
		for(var j = 0; j < clocks.length; j++){
			clocks[j].clockLife--;
			if(clocks[j].clockLife <= 0){
				clocks.splice(j, 1);
			}
		}
		for(var k = 0; k < bombs.length; k++){
			bombs[k].bombLife--;
			if(bombs[k].bombLife <= 0){
				bombExplode(bombs[k]);
				bombs.splice(k, 1);
			}
		}
		clockSpawnChance = Math.ceil(Math.random()*15);  
		if(clockSpawnChance === 1){
			clocks.push(new Clock());
		}
		if(timer%10 === 0){
			zombies.push(new Zombie());
		}
	}
}, 1000)

function Clock(){
	this.clock = new Image();
	this.clock.src = "img/clock.png";
	this.clockLocX = (Math.floor(Math.random()*902) + 18);
	this.clockLocY = (Math.floor(Math.random()*829) + 18);
	this.clockLife = Math.ceil((Math.random()*4) + 1 );
}

function updateClock(){
	for(var i = 0; i < clocks.length; i++){
		if(heroLoc.x >= (clocks[i].clockLocX - 20) && heroLoc.x <= (clocks[i].clockLocX + 20) && heroLoc.y >= (clocks[i].clockLocY - 20) && heroLoc.y <= (clocks[i].clockLocY + 20)){
			timer += 20;
			clocks.splice(i, 1);
		}
	}
}

function updateBomb(){
	if(32 in keysDown){
		if(bombs.length === 0 && bombInv > 0){
			bombs.push(new Bomb());
			bombInv--;
			document.getElementById("bombs-inv").innerHTML =  bombInv;
		}
	}
}

function Bomb(){
	this.bomb = new Image();
	this.bomb.src = "img/bomb.png";
	this.bombLocX = heroLoc.x;
	this.bombLocY = heroLoc.y;
	this.bombLife = 2;
}

function bombExplode(bomb){
	for(var i = 0; i < zombies.length; i++){
		if(bomb.bombLocX >= (zombies[i].zombieLocX - 100) && bomb.bombLocX <= (zombies[i].zombieLocX + 100) && bomb.bombLocY >= (zombies[i].zombieLocY - 100) && bomb.bombLocY <= (zombies[i].zombieLocY + 100)){
			zombies.splice(i, 1);
		}
	}
	explosions.push(new Explosion(bomb.bombLocX, bomb.bombLocY));
}

function Explosion(x, y){
	this.explosion = new Image();
	this.explosion.src = "img/explosion.png";
	this.imgCount = 0;
	this.imgX;
	this.imgY;
	this.explosionLocX = x - 30;
	this.explosionLocY = y - 50;
}

function updateExplosion(){
	for(var i = 0; i < explosions.length; i++){
		if(explosions[i].imgCount < 15){	
			explosions[i].imgX = (explosions[i].imgCount % 5) * 96;
			explosions[i].imgY = Math.floor(explosions[i].imgCount / 5) * 96;
			explosions[i].imgCount++
		}else{
			explosions.splice(i, 1);
		}
	}
}


function Zombie(){
	this.zombie = new Image();
	this.zombie.src = "img/zombie.png";
	this.zombieLocX = Math.floor(Math.random()*canvas.width);
	this.zombieLocY = Math.floor(Math.random()*canvas.height);
	this.zombieVectorX;
	this.zombieVectorY;
}

setInterval(function(){
	for(var i = 0; i < zombies.length; i++){
		if(zombies[i].zombieLocX < heroLoc.x){
			zombies[i].zombieVectorX =	1 * zomSpeed * ((Math.floor(Math.random()*11))*0.1);
		}else if(zombies[i].zombieLocX > heroLoc.x){
			zombies[i].zombieVectorX = -1 * zomSpeed * ((Math.floor(Math.random()*11))*0.1);
		}
		if(zombies[i].zombieLocY < heroLoc.y){
			zombies[i].zombieVectorY =	1 * zomSpeed * ((Math.floor(Math.random()*11))*0.1);
		}else if(zombies[i].zombieLocY > heroLoc.y){
			zombies[i].zombieVectorY = -1 * zomSpeed * ((Math.floor(Math.random()*11))*0.1);
		}
	}
}, 500);

function updateZombie(){
	for(var i = 0; i < zombies.length; i++){
		zombies[i].zombieLocX += zombies[i].zombieVectorX;
		zombies[i].zombieLocY += zombies[i].zombieVectorY;
		if(heroLoc.x >= (zombies[i].zombieLocX - 20) && heroLoc.x <= (zombies[i].zombieLocX + 20) && heroLoc.y >= (zombies[i].zombieLocY - 20) && heroLoc.y <= (zombies[i].zombieLocY + 20)){
			gameActive = false;
			document.getElementById("scoreboard").classList.add("red");
			document.getElementById("scoreboard").classList.remove("green");
		}
	}
}

function draw(){
	if(gameActive === true){
		context.drawImage(bgImage1, 0, 0);
		context.drawImage(bgImage2, 482, 0);
		context.drawImage(bgImage3, 482, 447);
		context.drawImage(bgImage4, 0, 447);
		context.drawImage(hero, heroLoc.x, heroLoc.y);
		context.drawImage(goblin, goblinLoc.x, goblinLoc.y);
		for(var i = 0; i < bombs.length; i++){
			context.drawImage(bombs[i].bomb, bombs[i].bombLocX, bombs[i].bombLocY);
		}
		for(var i = 0; i < explosions.length; i++){
			context.drawImage(explosions[i].explosion, explosions[i].imgX, explosions[i].imgY, 96, 96, explosions[i].explosionLocX, explosions[i].explosionLocY, 96, 96);
		}
		for(var i = 0; i < clocks.length; i++){
			context.drawImage(clocks[i].clock, clocks[i].clockLocX, clocks[i].clockLocY);
		}	
		for(var i = 0; i < zombies.length; i++){
			context.drawImage(zombies[i].zombie, zombies[i].zombieLocX, zombies[i].zombieLocY);
		}
		updateClock();
		updateBomb();
		updateExplosion();	
		updateHero();
		updateGoblin();
		updateZombie();
		requestAnimationFrame(draw);
	}
}

function reset(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	clocks = [];
	zombies = [];
	bombs = [];
	explosions = [];
	bombInv = 3;
	document.getElementById("bombs-inv").innerHTML =  bombInv;
	heroLoc.x = 482;
	heroLoc.y = 447;
	gobSpeed = 1;
	zomSpeed = 1;
	goblinLoc.x = Math.floor(Math.random()*canvas.width);
	goblinLoc.y = Math.floor(Math.random()*canvas.height);
	timer = 60;
	document.getElementById("timer").innerHTML = "Time Left: " + timer;
	score = 0;
	document.getElementById("wins").innerHTML = "Score: " + score;
	if(gameActive === false){
		document.getElementById("scoreboard").classList.add("green");
		document.getElementById("scoreboard").classList.remove("red");
		gameActive = true;
		draw();
	}
}

reset();
draw();

