function init(){
	document.body.style.zoom = "90%";
	canvas = document.getElementById('mycanvas');
	W = canvas.width = 1000;
	H = canvas.height = 1000;
	cs = 66; //grid size is 67
	speed = 200;

	pen_A = canvas.getContext('2d');
	pen_B = canvas.getContext('2d');

	game_over_A = false;
	collison_A = false;
	score_A = 3;

	game_over_B = false;
	collison_B = false;
	score_B = 3;

	//create food image
	food_img_A = new Image();
	food_img_A.src = "Assets/apple.png";

	food_img_B = new Image();
	food_img_B.src = "Assets/apple.png";

	//create trophy image
	trophy_A = new Image();
	trophy_A.src = "Assets/trophy.png";

	trophy_B = new Image();
	trophy_B.src = "Assets/trophy.png";


	food_A = getRandomFood_A();
	food_B = getRandomFood_B();

	snake_A = {
		init_len_A:3,
		color_A:"black",
		cells_A:[],
		direction_A:"right",


		createSnake_A:function(){
			for(var i = this.init_len_A; i>0; i--){
				this.cells_A.push({x:i,y:1});
			}
		},

		drawSnake_A:function(){
			for(var i = 0; i<this.cells_A.length; i++){
				//fill rectangle
				pen_A.fillStyle = (i == 0) ? "white" : "black"; //default fill style is 'black'
				pen_A.fillRect(this.cells_A[i].x*cs,this.cells_A[i].y*cs,cs-3,cs-3);
				//outline the rectangle
				pen_A.strokeStyle = "red";
				pen_A.strokeRect(this.cells_A[i].x*cs,this.cells_A[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake_A:function(){
			//console.log("updating snake");
			var headX_A = this.cells_A[0].x;
			var headY_A = this.cells_A[0].y;

			//check if snake has eaten the food. increase the length of the snake and
			//generate new food object
			if((headX_A == food_A.x && headY_A == food_A.y) || (headX_A == food_B.x && headY_A == food_B.y)){
				console.log("food eaten by A");
				score_A++;
				if(headX_A == food_A.x && headY_A == food_A.y){
					food_A = getRandomFood_A();
				}
				else{
					food_B = getRandomFood_B();
				}

				//if else ladder for varying 'speed' variable
				//speed variable is difficulty of the game
			}
			else{
				this.cells_A.pop();
			}
			
			var nextX_A,nextY_A; //next coodinates for the movement

			if(this.direction_A == "right"){
				nextX_A = headX_A + 1;
				nextY_A = headY_A;
			}
			else if(this.direction_A == "left"){
				nextX_A = headX_A - 1;
				nextY_A = headY_A;
			}
			else if(this.direction_A == "down"){
				nextX_A = headX_A;
				nextY_A = headY_A + 1;
			}
			else{
				nextX_A = headX_A;
				nextY_A = headY_A - 1;
			}
			
			//gives movement to the snake
			this.cells_A.unshift({x:nextX_A,y:nextY_A});

			//self collison makes game over
			for(var i=1; i < this.cells_A.length; i++){
				if(nextX_A == this.cells_A[i].x && nextY_A == this.cells_A[i].y){
					collison_A = true;
				}
			}

			//logic that prevents snake from going out of the boundry
			var last_x_A = Math.round((W-cs)/cs);
			var last_y_A = Math.round((H-cs)/cs);
			if(this.cells_A[0].y<0 || this.cells_A[0].x < 0 || this.cells_A[0].x > last_x_A || this.cells_A[0].y > last_y_A){
				game_over_A = true;
			}
		}
	};

	snake_B = {
		init_len_B:3,
		color_B:"blue",
		cells_B:[],
		direction_B:"right",


		createSnake_B:function(){
			for(var i = this.init_len_B; i>0; i--){
				this.cells_B.push({x:i,y:13});
			}
		},

		drawSnake_B:function(){
			for(var i = 0; i<this.cells_B.length; i++){
				//fill rectangle
				pen_B.fillStyle = (i == 0) ? "yellow" : "blue"; //default fill style is 'black'
				pen_B.fillRect(this.cells_B[i].x*cs,this.cells_B[i].y*cs,cs-3,cs-3);
				//outline the rectangle
				pen_B.strokeStyle = "black";
				pen_B.strokeRect(this.cells_B[i].x*cs,this.cells_B[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake_B:function(){
			//console.log("updating snake");
			var headX_B = this.cells_B[0].x;
			var headY_B = this.cells_B[0].y;

			//check if snake has eaten the food. increase the length of the snake and
			//generate new food object
			if((headX_B == food_B.x && headY_B == food_B.y) || (headX_B == food_A.x && headY_B == food_A.y)){
				console.log("food eaten by B");
				score_B++;
				if(headX_B == food_B.x && headY_B == food_B.y){
					food_B = getRandomFood_B();
				}
				else{
					food_A = getRandomFood_A();
				}

				//if else ladder for varying 'speed' variable
				//speed variable is difficulty of the game				
			}
			else{
				this.cells_B.pop();
			}
			
			var nextX_B,nextY_B; //next coodinates for the movement

			if(this.direction_B == "right"){
				nextX_B = headX_B + 1;
				nextY_B = headY_B;
			}
			else if(this.direction_B == "left"){
				nextX_B = headX_B - 1;
				nextY_B = headY_B;
			}
			else if(this.direction_B == "down"){
				nextX_B = headX_B;
				nextY_B = headY_B + 1;
			}
			else{
				nextX_B = headX_B;
				nextY_B = headY_B - 1;
			}
			
			//gives movement to the snake
			this.cells_B.unshift({x:nextX_B,y:nextY_B});

			//self collison makes game over
			for(var i=1; i < this.cells_B.length; i++){
				if(nextX_B == this.cells_B[i].x && nextY_B == this.cells_B[i].y){
					//dead.play();
					collison_B = true;
				}
			}

			//logic that prevents snake from going out of the boundry
			var last_x_B = Math.round((W-cs)/cs);
			var last_y_B = Math.round((H-cs)/cs);
			if(this.cells_B[0].y<0 || this.cells_B[0].x < 0 || this.cells_B[0].x > last_x_B || this.cells_B[0].y > last_y_B){
				game_over_B = true;
			}
		}
	};

	snake_A.createSnake_A();
	snake_B.createSnake_B();

	//add an event listener on the document object
	function keyPressed(e){
		//conditional statements
		if(e.key == "ArrowRight" && snake_A.direction_A != "left"){
			//right.play();
			snake_A.direction_A = "right";
		}
		else if(e.key == "ArrowLeft" && snake_A.direction_A != "right"){
			//left.play();
			snake_A.direction_A = "left";
		}
		else if(e.key == "ArrowDown" && snake_A.direction_A != "up"){
			//down.play();
			snake_A.direction_A = "down";
		}
		else if(e.key == "ArrowUp" && snake_A.direction_A != "down"){
			//up.play();
			snake_A.direction_A = "up";
		}
		else if(e.key == "d" && snake_B.direction_B != "left"){
			//right.play();
			snake_B.direction_B = "right";
		}
		else if(e.key == "a" && snake_B.direction_B != "right"){
			//left.play();
			snake_B.direction_B = "left";
		}
		else if(e.key == "s" && snake_B.direction_B != "up"){
			//down.play();
			snake_B.direction_B = "down";
		}
		else if(e.key == "w" && snake_B.direction_B != "down"){
			//up.play();
			snake_B.direction_B = "up";
		}
		console.log(e.key);
	}
	//add a event listner on the document object
	document.addEventListener('keydown',keyPressed);

}


function draw(){
	//clear old frame while drawing
	pen_A.clearRect(0,0,W,H);
	pen_B.clearRect(0,0,W,H);
	//draw the snake
	snake_A.drawSnake_A();
	snake_B.drawSnake_B();
	
	//display food object
	pen_A.fillStyle = food_A.color;
	pen_A.drawImage(food_img_A,food_A.x*cs,food_A.y*cs,cs,cs);
	pen_B.fillStyle = food_B.color;
	pen_B.drawImage(food_img_B,food_B.x*cs,food_B.y*cs,cs,cs);

	//display score 
	pen_A.drawImage(trophy_A,20,20,cs-10,cs-10);
	pen_A.fillStyle = "blue";
	pen_A.font = "bold 20px Roboto";
	if(score_A > 9){
		pen_A.fillText(score_A,37,45);
	}
	else{
		pen_A.fillText(score_A,43,45);
	}

	pen_B.drawImage(trophy_B,20,920,cs-10,cs-10);
	pen_B.fillStyle = "blue";
	pen_B.font = "bold 20px Roboto";
	if(score_B > 9){
		pen_B.fillText(score_B,37,945);
	}
	else{
		pen_B.fillText(score_B,43,945);
	}
	
}


function update(){
	snake_A.updateSnake_A();
	snake_B.updateSnake_B();
}


function getRandomFood_A(){

	var foodX_A = Math.round(Math.random()*(W-cs)/cs);
	var foodY_A = Math.round(Math.random()*(H-cs)/cs);

	var food_A = {
		x:foodX_A,
		y:foodY_A,
		color_A:"red",
	}
	return food_A;
}

function getRandomFood_B(){

	var foodX_B = Math.round(Math.random()*(W-cs)/cs);
	var foodY_B = Math.round(Math.random()*(H-cs)/cs);

	var food_B = {
		x:foodX_B,
		y:foodY_B,
		color_B:"red",
	}
	return food_B;
}


function gameloop(){
	if(collison_B == true || game_over_B == true){
		clearInterval(f);
		if(score_B > score_A){
			alert("Snake B wins");
		}
		else if(score_A == 3 && score_B == 3){
			alert("Its a Tie");
		}
		else{
			alert("Snake A wins");
		}
	}
	else if(collison_A == true || game_over_A == true){
		clearInterval(f);
		if(score_A > score_B){
			alert("Snake A wins");
		}
		else if(score_A == 3 && score_B == 3){
			alert("Its a Tie");
		}
		else{
			alert("Snake B wins");
		}
	}

	draw();
	update();
}

init();
var f = setInterval(gameloop,400);




