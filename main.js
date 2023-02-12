class Arrow {
   constructor(startX,startY,endX,endY,direction,wingLength) {
      this.startPoint = {
         x: startX,
         y: startY
      }
      this.endPoint = {
         x: endX,
         y: endY
      }
      this.leftWingPoint = {
         x: endX + wingLength*Math.sin(direction-(Math.PI*0.25)),
         y: endY + wingLength*Math.sin(direction-(Math.PI*0.75))
      }
      this.rightWingPoint = {
         x: endX - wingLength*Math.sin(direction-(Math.PI*1.75)),
         y: endY - wingLength*Math.sin(direction-(Math.PI*0.25))
      }
   }
   draw() {
      drawLine(this.startPoint,this.endPoint);
      drawLine(this.endPoint,this.leftWingPoint);
      drawLine(this.endPoint,this.rightWingPoint);
   }
}

function drawLine(startPoint,endPoint) {
   context.strokeStyle = "black";
   context.beginPath();
   context.moveTo(startPoint.x,startPoint.y);
   context.lineTo(endPoint.x,endPoint.y);
   context.stroke();
}






class Square {
   constructor(startX, startY, width, height, r = 127, g = 127, b = 127, a = 1, rgbaString = "rgba(127,127,127,1") {
      this.x = startX;
      this.y = startY;
      this.height = height;
      this.width = width;
      this.r = r
      this.g = g
      this.b = b
      this.a = a
      this.rgbaString = numbersToRGBA(r,g,b,a);
   }
   draw() {
      context.fillStyle = this.rgbaString;
      context.fillRect(this.x, this.y, this.height, this.width);
   }
   updateColor(r,g,b,a = 1) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this.rgbaString = numbersToRGBA(r,g,b,a);
   }
   mutateColor(parentSquare) {
      this.r = parentSquare.r - variation();
      this.g = parentSquare.g - variation();
      this.b = parentSquare.b - variation();
      this.restrict(this.r);
      this.restrict(this.g);
      this.restrict(this.b);
      this.rgbaString = numbersToRGBA(this.r,this.g,this.b);
   }
   restrict(color) { 
      if (color < 0) {
         color = 0;
      }
      if (color > 255) {
         color = 255;
      }
   }
}

function initialize() {
   createNewGen(parentSquare);
   drawFamily();
   labelSquares();
}

function numbersToRGBA(r,g,b,a = 1) {
   return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function evolve(nextParent) {
   createNewGen(nextParent);
   clearColors();
   drawFamily();
   labelSquares();
}

function createNewGen(parent) {
   parentSquare.updateColor(parent.r,parent.g,parent.b);
   childOne.mutateColor(parent);
   childTwo.mutateColor(parent);
   childThree.mutateColor(parent);
}

function clearColors() {
   context.fillStyle = "rgba(255,255,255,1)";
   context.fillRect(340,120,120,15);
   context.fillRect(60,260,400,15);
}

function labelSquares() {
   context.font = "bolder 10px Arial";
   context.fillStyle = "rgba(0,0,0,1)";
   context.fillText(parentSquare.rgbaString,340,130);
   context.fillText(childOne.rgbaString,60,270);
   context.fillText(childTwo.rgbaString,200,270);
   context.fillText(childThree.rgbaString,340,270);
}

function drawFamily() {
   parentSquare.draw();
   childOne.draw();
   childTwo.draw();
   childThree.draw();
   drawLineage(parentSquare);
}

//random mutations that cause differences from parent in every kid
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



var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
//draws title
context.fillStyle = "rgba(0,0,0,1)";
context.font = "bold 28px Arial";
context.fillText("Artificial Selection of Square Color", 18, 350);

let arrow1 = new Arrow(250,50,320,50,0,15);
arrow1.draw();
let arrow2 = new Arrow(110,140,110,150,Math.PI*0.5,5); 
arrow2.draw();
let arrow3 = new Arrow(245,140,245,150,Math.PI*0.5,5);
arrow3.draw();
let arrow4 = new Arrow(390,130,390,150,Math.PI*0.5,5);
arrow4.draw();

let treeLineStart = {
   x: 110,
   y: 140
}
let treeLineEnd = {
   x: 390,
   y: 140,
}
drawLine(treeLineStart, treeLineEnd);

var lineage = [];
var generationNum = 0;

let parentSquare = new Square(340, 20, 100, 100);
let childOne = new Square(60, 160, 100, 100);
let childTwo = new Square(200, 160, 100, 100);
let childThree = new Square(340, 160, 100, 100);

initialize();
canvas.addEventListener("mousedown", mouseDown, false);
