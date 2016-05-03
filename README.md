# Canvas Game Goblins and Zombies!

### Game using HTML, CSS, JavaScript using the canvas element and keeps a "High Score" stored in the users local storage.

## Summary

#### Simple canvas game that allows the player to move around the map using the arrow keys. The player has 60 seconds to capture as many goblins as possible without dieng. Eventually zombies will spawn and chase the player in a "zombie-like" fashion and if a zombie catches the player, the player dies. The player can add time by collecting clocks on the map that spawn randomly and use his limited supply of bombs to kill the zombies

### Author: Tristan Lobaugh 
+ Github - https://github.com/TristanLobaugh
+ Homepage - http://tristanlobaugh.com

## Demo

[Live Demo](http://tristanlobaugh.com/canvasgame)

## Screenshots

### Main page:
![alt text](https://raw.githubusercontent.com/TristanLobaugh/canvasgame/master/img/main.png)

### Zombies!
![alt text](https://raw.githubusercontent.com/TristanLobaugh/canvasgame/master/img/zombies.png)

### Explosions!
![alt text](https://raw.githubusercontent.com/TristanLobaugh/canvasgame/master/img/clock_explosion.png)

##Code Examples

### Native Javascript used to move the Hero character and collision conditions with the goblin
```
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
```

### Native Javascript and the setInterval method to create a master clock to control the game timer, spawning of clock perks, zombies and bomb explosions
```
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
```

## To Do
+ Add instructions at beginning of game
+ Include a death screens once killed by a zombie, or run out of time.
