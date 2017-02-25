//The arrays are the key to the logic of the virtual cube. Here the values are stored in arrays and then 
//the arrays reconfigure as the twists are made. This has no affect on the visual affects.
var keyWhite  = [ ['w','w','w'], ['w','w','w'], ['w','w','w'] ];
var keyGreen  = [ ['g','g','g'], ['g','g','g'], ['g','g','g'] ];  
var keyRed    = [ ['r','r','r'], ['r','r','r'], ['r','r','r'] ];
var keyBlue   = [ ['b','b','b'], ['b','b','b'], ['b','b','b'] ];
var keyYellow = [ ['y','y','y'], ['y','y','y'], ['y','y','y'] ];
var keyOrange = [ ['o','o','o'], ['o','o','o'], ['o','o','o'] ];                                    

var orientationRayWhite  = [['wlt', 'wt', 'wrt'],['wl', 'wc', 'wr'],['wbl', 'wb', 'wbr']];   
var orientationRayGreen  = [['glt', 'gt', 'grt'],['gl', 'gc', 'gr'],['gbl', 'gb', 'gbr']];  
var orientationRayRed    = [['rlt', 'rt', 'rrt'],['rl', 'rc', 'rr'],['rbl', 'rb', 'rbr']]; 
var orientationRayBlue   = [['blt', 'bt', 'brt'],['bl', 'bc', 'br'],['bbl', 'bb', 'bbr']]; 
var orientationRayYellow = [['ylt', 'yt', 'yrt'],['yl', 'yc', 'yr'],['ybl', 'yb', 'ybr']]; 
var orientationRayOrange = [['olt', 'ot', 'ort'],['ol', 'oc', 'or'],['obl', 'ob', 'obr']];  

var messWhite  = singleSideMesh(keyWhite, keyGreen, keyOrange, keyBlue, keyRed);
var messGreen  = singleSideMesh(keyGreen, keyOrange, keyWhite, keyRed, keyYellow); 
var messRed    = singleSideMesh(keyRed, keyGreen, keyWhite, keyBlue, keyYellow); 
var messBlue   = singleSideMesh(keyBlue, keyRed, keyWhite, keyOrange, keyYellow);
var messYellow = singleSideMesh(keyYellow, keyGreen, keyRed, keyBlue, keyOrange); 
var messOrange = singleSideMesh(keyOrange, keyBlue, keyWhite, keyGreen, keyYellow);

var masterKeyWhite  = singleSideMesh(keyWhite, keyGreen, keyOrange, keyBlue, keyRed);
var masterKeyGreen  = singleSideMesh(keyGreen, keyOrange, keyWhite, keyRed, keyYellow); 
var masterKeyRed    = singleSideMesh(keyRed, keyGreen, keyWhite, keyBlue, keyYellow); 
var masterKeyBlue   = singleSideMesh(keyBlue, keyRed, keyWhite, keyOrange, keyYellow);
var masterKeyYellow = singleSideMesh(keyYellow, keyGreen, keyRed, keyBlue, keyOrange); 
var masterKeyOrange = singleSideMesh(keyOrange, keyBlue, keyWhite, keyGreen, keyYellow);

//This was because I did not understand how to copy arrays and I had to make my own function
function copyArray(oldRay){
  var newRay = [[],[],[]];
  for(var i = 0; i < 3; i += 1){
    for(var j = 0; j < 3; j += 1){
      newRay[i][j] = oldRay[i][j];
    }
  }  
  return newRay;
}

//For testing
function print2Dray(myRay){
  console.log(myRay[0][0],myRay[0][1],myRay[0][2]);
  console.log(myRay[1][0],myRay[1][1],myRay[1][2]);
  console.log(myRay[2][0],myRay[2][1],myRay[2][2]);
}

//For testing
function printMasterRay(ray){
  for(i = 0; i < 6; i++){    
    for(j = 0; j < 3; j++){
      for(k = 0; k < 3; k += 3){
        console.log(ray[i][j][k], ray[i][j][k+1], ray[i][j][k+2]);
      }       
    }
    console.log('');
  }
}

function mirrorTranslation(oldRay) {
// In the 2d representation of the 3d cube the back side ends up being displayed 
// upside down which has avantages and disadvantages. This function flips the backside 
// around.
  var newRay = [[],[],[]];
  for(var i = 0, ii = 2; i < 3; i++, ii--){
    for(var j = 0, jj = 2; j < 3; j++, jj--){
      newRay[i][j] = oldRay[ii][jj];
    }
  }  
  return newRay;
}

function mirrorTranslation2(oldRay) {
// In the 2d representation of the 3d cube the back side ends up being displayed 
// upside down which has avantages and disadvantages. This function flips the backside 
// around.
  var newRay = [[],[],[]];
  for(var i = 0, ii = 2; i < 3; i++, ii--){
    for(var j = 0; j < 3; j++){
      newRay[i][j] = oldRay[ii][j];
    }
  }  
  return newRay;
}

function add90toSide(oldRay){
//The arrays are by default configured to what works best when white is being turned, 
//the individual ID arrays need spun one way or the other when the rest of the colors 
//are being turned.
  var newRay = [[],[],[]];
  newRay[0][0] = oldRay[2][0];
  newRay[0][1] = oldRay[1][0];
  newRay[0][2] = oldRay[0][0];
  newRay[1][0] = oldRay[2][1];
  newRay[1][1] = oldRay[1][1];
  newRay[1][2] = oldRay[0][1];
  newRay[2][0] = oldRay[2][2];
  newRay[2][1] = oldRay[1][2];
  newRay[2][2] = oldRay[0][2];  
  return newRay;
}

//There would not need to be many different functions if the functions in rubikD.js were refactored
function white(){
  whiteClick(90, 1, 'clk');
}
function whitePrime(){
  whiteClick(-90, 3, 'clk');
  console.log('arrays ',110);
}
function green(){
  greenClick(-90, 1, 'clk');
}
function greenPrime(){
  greenClick(90, 3, 'clk');
}
function red(){
  redClick(90, 1, 'clk');
}
function redPrime(){
  redClick(-90, 3, 'clk');
}
function blue(){
  blueClick(90, 1, 'clk');
}
function bluePrime(){
  blueClick(-90, 3, 'clk');
}
function yellow(){
  yellowClick(-90, 1, 'clk');
}
function yellowPrime(){
  yellowClick(90, 3, 'clk');
}
function orange(){
  orangeClick(-90, 1, 'clk');
}
function orangePrime(){
  orangeClick(90, 3, 'clk');
}

function singleSideMesh(a1, a2, a3, a4, a5){
//this takes a side from each 2d representation of the cube from the Key color array 
//as well as all the sides around it. It then concatenates corners and edges to show 
//what color a sticker shares a cubelet with. These become the IDs of the stickers 
  var b1 = copyArray(a1);
  var b2 = copyArray(a2);
  var b3 = copyArray(a3);
  var b4 = copyArray(a4);
  var b5 = copyArray(a5);
  // set b1[0][0] - top left corner
  if(b2[0][0] > b3[0][2]){ 
    b1[0][0] = b1[0][0].concat(b3[0][2],b2[0][0])
  } else {
    b1[0][0] = b1[0][0].concat(b2[0][0],b3[0][2])
  }
  // set b1[0][1] - top edge
  b1[0][1] = b1[0][1].concat(b3[0][1]);
  // set b1[0][2] - top right corner
  if(b3[0][0] > b4[0][2]){ 
    b1[0][2] = b1[0][2].concat(b4[0][2],b3[0][0])
  } else {
    b1[0][2] = b1[0][2].concat(b3[0][0],b4[0][2])
  }
  // set b1[1][0] - left edge
  b1[1][0] = b1[1][0].concat(b2[0][1]);
  // set b1[1][2] - right edge
  b1[1][2] = b1[1][2].concat(b4[0][1]);
  // set b1[2][0] - bottom left corner
  if(b2[0][2] > b5[0][0]){ 
    b1[2][0] = b1[2][0].concat(b5[0][0],b2[0][2])
  } else {
    b1[2][0] = b1[2][0].concat(b2[0][2],b5[0][0])
  }
  // set b1[2][1] - bottom edge
  b1[2][1] = b1[2][1].concat(b5[0][1]);
  // set b1[2][2] - bottom right corner
  if(b4[0][0] > b5[0][2]){ 
    b1[2][2] = b1[2][2].concat(b5[0][2],b4[0][0])
  } else {
    b1[2][2] = b1[2][2].concat(b4[0][0],b5[0][2])
  }
  return b1;
}

//These may be able to be refactoed as well, but maybe not
function rotateWhiteArray90 (a1, a2, a3, a4, a5){
//This function only manipulates the values in the array, it does nothing with 
//the actual cube. It is called by the function that does manipulate the cube.
  var temp = a1[0][0];//Swap the corners of the top face
  a1[0][0] = a1[2][0];
  a1[2][0] = a1[2][2];
  a1[2][2] = a1[0][2];
  a1[0][2] = temp;
  temp = a1[0][1];
  a1[0][1] = a1[1][0];//swap the edges of the face
  a1[1][0] = a1[2][1];
  a1[2][1] = a1[1][2];
  a1[1][2] = temp;
  temp = a2[0][0];
  a2[0][0] = a3[0][0];//swap the corners of the sides(starting with left top)
  a3[0][0]= a4[0][0];
  a4[0][0] = a5[0][0];
  a5[0][0] = temp;
  temp = a2[0][2];
  a2[0][2] = a3[0][2];//swap the corners of the sides(starting with left bottom)
  a3[0][2]= a4[0][2];
  a4[0][2] = a5[0][2];
  a5[0][2] = temp; 
  temp = a2[0][1];
  a2[0][1] = a3[0][1];//swap the edges of the sides
  a3[0][1]= a4[0][1];
  a4[0][1] = a5[0][1];
  a5[0][1] = temp;  
}

function rotateYellowArray90 (a1, a2, a3, a4, a5){
  var temp = a1[0][0];
  a1[0][0] = a1[2][0];
  a1[2][0] = a1[2][2];
  a1[2][2] = a1[0][2];
  a1[0][2] = temp;
  temp = a1[0][1];
  a1[0][1] = a1[1][0];
  a1[1][0] = a1[2][1];
  a1[2][1] = a1[1][2];
  a1[1][2] = temp;
  temp = a2[2][2];
  a2[2][2] = a3[2][2];
  a3[2][2]= a4[2][2];
  a4[2][2] = a5[2][2];
  a5[2][2] = temp;
  temp = a2[2][0];
  a2[2][0] = a3[2][0];
  a3[2][0]= a4[2][0];
  a4[2][0] = a5[2][0];
  a5[2][0] = temp; 
  temp = a2[2][1];
  a2[2][1] = a3[2][1];
  a3[2][1]= a4[2][1];
  a4[2][1] = a5[2][1];
  a5[2][1] = temp;  
}

function rotateRedArray90 (a1, a2, a3, a4, a5){
  var temp = a1[0][0];
  a1[0][0] = a1[2][0];
  a1[2][0] = a1[2][2];
  a1[2][2] = a1[0][2];
  a1[0][2] = temp;
  temp = a1[0][1];
  a1[0][1] = a1[1][0];
  a1[1][0] = a1[2][1];
  a1[2][1] = a1[1][2];
  a1[1][2] = temp;
  temp = a2[0][2];
  a2[0][2] = a3[0][0];
  a3[0][0]= a4[2][0];
  a4[2][0] = a5[2][2];
  a5[2][2] = temp;
  temp = a2[2][2];
  a2[2][2] = a3[0][2];
  a3[0][2]= a4[0][0];
  a4[0][0] = a5[2][0];
  a5[2][0] = temp; 
  temp = a2[1][2];
  a2[1][2] = a3[0][1];
  a3[0][1]= a4[1][0];
  a4[1][0] = a5[2][1];
  a5[2][1] = temp;  
}

function rotateOrangeArray90 (a1, a2, a3, a4, a5){
  var temp = a1[0][0];
  a1[0][0] = a1[2][0];
  a1[2][0] = a1[2][2];
  a1[2][2] = a1[0][2];
  a1[0][2] = temp;
  temp = a1[0][1];
  a1[0][1] = a1[1][0];
  a1[1][0] = a1[2][1];
  a1[2][1] = a1[1][2];
  a1[1][2] = temp;
  temp = a2[0][2];
  a2[0][2] = a3[2][2];
  a3[2][2] = a4[2][0];
  a4[2][0] = a5[0][0];
  a5[0][0] = temp;
  temp = a2[1][2];
  a2[1][2] = a3[2][1];
  a3[2][1]= a4[1][0];
  a4[1][0] = a5[0][1];
  a5[0][1] = temp; 
  temp = a2[2][2];
  a2[2][2] = a3[2][0];
  a3[2][0]= a4[0][0];
  a4[0][0] = a5[0][2];
  a5[0][2] = temp;  
}

function rotateBlueArray90 (a1, a2, a3, a4, a5){
  var temp = a1[0][0];
  a1[0][0] = a1[2][0];
  a1[2][0] = a1[2][2];
  a1[2][2] = a1[0][2];
  a1[0][2] = temp;
  temp = a1[0][1];
  a1[0][1] = a1[1][0];
  a1[1][0] = a1[2][1];
  a1[2][1] = a1[1][2];
  a1[1][2] = temp;
  temp = a2[0][2];
  a2[0][2] = a3[0][2];
  a3[0][2] = a4[2][0];
  a4[2][0] = a5[0][2];
  a5[0][2] = temp;
  temp = a2[1][2];
  a2[1][2] = a3[1][2];
  a3[1][2]= a4[1][0];
  a4[1][0] = a5[1][2];
  a5[1][2] = temp; 
  temp = a2[2][2];
  a2[2][2] = a3[2][2];
  a3[2][2]= a4[0][0];
  a4[0][0] = a5[2][2];
  a5[2][2] = temp;  
}

function rotateGreenArray90 (a1, a2, a3, a4, a5){
  var temp = a1[0][0];
  a1[0][0] = a1[2][0];
  a1[2][0] = a1[2][2];
  a1[2][2] = a1[0][2];
  a1[0][2] = temp;
  temp = a1[0][1];
  a1[0][1] = a1[1][0];
  a1[1][0] = a1[2][1];
  a1[2][1] = a1[1][2];
  a1[1][2] = temp;
  temp = a2[0][2];
  a2[0][2] = a3[2][0];
  a3[2][0] = a4[2][0];
  a4[2][0] = a5[2][0];
  a5[2][0] = temp;
  temp = a2[1][2];
  a2[1][2] = a3[1][0];
  a3[1][0]= a4[1][0];
  a4[1][0] = a5[1][0];
  a5[1][0] = temp; 
  temp = a2[2][2];
  a2[2][2] = a3[0][0];
  a3[0][0]= a4[0][0];
  a4[0][0] = a5[0][0];
  a5[0][0] = temp;  
}

function getMaster(w,g,r,b,y,o){
//This function turns the 2d arrays sent to it into an array, basically making a 3d 
//array of the cube. It will be called o create a masterID array, as well as a 
//masterOrientation array.
  var newRay = [];
  newRay= [w,g,r,b,y,o]
  return newRay;    
}









