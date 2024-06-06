class Food{
  constructor(x, y, imgPath){
      this.x = x;
      this.y = y;
      this.img = loadImage(imgPath);
  }

  display() {
      image(this.img, this.x, this.y);
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }
  
}