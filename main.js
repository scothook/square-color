var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var lineage = [];
var generationNum = 0;

let parentSquare = new Square(340, 20, 100, 100);
let childOne = new Square(60, 160, 100, 100);
let childTwo = new Square(200, 160, 100, 100);
let childThree = new Square(340, 160, 100, 100);

initialize();
canvas.addEventListener("mousedown", mouseDown, false);

function initialize() {
   drawTitle();
   drawLines();
   colorNewGen(parentSquare);
   drawFamily();
   labelSquares();
}

function drawTitle() {
   context.fillStyle = "rgba(0,0,0,1)";
   context.font = "bold 28px Arial";
   context.fillText("Artificial Selection of Square Color", 18, 350);
}

function drawLines() {
   let arrow1 = new Arrow(250,50,320,50,0,15);
   let arrow2 = new Arrow(110,140,110,150,Math.PI*0.5,5); 
   let arrow3 = new Arrow(245,140,245,150,Math.PI*0.5,5);
   let arrow4 = new Arrow(390,130,390,150,Math.PI*0.5,5);
   let line1 = new Arrow(110,140,390,140,0,0);

   arrow1.draw();
   arrow2.draw();
   arrow3.draw();
   arrow4.draw();
   line1.draw();
}

function colorNewGen(parent) {
   parentSquare.updateColor(parent.r,parent.g,parent.b);
   childOne.mutateColor(parent);
   childTwo.mutateColor(parent);
   childThree.mutateColor(parent);
}

function drawFamily() {
   parentSquare.draw();
   childOne.draw();
   childTwo.draw();
   childThree.draw();
   drawLineage(parentSquare);
}

function labelSquares() {
   context.font = "bolder 10px Arial";
   context.fillStyle = "rgba(0,0,0,1)";
   context.fillText(parentSquare.rgbaString,340,130);
   context.fillText(childOne.rgbaString,60,270);
   context.fillText(childTwo.rgbaString,200,270);
   context.fillText(childThree.rgbaString,340,270);
}

function drawLine(startPoint,endPoint) {
   context.strokeStyle = "black";
   context.beginPath();
   context.moveTo(startPoint.x,startPoint.y);
   context.lineTo(endPoint.x,endPoint.y);
   context.stroke();
}

function numbersToRGBA(r,g,b,a = 1) {
   return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function evolve(nextParent) {
   clearColors();
   colorNewGen(nextParent);
   drawFamily();
   labelSquares();
}

function clearColors() {
   context.fillStyle = "rgba(255,255,255,1)";
   context.fillRect(340,120,120,15);
   context.fillRect(60,260,400,15);
}

function variation() {
   return Math.floor(Math.random()*51)-25;
}

function drawLineage(parentSquare) {
   lineage[generationNum] = new Square(330,70,18,18,parentSquare.r,parentSquare.g,parentSquare.b);

   for (i=0; i<generationNum; i++){
      lineage[i].x -= 20;
      lineage[i].draw();
   }

   generationNum++;
}

function mouseDown(event) {
   var x = event.clientX;
   var y = event.clientY;

   if(x > 70 && x < 170 && y > 170 && y < 270){
         evolve(childOne);
   }
   
   if(x > 210 && x < 310 && y > 170 && y < 270){
         evolve(childTwo);
   }

   if(x > 350 && x < 450 && y > 170 && y < 270){
         evolve(childThree);
   }
         
}
