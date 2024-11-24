let screen=[]
let scrw=550
let scrh=400
let mouseDown=false
const divisor=10


function mousePressed(){
  mouseDown=true;
}

function mouseReleased(){
  mouseDown=false;
}

function switchState(px,state){
  console.log("switched!")
  return new Pixel(px.pos.x,px.pos.y,state,divisor-1);
}

function sand(){
  let w=scrw/divisor;
  let h=scrh/divisor;
  for(let y in screen){
    y=parseInt(y);
    for(let x in screen[y]){
      let r = round(random())
      let moved=false;
      x=parseInt(x);
      if(y+1<h){
        if(screen[y][x].state=="sand"){
          
          if(screen[y+1][x].state=="void"){
            screen[y][x].state="void"
            screen[y+1][x].state="sandf"
            moved=true
          }else if(screen[y+1][x].state=="water"){
            let r2 = random()
            if(r2<=0.25&&x>0&&!moved){
              screen[y][x].state="void"
              screen[y][x-1].state="water"
              screen[y+1][x-1].state="sandf"
            }else if(r2>0.25&&r2<=0.5&&x<w-1&&!moved){
              screen[y][x].state="void"
              screen[y][x+1].state="water"
              screen[y+1][x+1].state="sandf"
            }else{
              screen[y][x].state="water"
              screen[y+1][x].state="sandf"
            }
            moved=true
          }
          
          else{
            if(r)if(x<w-1&&!moved){
              if(screen[y+1][x+1].state=="void"&&screen[y][x+1].state!="rock"){
                screen[y][x].state="void"
                screen[y+1][x+1].state="sandf"
                moved=true;
              }else if(screen[y][x+1].state=="void"&&!moved&&screen[y+1][x+1].state=="water"&&screen[y][x+1].state!="rock"){
                screen[y][x].state="waterf"
                screen[y+1][x+1].state="sandf"
                moved=true;
              }
            }
            
            if(x>0&&!moved){
              if(screen[y+1][x-1].state=="void"&&screen[y][x-1].state!="rock"){
                screen[y][x].state="void"
                screen[y+1][x-1].state="sandf"
                moved=true;
              }else if(screen[y][x-1].state=="void"&&!moved&&screen[y+1][x-1].state=="water"&&screen[y][x-1].state!="rock"){
                screen[y][x].state="waterf"
                screen[y+1][x-1].state="sandf"
                moved=true;
              }
          } if(x<w-1&&!moved){
              if(screen[y+1][x+1].state=="void"&&screen[y][x+1].state!="rock"){
                screen[y][x].state="void"
                screen[y+1][x+1].state="sandf"
                moved=true;
              }else if(screen[y][x+1].state=="void"&&!moved&&screen[y+1][x+1].state=="water"&&screen[y][x+1].state!="rock"){
                screen[y][x].state="waterf"
                screen[y+1][x+1].state="sandf"
                moved=true;
              }
            } 
          }
        }
        }
        if(screen[y][x].state=="sandf")screen[y][x].state="sand";
    }
  }
}

function water(){
  let emptyRows=new Array(screen.length).fill(false);
  let w=scrw/divisor;
  let h=scrh/divisor;
  for(let y in screen){
    y=parseInt(y);
    for(let x in screen[y]){
      
      r=round(random())
      x=parseInt(x);  
      screen[y][x].show();
      let moved=false;
      if(screen[y][x].state=="void")emptyRows[y]=true;
      if(y+1<h){
        if(screen[y][x].state=="water"){
          if(screen[y+1][x].state=="void"){
            screen[y][x].state="void"
            screen[y+1][x].state="waterf"
          }
          else{
            if(r){
              if(x<w-1&&!moved){
                if(screen[y+1][x+1].state=="void"&&screen[y][x+1].state!="rock"){
                  screen[y][x].state="void"
                  screen[y+1][x+1].state="waterf"
                  moved=true;
                }
              }
            }if(x>0&&!moved){
              if(screen[y+1][x-1].state=="void"&&screen[y][x-1].state!="rock"){
                screen[y][x].state="void"
                screen[y+1][x-1].state="waterf"
                moved=true;
              }
          } if(x<w-1&&!moved){
              if(screen[y+1][x+1].state=="void"&&screen[y][x+1].state!="rock"){
                screen[y][x].state="void"
                screen[y+1][x+1].state="waterf"
                moved=true;
              }
            }
            }
          }
        }
            if(!moved&&screen[y][x].state=="water"){
              
              if(r){
                if(x<w-1&&!moved)if(screen[y][x+1].state=="void"){
                  screen[y][x].state="void"
                  screen[y][x+1].state="waterf" 
                  moved=true
                }
              }
              
                if(x>0&&!moved)if(screen[y][x-1].state=="void"){
                  screen[y][x].state="void"
                  screen[y][x-1].state="waterf"
                  moved=true
                }
                if(x<w-1&&!moved)if(screen[y][x+1].state=="void"){
                  screen[y][x].state="void"
                  screen[y][x+1].state="waterf" 
                  moved=true
                }
              if(!moved) screen[y][x].state="waterf"
            }
        if(screen[y][x].state=="waterf")screen[y][x].state="water";
    }
  }
}

function setup() {
  createCanvas(scrw,scrh);
  for(let y=0;y<scrh/divisor;y++){
    screen.push([])
    for(let x=0;x<scrw/divisor;x++){
      screen[y].push(new Pixel(x*divisor,y*divisor,"void",divisor-1))
    }
  }
}

function draw() {
  background(220);
  if(mouseDown&&mouseX>0&&mouseY>0&&mouseX<scrw-10&&mouseY<scrh-10){
  if(true){
    if(keyIsDown(16)){
      screen[Math.round(mouseY/divisor)][Math.round(mouseX/divisor)]=new Pixel(Math.round(mouseX/divisor)*divisor,Math.round(mouseY/divisor)*divisor,"water",divisor-1);
    }
    else if(keyIsDown(17)){screen[Math.round(mouseY/divisor)][Math.round(mouseX/divisor)]=new Pixel(Math.round(mouseX/divisor)*divisor,Math.round(mouseY/divisor)*divisor,"rock",divisor-1);
  } 
    else if(keyIsDown(226)){screen[Math.round(mouseY/divisor)][Math.round(mouseX/divisor)]=new Pixel(Math.round(mouseX/divisor)*divisor,Math.round(mouseY/divisor)*divisor,"void",divisor-1);
  }
    else screen[Math.round(mouseY/divisor)][Math.round(mouseX/divisor)]=new Pixel(Math.round(mouseX/divisor)*divisor,Math.round(mouseY/divisor)*divisor,"sand",divisor-1);
  }
  }
  sand();
  water();
}
