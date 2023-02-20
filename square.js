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
      this.restrict();
      //this.g = restrict(this.g);
      //this.b = restrict(this.b);
      this.rgbaString = numbersToRGBA(this.r,this.g,this.b);
   }
   restrict() { 
      if (this.r < 0) {
         this.r = 0;
      }
      if (this.g < 0) {
         this.g = 0;
      }
      if (this.b < 0) {
         this.b = 0;
      }
      if (this.r > 255) {
         this.r = 255;
      }
      if (this.g > 255) {
         this.g = 255;
      }
      if (this.b > 255) {
         this.b = 255;
      }
   }
}