var myX = document.getElementById('xRange').value;
var myY = document.getElementById('yRange').value;
var myZ = document.getElementById('zRange').value;
var planeWidth = $('.plane').css('width');
var TURNSPEED = 250;
var justClicked = false;

if(parseInt(planeWidth) > 500){
  planeWidth = '500px';
}
$('.plane').css('height', planeWidth);

var screenWidth = $('body').css('width');

$(window).resize(function() {
  screenWidth = $('body').css('width');
  $('#width').html(screenWidth);
  var planeWidth = $('.plane').css('width');
  if(parseInt(planeWidth) > 500){
    planeWidth = '500px';
  }
  $('.plane').css('height', planeWidth);    
});

//The following functions control the x,y,z rotations for the slider bars
//The current version does not include the slide bars
function xSlide() {
  myX = document.getElementById('xRange').value;
  $('.xplane').css('transition', '4s');
  $('.xplane').css('transform', 'rotateX(' + myX +'deg)');
  $('.messenger').text('X = ' + myX + ', Y = ' + myY + ', Z = ' + myZ);
}

function ySlide() {
  myY = document.getElementById('yRange').value;
  $('.yplane').css('transition', '4s')
  $('.yplane').css('transform', 'rotateY(' + myY +'deg)');
  $('.messenger').text('X = ' + myX + ', Y = ' + myY + ', Z = ' + myZ);
}

function zSlide() {
  myZ = document.getElementById('zRange').value;
  $('.zplane').css('transition', '4s')
  $('.zplane').css('transform', 'rotateZ(' + myZ +'deg)');
  $('.messenger').text('X = ' + myX + ', Y = ' + myY + ', Z = ' + myZ);
}

function whiteClick(degs, multiplier, source){  
	if(source === 'clk') {
		justClicked = true;
	}
	console.log('rubikD', 50,  source);
    whiteTwist(messWhite, messGreen, messRed, messBlue, messOrange, degs, multiplier, source);
}

//The following several functions should be refactred into  single colorClick() function

function yellowClick(degs, multiplier, source){  
  var tempYellow = copyArray(messYellow);
  var tempBlue = add90toSide(messBlue);  
  tempBlue = add90toSide(tempBlue);
  var tempRed = add90toSide(messRed);
  tempRed = add90toSide(tempRed);
  var tempGreen = add90toSide(messGreen);
  tempGreen = add90toSide(tempGreen); 
  var tempOrange = add90toSide(messOrange);  
  tempOrange = add90toSide(tempOrange);   
  yellowTwist(tempYellow, tempGreen, tempOrange, tempBlue, tempRed, degs, multiplier, source);
}

function redClick(degs, multiplier, source){
  var tempRed = copyArray(messRed);
  var tempGreen = add90toSide(messGreen);
  tempGreen = add90toSide(tempGreen);
  tempGreen = add90toSide(tempGreen);
  var tempYellow = copyArray(messYellow);
  var tempBlue = add90toSide(messBlue); 
  var tempWhite = add90toSide(messWhite);  
  tempWhite = add90toSide(tempWhite);  
  redTwist(tempRed,tempGreen,tempYellow,tempBlue,tempWhite,degs, multiplier, source);
}

function orangeClick(degs, multiplier, source){
  var tempOrange = copyArray(messOrange);
  var tempBlue = add90toSide(messBlue);
  tempBlue = add90toSide(tempBlue);
  tempBlue = add90toSide(tempBlue);
  var tempYellow = add90toSide(messYellow);
  tempYellow = add90toSide(tempYellow);
  var tempGreen = add90toSide(messGreen);
  var tempWhite = copyArray(messWhite);  
  orangeTwist(tempOrange, tempBlue, tempYellow, tempGreen, tempWhite, degs, multiplier, source);
}

function blueClick(degs, multiplier, source){  
  var tempBlue = copyArray(messBlue);
  var tempRed = add90toSide(messRed);
  tempRed = add90toSide(tempRed);
  tempRed = add90toSide(tempRed);
  var tempYellow = add90toSide(messYellow);
  tempYellow = add90toSide(tempYellow);
  tempYellow = add90toSide(tempYellow);
  var tempOrange = add90toSide(messOrange);
  var tempWhite = add90toSide(messWhite);
  tempWhite = add90toSide(tempWhite);
  tempWhite = add90toSide(tempWhite);  
  blueTwist(tempBlue, tempRed, tempYellow, tempOrange, tempWhite, degs, multiplier, source);
}

function greenClick(degs, multiplier, source){  
  var tempGreen = copyArray(messGreen);
  var tempOrange = add90toSide(messOrange);
  tempOrange = add90toSide(tempOrange);
  tempOrange = add90toSide(tempOrange);
  var tempYellow = add90toSide(messYellow);
  var tempRed = add90toSide(messRed);
  var tempWhite = add90toSide(messWhite);  
  greenTwist(tempGreen, tempOrange, tempYellow, tempRed, tempWhite, degs, multiplier, source);
}

function clickMidX(degs, multiplier, source){
  var tempYellow = copyArray(messYellow);
  var tempBlue = add90toSide(messBlue);  
  tempBlue = add90toSide(tempBlue);
  var tempRed = add90toSide(messRed);
  tempRed = add90toSide(tempRed);
  var tempGreen = add90toSide(messGreen);
  tempGreen = add90toSide(tempGreen); 
  var tempOrange = add90toSide(messOrange);  
  tempOrange = add90toSide(tempOrange);    
  whiteYellowTwist(messWhite, messGreen, messRed, messBlue, messOrange,tempYellow, 
  tempGreen, tempOrange, tempBlue, tempRed, degs, multiplier, source);
}

function clickMidY(degs, multiplier, source){
  var tempBlue = copyArray(messBlue);
  var tempRed = add90toSide(messRed);
  tempRed = add90toSide(tempRed);
  tempRed = add90toSide(tempRed);
  var tempYellow = add90toSide(messYellow);
  tempYellow = add90toSide(tempYellow);
  tempYellow = add90toSide(tempYellow);
  var tempOrange = add90toSide(messOrange);
  var tempWhite = add90toSide(messWhite);
  tempWhite = add90toSide(tempWhite);
  tempWhite = add90toSide(tempWhite);
  
  var tempGreen2 = copyArray(messGreen);
  var tempOrange2 = add90toSide(messOrange);
  tempOrange2 = add90toSide(tempOrange2);
  tempOrange2 = add90toSide(tempOrange2);
  var tempYellow2 = add90toSide(messYellow);
  var tempRed2 = add90toSide(messRed);
  var tempWhite2 = add90toSide(messWhite);  
  blueGreenTwist(tempBlue, tempRed, tempYellow, tempOrange, tempWhite, tempGreen2, 
  tempOrange2, tempYellow2, tempRed2, tempWhite2, degs, multiplier, source); 
}

function clickMidZ(degs, multiplier, source){
  var tempRed = copyArray(messRed);
  var tempGreen = add90toSide(messGreen);
  tempGreen = add90toSide(tempGreen);
  tempGreen = add90toSide(tempGreen);
  var tempYellow = copyArray(messYellow);
  var tempBlue = add90toSide(messBlue); 
  var tempWhite = add90toSide(messWhite);  
  tempWhite = add90toSide(tempWhite); 
  
  var tempOrange2 = copyArray(messOrange);
  var tempBlue2 = add90toSide(messBlue);
  tempBlue2 = add90toSide(tempBlue2);
  tempBlue2 = add90toSide(tempBlue2);
  var tempYellow2 = add90toSide(messYellow);
  tempYellow2 = add90toSide(tempYellow2);
  var tempGreen2 = add90toSide(messGreen);
  var tempWhite2 = copyArray(messWhite);
  
  redOrangeTwist(tempRed, tempGreen, tempYellow, tempBlue, tempWhite, tempOrange2, 
  tempBlue2, tempYellow2, tempGreen2, tempWhite2, degs, multiplier, source);
}

function affectedStickersIds(a1, a2, a3, a4, a5){
  var j = 0;
  var newRay = [];
  //The for loops take the desired values out of the parameters, which are arrays, 
  //and stores them into a single array.
  for(var k = 0; k < 3; k +=1){
    for(var i = 0; i < 3; i += 1){
      newRay[j] = a1[k][i];
      j += 1;
    }
  }
  for(i = 0; i < 3; i += 1){
    newRay[j] = a2[0][i];
    j += 1;
    newRay[j] = a3[0][i];
    j += 1;
    newRay[j] = a4[0][i];
    j += 1;
    newRay[j] = a5[0][i];
    j += 1;
  }  
  return newRay;
}

function turnBack(){
  $('#dynamic').css('transform','rotateZ(0deg)'); 
}

//The following several functions need to be refactored into a single colorTwist() function
function whiteTwist(a1, a2, a3, a4, a5, myDeg, myIndex, sr) {
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);
  //printStickerRay(stickerRay);
  
  if(sr != 'uhvr') {
	  appendToDynamic(stickerRay, sr);  	
	  $('#dynamic').css('transition', '.5s');
	  $('#dynamic').css('transform','rotateZ(' + myDeg + 'deg)'); 
  } else if(!justClicked)  {
	appendToStatic(stickerRay);
  }
  
  console.log('source = ', sr);
  if(sr === 'clk') {
	  for(var i = 0; i < myIndex; i++ ){
		rotateWhiteArray90(messWhite, messGreen, messRed, messBlue, messOrange);
	  }
  
  //var master = getMaster(messWhite,messGreen,messRed,messBlue,messYellow,messOrange);
  //printMasterRay(master);
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack,TURNSPEED);
  } 
}

function yellowTwist(a1, a2, a3, a4, a5, myDeg, myIndex, sr) {
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);  
  appendToDynamic(stickerRay);   
  $('#dynamic').css('transition', '.5s');
  $('#dynamic').css('transform','rotateZ(' + myDeg + 'deg)'); 
  for(var i = 0; i < myIndex; i++ ){
    rotateYellowArray90(messYellow, messGreen, messOrange, messBlue, messRed);
  }
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack,TURNSPEED);
}

function redTwist(a1, a2, a3, a4, a5, myDeg, myIndex, sr){
	console.log(sr);
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);
  appendToDynamic(stickerRay);
  $('#dynamic').css('transition', '.5s');
  $('#dynamic').css('transform','rotateY(' + myDeg + 'deg)');
  for(var i = 0; i < myIndex; i++ ){
    rotateRedArray90(messRed, messGreen, messYellow, messBlue, messWhite);
  } 
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack, TURNSPEED);
}
 
function orangeTwist(a1, a2, a3, a4, a5, myDeg, myIndex, sr) {
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);
  appendToDynamic(stickerRay);  
  $('#dynamic').css('transition', '.5s');
  $('#dynamic').css('transform','rotateY(' + myDeg + 'deg)'); 
  for(var i = 0; i < myIndex; i++ ){
    rotateOrangeArray90(messOrange, messBlue, messYellow, messGreen, messWhite );
  }
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack, TURNSPEED);
}

function blueTwist(a1, a2, a3, a4, a5, myDeg, myIndex, sr) {
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);  
  appendToDynamic(stickerRay);  
  $('#dynamic').css('transition', '.3s');
  $('#dynamic').css('transform','rotateX(' + myDeg + 'deg)'); 
  for(var i = 0; i < myIndex; i++ ){
    rotateBlueArray90(messBlue, messRed, messYellow, messOrange, messWhite );
  }
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack, TURNSPEED);
}

function greenTwist(a1, a2, a3, a4, a5, myDeg, myIndex, sr) {
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);
  appendToDynamic(stickerRay);  
  $('#dynamic').css('transition', '.5s');
  $('#dynamic').css('transform','rotateX(' + myDeg + 'deg)'); 
  for(var i = 0; i < myIndex; i++ ){
    rotateGreenArray90(messGreen, messOrange, messYellow, messRed, messWhite );
  }
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack,TURNSPEED);
}
 
function whiteYellowTwist(a1, a2, a3, a4, a5, b1, b2, b3, b4, b5, myDeg, myIndex, sr){
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);
  var stickerRay2 = affectedStickersIds(b1, b2, b3, b4, b5);
  stickerRay = stickerRay.concat(stickerRay2); 
  appendToDynamic(stickerRay);  
  $('#dynamic').css('transition', '.5s');
  $('#dynamic').css('transform','rotateZ(' + myDeg + 'deg)'); 
  for(var i = 0; i < myIndex; i++ ){
    rotateWhiteArray90(messWhite, messGreen, messRed, messBlue, messOrange);   
  }
  if (myIndex === 3) {
    myIndex = 1;
  } else if (myIndex === 1){
    myIndex = 3;
  } else {
    myIndex = 2;
  }
  for(var i = 0; i < myIndex; i++ ){    
    rotateYellowArray90(messYellow, messGreen, messOrange, messBlue, messRed);
  }
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack,TURNSPEED);  
}

function blueGreenTwist(a1, a2, a3, a4, a5, b1, b2, b3, b4, b5, myDeg, myIndex, sr){
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);
  var stickerRay2 = affectedStickersIds(b1, b2, b3, b4, b5);
  stickerRay = stickerRay.concat(stickerRay2); 
  appendToDynamic(stickerRay);  
  $('#dynamic').css('transition', '.5s');
  $('#dynamic').css('transform','rotateX(' + myDeg + 'deg)'); 
  for(var i = 0; i < myIndex; i++ ){
    rotateBlueArray90(messBlue, messRed, messYellow, messOrange, messWhite);   
  }
  if (myIndex === 3) {
    myIndex = 1;
  } else if (myIndex === 1){
    myIndex = 3;
  } else {
    myIndex = 2;
  }
  for(var i = 0; i < myIndex; i++ ){    
    rotateGreenArray90(messGreen, messOrange, messYellow, messRed, messWhite);
  }
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack, TURNSPEED);  
}

function redOrangeTwist(a1, a2, a3, a4, a5, b1, b2, b3, b4, b5, myDeg, myIndex, sr){
  var stickerRay = affectedStickersIds(a1, a2, a3, a4, a5);
  var stickerRay2 = affectedStickersIds(b1, b2, b3, b4, b5);
  stickerRay = stickerRay.concat(stickerRay2); 
  appendToDynamic(stickerRay);  
  $('#dynamic').css('transition', '.5s');
  $('#dynamic').css('transform','rotateY(' + myDeg + 'deg)'); 
  for(var i = 0; i < myIndex; i++ ){
    rotateRedArray90(messRed, messGreen, messYellow, messBlue, messWhite);   
  }
  if (myIndex === 3) {
    myIndex = 1;
  } else if (myIndex === 1){
    myIndex = 3;
  } else {
    myIndex = 2;
  }
  for(var i = 0; i < myIndex; i++ ){    
    rotateOrangeArray90(messOrange, messBlue, messYellow, messGreen, messWhite);
  }
  setTimeout(appendToStatic, TURNSPEED);
  setTimeout(turnBack, TURNSPEED);   
}

function appendToDynamic(affected, sr){
 // if(sr === 'hvr'  || justClicked) {
	  var myInnerHTML = '';
		  
	  while(affected.length > 0){
		var tempId = affected.pop(); //tempId now holds the ID  as a string 
		var child = document.getElementById(tempId);    
		var newPos = getOrientationClass(tempId);
		document.getElementById('static').removeChild(child); 
		myInnerHTML += '<div class="sticker s' + tempId + ' ' + newPos + '">' + tempId + '</div>';              
	  }
	  document.getElementById('dynamic').innerHTML = myInnerHTML;  
  //}
}

function appendToStatic(){
  var staticDiv = document.getElementById('static');
  var dynamicDiv = document.getElementById('dynamic'); 
  var staticInnerHTML = staticDiv.innerHTML;
  var idRay = [];
  var myDivs = dynamicDiv.getElementsByClassName('sticker');

  for( i = 0; i < myDivs.length; i += 1 ){
    idRay[i] = myDivs[i].innerText;
  }  
  while(idRay.length > 0){
    var tempId = idRay.pop();    
    var newPos = getOrientationClass(tempId);
    staticInnerHTML += '<div id="' + tempId + '" class="sticker ' + newPos + '">' + tempId + '</div>';     
  }
  staticDiv.innerHTML = staticInnerHTML;  
  $("#dynamic").empty(); 
} 

function getOrientationClass(stickerId) {
  var color;
  var row;
  var column;
  var masterId = getMaster(messWhite, messGreen, messRed, messBlue, messYellow, messOrange);
  var masterOrientation = getMaster(orientationRayWhite, orientationRayGreen, orientationRayRed, orientationRayBlue, orientationRayYellow, orientationRayOrange);
  // get the coordinates of the proper orientation in masterOrientation
  for(var i = 0; i < 6; i++){
    for(var j = 0; j < 3; j++){
      for(var k = 0; k < 3; k++){
        if(stickerId === masterId[i][j][k]){
          color = i;
          row = j;
          column = k;            
        }
      }
    }    
  }
  var newOrientation = masterOrientation[color][row][column];
  return newOrientation;
}

//WHEN HOVERING OVER A BUTON THE CORROSPONDING SIDE SHOULD MOVE 5 DEG 
//AND GO BACK  AFTER HOVER
function preview() {
	//whiteClick(5, 1, 'hvr');
}

function unpreview() {
	//if (!justClicked) {
		//whiteClick(-5, 1, 'uhvr');	
	//} 
	//justClicked = false;
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  