function actionArrowSVG(deltaX_,deltaY_,strokeThickness_,type_){
	let arrowSize=10;
	console.log(deltaX_)
	console.log(deltaY_)
	//console.log(deltaY_);
	if(deltaY_>20){//is there room in the vertical direction to make a curvy arrow
		if(deltaX_>=20){//is there enogh room in the x direction
			xStart=strokeThickness_/2+10;
			yStart=0;
			lineV1=(deltaY_ - 20)/2;

			ridius1=10;

			ridius2=10;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;

			// console.log('<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
			// 	'l '+0+' '+ lineV1 +' ' + //vertical line
			// 	' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
			// 	'l '+lineH1+' '+ 0 +' ' + //horizontal line
			// 	'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
			// 	'l '+0+' '+lineV2+//vertical line
			// 	'l'+-arrowSize +' '+-arrowSize+
			// 	//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
			// 	' "' + 
			// 	' style="stroke-width:4;fill:none;" />')

			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + -ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				'l'+-arrowSize +' '+-arrowSize+
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;" />';

		}else if(deltaX_<=-20){//negative x direction. is this posible in the logic? also the entire svg needs to move over because it will be outside the frame
			xStart=strokeThickness_/2+10;
			yStart=0;

			ridius1=10;

			ridius2=10;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-ridius1-ridius2;

			console.log('<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				//'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				'l'+-arrowSize +' '+-arrowSize+
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;" />')

			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				//'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
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

		xStart=strokeThickness_/2;
		yStart=-1*deltaY_;

		lineV1=0;

		ridius1=10;

		ridius2=10;

		ridius3=10;


		lineH1=deltaX_-ridius1-ridius2-ridius3;

		lineV2=deltaY_-lineV1-ridius1+ridius2+ridius3;


		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
			'l '+0+' '+ lineV1 +' ' + //vertical line
			' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
			'l '+lineH1+' '+ 0 +' ' + //horizontal line
			'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
			'l '+0+' '+lineV2+//vertical line
			// 'l'+-arrowSize +' '+-arrowSize+
			'q ' +  0 + ' '+-1*ridius3 + ' ' +  ridius3 + ' '+-1*ridius3+ ' ' + //curve up
			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
			' "' + 
			' style="stroke-width:4;fill:none;" />';
	}
	
	if(type_==null){
		type_="none";
	}
}

function actionSVG(deltaX_,deltaY_,strokeThickness_,type_){
	let arrowSize=10;
	//console.log(deltaY_);
	if(deltaY_>20){//is there room in the vertical direction to make a curvy arrow
		if(deltaX_>=20){//is there enogh room in the x direction
			xStart=strokeThickness_/2;
			yStart=0;
			lineV1=(deltaY_ - 20)/2;

			ridius1=10;

			ridius2=10;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;

			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;" />';

		}else if(deltaX_<=-20){//negative x direction. is this posible in the logic? also the entire svg needs to move over because it will be outside the frame
			ridius1=10;

			ridius2=10;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-ridius1-ridius2;
		}
		else{//straight arrow
			ridius1=deltaX_/2;

			ridius2=deltaX_/2;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-ridius1-ridius2;
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
			
			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
			' "' + 
			' style="stroke-width:4;fill:none;" />';
	}

	else if(deltaY_<=0){

		xStart=strokeThickness_/2;
		yStart=-1*deltaY_;

		lineV1=0;

		ridius1=10;

		ridius2=10;

		ridius3=10;


		lineH1=deltaX_-ridius1-ridius2-ridius3;

		lineV2=deltaY_-lineV1-ridius1+ridius2+ridius3;


		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
			'l '+0+' '+ lineV1 +' ' + //vertical line
			' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
			'l '+lineH1+' '+ 0 +' ' + //horizontal line
			'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
			'l '+0+' '+lineV2+//vertical line
			// 'l'+-arrowSize +' '+-arrowSize+
			'q ' +  0 + ' '+-1*ridius3 + ' ' +  ridius3 + ' '+-1*ridius3+ ' ' + //curve up
			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
			' "' + 
			' style="stroke-width:4;fill:none;" />';
	}
	
	if(type_==null){
		type_="none";
	}
}

function getArrowVerticalExtenderSVG(deltaX_,deltaY_,strokeThickness_,type_){
	//deltaY_ is the total hight
	let arrowSize=10;
	//console.log(deltaY_);
	
	xStart=deltaX_ + strokeThickness_/2;;
	yStart=100;
	lineV1=deltaY_-yStart;

	

	return '<path class="'+type_+ " delay "+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
		'l '+0+' '+ lineV1 +' ' + //vertical line
		'l'+-arrowSize +' '+-arrowSize+
		//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
		' "' + 
		' style="stroke-width:4;fill:none;" />';


}



function delayArrowSVG(height_){

	let arrowSize =5;

		return '<path class="'+'delay-arrow-top'+'" d="m '+0+' '+arrowSize+'  ' + //starting piont left side
				'l '+arrowSize+' '+ -arrowSize +' ' + // arrow point
				'l '+arrowSize+' '+ arrowSize +' ' + //right side
				'l '+-arrowSize+' '+ -arrowSize +' ' + // back to arrow point
				'l '+0+' '+ height_ +' ' + // shaft
				'l '+-arrowSize+' '+ -arrowSize +' ' + // arrow point
				'l '+arrowSize+' '+ arrowSize +' ' + // back to pint
				'l '+arrowSize+' '+ -arrowSize +' ' + //right side


				'" style="stroke-width:2;fill:none;" />';
}

function fullScreenSVG(width_, height_,padding_){
	let gap=10;// gapp between 
	let corderLength=width_-padding_-gap;

	return '<path class="'+'fullscreen-tl'+
				'" d="m '+(padding_+corderLength) + ' '+padding_+ '  ' + //starting piont top left
				'l '+ -1*corderLength+' '+0+ '  ' +
				'l '+0+' '+ corderLength +'" ' + 
				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' +

			'<path class="'+'fullscreen-bl'+
				'" d="m '+padding_+ ' '+(padding_+corderLength+gap)+ '  ' + //starting piont bottom left
				'l '+0+' '+corderLength+ '  ' +
				'l '+corderLength+' '+ 0 +'" ' + 
				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' +
	
			'<path class="'+'fullscreen-tr'+
				'" d="m '+(padding_+corderLength+gap) + ' '+padding_+ '  ' + //starting piont top left
				'l '+ corderLength+' '+0+ '  ' +
				'l '+0+' '+ corderLength +'" ' + 
				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' +

			'<path class="'+'fullscreen-br'+
				'" d="m '+(padding_+corderLength*2+gap)+ ' '+(padding_+corderLength+gap)+ '  ' + //starting piont bottom left
				'l '+0+' '+corderLength+ '  ' +
				'l '+(-1)*corderLength+' '+ 0 +'" ' + 
				'opacity="0.5" stroke-width="3.5" stroke="#000" fill="none" />' 
				;
}

