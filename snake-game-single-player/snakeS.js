function init(){
	document.body.style.zoom = "90%";
	canvas = document.getElementById('mycanvas');
	W = canvas.width = 1000;
	H = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 66; //grid size is 67
	game_over = false;
	collison = false;
	score = 3;
	speed = 220;

	//create food image
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	//create trophy image
	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	//create audio files
	const dead = new Audio();
	const eat = new Audio();
	const up = new Audio();
	const left = new Audio();
	const right = new Audio();
	const down = new Audio();

	dead.src = "audio/dead.mp3";
	eat.src = "audio/eat.mp3";
	up.src = "audio/up.mp3";
	left.src = "audio/left.mp3";
	right.src = "audio/right.mp3";
	down.src = "audio/down.mp3";

	food = getRandomFood();

	snake = {
		init_len:3,
		color:"black",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(var i = this.init_len; i>0; i--){
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake:function(){
			for(var i = 0; i<this.cells.length; i++){
				//fill rectangle
				pen.fillStyle = (i == 0) ? "white" : "black"; //default fill style is 'black'
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
				//outline the rectangle
				pen.strokeStyle = "red";
				pen.strokeRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake:function(){
			//console.log("updating snake");
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			//check if snake has eaten the food. increase the length of the snake and
			//generate new food object
			if(headX == food.x && headY == food.y){
				console.log("food eaten");
				food = getRandomFood();
				eat.play();
				score++;

				//if else ladder for varying 'speed' variable
				//speed variable is difficulty of the game
				if(score >= 5 && score <=8){
					speed = 220;
				}
				else if(score >= 9 && score <= 12){
					speed = 200;
				}
				else if(score >= 13 && score <= 15){
					speed = 180;
				}
				else if(score >= 16 && score <= 18){
					speed = 150;
				}
				else if(score >= 19 && score <= 21){
					speed = 120;
				}
				else if(score >= 22 && score <= 23){
					speed = 100;
				}
				else if(score >= 24 && score <= 26){
					speed = 80;
				}
				else if(score >= 27 && score <= 30){
					speed = 50;
				}
				else if(score >= 31 && score <= 32){
					speed = 40;
				}
				else if(score >= 33 && score <= 34){
					speed = 30;
				}
				else{
					speed = 20;
				}
				
			}
			else{
				this.cells.pop();
			}
			
			var nextX,nextY; //next coodinates for the movement

			if(this.direction == "right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction == "left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction == "down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}
			
			//gives movement to the snake
			this.cells.unshift({x:nextX,y:nextY});

			//self collison makes game over
			for(var i=1; i < this.cells.length; i++){
				if(nextX == this.cells[i].x && nextY == this.cells[i].y){
					dead.play();
					collison = true;
				}
			}

			//logic that prevents snake from going out of the boundry
			var last_x = Math.round((W-cs)/cs);
			var last_y = Math.round((H-cs)/cs);
			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				dead.play();
				game_over = true;
			}
		}
	};

	snake.createSnake();

	//add an event listener on the document object
	function keyPressed(e){
		//conditional statements
		if(e.key == "ArrowRight" && snake.direction != "left"){
			right.play();
			snake.direction = "right";
		}
		else if(e.key == "ArrowLeft" && snake.direction != "right"){
			left.play();
			snake.direction = "left";
		}
		else if(e.key == "ArrowDown" && snake.direction != "up"){
			down.play();
			snake.direction = "down";
		}
		else if(e.key == "ArrowUp" && snake.direction != "down"){
			up.play();
			snake.direction = "up";
		}
		console.log(snake.direction);
	}

	//add a event listner on the document object
	document.addEventListener('keydown',keyPressed);

}


function draw(){
	//clear old frame while drawing
	pen.clearRect(0,0,W,H);
	//draw the snake
	snake.drawSnake();
	
	//display food object
	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	//pen.fillRect(food.x*cs,food.y*cs,cs,cs);

	//display score 
	pen.drawImage(trophy,20,20,cs-10,cs-10);
	pen.fillStyle = "blue";
	pen.font = "bold 20px Roboto";
	if(score > 9){
		pen.fillText(score,37,45);
	}
	else{
		pen.fillText(score,43,45);
	}
	
}


function update(){
	snake.updateSnake();
}


function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}


function gameloop(){
	if(game_over == true){
		clearInterval(f);
		alert("Game Over! Thank you for playing." + "\n" + "Your score is: " + score);
		return;
	}
	else if(collison == true){
		clearInterval(f);
		alert("Game over! Snake Bite Itself." + "\n" + "Your score is: " + score);
	}
	draw();
	update();
}


init();
var f = setInterval(gameloop,speed);




