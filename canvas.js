var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {

	x: undefined,
	y: undefined

}

var maxRadius = 60;
// var minRadius = 20;

var colorArray = [
	'#263650',
	'#E74E4E',
	'#F7FBFC',
	'#57CBFF',
	'#2273AA',
];

var msg = "Hello World!";
var msg2 = "Welcome to my portfolio!"; 

window.addEventListener(`mousemove`, function(event){

	mouse.x = event.x;
	mouse.y = event.y;
})

// responsywny canvas
window.addEventListener(`resize`, function (){

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

// klasa 
function Circle(x, y, dx, dy, radius, rcolor) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	//this.color = rcolor;
	this.minRadius = radius;
	// kolor z arraColor 
	this.arColor = colorArray[Math.floor( Math.random() * colorArray.length)];

	this.draw = function () {
		
		c.beginPath(); 
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		//c.strokeStyle = rcolor;    // styl ramki
		//c.stroke();				 // wlaczenie ramki	
		c.fillStyle = this.arColor;	 // styl wypelnienia zamiast this.arColor mozna uzyc rcolor	
		c.fill();				 	 // wlaczenie wypelnienia
		c.font = "bold 30px italic Calibri";
		c.fillStyle="brown";		 // font color
		c.fillText(msg ,canvas.width/2-80 ,canvas.height/2-100);
		//c.fillText(msg2 ,canvas.width/2-150 ,canvas.height/2-60);
		
	}

	this.update = function () {
		
		if (this.x + this.radius > innerWidth || this.x -this.radius < 0 ){
			
			this.dx = -this.dx;
		}
	
		if ( this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
	
			this.dy = -this.dy;
		}
		
		this.x += this.dx;
		this.y += this.dy;

		// interactivity

		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
			mouse.y - this.y < 50 && mouse.y - this.y > -50) {
				
			if(this.radius < maxRadius){
		
				this.radius +=1;
			}
		
		}else if (this.radius > this.minRadius){

			this.radius -=1;
		}
		
		this.draw();
		
	}
}

var circleArray = [];

function init() {
	
	circleArray = []; // arra ustawiany na 0 zeby po kazdej zmianie wielkosci okna kulek bylo zawsze 800

	for (var i = 0; i < 800; i++) {
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius *2) + radius;
		var dy = Math.random() - 0.5;
		var dx = Math.random() - 0.5;	
		var rcolor = getRandomColor();
		
		circleArray.push(new Circle(x, y ,dx, dy, radius, rcolor))
		
	}

}

function animate() {
	
		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);   //  powoduje odnowienie samego ksztaltu, nie tworzy sie 'smuga'(zakomentuj i zobacz ;)
			
		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
					
		}
		//circle.update();

	}

	animate();
	
	init();	
