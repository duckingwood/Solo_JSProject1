// solo project calculator

const calculator = {
BMI(a, b) {
    return (a/(b * b)) * 703;
  },
  In2Ft(a, b) {
    if (b > 0 || 0 < b) {
      alert("invalid entry in second box, box should be set to 0")
    }else
    return (a/12); 
  }
};

console.log();

const form = document.querySelector("form");
const num1 = document.querySelector("#w");
const num2 = document.querySelector("#h");
const select = document.querySelector("select");
const output = document.querySelector("#output");

// use an anonymous callback function as the 2nd argument
form.addEventListener("submit", function(event) {
  // Prevent the default browser behavior DON'T submit
  event.preventDefault();

  output.textContent = calculator[select.value](num1.value, num2.value);
});

/* Found this on codepen.io & thought it was really
cool & would make the page jump out. It was also interesting to see
the things we can do with javascript. lines 4 the code are 36 - 135 or everything below
https://codepen.io/strangerintheq (css designer)
https://codepen.io/strangerintheq/pen/XWrwjQv (actual pen) */
let rnd = n => (Math.random()-0.5)*(n||1);
let ctx = canvas.getContext("2d");
let g, i, c;
function newSeg(s, dir, da, w){
    return {
      da, 
      col: i+c,
      width: w||s.width - 0.02,
      pts: [s.pts[2], s.pts[3]],
      dir: dir+da,
      len: s.len,
      sw:s.sw  
    };
}
function grow(x,y){

    i = 0, c = rnd(360);
    let da = rnd();
    let n = 2+Math.floor(Math.random()*22);
    let s = 0.7 + rnd(0.5);
    let pts = [x , y]
    g = Array(n).fill(0).map((e,i)=>({
        pts,
        dir: Math.PI/n*i*2 + rnd() + da,
        len: s, 
        width: 10,
        sw:  1.01 + rnd(0.02)
    }))
    requestAnimationFrame(growIteration);
}
function growStep(count){
        ctx.fillStyle="#0000000f" 
    ctx.fillRect(-1e5,-1e5,2e5,2e5)
  for (var j=0; j<count; j++, i++){
    g = g.flat().map(s => {
        calcSegment(s);
        paintSegment(s);
        return growAlgorithm(s);
    });
  }
}
function growAlgorithm(s){

  let result = []

  if(s.width < 0)
     return result; 
   
   let sw = rnd(0.05)

   if (s.width>1 && rnd() > 0.495) {

     let dir = 0.5 + rnd(0.5);
     let w = s.width/2 + rnd() + 0.5;
     result.push(newSeg(s, s.dir+dir + rnd(0.3), sw, w));
     result.push(newSeg(s, s.dir-dir+ rnd(0.3),-sw, w));
     rnd() > 0.4&&result.push(newSeg(s, s.dir,-sw, w));
       
   } else if (rnd() > 0.495) {

     result.push(newSeg(s, s.dir, sw));

   } else {

     result.push(newSeg(s, s.dir, (s.da||0)*s.sw));
       
   }

   return result;
}
function calcSegment(s){
  let x = s.pts[0] + Math.cos(s.dir)*s.len;
  let y = s.pts[1] + Math.sin(s.dir)*s.len;
  s.pts.push(x,y)
}
function growIteration(){
    if (g.length) 
        requestAnimationFrame(growIteration);
    else grow(0,0)
    growStep(output.textContent) //input method that takes output of number and changes grow interation
}
function paintSegment(s){
  ctx.lineWidth = s.width;
  ctx.lineCap ="round"
  ctx.strokeStyle=`hsl(${s.col},55%,55%)`;
  ctx.beginPath();
  ctx.moveTo(s.pts[0], s.pts[1])
  ctx.lineTo(s.pts[2], s.pts[3]);
  ctx.stroke();
}
function resize(){
    if (canvas.width === innerWidth && canvas.height === innerHeight)
        return
 canvas.width = innerWidth;
 canvas.height = innerHeight;
 ctx.translate(innerWidth/2,innerHeight/2)
}
addEventListener("resize", resize);
resize();
grow(0,0)
