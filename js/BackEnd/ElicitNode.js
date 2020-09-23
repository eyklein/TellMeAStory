class ElicitNode{
	constructor(contentNode_, actionIn_, yPos_){
		this.contentNode=contentNode_;

		if(actionIn_ != null){
			this.actionIn=actionIn_;
			this.actionIn.headElicitNode = this;
			this.elicitType=this.actionIn.elicit;
		}else{
			this.elicitType="display"
		}
		


		this.actionsOut=[];
		// console.log(this.actionIn)
		
		//this.yPos=yPos_;

		this.posIn={};
		this.posOut={};
		this.setYPos(yPos_);
		

		this.posIn.x=this.contentNode.xPos;
		this.posOut.x=this.contentNode.xPos+this.contentNode.width;

		this.editor=new ElicitEditorElement(this, this.contentNode);

		//this.creatHTML();
	}
	updateYPos(){
		// console.log(this.actionIn)
		this.setYPos(this.actionIn.pos.y + this.actionIn.getHeight());
		this.updatePosition()


	}

	setYPos(yPos_){
		this.posIn.y=yPos_
		this.posOut.y=yPos_
	}

	updateActionsOut(setTime_){
		for(let i in this.actionsOut){
			console.log(this.actionsOut[i])
			console.log(this.posOut.y);
			this.actionsOut[i].updateYPosition(setTime_);
		}
	}

	creatHTML(){
		this.html={};
		this.html.container=document.createElement("div");
		this.html.container.classList.add("elicit_node")
		this.html.container.classList.add(this.elicitType)
		this.html.container.style.width=this.contentNode.width+"px";
		
		this.html.container.style.height=2+"px";

		this.html.container.style.position="absolute";

		

		if(this.elicitType == "display"){
			this.html.container.style['background-color']="green";
		}else if(this.elicitType == "hide"){
			this.html.container.style['background-color']="red";
		}else if(this.elicitType=="clickable"){
			this.html.container.style['background-color']="blue";
		}else if(this.elicitType=="unclickable"){
			this.html.container.style['background-color']="yellow";
		}


		this.contentNode.html.container.appendChild(this.html.container);
	}

	// createEditor(){
	// 	//this.html.editor = document.createElement("div");

	// 	this.html.editor = document.createElement("select");
	// 	this.html.editor.style.width="100px";
	// 	this.html.editor.style.height="100px";
	// 	this.contentNode.editor.html.container.append(this.html.editor);

	// }
	selectArrows(){
		if(this.actionIn != undefined){
			this.actionIn.selectIn();
		}
		for(let i in this.actionsOut){
			this.actionsOut[i].selectOut();
		}
		
	}
	deselectArrows(){
		if(this.actionIn != undefined){
			this.actionIn.deselectIn();
		}
		for(let i in this.actionsOut){
			this.actionsOut[i].deselectOut();
		}
	}
	// selectArrowsOut(){
	// 	if(this.actionIn != undefined){
	// 		this.actionIn.selectOut();
	// 	}
		
	// }
	// deselectArrowsOut(){
	// 	if(this.actionIn != undefined){
	// 		this.actionIn.deselectOut();
	// 	}
	// }

	shiftX(deltaX_){
		let newX= this.html.container.offsetLeft + deltaX_
		this.posIn.x=newX;
		this.posOut.x=newX+this.contentNode.width;
		this.html.container.style.left = (newX) + "px";

		if(this.actionIn != undefined){
			this.actionIn.update();
		}
		
		for(let i in this.actionsOut){
			this.actionsOut[i].update();
		}
	
	}

	updateX(){
		this.posIn.x=this.contentNode.xPos;
		this.posOut.x=this.contentNode.xPos+this.contentNode.width;
		this.html.container.style.left = this.posIn.x + "px";

		if(this.actionIn != undefined){
			this.actionIn.update();
		}
		
		for(let i in this.actionsOut){
			this.actionsOut[i].update();
		}
	
	}

	updatePosition(){
		// this.html.style.top=100+"px";
		// this.html.style.left=Math.random()*100 +"px";

		this.html.container.style.top=this.posIn.y +"px";
		this.html.container.style.left=this.contentNode.xPos +"px";
	}
}