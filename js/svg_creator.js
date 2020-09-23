function hArrowSVG(deltaX_,deltaY_,strokeThickness_,type_,color_){
	let arrowSize=10;

	if(deltaX_>20){//is there room in the vertical direction to make a curvy arrow
		if(deltaY_>=0){//is there enogh room in the x direction

			radius=Math.min(deltaY_/2,10);

			xStart=0;
			yStart=0;

			h1 = (deltaX_-radius-radius)/2;
			v1 = (deltaY_ - radius*2);


			return '<path class="'+type_+ " svg_arrow"+
				svgPiont(xStart,yStart) + //starting piont
				svgHorizontalLine(h1) + //vertical line
				svgRightDown(radius) + //curve down and right
				svgVerticalLine(v1) + //horizontal line
				svgDownRight(radius) + //curve down
				svgHorizontalLine(h1) +//vertical line
				svgArrowDown(arrowSize) +
				' " style="fill:none;stroke:' + color_ + ';" />';

		}else if(deltaY_< 0){//is there enogh room in the x direction

			radius=Math.min(-deltaY_/2,10);

			xStart=0;
			yStart=0;

			h1 = (deltaX_-radius-radius)/2;
			v1 = (deltaY_ + radius*2);


			return '<path class="'+type_+ " svg_arrow"+
				svgPiont(xStart,yStart) + //starting piont
				svgHorizontalLine(h1) + //vertical line
				svgRightUp(radius) + //curve down and right
				svgVerticalLine(v1) + //horizontal line
				svgUpRight(radius) + //curve down
				svgHorizontalLine(h1) +//vertical line
				svgArrowDown(arrowSize) +
				' " style="fill:none;stroke:' + color_ + ';" />';

		}
	}else if(deltaX_>=0 && deltaY_==0){
		//if(deltaY_==0){
		
			radius=Math.min(deltaY_/2,10);
	
			xStart=0;
			yStart=0;

			
			h1 = deltaX_
			v1 = (deltaY_ - radius*4)/2;


			return '<path class="'+type_+ " svg_arrow"+
				svgPiont(xStart,yStart) + //starting piont
				svgHorizontalLine(h1) +
				svgArrowRight(arrowSize) +
				' " style="fill:none;stroke:' + color_ + ';" />';
		//}
	}else if(deltaX_<=20){
		if(deltaY_>=20){//is there enogh room in the x direction

			radius=Math.min(deltaY_/2,10);

			xStart=0;
			yStart=0;

			h01 = 0;
			h02 = 10;
			h1 = deltaX_ - (h01 + h02);
			v1 = (deltaY_ - radius*4)/2;


			return '<path class="'+type_+ " svg_arrow"+
				svgPiont(xStart,yStart) + //starting piont
				svgHorizontalLine(h01) + 
				svgRightDown(radius) + 
				svgVerticalLine(v1) +
				svgDownLeft(radius) + 
				svgHorizontalLine(h1) +
				svgLeftDown(radius) +
				svgVerticalLine(v1) +
				svgDownRight(radius) +
				svgHorizontalLine(h02) +
				svgArrowDown(arrowSize) +
				' " style="fill:none;stroke:' + color_ + ';" />';

		}else{

			radius=Math.min(10); //deltaY_/2,

			xStart=0;
			yStart=0;

			h01 = 0;
			h02 = 10;
			h1 = deltaX_ //+ (h01 + h02);
			v1 = 10; //(deltaY_ - radius*4)/2;
			v2 = deltaY_ - v1;


			return '<path class="'+type_ + " svg_arrow" +
				svgPiont(xStart,yStart) + //starting piont
				svgHorizontalLine(h01) + 
				svgRightDown(radius) + 
				svgVerticalLine(v1) +
				svgDownLeft(radius) + 
				svgHorizontalLine(h1) +
				svgLeftUp(radius) +
				svgVerticalLine(v2) +
				svgUpRight(radius) +
				//svgHorizontalLine(h02) +
				svgArrowDown(arrowSize) +
				' " style="fill:none;stroke:' + color_ + ';" />';

		}

	}
	// else if(deltaY_<=20){
	// 	if(deltaX_>=0){//is there enogh room in the x direction

	// 		radius=Math.min(deltaX_/2,10);
	// 		xStart=strokeThickness_/2+10;
	// 		yStart=0;
	// 		lineV0=10;
	// 		lineV1=deltaY_ - 2*lineV0;
	// 		lineH1=(deltaX_-radius*4)/2;




	// 		return '<path class="'+type_ +
	// 			svgPiont(xStart,yStart) + //starting piont
	// 			svgVerticalLine(lineV0)+
	// 			svgDownRight(radius) + //curve down and right
	// 			svgHorizontalLine(lineH1) + 
	// 			svgRightUp(radius) +
	// 			svgVerticalLine(lineV1) +
	// 			svgUpRight(radius) +
	// 			svgHorizontalLine(lineH1) +
	// 			svgRightDown(radius) +
	// 			svgVerticalLine(lineV0)+
	// 			svgArrowDown(arrowSize) +
				
	// 			' " style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

	// 	}else if(deltaX_< 0){//is there enogh room in the x direction

	// 		radius=Math.min(-deltaX_/2,10);
	// 		xStart=strokeThickness_/2+10;
	// 		yStart=0;
	// 		lineV0=10;
	// 		lineV1=deltaY_ - 2*lineV0;
	// 		lineH1=(deltaX_+radius*4)/2;




	// 		return '<path class="'+type_ +
	// 			svgPiont(xStart,yStart) + //starting piont
	// 			svgVerticalLine(lineV0)+
	// 			svgDownLeft(radius) + //curve down and right
	// 			svgHorizontalLine(lineH1) + 
	// 			svgLeftUp(radius) +
	// 			svgVerticalLine(lineV1) +
	// 			svgUpLeft(radius) +
	// 			svgHorizontalLine(lineH1) +
	// 			svgLeftDown(radius) +
	// 			svgVerticalLine(lineV0)+
	// 			svgArrowDown(arrowSize) +
				
	// 			' " style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

	// 	}
	// }
}



function vArrowSVG(deltaX_,deltaY_,strokeThickness_,type_,color_){
	let arrowSize=10;

	if(deltaY_>20){//is there room in the vertical direction to make a curvy arrow
		if(deltaX_>=0){//is there enogh room in the x direction

			ridius1=Math.min(deltaX_/2,10);
			ridius2=Math.min(deltaX_/2,10);

			xStart=strokeThickness_/2+10;
			yStart=0;
			lineV1=(deltaY_ - 20)/2;
			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;


			return '<path class="'+type_+
				svgPiont(xStart,yStart) + //starting piont
				svgVerticalLine(lineV1) + //vertical line
				svgDownRight(ridius1) + //curve down and right
				svgHorizontalLine(lineH1) + //horizontal line
				svgRightDown(ridius1) + //curve down
				svgVerticalLine(lineV2) +//vertical line
				svgArrowDown(arrowSize) +
				' " style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

		}else if(deltaX_< 0){//is there enogh room in the x direction

			ridius1=Math.min(deltaX_/-2,10);
			ridius2=Math.min(deltaX_/-2,10);

			xStart=strokeThickness_/2+10;
			yStart=0;
			lineV1=(deltaY_ - 20)/2;
	
			

			lineH1=deltaX_+ridius1+ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;

			return '<path class="'+type_+
				svgPiont(xStart,yStart) + //starting piont
				svgVerticalLine(lineV1) + //vertical line
				svgDownLeft(ridius1) + //curve down and right
				svgHorizontalLine(lineH1) + //horizontal line
				svgLeftDown(ridius1) + //curve down
				svgVerticalLine(lineV2) +//vertical line
				svgArrowDown(arrowSize) +
				' " style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

		}
	}else if(deltaY_<=20){
		if(deltaX_>=0){//is there enogh room in the x direction

			radius=Math.min(deltaX_/2,10);
			xStart=strokeThickness_/2+10;
			yStart=0;
			lineV0=10;
			lineV1=deltaY_ - 2*lineV0;
			lineH1=(deltaX_-radius*4)/2;




			return '<path class="'+type_ +
				svgPiont(xStart,yStart) + //starting piont
				svgVerticalLine(lineV0)+
				svgDownRight(radius) + //curve down and right
				svgHorizontalLine(lineH1) + 
				svgRightUp(radius) +
				svgVerticalLine(lineV1) +
				svgUpRight(radius) +
				svgHorizontalLine(lineH1) +
				svgRightDown(radius) +
				svgVerticalLine(lineV0)+
				svgArrowDown(arrowSize) +
				
				' " style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

		}else if(deltaX_< 0){//is there enogh room in the x direction

			radius=Math.min(-deltaX_/2,10);
			xStart=strokeThickness_/2+10;
			yStart=0;
			lineV0=10;
			lineV1=deltaY_ - 2*lineV0;
			lineH1=(deltaX_+radius*4)/2;




			return '<path class="'+type_ +
				svgPiont(xStart,yStart) + //starting piont
				svgVerticalLine(lineV0)+
				svgDownLeft(radius) + //curve down and right
				svgHorizontalLine(lineH1) + 
				svgLeftUp(radius) +
				svgVerticalLine(lineV1) +
				svgUpLeft(radius) +
				svgHorizontalLine(lineH1) +
				svgLeftDown(radius) +
				svgVerticalLine(lineV0)+
				svgArrowDown(arrowSize) +
				
				' " style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

		}
	}
}

function svgPiont(x_, y_){
	return '" d="m '+x_+' '+y_+'  ' 
}

function svgDownRight(ridius_){ //
	return ' q ' + 0 + ' ' + ridius_  + ' ' + ridius_  + ' ' + ridius_  + ' ';//curve down and right
}

function svgDownLeft(ridius_){ //
	return ' q '+0+' ' + ridius_  + ' ' + ridius_*-1  + ' ' + ridius_  + ' ';  //curve down and left
}
function svgUpRight(ridius_){ //
	return ' q ' + 0 + ' ' + -ridius_  + ' ' + ridius_  + ' ' + -ridius_  + ' ';//curve down and right
}

function svgUpLeft(ridius_){ //
	return ' q '+0+' ' + -ridius_  + ' ' + -ridius_  + ' ' + -ridius_  + ' ';  //curve down and left
}

function svgLeftDown(ridius_){ //
	return 'q ' +  ridius_*-1 + ' '+ 0 + ' ' +  ridius_*-1 + ' '+ridius_+ ' ';
}

function svgRightDown(ridius_){ //
	return 'q ' +  ridius_ + ' ' + 0 + ' ' + ridius_ + ' ' + ridius_+ ' ';
}

function svgRightUp(ridius_){ //
	return 'q ' +  ridius_ + ' ' + 0 + ' ' + ridius_ + ' ' + ridius_*-1 + ' ';
}

function svgLeftUp(ridius_){ //
	return 'q ' +  -ridius_ + ' '+ 0 + ' ' +  ridius_*-1 + ' ' + ridius_*-1 + ' ';
}
function svgHorizontalLine(length_){
	return 'l '+length_+' '+ 0 +' ';
}
function svgVerticalLine(length_){
	return 'l ' + 0 + ' ' + length_ + ' ';
}

function svgRight(length_){
	return 'l '+length_+' '+ 0 +' ';
}
function svgLeft(length_){
	return 'l '+ -length_+' '+ 0 +' ';
}
function svgUp(length_){
	return 'l ' + 0 + ' ' + -length_ + ' ';
}
function svgDown(length_){
	return 'l ' + 0 + ' ' + length_ + ' ';
}

function svgArrowDown(arrowSize_){
	return 'l' + -arrowSize_ + ' ' + -arrowSize_ + ' ';
}
function svgArrowRight(arrowSize_){
	return 'l' + -arrowSize_ + ' ' + -arrowSize_ + ' ';
}








































function actionArrowSVG(deltaX_,deltaY_,strokeThickness_,type_,color_){
	let arrowSize=10;

	if(deltaY_>20){//is there room in the vertical direction to make a curvy arrow
		if(deltaX_>=0){//is there enogh room in the x direction

			ridius1=Math.min(deltaX_/2,10);
			ridius2=Math.min(deltaX_/2,10);

			xStart=strokeThickness_/2+10;
			yStart=0;
			lineV1=(deltaY_ - 20)/2;
			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;


			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				'l'+-arrowSize +' '+-arrowSize+
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

		}else if(deltaX_<0  && false){//is there enogh room in the x direction

			ridius1=Math.min(deltaX_/-2,10);
			ridius2=Math.min(deltaX_/-2,10);

			xStart=strokeThickness_/2+10;
			yStart=0;
			lineV1=(deltaY_ - 20)/2;
	
			

			lineH1=deltaX_+ridius1+ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;


			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + ridius1*-1  + ' ' + ridius1  + ' ' + //curve down and left
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2*-1 + ' '+ 0 + ' ' +  ridius2*-1 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				'l'+-arrowSize +' '+-arrowSize+
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;stroke:' + color_ + ';" />';

		}else if(deltaX_<=-20){//negative x direction. is this posible in the logic? also the entire svg needs to move over because it will be outside the frame
			//console.log("Y>20,X< -20")
			xStart=-1*deltaX_ + strokeThickness_/2+10;
			yStart=0;

			ridius1=10;

			ridius2=10;

			lineH1=deltaX_+ridius1+ridius2;

			lineV2=deltaY_-ridius1-ridius2;

			

			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				//'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + -ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  -ridius2 + ' '+ 0 + ' ' +  -ridius2 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				'l'+-arrowSize +' '+-arrowSize+
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;" />';
		}
		else{//straight arrow
			xStart=strokeThickness_/2+10;
			yStart=0;

			lineV1=(deltaY_ - 20)/2;

			ridius1=deltaX_/2;

			ridius2=deltaX_/2;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;

			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				'l'+-arrowSize +' '+-arrowSize+
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;" />';
		}
	}else if(deltaY_>0){

		xStart=strokeThickness_/2;
		yStart=0;

		

		ridius1=10;
		lineV1=deltaY_-ridius1;

		// ridius2=10;

		lineH1=deltaX_-ridius1;

		// lineV2=deltaY_-lineV1-ridius1+ridius2;


		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
			'l '+0+' '+ lineV1 +' ' + //vertical line
			' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
			'l '+lineH1+' '+ 0 +' ' + //horizontal line
			// 'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
			// 'l '+0+' '+lineV2+//vertical line
			'l'+-arrowSize +' '+-arrowSize+
			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
			' "' + 
			' style="stroke-width:4;fill:none;" />';
	}

	else if(deltaY_<=0){

		xStart=strokeThickness_/2+20;
		yStart=-1*deltaY_;

		lineH1=-20;
		lineH2=10;

		ridius1=10;

		// ridius2=10;

		ridius3=10;


		//lineH1=deltaX_-ridius1-ridius2-ridius3;

		lineV2=deltaY_+ridius1+ridius3;


		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
			'l '+lineH1+' '+ 0 +' ' + //vertical line
			' q '+ -ridius1 +' ' + 0  + ' ' + -ridius1  + ' ' + -ridius1  + ' ' + //curve down and right
			// 'l '+lineH1+' '+ 0 +' ' + //horizontal line
			// 'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
			'l '+0+' '+lineV2+//vertical line
			// 'l'+-arrowSize +' '+-arrowSize+
			'q ' +  0 + ' '+-1*ridius3 + ' ' +  ridius3 + ' '+-1*ridius3+ ' ' + //curve up
			'l '+lineH2+' '+ 0 +' ' + //vertical line
			'l'+ -arrowSize +' '+ -arrowSize+
			' "' + 
			' style="stroke-width:4;fill:none;" />';
	}
	
	if(type_==null){
		type_="none";
	}
}

// function actionSVG(deltaX_,deltaY_,strokeThickness_,type_){
// 	let arrowSize=10;
// 	//console.log(deltaY_);
// 	if(deltaY_>20){//is there room in the vertical direction to make a curvy arrow
// 		if(deltaX_>=20){//is there enogh room in the x direction
// 			xStart=strokeThickness_/2;
// 			yStart=0;
// 			lineV1=(deltaY_ - 20)/2;

// 			ridius1=10;

// 			ridius2=10;

// 			lineH1=deltaX_-ridius1-ridius2;

// 			lineV2=deltaY_-lineV1-ridius1-ridius2;

// 			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
// 				'l '+0+' '+ lineV1 +' ' + //vertical line
// 				' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
// 				'l '+lineH1+' '+ 0 +' ' + //horizontal line
// 				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
// 				'l '+0+' '+lineV2+//vertical line
				
// 				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
// 				' "' + 
// 				' style="stroke-width:4;fill:none;" />';

// 		}else if(deltaX_<=-20){//negative x direction. is this posible in the logic? also the entire svg needs to move over because it will be outside the frame
// 			ridius1=10;

// 			ridius2=10;

// 			lineH1=deltaX_-ridius1-ridius2;

// 			lineV2=deltaY_-ridius1-ridius2;
// 		}
// 		else{//straight arrow
// 			ridius1=deltaX_/2;

// 			ridius2=deltaX_/2;

// 			lineH1=deltaX_-ridius1-ridius2;

// 			lineV2=deltaY_-ridius1-ridius2;
// 		}
// 	}else if(deltaY_>0){

// 		xStart=strokeThickness_/2;
// 		yStart=0;

		

// 		ridius1=10;
// 		lineV1=deltaY_-ridius1;

// 		// ridius2=10;

// 		lineH1=deltaX_-ridius1;

// 		// lineV2=deltaY_-lineV1-ridius1+ridius2;


// 		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
// 			'l '+0+' '+ lineV1 +' ' + //vertical line
// 			' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
// 			'l '+lineH1+' '+ 0 +' ' + //horizontal line
// 			// 'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
// 			// 'l '+0+' '+lineV2+//vertical line
			
// 			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
// 			' "' + 
// 			' style="stroke-width:4;fill:none;" />';
// 	}

// 	else if(deltaY_<=0){

// 		xStart=strokeThickness_/2;
// 		yStart=-1*deltaY_;

// 		lineV1=0;

// 		ridius1=10;

// 		ridius2=10;

// 		ridius3=10;


// 		lineH1=deltaX_-ridius1-ridius2-ridius3;

// 		lineV2=deltaY_-lineV1-ridius1+ridius2+ridius3;


// 		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
// 			'l '+0+' '+ lineV1 +' ' + //vertical line
// 			' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
// 			'l '+lineH1+' '+ 0 +' ' + //horizontal line
// 			'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
// 			'l '+0+' '+lineV2+//vertical line
// 			// 'l'+-arrowSize +' '+-arrowSize+
// 			'q ' +  0 + ' '+-1*ridius3 + ' ' +  ridius3 + ' '+-1*ridius3+ ' ' + //curve up
// 			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
// 			' "' + 
// 			' style="stroke-width:4;fill:none;" />';
// 	}
	
// 	if(type_==null){
// 		type_="none";
// 	}
// }

// function getArrowVerticalExtenderSVG(deltaX_,deltaY_,strokeThickness_,type_){
// 	//deltaY_ is the total hight
// 	let arrowSize=10;
// 	//console.log(deltaY_);
	
// 	xStart=deltaX_ + strokeThickness_/2;;
// 	yStart=100;
// 	lineV1=deltaY_-yStart;

	

// 	return '<path class="'+type_+ " delay "+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
// 		'l '+0+' '+ lineV1 +' ' + //vertical line
// 		'l'+-arrowSize +' '+-arrowSize+
// 		//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
// 		' "' + 
// 		' style="stroke-width:4;fill:none;" />';


// }



// function delayArrowSVG(height_){

// 	let arrowSize =5;

// 		return '<path class="'+'delay-arrow-top'+'" d="m '+0+' '+arrowSize+'  ' + //starting piont left side
// 				'l '+arrowSize+' '+ -arrowSize +' ' + // arrow point
// 				'l '+arrowSize+' '+ arrowSize +' ' + //right side
// 				'l '+-arrowSize+' '+ -arrowSize +' ' + // back to arrow point
// 				'l '+0+' '+ height_ +' ' + // shaft
// 				'l '+-arrowSize+' '+ -arrowSize +' ' + // arrow point
// 				'l '+arrowSize+' '+ arrowSize +' ' + // back to pint
// 				'l '+arrowSize+' '+ -arrowSize +' ' + //right side


// 				'" style="stroke-width:2;fill:none;" />';
// }

// function fullScreenSVG(width_, height_,padding_){
// 	let gap=10;// gapp between 
// 	let corderLength=width_-padding_-gap;

// 	return '<path class="'+'fullscreen-tl'+
// 				'" d="m '+(padding_+corderLength) + ' '+padding_+ '  ' + //starting piont top left
// 				'l '+ -1*corderLength+' '+0+ '  ' +
// 				'l '+0+' '+ corderLength +'" ' + 
// 				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' +

// 			'<path class="'+'fullscreen-bl'+
// 				'" d="m '+padding_+ ' '+(padding_+corderLength+gap)+ '  ' + //starting piont bottom left
// 				'l '+0+' '+corderLength+ '  ' +
// 				'l '+corderLength+' '+ 0 +'" ' + 
// 				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' +
	
// 			'<path class="'+'fullscreen-tr'+
// 				'" d="m '+(padding_+corderLength+gap) + ' '+padding_+ '  ' + //starting piont top left
// 				'l '+ corderLength+' '+0+ '  ' +
// 				'l '+0+' '+ corderLength +'" ' + 
// 				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' +

// 			'<path class="'+'fullscreen-br'+
// 				'" d="m '+(padding_+corderLength*2+gap)+ ' '+(padding_+corderLength+gap)+ '  ' + //starting piont bottom left
// 				'l '+0+' '+corderLength+ '  ' +
// 				'l '+(-1)*corderLength+' '+ 0 +'" ' + 
// 				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' 
// 				;
// }


let svgEditorArrow=document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgEditorArrow.innerHTML = hArrowSVG(80,0,2,"_arrow")
svgEditorArrow.classList.add("action-line-editor");
//this.html.container.append(this.html.svgArrow);
svgEditorArrow.id = "the-arrow";


