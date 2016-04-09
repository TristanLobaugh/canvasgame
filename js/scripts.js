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
bgImage1.src = "background1.png";
var bgImage2 = new Image();
bgImage2.src = "background2.png";
var bgImage3 = new Image();
bgImage3.src = "background3.png";
var bgImage4 = new Image();
bgImage4.src = "background4.png";

var hero = new Image();
hero.src = "hero.png";
var heroLoc = {
	x: 482,
	y: 447
}

var goblin = new Image();
goblin.src = "monster.png";
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
		}
		if(timer%10 === 0){
			zombies.push(new Zombie());
		}
	}
}, 1000)

function Zombie(){
		this.zombie = new Image();
		this.zombie.src = "zombie.png";
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
	console.log(gameActive);
	if(gameActive === true){
		context.drawImage(bgImage1, 0, 0);
		context.drawImage(bgImage2, 482, 0);
		context.drawImage(bgImage3, 482, 447);
		context.drawImage(bgImage4, 0, 447);
		context.drawImage(hero, heroLoc.x, heroLoc.y);
		context.drawImage(goblin, goblinLoc.x, goblinLoc.y);
		for(var i = 0; i < zombies.length; i++){
			context.drawImage(zombies[i].zombie, zombies[i].zombieLocX, zombies[i].zombieLocY);
		}	
		updateHero();
		updateGoblin();
		updateZombie();
		requestAnimationFrame(draw);
	}
}

function reset(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	zombies = [];
	heroLoc.x = 482;
	heroLoc.y = 447;
	gobSpeed = 1;
	zomSpeed = 1;
	goblinLoc.x = Math.floor(Math.random()*canvas.width);
	goblinLoc.y = Math.floor(Math.random()*canvas.height);
	timer = 60;
	score = 0;
	if(gameActive === false){
		document.getElementById("scoreboard").classList.add("green");
		document.getElementById("scoreboard").classList.remove("red");
		gameActive = true;
		draw();
	}
}

reset();
draw();

