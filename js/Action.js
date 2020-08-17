let timeScale = 10;
let clickScale = 50;
class Action{

	constructor(actionJSON_,scene_){
		


		this.JSON=actionJSON_;
		//actionJSON_.id=Math.random();
		this.id=actionJSON_.id;
		this.tempId=Math.round(Math.random(0, 1)*100);
		this.tail;//either the scene itself or content object
		this.head;//either content of a new scene
		this.block;//this will turn off other actions deafalt is to just turn itself off 
		this.trigger=actionJSON_.trigger;//time/click are the basic but could be any sensable action...
		this.elicit=actionJSON_.elicit;// display/clickable/...
		this.delay=actionJSON_.delay;//time/click are the basic but could be any sensable action...
		this.passOnInheritance=undefined;

		if(actionJSON_.conditions != undefined){
			this.conditionals=[] //all contitions are evaluated as AND conditions
			for(let condition of actionJSON_.conditions){
				this.conditionals.push(new Conditional(condition));
			}
		}


		//this.order=1;
		this.bePositionSet=false;

		this.scene=scene_;
		this.html={};
		//this.html.backEnd={}

		this.outIndex;
		this.inIndex;


		this.pos={};
		this.pos.set=false;
		//this.pos.y




		this.height;
		this.width = 500*Math.random()-250;
		// this.html.be.pos={};
		// this.html.be.pos.x={};
		// this.html.be.pos.y={};




		// console.log(actionJSON_.id)
		// console.log(actionJSON_.passOnInheritance)
		if(actionJSON_.passOnInheritance != undefined){
			this.passOnInheritance=[]
			// console.log(this.id)
			// console.log(actionJSON_.passOnInheritance)
			for(let i in actionJSON_.passOnInheritance){
				this.passOnInheritance[i]=this.scene.contentsLib[actionJSON_.passOnInheritance[i]];
			}
			// console.log(this.passOnInheritance)
		}



		// this.link(actionJSON_);


		if(!isNaN(actionJSON_.tailID)){//if target is numbers it is an event if it is letters it is a scene // returns true if it starts with numbers

			this.tail=this.scene.getContentByID(actionJSON_.tailID);
			//this.tail.actionsOut.push(this);
			this.tail.addActionOut(this)
		}else{
			if(actionJSON_.tailID != this.scene.id){
				console.log(actionJSON_.tailID +  " != " + this.scene.id)
				console.log("Scene trigger and scene object do not match");
			}
			this.tail=this.scene;
			
			//this.tail.addActionOut(this) //need to add this function the scene object ???
			this.tail.actionsOut.push(this)
		}


		if(!isNaN(actionJSON_.headID)){//ibid
			this.head=this.scene.getContentByID(actionJSON_.headID);
			//this.head.actionsIn.push(this);

			this.head.addActionIn(this)
		}else{
			this.head=this.scene.play.scenesLib[actionJSON_.headID];

			//this.head.addActionIn(this) //need to add this function the scene object ???
			this.head.actionsIn.push(this)
		}

		this.setHeight();

	}

	skip(skipTime_){
		if(this.timer!=undefined){
			//console.log("skip: " + this.id + " : " + this.timer)
			this.timer.skip(skipTime_)
		}
	}
	onEvent(){
		
		this.activate();
	}

	addEventListener(){
		//console.log("adding EL to " + this.tail.id + " tigger " + this.head.id)
		this.onEventBind = this.onEvent.bind(this)
		//right now this is only for click events


		this.tail.html.fe.addEventListener("click", this.onEventBind );
	}
	removeEventListener(){
		this.tail.html.fe.removeEventListener("click", this.onEventBind );
	}
	activate(){
		//console.log(this.conditionals)
		if(this.conditionals != undefined){
			for(let conditional of this.conditionals){
				if(conditional.eval() == false){
					return;
				}
				
			}
			this.activateNow();
		}else{
			this.activateNow();
		}

	}

	activateNow(){
		if(this.elicit=="display"){
			this.displayContent(this.delay);
		}else if(this.elicit=="hide"){
			this.hideContent(this.delay);
		}
		else if(this.elicit=="clickable"){
			this.activateContent(this.delay)
			
		}else if(this.elicit=="unclickable"){
			this.deactivateContent(this.delay);
		}
	}

	displayContent(delay_){

		//console.log("display " + this.head.id + " from " + this.tail.id + " delay: " + delay_)
		if(delay_==null){
			delay_=0;
		}
		let premature=true;
		if(this.head instanceof AudioContent){
			premature=false
		}
		
		// console.log("d_" + this.id)

		this.timer=new Timer(function(){
			if(this.head instanceof Content){
				this.head.displayFrontEndHTML();
				//these should just be the actions out not the clickable **
				this.head.activateActionsOut();
			}else if(this.head instanceof Scene){
				currentStory.newScene(this.head,this.passOnInheritance);
			}
			this.removeTimer()

		}.bind(this), delay_*1000,this);

		

		this.timer.resume();
		

	}
	hideContent(delay_){
		if(delay_==null){
			delay_=0;
		}

		this.timer=new Timer(function(){
			if(this.head instanceof Content){
				this.deactivateContent(0);//deactivate before hiding
				
				this.head.activateExitEffects();
			}else if(this.head instanceof Scene){
				console.log("Trying to hide a scene??")
			}

			this.removeTimer()

		}.bind(this), delay_*1000,this);

		this.timer.resume();

	}

	activateContent(delay_){
		if(delay_==null){
			delay_=0;
		}

		this.timer=new Timer(function(){
			this.head.activateClickable();
			this.removeTimer()
		}.bind(this), delay_*1000,this);

		this.timer.resume();
	}

	deactivateContent(delay_){
		if(delay_==null){
			delay_=0; 
		}

		this.timer=new Timer(function(){
			this.head.deactivateClickable();
			this.removeTimer()
		}.bind(this), delay_*1000,this);

		this.timer.resume();
	}

	makeClickableContent(){


	}


	setPosition(topPos_, xIndex_){
		if(this.pos.set==false){
		console.log("setPos " + this.head.id)
		this.pos.y = topPos_;
		this.pos.x = xIndex_ * 200;

		if(this.tail instanceof Content){
			this.tail.pos.xIndex = xIndex_;
		}

		this.pos.set = true;

		this.createBackEndHTML()
		console.log(this.elicit + " :::::" + this.head.id)
		if(this.elicit == "display" || this.elicit == "clickable" || this.elicit == "activate"){//this should be for activate if there is an activate action
			if(this.head instanceof Content){
				console.log("-" + this.head.id)
				// this.scene.contentsIndexes[this.head.id]=xIndex_;
				this.scene.contentNodes[this.head.id].xIndex=xIndex_;
			}
			//console.log(this.head)
			for(let i in this.head.actionsOut){ //this.head is the content acton was pionting to
				console.log(this.head.actionsOut[i].id + "   -    " + this.head.actionsOut[i].pos.set)
				//if(this.head.actionsOut[i].pos.set == false){
					this.head.actionsOut[i].setPosition(this.pos.y + this.height , xIndex_+1)

					if(this.tail instanceof Content && this.head instanceof Content){
						this.width = this.tail.pos.x - this.head.pos.x;
					}
					
				//}
				
			}
		}
	}
		// else if(this.elicit == "activate"){//this should be for activate if there is an activate action
		// 	//console.log("activate")
		// 	for(let i in this.head.actionsOut){ //this.head is the content acton was pionting to
		// 		if(this.head.actionsOut[i].pos.set == false){
		// 			//console.log(this.pos.y + this.height)
		// 			this.head.actionsOut[i].setPosition(this.pos.y + this.height)
		// 		}
				
		// 	}
		// }
		
	}

	setHeight(){
		if(this.trigger == "time"){
			this.height=this.delay*timeScale;
		}else if(this.trigger == "click"){
			this.height = clickScale; 
		}
	}

	createBackEndHTML(){
		//actionArrowSVG
		this.html.container = document.createElement("div");

		this.html.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		this.html.svg.classList.add("connector-line")
		this.html.svg.classList.add("click")
		this.html.svg.innerHTML = hArrowSVG(this.width, this.height, 2, "dashed");
		//console.log(this.html.svg)
		this.html.container.append(this.html.svg);

		this.html.svg.style.top = this.pos.y + "px"
		this.html.svg.style.left = (this.pos.x) +"px"
		//console.log(this.pos.x +"px")
		//this.html.container.style.top=this.pos.y;
	}


	removeTimer(){
		// console.log(this)
		
		this.timer=undefined;
	}



	
	triggerContent(delay_){//triggers content


		// if(this.head instanceof Scene){

		// 	this.scene.play.newScene(this.head);
		// }else if(this.head instanceof Content){
		// 	console.log(this.id + " : " + this.head.id + "?" + this.elicit)
			// if(this.trigger=="time"){

			// 	if(this.elicit=="display"){

			// 		//delay and display after certain time
			// 		setTimeout(function(targetContent_){
			// 			targetContent_.displayFrontEndHTML();
			// 			targetContent_.activateActionsOut();
			// 		}, this.delay*1000, this.head);


			// 	}
			// 	else if(this.elicit=="clickable"){

			// 		setTimeout(function(targetContent_){
			// 			//console.log("createClickable");
			// 			targetContent_.activateClickable();


			// 		}, this.delay*1000, this.head);
			// 	}
			// 		//}
			// }
		// }
	}
};

Action.prototype.updateOutInIndexes=function(){

	this.outIndex=this.tail.actionsOut.indexOf(this);
	this.inIndex=this.head.actionsIn.indexOf(this);

}

//back end
// Action.prototype.addHTMLtoSceneContainer=function(){

// 	if(this.head instanceof Content){
// 		this.head.parentScene.html.be.container.appendChild(this.head.html.be.container);
// 	}else if(this.head instanceof Scene){
// 		//add dummy div of scene
// 	}
// 		//if it is the scene
// 		//console.log( "placed "+ this.head.id + " in " + this.tail.code)

// }


// Action.prototype.createBackEndHTML=function(){
	
// 		//this is a time bar thatr only shows when dragging
// 		this.html.be.timeDealy={}
// 		this.html.be.timeDealy.containerDiv = document.createElement("div");
// 		this.html.be.timeDealy.containerDiv.classList.add("time-delay");


// 		this.html.be.timeDealy.textDiv = document.createElement("div");
// 		this.html.be.timeDealy.textDiv.classList.add("time-delay-text");
// 		this.html.be.timeDealy.containerDiv.appendChild(this.html.be.timeDealy.textDiv);
		

// 		this.html.be.timeDealy.svgArrow= document.createElementNS("http://www.w3.org/2000/svg", "svg");
// 		this.html.be.timeDealy.svgArrow.classList.add("time-delay-arrow");
// 		this.html.be.timeDealy.svgArrow.innerHTML=delayArrowSVG(100)
// 		//this.htmlElements.timeDealy.containerDiv.style.display = "none";
// 		this.html.be.timeDealy.containerDiv.appendChild(this.html.be.timeDealy.svgArrow);


// 		// eventDivTimeDelayDisplay.svg=svgTimeDelayArrow;

// 		// eventDivTimeDelayDisplay.appendChild(textTimeDelay);
// 		// eventDivTimeDelayDisplay.text=textTimeDelay;
// 		// svgTimeDelayArrow.innerHTML=delayArrowSVG(100);



// 		//specal for creating svgs on the fly inline
// 		this.html.be.svg= document.createElementNS("http://www.w3.org/2000/svg", "svg");
// 		this.html.be.svg.classList.add("connector-line");
		

// 		// getArrowSVG(deltaX_,deltaY_,strokeThickness_,type_)
// 		// this.html.be.svg.innerHTML=getArrowSVG(this.delay*1000,this.order*75,3,this.type)

// 		//the ContentDiv container is now in the content object

// 		// eventDivContainer.appendChild(eventDivDragBar);
// 		// eventDivContainer.appendChild(eventDivIcon);
// 		// eventDivContainer.appendChild(eventDivContent);

// 		// 	eventDivContainer.appendChild(eventDivTimeDelayDisplay);
			

// 		// 	eventDivContainer.appendChild(connectorLine);
// 	//this.addHTMLElementsToContentDiv();
		
// }


// //back end

// Action.prototype.addHTMLElementsToContentDiv=function(){
// 	//this is the main part
// 	//console.log(this.head)
// 	if(this.head instanceof Content){
// 		// if(this.tail instanceof Content){
// 		// 	console.log("adding " + this.head.id + this.head.parentScene.id+ " to " + this.tail.id + this.tail.parentScene.id+ " w/ action " + this.id)
// 		// }else{
// 		// 	console.log("adding " + this.head.id + this.head.parentScene.id+ " to " + this.tail.id+ " w/ action " + this.id)
// 		// }


// 		this.head.html.be.container.appendChild(this.html.be.svg);

// 		//this is the time info while dragging
// 		this.head.html.be.container.appendChild(this.html.be.timeDealy.containerDiv);
// 	}
// }

// Action.prototype.setWidthHeight=function(){
	
// 	this.updateOutInIndexes()

// 	if(this.trigger=="time"){
// 		this.html.be.height=this.delay*100;
// 	}else if(this.trigger=="click"){
// 		//console.log(this.id+ " : delay : " + this.delay*100)
// 		this.html.be.height=100+this.delay*100;
// 	}


// 	this.html.be.width=this.outIndex*50+100;
	


// }



Action.prototype.updateArrow=function(deltaX,deltaY){

	//console.log("YES")

	let width=100;
	let height=75;

	let strokeThickness=6;

	let deltaYArrow=deltaY;
	let deltaXArrow=deltaX;

	this.html.be.svg.style.width=deltaXArrow + strokeThickness +"px";

	if(deltaYArrow>20){
		this.html.be.svg.style.height=deltaYArrow + "px";
		this.html.be.svg.style.top=-1*deltaYArrow + "px";
	}else if(deltaYArrow<0){
		this.html.be.svg.style.top=0 + "px";
		this.html.be.svg.style.height=(Math.abs(deltaYArrow)+20) + "px";
	}else{
		this.html.be.svg.style.height=(20) + "px";
		this.html.be.svg.style.top=-1*deltaYArrow + "px";
	}

	this.html.be.svg.style.left=-1*(deltaXArrow+strokeThickness/2) + "px";


	if(this.tail instanceof Scene || this.head instanceof Scene){
		this.html.be.svg.innerHTML=actionArrowSVG(deltaXArrow,deltaYArrow,strokeThickness,"self-driven");
	}else{
		if(this.trigger=="click"){
			this.html.be.svg.innerHTML=actionSVG(deltaXArrow,100,strokeThickness,this.trigger) +
			getArrowVerticalExtenderSVG(deltaXArrow,deltaYArrow,strokeThickness,this.trigger) ;
			//this.html.be.svg.innerHTML=getArrowSVG(deltaXArrow,deltaYArrow,strokeThickness,this.type) ;
		}else{
			this.html.be.svg.innerHTML=actionArrowSVG(deltaXArrow,deltaYArrow,strokeThickness,this.trigger) ;
		}
	}
	
	
}

Action.prototype.deltaActionDelay=function(deltaY_){
	//console.log(height_)
	// this.html.be.height=this.html.be.height+movementY_;
	this.delay=this.delay+deltaY_/100;

	this.setWidthHeight();


	this.setPosChain();

	//this.updateArrow(100,100)

	this.updateArrow(parseInt(this.html.be.width), parseInt(this.html.be.height))


}


// Action.prototype.changeActionDelay=function(movementY_){
// 	//console.log(height_)
// 	// this.html.be.height=this.html.be.height+movementY_;
// 	// this.dealay=this.dealay+movementY_/1000;
// 	// this.setPosYDrag();

// 	//update height
// 	//setPosChain 
// 	if(this.tail instanceof Content){
// 		this.html.be.pos.y=this.tail.actionsIn[0].html.be.pos.y+movementY_+this.html.be.height
// 		//this.html.be.pos.x=this.tail.actionsIn[0].html.be.pos.x+this.html.be.width
// 	}else if(this.tail instanceof Scene){
// 		this.html.be.pos.y=0+movementY_
// 		//this.html.be.pos.x=0+this.html.be.width 
// 	}

// 	this.head.html.be.container.style.top=this.html.be.pos.y + "px";
// 	this.head.html.be.container.style.left=this.html.be.pos.x+ "px";

	


// 	for(let i=0; i<this.head.actionsOut.length;i++){
// 		if(this.head.actionsOut[i].head instanceof Content){
// 			this.head.actionsOut[i].setPosChain()
// 		}else{
// 			//set position of the dummy html of next scene
// 		}
// 	}

// }
// Action.prototype.setPosYDrag=function(){
// 	if(this.tail instanceof Content){
// 		this.html.be.pos.y=this.tail.actionsIn[0].html.be.pos.y+this.html.be.height
// 		this.html.be.pos.x=this.tail.actionsIn[0].html.be.pos.x+this.html.be.width
// 	}else if(this.tail instanceof Scene){
// 		this.html.be.pos.y=0+this.html.be.height
// 		this.html.be.pos.x=0+this.html.be.width 
// 	}

// 	this.head.html.be.container.style.top=this.html.be.pos.y + "px";
// 	this.head.html.be.container.style.left=this.html.be.pos.x+ "px";




// 	for(let i=0; i<this.head.actionsOut.length;i++){
// 		if(this.head.actionsOut[i].head instanceof Content){
// 			this.head.actionsOut[i].setPosChain()
// 		}else{
// 			//set position of the dummy html of next scene
// 		}
// 	}

// }


// Action.prototype.setPosChain=function(){
// 	this.bePositionSet=true;
// 	if(this.tail==this.head){
// 	}else{
// 		if(this.tail instanceof Content){
// 			this.html.be.pos.y=this.tail.actionsIn[0].html.be.pos.y+this.html.be.height
// 			this.html.be.pos.x=this.tail.actionsIn[0].html.be.pos.x+this.html.be.width
// 		}else if(this.tail instanceof Scene){
// 			this.html.be.pos.y=0+this.html.be.height
// 			this.html.be.pos.x=0+this.html.be.width 
// 		}

// 		this.head.html.be.container.style.top=this.html.be.pos.y + "px";
// 		this.head.html.be.container.style.left=this.html.be.pos.x+ "px";

// 		// this.updateArrow(this.html.be.width, this.html.be.height)

// 		for(let i=0; i<this.head.actionsOut.length;i++){
// 			if(this.head.actionsOut[i].head instanceof Content && !this.head.actionsOut[i].bePositionSet){
// 				this.head.actionsOut[i].setPosChain()
// 			}else{
// 				//set position of the dummy html of next scene
// 			}
// 		}
// 	}
// }
Action.prototype.getJSON=function(){
// "id":"500",
// "tailID":"aa",
// "headID":"001",
// "block":[],
// "type":"time",
// "delay":0
	let jsonAction={}

	jsonAction.id=this.id
	jsonAction.tailID=this.tail.id;//either the scene itself or content object
	jsonAction.headID = this.head.id;//either content of a new scene
	jsonAction.block=this.block;//this will turn off other actions deafalt is to just turn itself off 
	jsonAction.trigger = this.trigger;//time/click are the basic but could be any sensable action...
	jsonAction.delay = this.delay;//time/click are the basic but could be any sensable action...

	return jsonAction;

}


