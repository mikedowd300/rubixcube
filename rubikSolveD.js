 var moveList2 = [];
function solveCube(){
  moveList = [];
  $('.buttonControls').hide();
  $('.sliderControls').hide();
  $('#inputInstructions').fadeOut("slow");
  $('.zplane').css('transition', '.5s');
  $('.zplane').css('margin-left','calc((100% - 400px)/2)');
  newMasterRay = getMaster(messWhite,messGreen,messRed,messBlue,messYellow,messOrange);
  newMessWhite = copyArray(messWhite);
  newMessGreen =  copyArray(messGreen);
  newMessRed = copyArray(messRed); 
  newMessBlue = copyArray(messBlue); 
  newMessYellow = copyArray(messYellow); 
  newMessOrange = copyArray(messOrange); 
  newMasterRay = getMaster(newMessWhite,newMessGreen,newMessRed,newMessBlue,newMessYellow,newMessOrange);
  
  var solveStr = 'Solving Cube...\n';   
  
  solveStr += solveWhite();
  moveList.push('Q');
  
  solveStr += solveMiddleLayer();
  solveStr += solveTopCross();
  solveStr += orientTopCross();
  solveStr += orientTopCorners();
  solveStr += solveTopCorners();
  moveList.push('cubeSpin');
  
  moveListAllTurns();
  //$('.sliderControls').hide();
  console.log(moveList);
}

function solveWhite(){
  var solveStr = 'Begin with the white side on top and red side facing you. \nSolving White...\n'; 
  solveStr += placeWGO();
  solveStr += placeWBO();
  solveStr += placeWGR();
  solveStr += placeWBR();
  solveStr += placeWO();
  solveStr += placeWG();
  solveStr += placeWB();
  solveStr += placeWR();
  return solveStr;
}

function makeMoveList(str){//also rearranges the newMessColorArrays
  var newStr = '';
  for (i=0; i<str.length; i++) {   
    moveList.push(str.charAt(i));
    switch (str.charAt(i)){
      case 'w':
        newStr += '  white\n';
        whiteRayCW();
        break;
      case 'W':
        newStr += '  whitePrime\n';
        whiteRayCCW();
        break;
      case 'g':
        newStr += '  green\n';
        greenRayCW();
        break;
      case 'G':
        newStr += '  greenPrime\n';
        greenRayCCW();
        break;
      case 'r':
        newStr += '  red\n';
        redRayCW();
        break;
      case 'R':
        newStr += '  redPrime\n';
        redRayCCW();
        break;
      case 'b':
        newStr += '  blue\n';
        blueRayCW();
        break;
      case 'B':
        newStr += '  bluePrime\n';
        blueRayCCW();
        break;
      case 'y': 
        newStr += '  yellow\n';
        yellowRayCW();
        break;
      case 'Y':
        newStr += '  yellowPrime\n';
        yellowRayCCW();
        break;
      case 'o':
        newStr += '  orange\n';
        orangeRayCW();
        break;
      case 'O':
        newStr += '  orangePrime\n';
        orangeRayCCW();
        break ;  
    }    
  }  
  return newStr;
}

function moveListSingleTurn(){
  switch (moveList.shift()){
    case 'w':
      white();
      break;
    case 'W':
      whitePrime();
	  console.log(113);
      break;
    case 'g':
      green();
      break;
    case 'G':
      greenPrime();
      break;
    case 'r':
      red();
      break;
    case 'R':
      redPrime();
      break;
    case 'b':
      blue();
      break;
    case 'B':
      bluePrime();
      break;
    case 'y': 
      yellow();
      break;
    case 'Y':
      yellowPrime();
      break;
    case 'o':
      orange();
      break;
    case 'O':
      orangePrime();
      break ;  
    case 'Q':
      setColorToTop(50, 150, 160);
      break;
    case 'cubeSpin':
      // Here the cube needs to transition over to the cubespin start position 
	  //before it starts spinnimg
	  setColorToTop(40, 0, 20);
      $('.zplane').addClass('cubeSpin');            
      $('.cubeSpin').css('perspective', '15000px');	  
	  $('.buttonControls').fadeIn("slow");
	  
	  //The slider only fades in if it was a random solveCube,
	  //If there was sticker input display the movelist instead
	  if(inputStickCount != 0) { //REVERSE THESE CONDITIONS AFTER TESTING
		$('.zplane').css('transition', '.5s');
		$('.zplane').css('margin-left', 'calc(310px + ((100% - 510px) / 2))');
		console.log(moveList);
		var outputStr = makeOutStr();
		$('#inputInstructions').html(outputStr);
		displayInputInstructions();		
		$('#inputInstructions').css('backgroundColor', 'transparent');
		$('#inputInstructions').css('border', 'none');
		$('#inputInstructions').css('margin-top', '-20');
		$('#inputInstructions').css('padding-top', '-20');
		$('#inputInstructions').css('overflow', 'auto');
	  } else {
		$('.sliderControls').fadeIn("slow");
	  }
	  setColorToTop(50, 150, 160);
	  inputStickCount = 0;
      break;
  }
}

function moveListAllTurns(){	
  var delimiter = moveList.length;
  moveList2 = moveList.slice();  
  console.log(moveList2);
  for(i = 0; i < delimiter; i++) {    
    setTimeout(moveListSingleTurn, (2 * TURNSPEED + 1) * (i + 1));
	console.log(184);
  }
}

function solveMiddleLayer(){
  var newStr = 'Flip the cube over, putting the yellow side on top and the red side facing you. \nSolving Middle Layer...\n'; 

  var edgeStickers = ['og','go','gr','rg','rb','br','bo','ob'];
  //var edgeStickersSolved = ['go', 'rg', 'br', 'ob']; //Check against these to see if already solved
      
  for (var i = 0; i < 5; i++) {
  //Do this 4 times for the worst case scenario  
    var edgePos = initEdgePosRay();
    var edgePosSolved = initMidEdgePosRay();
    var planB = true;
    
    for(var c = 0; c < 4; c++){    
      for(var m = 0; m < 4; m++){      
      //Remove stickers that are solved
        if(edgePosSolved[m] === edgeStickers[m*2]){
          edgeStickers[m*2] = 'x';
          edgeStickers[(m * 20) - 1] = 'x'; 
        }
      }      
      for (j = 0; j < 4; j++){
        for(k = 0; k < 8; k++){
          if(edgePos[j] === edgeStickers[k]){ //'og','go','gr','rg','rb','br','bo','ob'
            planB = false;
            switch(edgeStickers[k]){
              case 'og':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('Y');// + edgeStickers[k] + ' 0 \n';
                    break;
                  case 1://green
                    newStr += makeMoveList('');// + edgeStickers[k] + ' 1 \n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('yy');// + edgeStickers[k] + ' 2 \n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('y');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('yoYOYGyg');// + edgeStickers[k] + ' og \n';
                break;
              case 'go':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('yy');// + edgeStickers[k] + '0 \n';
                    break;
                  case 1://green
                    newStr += makeMoveList('Y');// + edgeStickers[k] + ' 1 \n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('y');// + edgeStickers[k] + ' 2 \n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('YGygyoYO');// + edgeStickers[k] + ' go \n';
                break
              case 'gr':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('');// + edgeStickers[k] + ' 0 \n';
                    break;
                  case 1://green
                    newStr += makeMoveList('y');// + edgeStickers[k] + ' 1 \n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('Y');// + edgeStickers[k] + ' 2 \n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('yy');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('ygYGYRyr');// + edgeStickers[k] + '\n';
                break
              case 'rg':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('Y');// + edgeStickers[k] + '\n';
                    break;
                  case 1://green
                    newStr += makeMoveList('');// + edgeStickers[k] + '\n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('yy');// + edgeStickers[k] + '\n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('y');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('YRyrygYG');// + edgeStickers[k] + '\n';
                break
              case 'rb':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('y');// + edgeStickers[k] + ' 0 \n';
                    break;
                  case 1://green
                    newStr += makeMoveList('yy');// + edgeStickers[k] + ' 1 \n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('');// + edgeStickers[k] + ' 2 \n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('Y');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('yrYRYByb');// + edgeStickers[k] + '\n';
                break
              case 'br':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('');// + edgeStickers[k] + '\n';
                    break;
                  case 1://green
                    newStr += makeMoveList('y');// + edgeStickers[k] + '\n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('Y');// + edgeStickers[k] + '\n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('yy');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('YBybyrYR');// + edgeStickers[k] + '\n';
                break
              case 'bo':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('yy');// + edgeStickers[k] + ' 0 \n';
                    break;
                  case 1://green
                    newStr += makeMoveList('Y');// + edgeStickers[k] + ' 1 \n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('y');// + edgeStickers[k] + ' 2 \n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('ybYBYOyo');// + edgeStickers[k] + ' 3 \n';
                break
              case 'ob':
                switch(j){
                  case 0://red
                    newStr += makeMoveList('y');// + edgeStickers[k] + ' 0 \n';
                    break;
                  case 1://green
                    newStr += makeMoveList('yy');// + edgeStickers[k] + ' 1 \n';
                    break;
                  case 2://blue
                    newStr += makeMoveList('');// + edgeStickers[k] + ' 2 \n';
                    break;
                  case 3://orange
                    newStr += makeMoveList('Y');// + edgeStickers[k] + ' 3 \n';
                    break;
                }
                newStr += makeMoveList('YOyoybYB');// + edgeStickers[k] + '\n';
                break;
            }           
            edgePos = initEdgePosRay(); 
          }
        }
      }    
    }
      if(planB){
        //Plan B only needs to take the piece out, not put it back  
        edgePos = initEdgePosRay();
        var edgePosB = initMidEdgePosRay();
        var edgeOrientedB = initMidOrientationRay();
        for(var n = 0; n < 4; n++){
          for(var p = 0; p < 8; p++){
          // plan B            
            if((edgePosB[n] === edgeStickers[p]) && (edgeStickers[p] !== edgeOrientedB[n])){
            //make sure the algorythm doesn't throw a positioned piece
              //newStr += 'inside planB: ' + edgePosB[n] + ' ' + edgeStickers[p] + ' ' + edgeOrientedB[n] + '\n';
              switch(n){                
                case 0://green
                  newStr += makeMoveList('RyrygYG');// + edgeStickers[p] + ' planB\n';//RyrygYG
                  break;
                case 1://red
                  newStr += makeMoveList('BybyrYR');// + edgeStickers[p] + ' planB\n';//BybyrYR
                  break;
                case 2://blue
                  newStr += makeMoveList('OyoybYB');// + edgeStickers[p] + ' planB\n';//OyoybYB
                  break;
                case 3://Orange
                  newStr += makeMoveList('GygyoYO');// + edgeStickers[p] + ' planB\n';//GygyoYO
                  break;
              }
              edgePos = initEdgePosRay();
            }                        
          }
        }// end for        
      }//if(planB)
      edgePosB = initMidEdgePosRay();
      edgeOrientedB = initMidOrientationRay();
      for(var z = 0; z < 4; z++){
        var actual = edgePosB[z];  
        var solved = edgeOrientedB[z];
        if(actual !== solved){
        //This means that there is an edge in the middle layer in the proper place 
        //but with the reversre orientation
          if(solved === 'go'){
            newStr += makeMoveList('yoYOYGyg');// + ' Plan C';
          }else if(solved === 'rg'){
            newStr += makeMoveList('ygYGYRyr');// + ' Plan C';
          }else if(solved === 'br'){
            newStr += makeMoveList('yrYRYByb');// + ' Plan C';
          }else if(solved === 'ob'){
            newStr += makeMoveList('ybYBYOyo');// + ' Plan C';
          }          
        }
      }
    }        
  return newStr;
}

function initEdgePosRay(){
  //PLAN A: the values of the yellow edges 
  var newRay = [newMessYellow[0][1], newMessYellow[1][0], newMessYellow[1][2], newMessYellow[2][1]];
  return newRay;
}

function initMidEdgePosRay(){
  //PLAN B: the values of the mid colors edges
  var newRay = [newMessGreen[1][0], newMessRed[1][0], newMessBlue[1][0], newMessOrange[1][0]];
  return newRay;
}

function initMidOrientationRay(){
  var newRay = [masterKeyGreen[1][0], masterKeyRed[1][0], masterKeyBlue[1][0], masterKeyOrange[1][0]];
  return newRay;
}

function initUnsolvedYellowCorners(){
  var newRay = [newMessYellow[0][0], newMessYellow[0][2], newMessYellow[2][0], newMessYellow[2][2]]; 
  return newRay;
}

function solveTopCross(){
  var solveStr = 'Solving Top Cross...\n';  
  //while(!cross){
  for(var i = 1; i < 4; i++){     
    var cross = false;
    var line = false;
    var el = false;
    var executed = false;
    var topCase = 0;
    
    //solveStr += 'isYellow test: 01 ' + isYellow(newMessYellow[0][1]) + ' ' + newMessYellow[0][1] + '\n';
    //solveStr += 'isYellow test: 10 ' + isYellow(newMessYellow[1][0]) + ' ' + newMessYellow[1][0] + '\n';
    //solveStr += 'isYellow test: 12 ' + isYellow(newMessYellow[1][2]) + ' ' + newMessYellow[1][2] + '\n';
    //solveStr += 'isYellow test: 21 ' + isYellow(newMessYellow[2][1]) + ' ' + newMessYellow[2][1] + '\n';
    
    if(isYellow(newMessYellow[0][1]) && isYellow(newMessYellow[1][0])){
    //Check for the "L"
      el = true;
      topCase = 1;
      //solveStr += 'The "L": Case ' + topCase + '\n';
    } else {      
      topCase = 1;
      solveStr += 'Nothing: Case ' + topCase + '\n';
    }
    if(isYellow(newMessYellow[0][1]) && isYellow(newMessYellow[1][2])){ 
      el = true;
      topCase = 2;
      //solveStr += 'The "L": Case ' + topCase + '\n';
    }
    if(isYellow(newMessYellow[2][1]) && isYellow(newMessYellow[1][0])){ 
      el = true;
      topCase = 3;
      //solveStr += 'The "L": Case ' + topCase + '\n';
    }
    if(isYellow(newMessYellow[2][1]) && isYellow(newMessYellow[1][2])){  
      el = true;
      topCase = 4;
      //solveStr += 'The "L": Case ' + topCase + '\n';
    }
    
    if(isYellow(newMessYellow[0][1]) && isYellow(newMessYellow[2][1])){
    //Check for the line
      line = true;
      el = false;
      topCase = 1;
      //solveStr += 'The line: Case ' + topCase + '\n';
    }
    if(isYellow(newMessYellow[1][0]) && isYellow(newMessYellow[1][2])){
      line = true;
      el = false;
      topCase = 1; 
      //solveStr += 'The line: Case ' + topCase + '\n';      
    }
    
    if(isYellow(newMessYellow[1][0]) && isYellow(newMessYellow[1][2]) && isYellow(newMessYellow[0][1]) && isYellow(newMessYellow[2][1])){
    //Check For the Cross
      cross = true;
      line = false;
      el = false;
      topCase = 0;
      //solveStr += 'The cross: Case ' + topCase + '\n';
    }
    if (!executed) {
      executed = true;
      switch (topCase){
        case 1:
          solveStr += makeMoveList('obyBYO');
          break;
        case 2:
          solveStr += makeMoveList('YobyBYO');
          break;
        case 3:
          solveStr += makeMoveList('yobyBYO');
          break;
        case 4:
          solveStr += makeMoveList('yyobyBYO');
          break;
      }    
    }
  }
  return solveStr; 
}

function isYellow(str){
  var col = str.charAt(0);
  if(col === 'y'){
    return true;
  }else{
    return false;
  }
}

function orientTopCross(){
  var solveStr = 'Orienting Top Edges...\n';
  var crossRay = [newMessYellow[0][1].charAt(1),
                  newMessYellow[1][0].charAt(1),
                  newMessYellow[1][2].charAt(1),
                  newMessYellow[2][1].charAt(1)];               
                  
  var crossRayNum = [];
  
  for(var i = 0; i < 4; i++){
    //This orients an array of the four edge, lining up red with red, colors NOT 
    //the four edge colors themselves
    switch (crossRay[i]) {
      case 'r':
        crossRayNum[i] = 1;
        break;
      case 'g':
        crossRayNum[i] = 2;
        break;
      case 'b':
        crossRayNum[i] = 3;
        break;
      case 'o':
        crossRayNum[i] = 4;
        break;
    }    
  }
  
  //console.log(crossRay);
  //console.log(crossRayNum);
  var turnCount = 0;//how many turns you need to complete to line up red
    
  if(crossRayNum[1] === 1){
    var turnCount = 1;
    crossRayNum = turnCrossRayNum90CW(crossRayNum);
  }else if(crossRayNum[2] === 1){   
    var turnCount = 3;
    crossRayNum = turnCrossRayNum90CW(crossRayNum);
    crossRayNum = turnCrossRayNum90CW(crossRayNum);
    crossRayNum = turnCrossRayNum90CW(crossRayNum);
  }else if(crossRayNum[3] === 1){
    var turnCount = 2;
    crossRayNum = turnCrossRayNum90CW(crossRayNum);
    crossRayNum = turnCrossRayNum90CW(crossRayNum);
  }
  
  //console.log('after orienting the array tc = ' + turnCount);
  //console.log(crossRayNum);
  
  //console.log('tc= ', turnCount);
  if((crossRayNum[1] === 2) && (crossRayNum[2] === 3)){
    var cross = true;
    //console.log('cross');
  } else if(crossRayNum[1] === 2){
    var el = true; 
    //console.log('red and green L');
  } else if(crossRayNum[2] === 3){
    turnCount += 3;
    //console.log('red and blue L');
  } else if(crossRayNum[3] === 4){
    var line = true;//trtRtrttRtt
    //console.log('across');
  } else if(crossRayNum[1] === 3){
    //this means crossRayNum[2] is 4 and the L is between the 2 and 5
    turnCount += 2;
    //console.log('green and orange');
  } else {
    //the last possibility is that crossRayNum[2] is 2 meaning that crossRayNum[1] 
    //is 4 and the L is between the 3 and 4
    turnCount += 1;
    //console.log('blue and orange');
  }
  
  //console.log('tc= ', turnCount);
  turnCount %= 4;
  //console.log('tc= ', turnCount);
  
  if(!cross){
    if (turnCount === 1){
      solveStr += makeMoveList('y');
    } else if (turnCount === 2){
      solveStr += makeMoveList('yy');
    } else if(turnCount === 3){
      solveStr += makeMoveList('Y');
    }
  }
  
  if (line) {
    solveStr += makeMoveList('ybyBybyyBYbyBybyyB');
  } else if(!cross) {
    solveStr += makeMoveList('ybyBybyyB');
  }
  
  //now line up the red and orient all the edges
  var crossRay = [newMessYellow[0][1].charAt(1),
                newMessYellow[1][0].charAt(1),
                newMessYellow[1][2].charAt(1),
                newMessYellow[2][1].charAt(1)];
                
  if(crossRay[0] === 'g'){
    solveStr += makeMoveList('Y');
  }else if(crossRay[0] === 'b'){
    solveStr += makeMoveList('y');
  }else if(crossRay[0] === 'o'){
    solveStr += makeMoveList('yy');
  }  
    
  return solveStr; 
}

function turnCrossRayNum90CW(oldRay) {
  var newRay = [];
    newRay[0] = oldRay[1];
    newRay[1] = oldRay[3];
    newRay[2] = oldRay[0];
    newRay[3] = oldRay[2];
  return newRay;
}

function orientTopCorners(){
  var solveStr = 'Orienting Top Corners...\n'; 
  var corners = initUnsolvedYellowCorners(); //home corner is [2][0]
  
  if(corners[0] === 'goy' || corners[0] === 'ogy' || corners[0] === 'ygo') {// [0][0]
       solveStr += makeMoveList('yybYGyBYgY');// + 'cornerOrientation Case1\n';
  } else if(corners[01] === 'goy' || corners[1] === 'ogy' || corners[1] === 'ygo') {// [0][2]
      solveStr += makeMoveList('oYRyOYry');// + 'cornerOrientation Case2\n';
  } else if(corners[3] === 'goy' || corners[3] === 'ogy' || corners[3] === 'ygo') {// [2][2]
      solveStr += makeMoveList('yoYRyOYroYRyOYry');// + 'cornerOrientation Case3\n';
  }
  
  var testCorner = newMessYellow[0][0];//ygr
  var keepTryin = true;
  var tries = 0;
  while (keepTryin) {
    var testCorner = newMessYellow[0][0];//ygr
    if((testCorner === 'ygr') || (testCorner === 'gry') || (testCorner === 'rgy') || (tries > 5)){
      keepTryin = false;
    } else{
      solveStr += makeMoveList('yoYRyOYr');// + 'The rest of the corners\n';
    }
    tries++; //Just in case somehow an infinite loop happens
  }  
  return solveStr;  
}

function solveTopCorners(){
  var solveStr = 'Solving Top Corners...\n'; 
  for(var i = 0; i < 4; i++){
    var c = 0;
    //console.log(newMessYellow[2][0]);
    while(newMessYellow[2][0].charAt(0) !== 'y' && c < 4) {
      if ((newMessYellow[2][0].charAt(1) === 'y') || (newMessYellow[2][0].charAt(2) === 'y')) {
        solveStr += makeMoveList('OWowOWow');
      }
      c++; //infinite loop insurance
    }    
    solveStr += makeMoveList('Y');
  }  
  return solveStr; 
}

function whiteRayCW(){
  rotateWhiteArray90(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessOrange);
}

function whiteRayCCW(){
  rotateWhiteArray90(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessOrange);
  rotateWhiteArray90(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessOrange);
  rotateWhiteArray90(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessOrange);
}

function greenRayCW(){
  rotateGreenArray90(newMessGreen, newMessOrange, newMessYellow, newMessRed, newMessWhite);
}

function greenRayCCW() {
  rotateGreenArray90(newMessGreen, newMessOrange, newMessYellow, newMessRed, newMessWhite);
  rotateGreenArray90(newMessGreen, newMessOrange, newMessYellow, newMessRed, newMessWhite);
  rotateGreenArray90(newMessGreen, newMessOrange, newMessYellow, newMessRed, newMessWhite);
}

function orangeRayCW(){
  rotateOrangeArray90(newMessOrange, newMessBlue, newMessYellow, newMessGreen, newMessWhite);
}

function orangeRayCCW() {
  rotateOrangeArray90(newMessOrange, newMessBlue, newMessYellow, newMessGreen, newMessWhite);
  rotateOrangeArray90(newMessOrange, newMessBlue, newMessYellow, newMessGreen, newMessWhite);
  rotateOrangeArray90(newMessOrange, newMessBlue, newMessYellow, newMessGreen, newMessWhite);
}

function blueRayCW(){
  rotateBlueArray90(newMessBlue, newMessRed, newMessYellow, newMessOrange, newMessWhite);
}

function blueRayCCW() {
  rotateBlueArray90(newMessBlue, newMessRed, newMessYellow, newMessOrange, newMessWhite);
  rotateBlueArray90(newMessBlue, newMessRed, newMessYellow, newMessOrange, newMessWhite);
  rotateBlueArray90(newMessBlue, newMessRed, newMessYellow, newMessOrange, newMessWhite);
}

function redRayCW(){
  rotateRedArray90(newMessRed, newMessGreen, newMessYellow, newMessBlue, newMessWhite);
}

function redRayCCW() {
  rotateRedArray90(newMessRed, newMessGreen, newMessYellow, newMessBlue, newMessWhite);
  rotateRedArray90(newMessRed, newMessGreen, newMessYellow, newMessBlue, newMessWhite);
  rotateRedArray90(newMessRed, newMessGreen, newMessYellow, newMessBlue, newMessWhite);
}

function yellowRayCW(){
  rotateYellowArray90(newMessYellow, newMessGreen, newMessOrange, newMessBlue, newMessRed);
}

function yellowRayCCW() {
  rotateYellowArray90(newMessYellow, newMessGreen, newMessOrange, newMessBlue, newMessRed);
  rotateYellowArray90(newMessYellow, newMessGreen, newMessOrange, newMessBlue, newMessRed);
  rotateYellowArray90(newMessYellow, newMessGreen, newMessOrange, newMessBlue, newMessRed);
}

function  placeWGO(){ //FIRST PIECE
  var solveStr = 'Placing WGO...\n';
  switch ('wgo') {
    case newMasterRay[0][0][2]://Check against white corners
      solveStr += makeMoveList('W');// + '    002\n';
      break;
    case newMasterRay[0][2][0]:
      solveStr += makeMoveList('w');// + '   020\n';
      break;
    case newMasterRay[0][2][2]: 
      solveStr += makeMoveList('ww');// + '   022\n';
      break;
    case newMasterRay[1][0][0]: //Check against green corners
      solveStr += makeMoveList('GO');// + '   100\n';
      break;
    case newMasterRay[1][0][2]:  
      solveStr += makeMoveList('ggO');// + '   102\n';
      break;
    case newMasterRay[1][2][0]:
      solveStr += makeMoveList('O');// + '   120\n';
      break;
    case newMasterRay[1][2][2]:   
      solveStr += makeMoveList('gO');// + '   122\n';
      break;  
    case newMasterRay[2][0][0]: //Check against red corners        
      solveStr += makeMoveList('G');// + '   200\n';   
      break;
    case newMasterRay[2][0][2]: 
      solveStr += makeMoveList('RG');// + '   202\n';
      break;
    case newMasterRay[2][2][0]: 
      solveStr += makeMoveList('rG');// + '   220\n';
      break;
    case newMasterRay[2][2][2]: 
      solveStr += makeMoveList('rrG');// + '   222\n';
      break;        
    case newMasterRay[3][0][0]://Check against blue corners
      solveStr += makeMoveList('bo');// + '   300\n';
      break;
    case newMasterRay[3][0][2]:
      solveStr += makeMoveList('o');// + '   302\n';
      break;
    case newMasterRay[3][2][0]:
      solveStr += makeMoveList('bbo');// + '   320\n';
      break;
    case newMasterRay[3][2][2]:  
      solveStr += makeMoveList('Bo');// + '   322\n';
      break;
    case newMasterRay[4][0][0]: //Check against yellow corners
      solveStr += makeMoveList('gg');// + '   400\n';
      break;
    case newMasterRay[4][0][2]:
      solveStr += makeMoveList('yoo');// + '   402\n';
      break;
    case newMasterRay[4][2][0]: 
      solveStr += makeMoveList('ygg');// + '   420\n';
      break;
    case newMasterRay[4][2][2]:
      solveStr += makeMoveList('oo');// + '   422\n';
      break;
    case newMasterRay[5][0][0]://Check against orange corners       
      solveStr += makeMoveList('oog');// + '   500\n';
      break;
    case newMasterRay[5][0][2]:        
      solveStr += makeMoveList('og');// + '   502\n';
      break;
    case newMasterRay[5][2][0]:        
      solveStr += makeMoveList('Og');// + '   520\n';
      break;
    case newMasterRay[5][2][2]:
      solveStr += makeMoveList('g');// + '   522\n';
      break;    
  }  
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange);
  return solveStr;  
}

function  placeWBO(){ //SECOND PIECE
  var solveStr = 'Placing WBO...\n';
  switch ('wbo') {
    case newMasterRay[0][2][0]:
      solveStr += makeMoveList('rrbb');// + '   020\n';
      break;
    case newMasterRay[0][2][2]: 
      solveStr += makeMoveList('ryB');// + '   022\n';
      break;
    case newMasterRay[1][0][2]://Check against green corners 
      solveStr += makeMoveList('Rybb');// + '   102\n';
      break;
    case newMasterRay[1][2][0]:
      solveStr += makeMoveList('YB');// + '   120\n';
      break;
    case newMasterRay[1][2][2]:
      solveStr += makeMoveList('Rbb');// + '   122\n';
      break;  
    case newMasterRay[2][0][0]: //Check against red corners 
      solveStr += makeMoveList('rb');// + '   200\n';
      break;
    case newMasterRay[2][0][2]:   
      solveStr += makeMoveList('b');// + '   202\n';
      break;
    case newMasterRay[2][2][0]:
      solveStr += makeMoveList('rrb');// + '   220\n';
      break;
    case newMasterRay[2][2][2]:   
      solveStr += makeMoveList('Rb');// + '   222\n';
      break;        
    case newMasterRay[3][0][0]:  //Check against blue corners   
      solveStr += makeMoveList('ByB');// + '   300\n';
      break;
    case newMasterRay[3][0][2]:   
      solveStr += makeMoveList('bbyB');// + '   302\n';
      break;
    case newMasterRay[3][2][0]: 
      solveStr += makeMoveList('yB');// + '   320\n';
      break;
    case newMasterRay[3][2][2]: 
      solveStr += makeMoveList('byB');// + '   322\n';
      break;
    case newMasterRay[4][0][0]: //Check against yellow corners 
      solveStr += makeMoveList('ybb');// + '   400\n';
      break;
    case newMasterRay[4][0][2]:  
      solveStr += makeMoveList('bb');// + '   402\n';
      break;
    case newMasterRay[4][2][0]:     
      solveStr += makeMoveList('yybb');// + '   420\n';
      break;
    case newMasterRay[4][2][2]:
      solveStr += makeMoveList('Ybb');// + '   422\n';
      break;
    case newMasterRay[5][0][0]: //Check against orange corners  
      solveStr += makeMoveList('bYbb');// + '   500\n';
      break;
    case newMasterRay[5][2][0]: 
      solveStr += makeMoveList('B');// + '   520\n';
      break;
    case newMasterRay[5][2][2]:
      solveStr += makeMoveList('YgoG');// + '   522\n';
      break;    
  }  
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange); 
  return solveStr;   
}

function  placeWGR(){ //THIRD PIECE SOLVE
  var solveStr = 'Placing WGR...\n'; 
  switch ('wgr') {
    case newMasterRay[0][2][2]: //Check against white corners       
      solveStr += makeMoveList('rryrr');// + '   022\n';
      break;
    case newMasterRay[1][0][2]://Check against green corners       
      solveStr += makeMoveList('Ryrr');// + '   102\n';
      break;
    case newMasterRay[1][2][0]:
      solveStr += makeMoveList('yRYr');// + '   120\n';
      break;
    case newMasterRay[1][2][2]:        
      solveStr += makeMoveList('r');// + '   122\n';
      break;  
    case newMasterRay[2][0][0]: //Check against red corners        
      solveStr += makeMoveList('rrYr');// + '   200\n';
      break;
    case newMasterRay[2][0][2]:     
      solveStr += makeMoveList('rYr');// + '   202\n';
      break;
    case newMasterRay[2][2][0]:     
      solveStr += makeMoveList('RYr');// + '   220\n';
      break;
    case newMasterRay[2][2][2]:    
      solveStr += makeMoveList('Yr');// + '   222\n';
      break;        
    case newMasterRay[3][0][0]:  //Check against blue corners     
      solveStr += makeMoveList('R');// + '   300\n';
      break;
    case newMasterRay[3][2][0]:  
      solveStr += makeMoveList('YRYr');// + '   320\n';
      break;
    case newMasterRay[3][2][2]:     
      solveStr += makeMoveList('yyr');// + '   322\n';
      break;
    case newMasterRay[4][0][0]: //Check against yellow corners       
      solveStr += makeMoveList('yrr');// + '   400\n';
      break;
    case newMasterRay[4][0][2]:    
      solveStr += makeMoveList('rr');// + '   402\n';
      break;
    case newMasterRay[4][2][0]:   
      solveStr += makeMoveList('yyrr');// + '   420\n';
      break;
    case newMasterRay[4][2][2]:    
      solveStr += makeMoveList('Yrr');// + '   422\n';
      break;
    case newMasterRay[5][2][0]: //Check against orange corners        
      solveStr += makeMoveList('yyRYr');// + '   520\n';
      break;
    case newMasterRay[5][2][2]:
      solveStr += makeMoveList('Ryr');// + '   522\n';
      break;    
  }
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange);
  return solveStr;   
}

function  placeWBR(){//FOURTH PIECE
  var solveStr = 'Placing WBR...\n';
  switch ('wbr') {
    case newMasterRay[1][2][0]:        
      solveStr += makeMoveList('ryyR');// + '   120\n';
      break;
    case newMasterRay[1][2][2]:        
      solveStr += makeMoveList('Byb');// + '   122\n';
      break; 
    case newMasterRay[2][0][2]://Check against red corners         
      solveStr += makeMoveList('BybYByb');// + '   202\n';
      break;
    case newMasterRay[2][2][0]:        
      solveStr += makeMoveList('YryyR');// + '   220\n';
      break;
    case newMasterRay[2][2][2]:      
      solveStr += makeMoveList('YByb');// + '   222\n';
      break;        
    case newMasterRay[3][0][0]:  //Check against blue corners     
      solveStr += makeMoveList('ByybryyR');// + '   300\n';
      break;
    case newMasterRay[3][2][0]:        
      solveStr += makeMoveList('yrYR');// + '   320\n';
      break;
    case newMasterRay[3][2][2]:        
      solveStr += makeMoveList('yByyb');// + '   322\n';
      break;
    case newMasterRay[4][0][0]: //Check against yellow corners       
      solveStr += makeMoveList('yBybryyR');// + '   400\n';
      break;
    case newMasterRay[4][0][2]:        
      solveStr += makeMoveList('BybryyR');// + '   402\n';
      break;
    case newMasterRay[4][2][0]:        
      solveStr += makeMoveList('yyBybryyR');// + '   420\n';
      break;
    case newMasterRay[4][2][2]:    
      solveStr += makeMoveList('YBybryyR');// + '   422\n';
      break;
    case newMasterRay[5][2][0]: //Check against orange corners 
      solveStr += makeMoveList('rYR');// + '   520\n';
      break;
    case newMasterRay[5][2][2]:
      solveStr += makeMoveList('Byyb');// + '   522\n';
      break;    
  }
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange);
  return solveStr;   
}

function  placeWO(){// FIFTH PIECE
  var solveStr = '';
  solveStr += 'Placing WO...\n';
  switch ('wo') {
    case newMasterRay[0][1][0]: //white edge       
      solveStr += makeMoveList('OrYwOyWoR');// + '   010\n';      
      break;
    case newMasterRay[0][1][2]:        
      solveStr += makeMoveList('bwwyyGrWyBW');// + '   012\n';      
      break; 
    case newMasterRay[0][2][1]:        
      solveStr += makeMoveList('ggbbwwggbb');// + '   021\n';      
      break;
    case newMasterRay[1][0][1]://green edge        
      solveStr += makeMoveList('OrgwwyyRo');// + '   101\n';      
      break;
    case newMasterRay[1][1][0]:        
      solveStr += makeMoveList('wbWyO');// + '   110\n';      
      break;        
    case newMasterRay[1][1][2]:        
      solveStr += makeMoveList('Owwyyrww');// + '   112\n';      
      break;
    case newMasterRay[1][2][1]:        
      solveStr += makeMoveList('BgObG');// + '   121\n';      
      break;
    case newMasterRay[2][0][1]://red edge
      solveStr += makeMoveList('oRWyGbw');// + '   201\n';      
      break;
    case newMasterRay[2][1][0]:        
      solveStr += makeMoveList('oWyGw');// + '   210\n';      
      break;
    case newMasterRay[2][1][2]:        
      solveStr += makeMoveList('OwYbW');// + '   212\n';      
      break;
    case newMasterRay[2][2][1]:        
      solveStr += makeMoveList('yBgobG');// + '   221\n';      
      break;
    case newMasterRay[3][0][1]://blue edge
      solveStr += makeMoveList('RoBwwyyoRww');// + '   301\n';      
      break;
    case newMasterRay[3][1][0]:        
      solveStr += makeMoveList('owwyyRww');// + '   310\n';      
      break;
    case newMasterRay[3][1][2]:        
      solveStr += makeMoveList('WGwYo');// + '   312\n';      
      break; 
    case newMasterRay[3][2][1]:        
      solveStr += makeMoveList('BgobG');// + '   321\n';      
      break;
    case newMasterRay[4][0][1]://yellow edge
      solveStr += makeMoveList('ggbboorrww');// + '   401\n';      
      break;
    case newMasterRay[4][1][0]:        
      solveStr += makeMoveList('yggbboorrww');// + '   410\n';      
      break;
    case newMasterRay[4][1][2]:        
      solveStr += makeMoveList('Yggbboorrww');// + '   412\n';      
      break;
    case newMasterRay[4][2][1]:        
      solveStr += makeMoveList('yyggbboorrww');// + '   421\n';      
      break;
    case newMasterRay[5][0][1]://orange edge
      solveStr += makeMoveList('BgoWygoRw');// + '   501\n';      
      break;
    case newMasterRay[5][1][0]:        
      solveStr += makeMoveList('wwrWyBW');// + '   510\n';      
      break;
    case newMasterRay[5][1][2]:        
      solveStr += makeMoveList('wBwwyygw');// + '   512\n';      
      break;  
    case newMasterRay[5][2][1]:        
      solveStr += makeMoveList('yBgObG');// + '   521\n';      
      break;       
  }  
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange);
  return solveStr;   
}

function  placeWG(){ //SIXTH PIECE
  var solveStr = '';
  solveStr += 'Placing WG...\n';
  switch ('wg') {
    case newMasterRay[0][1][2]:  //white edge       
      solveStr += makeMoveList('rroowwrroo');// + '   012\n';      
      break; 
    case newMasterRay[0][2][1]:        
      solveStr += makeMoveList('GbRyWrOw');// + '   021\n';      
      break;
    case newMasterRay[1][0][1]://green edge        
      solveStr += makeMoveList('GwYoBgoobGW');// + '   101\n';      
      break;
    case newMasterRay[1][1][0]:        
      solveStr += makeMoveList('WrwwyyOW');// + '   110\n';      
      break;        
    case newMasterRay[1][1][2]:        
      solveStr += makeMoveList('wOwwyyrw');// + '   112\n';      
      break;
    case newMasterRay[1][2][1]:        
      solveStr += makeMoveList('yOrGoR');// + '   121\n';      
      break;
    case newMasterRay[2][0][1]://red edge
      solveStr += makeMoveList('rGwwyybOww');// + '   201\n';      
      break;
    case newMasterRay[2][1][0]:        
      solveStr += makeMoveList('woWyG');// + '   210\n';      
      break;
    case newMasterRay[2][1][2]:        
      solveStr += makeMoveList('Gwwyybww');// + '   212\n';      
      break;
    case newMasterRay[2][2][1]:        
      solveStr += makeMoveList('OrGoR');// + '   221\n';      
      break;
    case newMasterRay[3][0][1]://blue edge
      solveStr += makeMoveList('gBWyRow');// + '   301\n';      
      break;
    case newMasterRay[3][1][0]:        
      solveStr += makeMoveList('gWyRw');// + '   310\n';      
      break;
    case newMasterRay[3][1][2]:        
      solveStr += makeMoveList('GwYoW');// + '   312\n';      
      break; 
    case newMasterRay[3][2][1]:        
      solveStr += makeMoveList('yOrgoR');// + '   321\n';      
      break;
    case newMasterRay[4][0][1]://yellow edge
      solveStr += makeMoveList('YOrggoR');// + '   401\n';      
      break;
    case newMasterRay[4][1][0]:        
      solveStr += makeMoveList('OrggoR');// + '   410\n';      
      break;
    case newMasterRay[4][1][2]:        
      solveStr += makeMoveList('yyOrggoR');// + '   412\n';      
      break;
    case newMasterRay[4][2][1]:        
      solveStr += makeMoveList('yOrggoR');// + '   421\n';      
      break;
    case newMasterRay[5][1][0]: //orange edge       
      solveStr += makeMoveList('gwwyyBww');// + '   510\n';      
      break;
    case newMasterRay[5][1][2]:        
      solveStr += makeMoveList('WRwYg');// + '   512\n';      
      break;  
    case newMasterRay[5][2][1]:        
      solveStr += makeMoveList('OrgoR');// + '   521\n';      
      break;       
  }  
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange); 
  return solveStr;   
}

function  placeWB(){ //SEVENTH PIECE
  var solveStr = '';
  solveStr += 'Placing WB...\n';
  switch ('wb') {
    case newMasterRay[0][2][1]://white edge        
      solveStr += makeMoveList('GbrgBYRobrO');// + '   021\n';      
      break;
    case newMasterRay[1][1][0]://green edge        
      solveStr += makeMoveList('bWyOw');// + '   110\n';       
      break;        
    case newMasterRay[1][1][2]:        
      solveStr += makeMoveList('BwYrW');// + '   112\n';       
      break;
    case newMasterRay[1][2][1]:        
      solveStr += makeMoveList('yRobrO');// + '   121\n';       
      break;
    case newMasterRay[2][0][1]://red edge
      solveStr += makeMoveList('RbwwyyGoww');// + '   201\n';       
      break;
    case newMasterRay[2][1][0]:        
      solveStr += makeMoveList('bwwyyGww');// + '   210\n';       
      break;
    case newMasterRay[2][1][2]:        
      solveStr += makeMoveList('WOwYb');// + '   212\n';       
      break;
    case newMasterRay[2][2][1]:        
      solveStr += makeMoveList('RobrO');// + '   221\n';       
      break;
    case newMasterRay[3][0][1]://blue edge
      solveStr += makeMoveList('bwwyyggwYow');// + '   301\n';       
      break;
    case newMasterRay[3][1][0]:        
      solveStr += makeMoveList('WowwyyRW');// + '   310\n';       
      break;
    case newMasterRay[3][1][2]:        
      solveStr += makeMoveList('wRwwyyow');// + '   312\n';       
      break; 
    case newMasterRay[3][2][1]:        
      solveStr += makeMoveList('yRoBrO');// + '   321\n';       
      break;
    case newMasterRay[4][0][1]://yellow edge
      solveStr += makeMoveList('yRobbrO');// + '   401\n';       
      break;
    case newMasterRay[4][1][0]:        
      solveStr += makeMoveList('yyRobbrO');// + '   410\n';       
      break;
    case newMasterRay[4][1][2]:        
      solveStr += makeMoveList('RobbrO');// + '   412\n';       
      break;
    case newMasterRay[4][2][1]:        
      solveStr += makeMoveList('YRobbrO');// + '   421\n';       
      break;
    case newMasterRay[5][1][0]://orange edge        
      solveStr += makeMoveList('wrWyB');// + '   510\n';       
      break;
    case newMasterRay[5][1][2]:        
      solveStr += makeMoveList('Byywwgww');// + '   512\n';      
      break;  
    case newMasterRay[5][2][1]:        
      solveStr += makeMoveList('RoBrO');// + '   521\n';       
      break;       
  }  
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange); 
  return solveStr;   
}

function  placeWR(){ // EIGHTH PIECE
  var solveStr = '';
  solveStr += 'Placing WR...\n'; 
  switch ('wr') {
    case newMasterRay[1][1][0]://green edge        
      solveStr += makeMoveList('rwwyyOww');// + '   110\n';       
      break;        
    case newMasterRay[1][1][2]:        
      solveStr += makeMoveList('WBwYr');// + '   112\n';       
      break;
    case newMasterRay[1][2][1]:        
      solveStr += makeMoveList('GbrgB');// + '   121\n';       
      break;
    case newMasterRay[2][0][1]://red edge
      solveStr += makeMoveList('RWybbwwyyGW');// + '   201\n';       
      break;
    case newMasterRay[2][1][0]:        
      solveStr += makeMoveList('wwoWyGW');// + '   210\n';       
      break;
    case newMasterRay[2][1][2]:        
      solveStr += makeMoveList('wGwwyybw');// + '   212\n';       
      break;
    case newMasterRay[2][2][1]:        
      solveStr += makeMoveList('yGbRgB');// + '   221\n';       
      break;
    case newMasterRay[3][1][0]: //blue edge       
      solveStr += makeMoveList('wgWyR');// + '   310\n';       
      break;
    case newMasterRay[3][1][2]:        
      solveStr += makeMoveList('Rwwyyoww');// + '   312\n';       
      break; 
    case newMasterRay[3][2][1]:        
      solveStr += makeMoveList('GbRgB');// + '   321\n';       
      break;
    case newMasterRay[4][0][1]://yellow edge
      solveStr += makeMoveList('GbrrgB');// + '   401\n';       
      break;
    case newMasterRay[4][1][0]:        
      solveStr += makeMoveList('yGbrrgB');// + '   410\n';       
      break;
    case newMasterRay[4][1][2]:        
      solveStr += makeMoveList('YGbrrgB');// + '   412\n';       
      break;
    case newMasterRay[4][2][1]:        
      solveStr += makeMoveList('yyGbrrgB');// + '   421\n';       
      break;
    case newMasterRay[5][1][0]://orange edge        
      solveStr += makeMoveList('rWyBw');// + '   510\n';       
      break;
    case newMasterRay[5][1][2]:        
      solveStr += makeMoveList('RwYgW');// + '   512\n';      
      break;  
    case newMasterRay[5][2][1]:        
      solveStr += makeMoveList('yGbrgB');// + '   521\n';       
      break;      
  }
  newMasterRay = getMaster(newMessWhite, newMessGreen, newMessRed, newMessBlue, newMessYellow, newMessOrange); 
  return solveStr;   
}

function makeOutStr() {
	var str = '<p>The moves below are in lower case for clockwise twists and upper case for counter clockwise twists. The color that it tells you to turn refers to the side with that color in the middle, even if that is the only piece with that color on the side.';
	var len = moveList2.length;
	//console.log(moveList2);
	for(var i = 0; i < len; i++) {
		var myChar = moveList2.shift();
		switch (myChar){
		  case 'w':
			str += '<span class="whiteCol">     white </span>';
			break;
		  case 'W':
			str += '<span class="whiteCol">     white </span>'.toUpperCase();
			break;
		  case 'g':
			str += '<span class="greenCol">     green </span>';
			break;
		  case 'G':
			str += '<span class="greenCol">     green </span>'.toUpperCase();
			break;
		  case 'r':
			str += '<span class="redCol">     red </span>';
			break;
		  case 'R':
			str += '<span class="redCol">     red </span>'.toUpperCase();
			break;
		  case 'b':
			str += '<span class="blueCol">     blue </span>';
			break;
		  case 'B':
			str += '<span class="blueCol">     blue </span>'.toUpperCase();
			break;
		  case 'y': 
			str += '<span class="yellowCol">     yellow </span>';
			break;
		  case 'Y':
			str += '<span class="yellowCol">     yellow </span>'.toUpperCase();
			break;
		  case 'o':
			str += '<span class="orangeCol">     orange </span>';
			break;
		  case 'O':
			str += '<span class="orangeCol">     orange </span>'.toUpperCase();
			break ; 
		}
	}   
	str += '</p>';
	return str;
}