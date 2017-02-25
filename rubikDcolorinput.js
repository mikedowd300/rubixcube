//This file deals with the JS needed to provide the color input form.
//It does not actually include any form elements

var setColorRay =  [[],[],[]];
var inputStickCount = 0; //counts the stickers input by user

function setColorToTop(x, y, z) {
//This function brings the selected side to the top side
  $('.xplane').css('transition', '1s');
  $('.xplane').css('transform', 'rotateX(' + x +'deg)');
  $('#xRange').val(x);
  
  $('.yplane').css('transition', '1s');
  $('.yplane').css('transform', 'rotateY(' + y +'deg)');
  $('#yRange').val(y);

  $('.zplane').css('transition', '1s');
  $('.zplane').css('transform', 'rotateZ(' + z +'deg)');
  $('#zRange').val(z);
}

function formatter(){
  //These new formats are what the keyFrames transition to, they are set on a timer
  // so it looks like the keyFrame transformation causes them  
  $('#' + nextColor + 'promptX').css('width', '270px');
  $('#' + nextColor + 'promptX').css('height', '270px');
  $('#' + nextColor + 'promptZZ').css('transform', 'translateZ(150px)');
  $('#' + nextColor + 'promptX').css('background-color', stickColorLight);
  $('#' + nextColor + 'promptX').css('transform', 'rotateX(-35deg)');
  $('#' + nextColor + 'promptY').css('transform', 'rotateY(-35deg)');  
  $('#' + nextColor + 'promptZ').css('transform', 'rotateZ(-9deg)');
  $('#' + nextColor + 'promptZ').css('left', '-360px');
  $('#' + nextColor + 'promptX').css('top', '360px');
  $('.promptSticker').css('background-color', 'transparent');
  $('.promptSticker').css('width', '31%');
  $('.promptSticker').css('height', '31%');
  $('.colorOption').css('height', '22%'); 
  $('.ps5').css('background-color', stickColor);
  setTimeout(colorOptionsForPrompt,0);
}

function formatter2(){
  $('.colorOption').css('height', '22%');
  $('.ps5').css('color', 'black');
}

function colorOptionsForPrompt(){
  var divs;  
  for(i = 1; i <= 4; i++){
    divs = '<div onclick="bigColor(\'white\', ' + i + ')" class="colorOption whiteOption"></div>';
    divs += '<div onclick="bigColor(\'green\', ' + i + ')" class="colorOption greenOption"></div>';
    divs += '<div onclick="bigColor(\'red\', ' + i + ')" class="colorOption redOption"></div>';
    divs += '<div onclick="bigColor(\'blue\', ' + i + ')" class="colorOption blueOption"></div>';
    divs += '<div onclick="bigColor(\'orange\', ' + i + ')" class="colorOption orangeOption"></div>';
    divs += '<div onclick="bigColor(\'yellow\', ' + i + ')" class="colorOption yellowOption"></div>';
    var tempStr = '.ps'.concat(i);
    var $temp = $(tempStr);
    $temp.html(divs);    
  } 
  
  for(i = 6; i <= 9; i++){
    divs = '<div onclick="bigColor(\'white\', ' + i + ')" class="colorOption whiteOption"></div>';
    divs += '<div onclick="bigColor(\'green\', ' + i + ')" class="colorOption greenOption"></div>';
    divs += '<div onclick="bigColor(\'red\', ' + i + ')" class="colorOption redOption"></div>';
    divs += '<div onclick="bigColor(\'blue\', ' + i + ')" class="colorOption blueOption"></div>';
    divs += '<div onclick="bigColor(\'orange\', ' + i + ')" class="colorOption orangeOption"></div>';
    divs += '<div onclick="bigColor(\'yellow\', ' + i + ')" class="colorOption yellowOption"></div>';
    var tempStr = '.ps'.concat(i);
    var $temp = $(tempStr);
    $temp.html(divs);    
  } 
  setTimeout(formatter2,2000);
}

function detach(){
// This function floats, rotates and enlarges a side, bringing it to the user for input.
  nextColor = "";
  stickColor = "";
  switch (colorSide) {
    case 0:
        nextColor = "w";
        setColorToTop('38', '14', '28');//White
        stickColor = 'rgba(255, 255, 255, .7)';
        stickColorLight = 'rgba(255, 255, 255, .2)';
        break;
    case 1:
        nextColor = "g";
        setColorToTop('-70', '130', '-47');//Green 
        stickColor = 'rgba(0, 128, 0, .7)'; 
        stickColorLight = 'rgba(0, 128, 0, .2)';
        break;
    case 2:
        nextColor = "r";
        setColorToTop('129', '13', '27');//Red
        stickColor = 'rgba(255, 0, 0, .7)';
        stickColorLight = 'rgba(255, 0, 0, .2)';
        break;
    case 3:
        nextColor = "b";
        setColorToTop('68', '-50', '-44');//Blue
        stickColor = 'rgba(0, 0, 255, .7)';
        stickColorLight = 'rgba(0, 0, 255, .2)';
        break;
    case 4:
        nextColor = "y";
        setColorToTop('142', '-14', '-151');//Yellow
        stickColor = 'rgba(255, 255, 0, .7)';
        stickColorLight = 'rgba(255, 255, 0, .2)';
        break;
    case 5:
        nextColor = "o";
        setColorToTop('-52', '14', '26');//Orange
        stickColor = 'rgba(255, 165, 0, .7)';
        stickColorLight = 'rgba(255, 165, 0, .2)';
        break;
  }

  var $mySide = $('#' + nextColor);
  $mySide.html(nextColor+'<div class="sticker" id="' + nextColor + 'promptZZ"><div class="sticker" id="' + nextColor + 'promptZ"><div class="sticker" id="' + nextColor + 'promptY"><div class="sticker" id="' + nextColor + 'promptX"><div class="promptSticker ps1"></div><div class="promptSticker ps2"></div><div class="promptSticker ps3"></div><div class="promptSticker ps4"></div><div onclick="returnStickersToCube()" class="promptSticker ps5">Click Here After You Have Selected Each Stickers Color</div><div class="promptSticker ps6"></div><div class="promptSticker ps7"></div><div class="promptSticker ps8"></div><div class="promptSticker ps9"></div></div></div></div></div>');
  
  $('#' + nextColor + 'promptX').css('background-color', stickColorLight);
  setTimeout(formatter,2500)
}

function colorInput(){
  //The color Side variable controls which sides colors are being entered by the user, 
  //It is intentionally global because it is used in returnStickersToCube() to trigger
  //solveCube() among other things.
  $('.buttonControls').fadeOut(.5);
  $('.sliderControls').fadeOut(2);  
  $('.zplane').css('transition', '.5s');
  if(parseInt(screenWidth) > 990) {
    $('.zplane').css('margin-left','calc(100% - 450px)');
  } else if(parseInt(screenWidth) > 890) {
    $('.zplane').css('margin-left','calc(100% - 350px)');
  } else {
	$('.zplane').css('margin-left','calc(100% - 310px)');  
  }
  displayInputInstructions();
  //$('.zplane').css('margin','auto');
  colorSide = 0;
  setColorToTop(45, 25, 30);//White 
  detach();
}

function bigColor(col, sticker){
  mySticker = document.getElementsByClassName('promptSticker');
  mySticker[sticker-1].style.backgroundColor = col;
  //add the color to the array that becomes a keyColor array
  var stickerX = Math.floor((sticker - 1) / 3);
  var stickerY = (sticker - 1) % 3;
  setColorRay [stickerX] [stickerY] = col.charAt(0);  
  inputStickCount++;
}

function returnStickersToCube(){
  //First the keyColor array is made
    setColorRay[1][1] = nextColor.charAt(0);
    switch (colorSide) {
    case 0:        
        keyWhite = copyArray(setColorRay);
        break;
    case 1:
        keyGreen = copyArray(setColorRay);
        break;
    case 2:
        keyRed = copyArray(setColorRay);
        break;
    case 3:
        keyBlue = copyArray(setColorRay);
        break;
    case 4:
        keyYellow = copyArray(setColorRay);
        break;
    case 5:
        keyOrange = copyArray(setColorRay);
        break;
  } 
  
  //Then the next side is summoned
  colorSide++;
  
  if(colorSide === 6){//After all sides have been entered
  //FIRST take all the keyColor arrays and make new messColor arrays 
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyBlue = add90toSide(keyBlue); 
    keyOrange = add90toSide(keyOrange);
    keyOrange = add90toSide(keyOrange);    
    messWhite  = singleSideMesh(keyWhite, keyGreen, keyOrange, keyBlue, keyRed);    
    
    keyOrange = add90toSide(keyOrange);
    keyOrange = add90toSide(keyOrange);
    keyOrange = add90toSide(keyOrange);
    keyWhite = add90toSide(keyWhite);
    keyRed = add90toSide(keyRed);
    keyYellow = add90toSide(keyYellow); 
    keyYellow = add90toSide(keyYellow);
    keyYellow = add90toSide(keyYellow);
    messGreen  = singleSideMesh(keyGreen, keyOrange, keyWhite, keyRed, keyYellow);     
 
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyWhite = add90toSide(keyWhite);
    keyBlue = add90toSide(keyBlue);
    keyRed = add90toSide(keyRed);
    keyRed = add90toSide(keyRed);
    keyRed = add90toSide(keyRed);
    keyYellow = add90toSide(keyYellow); 
    keyYellow = add90toSide(keyYellow); 
    keyYellow = add90toSide(keyYellow); 
    messRed    = singleSideMesh(keyRed, keyGreen, keyWhite, keyBlue, keyYellow);
 
    keyBlue = add90toSide(keyBlue);
    keyBlue = add90toSide(keyBlue);
    keyBlue = add90toSide(keyBlue);
    keyRed = add90toSide(keyRed);
    keyRed = add90toSide(keyRed);
    keyRed = add90toSide(keyRed);
    keyWhite = add90toSide(keyWhite);
    keyOrange = add90toSide(keyOrange);
    keyOrange = add90toSide(keyOrange);
    keyYellow = add90toSide(keyYellow); 
    keyYellow = add90toSide(keyYellow); 
    keyYellow = add90toSide(keyYellow);    
    messBlue   = singleSideMesh(keyBlue, keyRed, keyWhite, keyOrange, keyYellow);
    
    keyYellow = add90toSide(keyYellow);
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyRed = add90toSide(keyRed);
    keyRed = add90toSide(keyRed);
    keyRed = add90toSide(keyRed);
    keyOrange = add90toSide(keyOrange)
    keyBlue = add90toSide(keyBlue);
    keyBlue = add90toSide(keyBlue);
    messYellow = singleSideMesh(keyYellow, keyGreen, keyRed, keyBlue, keyOrange);

    keyOrange = add90toSide(keyOrange);
    keyOrange = add90toSide(keyOrange);
    keyWhite = add90toSide(keyWhite);
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyGreen = add90toSide(keyGreen);
    keyBlue = add90toSide(keyBlue);
    keyYellow = add90toSide(keyYellow); 
    keyYellow = add90toSide(keyYellow);    
    messOrange = singleSideMesh(keyOrange, keyBlue, keyWhite, keyGreen, keyYellow);
    
    // Assign the values of the messColor arrays as the new IDs of the stickers on the 
    // cube, this should make the virtual cube look like the actual cube.
        //This will involve removing all the IDs an a side (except the center) and then
        //re-entering them in a different order. I have had problems changing IDs before.
    var myMess = [messWhite, messGreen, messRed, messBlue, messYellow, messOrange];
    var myCol = ['w', 'g', 'r', 'b', 'y', 'o'];
    var myPartial = ['lt', 't', 'rt', 'l', '', 'r', 'bl', 'b', 'br'];     
    
    for (i = 0; i < 6; i++) {
      for (j = 0; j < 9; j++){
        var tempStr = '.' + myCol[i] + myPartial[j];
        $(tempStr).prop('id', 'hello' + j);
      }
    }
    
    for (i = 0; i < 6; i++) {
      for (j = 0; j < 9; j++){
        if (j !== 4) {
          var tempStr = '.' + myCol[i] + myPartial[j];
          $(tempStr).prop('id', myMess[i][Math.floor(j/3)][j%3]);
        }
      }
    }
    $('#' + nextColor + 'promptZZ').remove();    
    detach();
	$('.sliderControls').show();
    solveCube();
  } else {
    //Then Erase the previous prompt by removing the div 
    //later phase it out elegantly
    $('#' + nextColor + 'promptZZ').remove();    
    detach();    
  }  
}

function displayInputInstructions() {
	$('#inputInstructions').css('display', 'block');
	$('#inputInstructions').css('width', '350px');
	$('#inputInstructions').css('height', '700px');
	$('#inputInstructions').css('background-color', 'transparent');
	$('#inputInstructions').css('color', 'white');
	$('#inputInstructions').css('padding', '0 10px 0 0');
	$('#inputInstructions').css('left', '-10px');
	$('#inputInstructions').css('top', '-40px');
	$('#inputInstructions').css('text-align', 'justify');
	$('#inputInstructions').css('margin', '0 0 0 -20px');	
}




