var canvas = el("canvas");
var ctx = canvas.getContext("2d");

const {Engine,Composite,Render,World,Bodies,Body,Detector,Constraint,Runner} = Matter;
var engine = Engine.create();
var runner = Runner.create();

var ground = Bodies.rectangle(400, 605, 800, 10, {isStatic: true});
var ceiling = Bodies.rectangle(400, -5, 800, 10, {isStatic: true});
var leftWall = Bodies.rectangle(-5, 300, 10, 600, {isStatic: true});
var rightWall = Bodies.rectangle(805, 300, 10, 600, {isStatic: true});

var params = {
	restitution: 0.3
}

var allBodies = [];
for (var i = 0; i < 100; i++) {
	allBodies.push(Bodies.rectangle(Math.random()*800, Math.random()*600, Math.random()*40+10, Math.random()*40+10, params));
}


canvas.onmousemove = function(event){
	/*var xPos = event.offsetX-400;
	var yPos = event.offsetY-300;
	var distanceToCenter = Math.hypot(xPos, yPos);

	engine.world.gravity.x = xPos/distanceToCenter;
	engine.world.gravity.y = yPos/distanceToCenter;*/

	//console.log(engine.world.gravity.x, engine.world.gravity.y);
}

function start(){
	World.add(engine.world, [
		ground,
		ceiling,
		leftWall,
		rightWall,
		...allBodies
	]);
	el("startButton").style.display = "none";
	setInterval(display, 30);
}

gyro.startTracking(function(results) {
	engine.world.gravity.x = orientation.z/360;
	el("display").innerHTML = JSON.stringify(results);
});

function display(){
	Matter.Runner.tick(runner, engine, 30)

	ctx.clearRect(0,0,800,600);
	ctx.fillStyle = "grey";
	ctx.fillRect(0,300,800,1);
	ctx.fillRect(400,0,1,600);

	allBodies.forEach((item, index)=>{
		appearRect(item, "grey")
	})
}

function appearRect(toDraw,col){
	var verts = toDraw.vertices;
	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.moveTo(verts[0].x, verts[0].y)
	for (var i = 1; i < verts.length; i++) {
		ctx.lineTo(verts[i].x, verts[i].y);
	}
	ctx.lineTo(verts[0].x, verts[0].y);
	ctx.fill();
	ctx.stroke();
}

function appearCirc(toDraw, col){
	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.arc(toDraw.position.x, toDraw.position.y, toDraw.circleRadius, 0, 2*Math.PI)
	ctx.fill();
	ctx.stroke();
}

function el(id){ return document.getElementById(id)};