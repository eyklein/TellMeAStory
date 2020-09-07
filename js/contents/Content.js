var mouseDragTempObj={};


class Content{

	constructor(contentJson_,parentScene_){
		this.type="unspecified";
		this.uniqueIdentifier = Math.random()*100000000000000000;
		
		this.JSONData=contentJson_;
		this.id=contentJson_.id;
		this.parentScene=parentScene_;
		//this.parentScenes[this.id] = parentScene_;
		//this.parentScene = parentScene_;

		this.effects={};
		this.effects.general={};
		this.effects.entrance={};
		this.effects.exit={};
		this.effects.clickable={};

		this.actionsIn=[];//action heads
		this.actionsOut=[];//action tails
		this.content=contentJson_.content;
		this.isClickable=false;

		this.elicits={};
		this.elicits.display=null;//null sginifies no action , fasle signifies an action not triggered , true signifies action triggered
		this.elicits.clickable=null; //clickable/activate are ths same

		this.html={};
		//this.html.be={};//back end
		this.html.fe={};//front end
		this.html.random=Math.random();
		this.html.fe.created=false;

		// this.pos={};
		// this.pos.xIndex = 0;
		//this.pos.x = this.pos.xIndex*200;

		this.frontEndCreated=false;
		//this.pos.yIndex




		this.contentEditorOverlay=currentStory.contentEditorOverlay;//this is a univeral veiw (same for every content)
		// this.contentEditorModual=new ContentEditorModual(this, this.contentEditorOverlay);


		// this.addActionIn=function(headAction_){
		// 	if(headAction_.elicit=="display"){
		// 		this.elicits.display=false
		// 	}else if(headAction_.elicit=="clickable"){
		// 		this.elicits.clickable=false
		// 	}
			
		// 	this.actionsIn.append(headAction_)
		// }
		// this.addActionOut=function(tailAction_){

		// 	this.actionsOut.append(tailAction_)
		// }

		this.cNode=new ContentNode(this);//,this.parentScene);
	}

	getFirstAction(){
		let minIndex=0
		let minPosition = this.actionsIn[minIndex];
		for(let i=1;i < this.actionsIn.length; i++){
			if(minPosition >= this.actionsIn[i].getHeadPosition().y){
				let minIndex=i
				minPosition = this.actionsIn(i).getHeadPosition().y
			}
		}
		return this.actionsIn[minIndex];
	}

	getClone(){
		let clone={};


		clone.type=this.type;
		clone.uniqueIdentifier = Math.random()*100000000000000000;
		
		//this.JSONData=contentJson_;
		clone.id=this.id;
		clone.parentScene=this.parentScene;
		//this.addParentScene(parentScene_);
		//this.parentScenes[this.id] = parentScene_;
		//this.parentScene = parentScene_;

		clone.effects=this.effects;
		

		clone.actionsIn=this.actionsIn;//action heads
		clone.actionsOut=this.actionsOut;//action tails
		clone.content=this.content;
		clone.isClickable=this.isClickable;

		clone.elicits=this.elicits;
		// this.elicits.display=null;//null sginifies no action , fasle signifies an action not triggered , true signifies action triggered
		// this.elicits.clickable=null; //clickable/activate are ths same

		clone.html=this.html;
		//this.html.be={};//back end
		// this.html.fe={};//front end

		clone.pos={};
		clone.pos.xIndex = 0;
		clone.pos.x = this.pos.xIndex*200;
		clone.frontEndCreated=false;

		return clone;
	}

	// addParentScene(parentScene_){
	// 	this.parentScenes[parentScene_.id] ={}
	// 	this.parentScenes[parentScene_.id].scene = parentScene_;

	// }

	addActionIn(headAction_){
		if(headAction_.elicit=="display"){
			this.elicits.display=false
		}else if(headAction_.elicit=="clickable"){
			this.elicits.clickable=false
		}
		
		this.actionsIn.push(headAction_)
	}
	addActionOut(tailAction_){

		this.actionsOut.push(tailAction_)
	}



	// getNode(sceneSpacificInfo_){
	// 	return new ContentNode(this,sceneSpacificInfo_);
	// }
	// positionNode(){
	// 	this.node.createHTML();
	// }
	createEffects(){
		for(let effect in this.JSONData.effects.general){
			this.effects.general[effect]=new ContentEffect(this.JSONData.effects.general[effect],this)
		}
		for(let effect in this.JSONData.effects.entrance){
			this.effects.entrance[effect]=new ContentEffect(this.JSONData.effects.entrance[effect],this)
		}
		for(let effect in this.JSONData.effects.exit){
			this.effects.exit[effect]=new ContentEffect(this.JSONData.effects.exit[effect],this)
		}

		for(let effect in this.JSONData.effects.clickable){
			this.effects.clickable[effect]=new ContentEffect(this.JSONData.effects.clickable[effect],this)
		}
	
	}
	applyGeneralEffects(){
		
		for(let effect in this.effects.general){
			this.effects.general[effect].apply();
		}
	}
	applyEntranceEffects(){
		
		for(let effect in this.effects.entrance){
			this.effects.entrance[effect].apply();
		}
	}
	activateExitEffects(){
		for(let effect in this.effects.exit){
			this.effects.exit[effect].apply();
		}

		this.elicits.display=false;
		if(this.elicits.clickable==true){
			this.elicits.clickable=false;
		}
	}

	onClickEvent(action_){//this and action must be bound
		this.activateExitEffects();
		action_.activate();
	}

	activateClickable(){
		this.isClickable=true;

		this.elicits.clickable=true;

		for(let effect in this.effects.clickable.generic){
			this.effects.clickable.generic[effect].apply();
		}
		for(let action in this.actionsOut){
			//should not need this should only activate events at this piont not all events out ????
			if(this.actionsOut[action].scene==currentStory.currentScene){
				if(this.actionsOut[action].trigger=="click"){
					this.actionsOut[action].addEventListener();
				}
			}else{
				//this if statment blocks actions for universal shared objects from firing
				//console.log(this.actionsOut[action].scene.id + "  : :  " + currentStory.currentScene.id)
			}
		}
	}

	deactivateClickable(){
		
		this.isClickable=false;
		this.elicits.clickable=false;

		for(let effect in this.effects.clickable.generic){
			this.effects.clickable.generic[effect].remove();
		}
		for(let action in this.actionsOut){
			if(this.actionsOut[action].trigger=="click"){
				this.actionsOut[action].removeEventListener();
				//this.removeClickableEventListener(this.actionsOut[action]);
			}
		}
	}


	displayFrontEndHTML(){
		this.elicits.display=true;
	}
}

function displayOnTimer(clickEvent){
	clickEvent.target.targetContent.deactivateClickable();
	clickEvent.target.targetContent.activateExitEffects();

	//clickEvent.target.removeEventListener("click", displayOnTimer);


		// clickEvent.target.action.head.displayFrontEndHTML();
		// clickEvent.target.action.head.trigerActionsOut();


	setTimeout(function(targetContent_){
		targetContent_.action.head.displayFrontEndHTML();
		targetContent_.action.head.trigerActionsOut();
	}, clickEvent.target.targetContent.action.delay*1000, clickEvent.target.targetContent);
}

// Content.prototype.updateIconContent=function(){
// 	iconWidth=100;
// 	iconHeight=75;




// 	if(this.content.type=="text"){
// 		//used to display in backend
// 		this.value=this.content.value;

// 		this.html.be.divIcon.innerHTML=this.content.value;

// 	// }else if(this.content.type=="text-clickable"){
// 	// 	// this.htmlElements={};
// 	// 	let link = document.createElement("a");
// 	// 	link.innerHTML=this.content.value;
// 	// 	this.html.be.divIcon.appendChild(link);
// 	}else if(this.content.type=="img"){
// 		this.value=this.content.value;

// 		let img = document.createElement("img");
// 		img.src=this.content.value;
// 		img.style.width=iconWidth+'px';
// 		img.style.height=iconHeight+'px';
// 		this.html.be.divIcon.appendChild(img);
		
// 		//this.html.be.divIcon.innerHTML=this.content.value;
// 		//document.getElementById("background_img").append(this.htmlElements.frontEnd);
// 	}else if( this.content.type=="clear-text"){
// 		this.value="clear";
		
// 		//this.htmlElement.action="clear";
// 		//clearMainText()
// 	}
// 	// else if(this.content.type=="audio"){
// 	// 	this.html.be.divIcon.innerHTML=this.content.value;
		

// 	// 	if(this.properties["clipping"]!=undefined){
// 	// 		this.html.be.divIcon.style.height=this.properties["clipping"]["vareables"].duration.value * 100 + "px";
// 	// 	}else{
// 	// 		this.html.be.divIcon.style.height=this.audio.duration * 100 + "px";
// 	// 	}
		
// 	// 	this.html.be.divIcon.style.width=30 + "px";

// 	// 	this.audioObjectHandler.updateAudioDisplay();

//  //  		this.html.be.divIcon.appendChild(this.audioObjectHandler.audioDisplay.getCanvaseWrap());
					
// 	// 	}
// 	}


// //}

Content.prototype.addClassUp=function(class_,applyToActions_){
	this.html.be.divIcon.classList.add(class_);
	if(applyToActions_){
		this.actionsIn[0].html.be.svg.classList.add(class_);
	}

	if(this.actionsIn[0].tail instanceof Content){
		this.actionsIn[0].tail.addClassUp(class_,applyToActions_);
	}
}

Content.prototype.removeClassUp=function(class_,applyToActions_){
	this.html.be.divIcon.classList.remove(class_);
	if(applyToActions_){
		this.actionsIn[0].html.be.svg.classList.remove(class_);
	}

	if(this.actionsIn[0].tail instanceof Content){
		//console.log(this.actionsIn[0].tail)
		this.actionsIn[0].tail.removeClassUp(class_,applyToActions_);
	}
}

function getParentWithProperty(targetHTML_,property_){
	//console.log
	if(targetHTML_ == window){
		return null;
	}else if(targetHTML_[property_] != undefined){
		return targetHTML_;
	}else{
		return getParentWithProperty(targetHTML_.parentElement,property_);
	}
	
	//event_.target
}

Content.prototype.createBackEndHTML=function(){
	this.html.be={};
	
	this.html.be.container = document.createElement("div");
	this.html.be.container.classList.add("content-container");
	this.html.be.container.classList.add("content-" + this.id);
	this.html.be.container.classList.add("content-" + this.content.type);

	this.html.be.divIcon = document.createElement("div");
	this.html.be.divIcon.classList.add("content-icon");
	
	this.html.be.divIcon.contentObject=this;
	this.html.be.divIcon.testVareable="whatsikfados nifads";
	this.html.be.divIcon.onmouseover = function(event_){
		//console.log(event_)

		getParentWithProperty(event_.target,"contentObject").contentObject.addClassUp("infocus",true)


	};
	
	this.html.be.divIcon.onmouseout = function(event_){

		getParentWithProperty(event_.target,"contentObject").contentObject.removeClassUp("infocus",true)
		
	};

	this.html.be.divIcon.ondblclick  = function(event_){

		let thisTargetObject=getContentObject(event_.target);

		thisTargetObject.contentEditorModual.html.viewport.innerHTML=""
		thisTargetObject.contentEditorModual.asignThisModual()
		thisTargetObject.contentEditorModual.updateVeiwPort();
		thisTargetObject.contentEditorModual.createViewport()
		thisTargetObject.contentEditorModual.display(true);

	};




	this.html.be.container.appendChild(this.html.be.divIcon)

	

	this.html.be.iconDragBar = document.createElement("div");
	this.html.be.iconDragBar.classList.add("draggable-bar");
	this.html.be.container.appendChild(this.html.be.iconDragBar)
	this.html.be.iconDragBar.contentObject=this;






	this.html.be.iconDragBar.onmousedown = function(event_) { // (1) start the process

	  	startMoveAt(event_.pageX, event_.pageY, this.contentObject);


	  	function startMoveAt(pageX_, pageY_, object_) {

	  		mouseDragTempObj.mouseDownPos={}

	  		mouseDragTempObj.mouseDownPos.x=pageX_;
	  		mouseDragTempObj.mouseDownPos.y=pageY_;

	  		mouseDragTempObj.prev={};
	  		mouseDragTempObj.prev.y=pageY_;


	  		mouseDragTempObj.object=object_;

	  	}

	  	//function moveAt(pageX, pageY) {
	  	function moveAt(deltaY_) {
	  		mouseDragTempObj.object.actionsIn[0].deltaActionDelay(deltaY_);

	  	}

	  	function onMouseMove(event_, text_) {
	  		//console.log(this)
	    	moveAt(event_.pageY-mouseDragTempObj.prev.y);
	    	mouseDragTempObj.prev.y=event_.pageY;
	  	}

		// (3) move the ball on mousemove
		document.addEventListener('mousemove', onMouseMove);

	  	// (4) drop the ball, remove unneeded handlers
	  	// this.contentObject.html.be.iconDragBar.onmouseup = function() {
	  	window.onmouseup = function() {
	  		//console.log("remove event listener")
	  		//also need to remove 
		    document.removeEventListener('mousemove', onMouseMove);
		    window.onmouseup = null;
		};

	};
	

	
	
	
}

Content.prototype.createFrontEndHTML=function(){
	this.frontEndCreated=true;

	if(this.content.type=="text"){
		
	
	}else if(this.content.type=="img"){
		


	}else if( this.content.type=="clear-text"){
		//this.html={};
		
	}else if(this.content.type=="audio"){
		//this.html={};
		
		
	}
	
}


Content.prototype.activateActionsOut=function(){
	for(let i=0;i<this.actionsOut.length;i++){
		this.actionsOut[i].takeActionLive();
	}
}




Content.prototype.updateDelayStart=function(time_){
	this.triger.delayStart=time_;
}

//
// Content.prototype.updateDelay=function(id_,time_){
// 	for(let i=0;i<this.targets.length;i++){
		
// 		if(this.targets[i].id==id_){
// 			this.targets[i].delay=time_;
// 		}
// 	}
// }


//for saving
// Content.prototype.setCleanJSON=function(){
// 	this.JSON={}
// 	this.JSON.id=this.id;
// 	this.JSON.content=this.content;
// 	this.JSON.triger=this.triger;
// 	this.JSON.targets=this.targets;
// 	console.log(this.JSON);
// }


Content.prototype.activateActionsOut=function(){
	for(let i=0;i<this.actionsOut.length;i++){
		//this.actionsOut[i].activate();
	}

}

Content.prototype.logContent=function(){
	console.log(this.JSONData.content.value);
}


Content.prototype.updateDelayArrow=function(deltaX,deltaY){



this.div.delayInfo.svg.style.height=(deltaY)+'px';
this.div.delayInfo.style.height=(deltaY)+'px';
this.div.delayInfo.style.top=(-deltaY)+'px';
this.div.delayInfo.style.left=(-deltaX)+'px'

this.div.delayInfo.svg.innerHTML=delayArrowSVG(deltaY);
this.div.delayInfo.style.display="block";


this.div.delayInfo.text.style.left=(-deltaX)/2+'px';
this.div.delayInfo.text.style.top=(deltaY)/2+'px';
this.div.delayInfo.text.innerHTML=(deltaY/100)+' s';
}
Content.prototype.updateDelayArrow=function(deltaX,deltaY){



	this.div.delayInfo.svg.style.height=(deltaY)+'px';
	this.div.delayInfo.style.height=(deltaY)+'px';
	this.div.delayInfo.style.top=(-deltaY)+'px';
	this.div.delayInfo.style.left=(-deltaX)+'px'

	this.div.delayInfo.svg.innerHTML=delayArrowSVG(deltaY);
	this.div.delayInfo.style.display="block";


	this.div.delayInfo.text.style.left=(-deltaX)/2+'px';
	this.div.delayInfo.text.style.top=(deltaY)/2+'px';
	this.div.delayInfo.text.innerHTML=(deltaY/100)+' s';
}
Content.prototype.displayLogic = function() {
	//for(let i=0;i<this.actionsIn.length;i++){ //in theory there can be more than one driving action
		let i=0;
		if(this.actionsIn[i] instanceof Scene){
			document.getElementById('content').appendChild(this.div.container);
		}else if(this.actionsIn[i] instanceof Content){
			this.actionsIn[i].tail.object.div.container.appendChild(this.div.container);
		}
	//}
	

 //  	if(this.parentEvent==null){//self triggered  append div to content
	// 	document.getElementById('content').appendChild(this.div.container);
	// }else{
	// 	this.parentEvent.object.div.container.appendChild(this.div.container);
	// }

	this.updateDisplayLogic();
};
Content.prototype.updateDisplayLogicDELETTHIS=function(deltaX_,deltaY_){
// console.log('************************************************')
// 	console.log(deltaY_)

	//for(let i=0;i<this.actionsIn.length;i++){//in theory there can be more than one driving action
		let i=0;

		let deltaX=25
		if(this.actionsIn[i] instanceof Scene){
			deltaX=200;
			//***update the event and then gennerate new from that is what should happen
			
			//this.updateDelay(deltaY_/100);
		}
		else if(this.actionsIn[i].type=='click'){
			deltaX=30*(this.actionsIn[i].order+1);
		}else if(this.actionsIn[i].type=='time'){
			deltaX=30*(this.actionsIn[i].order+1);
		}

		this.div.container.style.left=deltaX +"px";


		if(deltaY_==null){
			let deltaY=0;
			
			deltaY=this.actionsIn[i].delay*100;
			if(this.actionsIn[i].type=='click'){
				deltaY+=100;
			}

			
			
			

			this.div.container.style.top=deltaY +"px";

			this.updateArrow(deltaX, deltaY);
		}else{//right now i only have a reson to override Y

			//????***update the event and then gennerate new from that is what should happen
			// if(this.actionsIn[i] instanceof Content){
			// 	this.parentEvent.object.updateDelay(this.id,deltaY_/100)
			// }



			//update parent delay
			//this.parentScene.scene.targets

			this.div.container.style.top=deltaY_ +"px";

			

			this.updateArrow(deltaX, deltaY_);
			this.updateDelayArrow(deltaX, deltaY_);
		}
	}
//}


Content.prototype.getJSON=function(){
// {
//   "id":"001",
//   "content":
//   {
//     "type":"text-clickable",
//     "value":"Can you tell me story?"
//   }
// }
	let jsonContent={}

	jsonContent.id=this.id
	jsonContent.content={};
	jsonContent.content.type=this.content.type;
	jsonContent.content.value=this.content.value;
	jsonContent.properties={}
	for(let type in this.properties){
		jsonContent.properties[type]=this.properties[type].getJSON();
	}
	
	

	return jsonContent;

}



function getContentObject(html_){
	console.log(html_)
	if(html_==window){
		console.log("at the top but no object found")
		return null;
	}
	if(html_.contentObject != undefined){
		return html_.contentObject;
	}else{
		return getContentObject(html_.parentNode);
	}
}



// function AudioDisplay(audio_){
// 	this.audio=audio_;
// 	this.scale=100;		// pixels/second
// 	this.currentPlayTime=30;
// 	this.amplitudes=getAmplitudes(audio_,audio_.duration*this.scale);
// 	this.samples=this.amplitudes.length;
// 	this.duration=audio_.duration;
	

// 	this.html={};

// 	this.html.canvasWrap = document.createElement("div");
// 	this.html.canvasWrap.classList.add("canvas-wrap")
// 	this.html.canvas = document.createElement("CANVAS");

// 	const dpr = window.devicePixelRatio || 1;
// 	//const padding = 20;
// 	this.html.canvas.width = 320;
// 	this.html.canvas.height = this.duration * this.scale;
// 	this.html.ctx = this.html.canvas.getContext("2d");
// 	//this.html.ctx.scale(dpr, dpr);

// 	this.html.ctx.lineWidth = 1; // how thick the line is
	

// 	//this.html.be.divIcon.appendChild(this.audio.canvas);

	
// 		//ctx.strokeStyle = "#fff"; // what color our line is
// 		//console.log()


// 	this.draw = function(start_,durration_){
// 		let indent=100;


// 		//axis line
// 		this.html.ctx.strokeStyle = "#000000";// what color our line is	
// 		this.html.ctx.beginPath();
// 		this.html.ctx.moveTo(indent, 0);
// 		this.html.ctx.lineTo(indent, this.html.canvas.height);
// 		this.html.ctx.stroke();								


// 		this.html.ctx.font = "20px century_gothicregular";
// 		this.html.ctx.textAlign = "end";
// 		this.html.ctx.textBaseline = "middle";
// 		this.html.ctx.fillStyle = "#333";// what color our line is	

// 		//axis numbers
// 		for(let i=0;i<this.amplitudes.length;i+=100){
// 			this.html.ctx.fillText(i/this.scale + "  -", indent, i);
// 		}
		
		
// 		for(let i=0;i<this.amplitudes.length;i++){
			

// 			if( i/100<start_ || i/100>start_+durration_){
// 				this.html.ctx.strokeStyle = "#0000ff";// what color our line is	
// 			}else{
// 				this.html.ctx.strokeStyle = "#000000";// what color our line is	
// 			}																			

// 			this.html.ctx.beginPath();
// 			this.html.ctx.moveTo(indent, i);
// 			this.html.ctx.lineTo(indent + this.amplitudes[i]*800, i);
// 			this.html.ctx.stroke();
// 		}

// 		this.html.ctx.beginPath();
// 		this.html.ctx.moveTo(0, 2578);
// 		this.html.ctx.lineTo(600, 2578);
// 		this.html.ctx.stroke();
		

// 	}

// 	this.draw(5,6)

// 	this.updatePlayPosition = function(){
// 		console.log(this.audio)
// 		this.html.playBar.style.top=this.audio.currentTime*100 + "px";
// 	}
	
	

// 	// this.html.ctx.moveTo(0, 10);
// 	// this.html.ctx.lineTo(10,10);
// 	// this.html.ctx.strokeStyle = "black";
// 	// this.html.ctx.stroke();		

// 	// this.html.ctx.strokeStyle = "#0000ff";// what color our line is	
// 	// this.html.ctx.beginPath();
// 	// this.html.ctx.moveTo(10, this.currentPlayTime*100);
// 	// this.html.ctx.lineTo(400, this.currentPlayTime*100);
// 	// this.html.ctx.stroke();		



// 	this.html.playBar=document.createElement("div");
// 	this.html.playBar.style.height="5px";
// 	this.html.playBar.style.width="500px";
// 	this.html.playBar.style['background-color']="green";
// 	this.html.playBar.style.position = 'absolute';
// 	this.html.playBar.style.left="0px";
// 	this.html.playBar.style.top="-50px";

// 	this.html.canvasWrap.appendChild(this.html.canvas);

// 	this.html.canvasWrap.appendChild(this.html.playBar);



// 	this.setPlayTime=function(time){
// 		this.html.playBar.style.top=time*this.scale+"px";
// 	}

					
// 	this.getCanvaseWrap=function(){
// 		return this.html.canvasWrap;
// 	}
// 	//return canvasWrap;
// }
