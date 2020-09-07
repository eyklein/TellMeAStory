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
		this.posIn.y=yPos_
		this.posOut={};
		this.posOut.y=yPos_

		this.posIn.x=this.contentNode.xPos;
		this.posOut.x=this.contentNode.xPos+this.contentNode.width;

		//this.creatHTML();
	}
	creatHTML(){
		this.html=document.createElement("div");
		this.html.classList.add("elicit_node")
		this.html.classList.add(this.elicitType)
		this.html.style.width=this.contentNode.width+"px";
		this.html.style.height=2+"px";

		this.html.style.position="absolute";

		

		if(this.elicitType == "display"){
			this.html.style['background-color']="green";
		}else if(this.elicitType == "hide"){
			this.html.style['background-color']="red";
		}

		this.contentNode.html.container.appendChild(this.html);
	}

	shiftX(deltaX_){
		let newX= this.html.offsetLeft + deltaX_
		this.posIn.x=newX;
		this.posOut.x=newX+this.contentNode.width;
		this.html.style.left = (newX) + "px";

		console.log(this.contentNode.content)
		if(!(this.contentNode.content instanceof SudoContent)){
			this.actionIn.update()
		}for(let i in this.actionsOut){
			this.actionsOut[i].update();
		}
	
	}

	updatePosition(){
		// this.html.style.top=100+"px";
		// this.html.style.left=Math.random()*100 +"px";

		this.html.style.top=this.posIn.y +"px";
		this.html.style.left=this.contentNode.xPos +"px";
	}
}