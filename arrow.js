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
      this.drawLine(this.startPoint,this.endPoint);
      this.drawLine(this.endPoint,this.leftWingPoint);
      this.drawLine(this.endPoint,this.rightWingPoint);
   }
   drawLine(startPoint,endPoint) {
      context.strokeStyle = "black";
      context.beginPath();
      context.moveTo(startPoint.x,startPoint.y);
      context.lineTo(endPoint.x,endPoint.y);
      context.stroke();
   }
}