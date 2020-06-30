
function init(){
	canvas=document.getElementById("mycanvas");
	W = H = canvas.width = canvas.height =1000;

	pen = canvas.getContext('2d');

	game_over = false;

	cs=66;

	score = 0;
	//create a image object of food
	food_image = new Image();
	food_image.src = "Assets/apple.png";

	//trophy image object

	trophy = new Image();
	trophy.src = "Assets/trophy.png"

	food = getRandomFood();

	snake = {
		init_length:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){

			for (var i = this.init_length; i > 0; i--) {
				 this.cells.push({x:i,y:0});

			}
		},

		drawSnake:function() {
			// body...
			for (var i =0;i<this.cells.length; i++) {
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2)
			}

		},

		updateSnake:function(){
			//check if snake has eaten the food, increase the length
			//generate new food
			var headX = this.cells[0].x;
			var headY = this.cells[0].y; 

			if(headX==food.x && headY==food.y ){

				console.log("food eaten");
				food=getRandomFood();
				score++;
			}
			else{
				this.cells.pop();
			}
			
			var nextX,nextY;

			if(this.direction=="right"){
				var nextX = headX+1;
				var nextY = headY;
			}
			
			else if (this.direction=="left") {
				var nextX = headX-1;
				var nextY = headY;
			}

			else if (this.direction=="down") {
				var nextX = headX;
				var nextY = headY+1;
			}

			else{
				nextX = headX;
				nextY = headY-1;
			}



			this.cells.unshift({x:nextX,y:nextY});

			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if (this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_x || this.cells[0].y>last_y) {
				game_over=true;		
			}

		}


	};

	snake.createSnake();
	
	function keyPressed(e){

		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}

		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}

		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}

		else if(e.key=="ArrowUp"){
			snake.direction = "up";
		}

		else {

			snake.direction = snake.direction;
		}

		console.log(snake.direction);

	}

	document.addEventListener('keydown',keyPressed); //adding event listener

	
	snake.drawSnake();

}


function draw(){
	
	// clearing the pervious frame
	pen.clearRect(0,0,W,H);
	
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_image,food.x*cs,food.y*cs,cs,cs);
	pen.drawImage(trophy,18,20,cs,cs);

	pen.fillStyle = "blue";
	pen.font = "30px Roboto";
	pen.fillText(score,50,50)

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
	if (game_over==true) {
		clearInterval(f);
		alert("Game Over");
	}
	draw();
	update();
}

init();

var f = setInterval(gameloop,100)