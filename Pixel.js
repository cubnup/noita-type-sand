class Pixel{
  constructor(x,y,state,size){
    this.pos=createVector(x,y);
    this.state=state;
    this.size=size;
  }
  show(){
    if(this.state=="water"||this.state=="waterf") fill("#096be3");
    else if(this.state=="sand"||this.state=="sandf") fill("#ffe064");
    else if(this.state=="rock") fill("#666699");
    else fill(0);
    rect(this.pos.x,this.pos.y,this.size,this.size)
  }
}