var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


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

var colors = [[],[],[],[]];
var parentColor;
var kid1color;
var kid2color;
var kid3color;
var lineage = [];
var generationNum = 0;

let parentSquare = new Square(340, 20, 100, 100);
//parentSquare.draw();
let childOne = new Square(60, 160, 100, 100);
//childOne.draw();
let childTwo = new Square(200, 160, 100, 100);
//childTwo.draw();
let childThree = new Square(340, 160, 100, 100);
//childThree.draw();

function initialize() {
   parentSquare.updateColor(127,127,127);

   childOne.mutateColor(parentSquare);
   childTwo.mutateColor(parentSquare);
   childThree.mutateColor(parentSquare);

   drawFamily();
}

initialize();

//turns user chosen square into new parent and mutates a new generation of squares. a = user chosen square 1, 2, or 3
function numbersToRGBA(r,g,b,a = 1) {
   return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function evolve(nextParent) {
   //give parent colors of chosen nextParent
   //mutate each child from this parent
   //draw new colors
   parentSquare.updateColor(nextParent.r,nextParent.g,nextParent.b);
   childOne.mutateColor(nextParent);
   childTwo.mutateColor(nextParent);
   childThree.mutateColor(nextParent);

   clearColors();
   drawFamily();
}

function levolve(nextParent) {
   //assign new parent based on last choice or initial setup
   if (nextParent == 0) {
         colors[0][0] = "127";
         colors[0][1] = "127";
         colors[0][2] = "127";
   } else {
         for(k = 0; k < 3; k++) {
            colors[0][k] = colors[nextParent][k];
         }
   }

   //mutate rgba values within rgba range. i = square; j = r, g, or b value.
   for (i = 1; i<4; i++) {
         for (j = 0; j<3; j++) {
            colors[i][j] = colors[0][j] - variation();
            restrictOld(i, j);
         }
   }

   parentColor = numbersToRGBA(colors[0][0],colors[0][1],colors[0][2]);
   kid1color = numbersToRGBA(colors[1][0],colors[1][1],colors[1][2]);
   kid2color = numbersToRGBA(colors[2][0],colors[2][1],colors[2][2]);
   kid3color = numbersToRGBA(colors[3][0],colors[3][1],colors[3][2]);

   drawFamilyOld();
   //drawFamily();

}

function clearColors() {
   context.fillStyle = "rgba(255,255,255,1)";
   context.fillRect(340,120,120,15);
   context.fillRect(60,260,400,15);
}

function drawFamily() {
   parentSquare.draw();
   childOne.draw();
   childTwo.draw();
   childThree.draw();

   context.font = "bolder 10px Arial";
   context.fillStyle = "rgba(0,0,0,1)";
   context.fillText(parentSquare.rgbaString,340,130);
   context.fillText(childOne.rgbaString,60,270);
   context.fillText(childTwo.rgbaString,200,270);
   context.fillText(childThree.rgbaString,340,270);
}

//random mutations that cause differences from parent in every kid
function variation() {
   return Math.floor(Math.random()*51)-25;
}

//draws parent, kids, and lineage squares; writes rgba values
function drawFamilyOld() {
   
   //draws parent and kid squares
   context.fillStyle = parentColor;
   context.fillRect(340, 20, 100, 100);
   context.fillStyle = kid1color;
   context.fillRect(60, 160, 100, 100);
   context.fillStyle = kid2color;
   context.fillRect(200, 160, 100, 100);
   context.fillStyle = kid3color;
   context.fillRect(340, 160, 100, 100);

   //draws lineage and updates generation number
   lineage[generationNum] = parentColor;
   for(i=0; i<generationNum; i++){
         context.fillStyle = lineage[i];
         context.fillRect(330 - (20*(generationNum-i)), 70, 18, 18);
   }
   generationNum += 1;
   
   //covers previous rgba values with white Rects then writes new rgba values
   context.fillStyle = "rgba(255,255,255,1)";
   context.fillRect(340,120,120,15);
   context.fillRect(60,260,400,15);
   context.font = "bolder 10px Arial";
   context.fillStyle = "rgba(0,0,0,1)";
   context.fillText(parentColor,340,130);
   context.fillText(kid1color,60,270);
   context.fillText(kid2color,200,270);
   context.fillText(kid3color,340,270);
   
}

//Creates buttons and calls evolve function when buttons are clicked
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

//makes sure that the rgba values stay between 0 and 255. i = square; j = r, g, or b value.
function restrictOld(i, j) { 
   if (colors[i][j] < 0) {
         colors[i][j] = 0;
   }
   if (colors[i][j] > 255) {
         colors[i][j] = 255;
   }
}

//evolve();
canvas.addEventListener("mousedown", mouseDown, false);

