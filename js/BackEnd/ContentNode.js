
class ContentNode{ //not to be confused with nodejs
	constructor(content_){
		//this.enclosingStructure;//this is the story or scene depending on what this node if for
		this.isBase=false;
		this.content=content_;

		this.height=30;
		this.width=90;
		// this.left;
		// this.top;

		this.selected=false;

		//this.leftPos;
		//this.indices=[];

		this.positions={}

		this.assingedPosition=null;


		//this.sceneSpacificInfo = sceneSpacificInfo_;

		this.xPos=50;





	}
	createPositions(){//create the positions for all the inputs (these show up as bars)
		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){

				this.positions[elicityType][i].creatHTML();//=//new ElicitNode(this, elicityType);

				// this.positions[elicityType][i].html=document.createElement("div");
				// this.positions[elicityType][i].html.style.width=this.width+"px";
				// this.positions[elicityType][i].html.style.height=2+"px";

				// this.positions[elicityType][i].html.style.position="absolute";

				

				// if(elicityType == "display"){
				// 	this.positions[elicityType][i].html.style['background-color']="green";
				// }else if(elicityType == "hide"){
				// 	this.positions[elicityType][i].html.style['background-color']="red";
				// }

				// this.html.container.appendChild(this.positions[elicityType][i].html);

			}
		}
	}

	updatePositions(){
		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				this.positions[elicityType][i].updatePosition()
				// this.positions[elicityType][i].html.style.top=this.positions[elicityType][i].y +"px";
				// this.positions[elicityType][i].html.style.left=this.positions[elicityType][i].x +"px";

			}
		}

		// let sumXPositions=0;
		// let numbPositions=0;

		// for(let elicityType in this.positions){
		// 	for(let i in this.positions[elicityType]){
		// 		sumXPositions+=this.positions[elicityType][i].x;
		// 		numbPositions++;

		// 	}
		// }
		// this.avrageX=sumXPositions/numbPositions;
		
	}

	getMinPosition(){
		let minPos = {}

		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				// if(minPos.x==undefined || minPos.x>this.positions[elicityType][i].x){
				// 	minPos.x = this.positions[elicityType][i].x;
				// }
				if(minPos.y==undefined || minPos.y>this.positions[elicityType][i].posIn.y){
					minPos.y = this.positions[elicityType][i].posIn.y;
				}

			}
		}
		// console.log(this.positions)
		// console.log("minPos")
		// console.log(minPos)
		return minPos;
	}

	toggleSelection(){
		if(this.selected){
			this.deselect();
		}else{
			this.select();
		}
	}

	select(){
		console.log(this)
		this.selected=true;
		this.html.info.classList.add("selected");
		if(selectedNodes.indexOf(this)==-1){
			selectedNodes.push(this);
		}
		
	}
	deselect(){
		this.selected=false;
		this.html.info.classList.remove("selected");
		if(selectedNodes.indexOf(this)==-1){
			//selectedNodes.push(selected);
		}else{
			selectedNodes.splice(selectedNodes.indexOf(this), 1);
		}
	}

	shiftX(deltaX_){
		this.html.info.style.left = (this.html.info.offsetLeft + deltaX_) + "px";

		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				this.positions[elicityType][i].shiftX(deltaX_);
				// this.positions[elicityType][i].posIn=
				// this.positions[elicityType][i].html.style.left = (this.positions[elicityType][i].html.offsetLeft + deltaX_) + "px";
			}
		}
	}

	getMaxPosition(){
		let maxPos = {}

		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				if(maxPos.x==undefined || maxPos.x<this.positions[elicityType][i].x+this.width){
					maxPos.x = this.positions[elicityType][i].x+this.width;
				}
				if(maxPos.y==undefined || maxPos.y<this.positions[elicityType][i].y){
					maxPos.y = this.positions[elicityType][i].y;
				}

			}
		}
		// console.log("maxPos")
		// console.log(maxPos)
		return maxPos;
	}

	update(){

		//console.log(this.content instanceof AudioContent)
		if(this.content instanceof AudioContent){
			//console.log(this.content)
			this.html.info.style.height = ("300")+ "px";

			//this.html.info.style.height="1000px"
			// console.log(this.content.uniqueIdentifier)
			// console.log(this.content.duration)
			// console.log("this.content.duration*timeScale   " + this.content.duration+"*"+timeScale +" = "+this.content.duration*timeScale)
		}else{
			this.html.info.style.height = Math.max(100,(maxPos.y - minPos.y))+ "px";
		}

	}


	createHTML(){

		this.html={};

		this.html.container=document.createElement("div");

		this.html.container.style.width=this.width+"px";
		this.html.container.style.display="inline-block;"
		this.html.container.style.position="absolute";
		this.html.container.classList.add("container");
		//console.log(this.content)
		// if(this.content instanceof SudoContent){
		// 	this.html.container.classList.add("sudo-container");
		// 	this.html.container.style.width="100px"
		// 	this.html.container.style.height="100px"
		// 	this.html.container.style["background-color"]="red"
		// 	this.html.container.style["z-index"]=10000;
		// }

		



		this.html.info=document.createElement("div");
		this.html.info.classList.add("info");
		
		this.html.info.style['color']="white";
		this.html.info.style['font-size']="10px";
		
		this.html.info.style.position="absolute";
		this.html.info.style.opacity=.8;
		this.html.info.style['background-color']="gray";

		let minPos = this.getMinPosition();
		let maxPos = this.getMaxPosition();

		this.html.info.style.left=this.xPos + "px";
		this.html.info.style.top=minPos.y+"px";


		this.html.info.style.width=this.width+"px"//(maxPos.x - minPos.x) + "px";

		
		

		this.html.container.appendChild(this.html.info);
	


		this.html.info.style.opacity=.8;



		

		//console.log(this.content)

		
		this.html.info.innerHTML= this.content.name

		//this.html.container.style.top = Math.random()*300+"px";
		//console.log(this.content.id)
		

		if(this.content.actionsIn.length>0 || this.content instanceof SudoContent){ //this content is used and not just part of universal
			
			this.html.container.style.display = "block";
			//this.html.container.style.left = this.left + "px";
			//console.log((this.content.actionsIn[0].pos.y   + " --------- " + this.content.actionsIn[0].height))
			//this.html.container.style.top=this.content.getFirstAction().getHeadPosition().y+ "px";
		}else{//hide
			this.html.container.style.display = "none";
		}


		this.createPositions();
		this.updatePositions();





		this.html.info.addEventListener("click", function(e){
			//console.log(e.timeStamp - mouseDownTime)
			if(e.timeStamp - mouseDownTime < 200){
				if(shiftPressed){
					
				}else{
					// for(let i in selectedNodes){
					// 	selectedNodes[i].deselect();
					// }
					clearSelectedNodes();
				}
				this.toggleSelection();//select();
				
			}
		}.bind(this));

		dragElement(this.html.info)


		

		// if(this.content.parentScene.id=="SC-BA" && this.content.actionsIn.length>0){
		// 	console.log("--------------------------------------------------------")
		// 	console.log(this)
		// 	console.log(this.content.pos)

		// }
	}

	// addIndex(index_){
	// 	if(this.indices.indexOf(index_) == -1){
	// 		this.indices.push(index_);
	// 		for(let i in this.content.actionsOut){
	// 			this.content.actionsOut[i].addIndex(index_);
	// 		}
			
	// 	}
	// }

	// setIndex(index_){

	// 	// console.log("Set index " + this.content.parentScene.id + this.content.id)

	// 	if(this.index==undefined){
	// 		this.index = index_;
	// 		this.left=this.index*100
	// 		for(let i in this.content.actionsOut){
	// 			this.content.actionsOut[i].setIndex(index_);
	// 		}
			
	// 	}
	// }


	setYPosition(topPos_, action_){//elicit_){

		if(this.content instanceof SudoContent){//action_ == null){//for sudo nodes
			if(this.positions["display"]==undefined){
				this.positions["display"]=[];
			}
			
			

			
			//prevent sudo content out (at the end of the scene) for reseting actions that come after
			if(this.content.inOut=="in"){
				let newElicitNode = new ElicitNode(this, null, topPos_)
				this.positions["display"].push(newElicitNode);

				for(let i in this.content.parentScene.actionsOut){ //for sudo content actions out of scene
			
					newElicitNode.actionsOut.push(this.content.parentScene.actionsOut[i]);
					this.content.parentScene.actionsOut[i].setYPosition(topPos_);
	
					this.content.parentScene.actionsOut[i].tailElicitNode=newElicitNode;
				}
			}

			else if(this.content.inOut=="out"){
				let newElicitNode = new ElicitNode(this, action_, topPos_)
				this.positions["display"].push(newElicitNode);
			}

		}else{

			if(this.positions[action_.elicit]==undefined){
				this.positions[action_.elicit]=[];
			}

			let newElicitNode = new ElicitNode(this, action_, topPos_)
			this.positions[action_.elicit].push(newElicitNode);

			for(let i in this.content.actionsOut){

				//if the action in was clickable make all the click actions out
				if(action_.elicit == "clickable"){
					if(this.content.actionsOut[i].trigger="click"){
						newElicitNode.actionsOut.push(this.content.actionsOut[i]);
						this.content.actionsOut[i].setYPosition(topPos_);

						this.content.actionsOut[i].tailElicitNode=newElicitNode;
					}

				}else if(action_.elicit == "display"){//if the action in was display make all the time trigger actions out
					if(this.content.actionsOut[i].trigger="time"){
						newElicitNode.actionsOut.push(this.content.actionsOut[i]);
						this.content.actionsOut[i].setYPosition(topPos_);

						this.content.actionsOut[i].tailElicitNode=newElicitNode;
					}
				}


				this.content.actionsOut[i].setYPosition(topPos_);

			
			
			}

		}
		

		
	}



	// assignDescendentsIndexes(index_,primaryParent_){



	// 	if(this.index == undefined){ //if not already asigned an index
	// 		this.index=index_;
	// 		this.primaryParent=primaryParent_;

	// 		let rootEnd=true;
	// 		for(let i in this.children){

	// 			if(this.children[i].index==undefined){
	// 				// console.log(this)
	// 				// console.log(this.children[i])
	// 				this.children[i].assignDescendentsIndexes(index_+1,this)
	// 				rootEnd=false;
	// 			}else{
	// 				if(this.children[i].index>=this.index){
	// 					rootEnd=false;
	// 				}
	// 			}
	// 		}

	// 		if(rootEnd){ //this.children.length=0 ||   if any of the children have a hight index
	// 			this.isRootEnd=true;
	// 			this.enclosingStructure.rootEndNodes.push(this);

	// 			console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
	// 		}else{
	// 			this.isRootEnd=false;
	// 		}
	// 	}
	// }



	// assignDescendentsIndexes(index_,primaryParent_){


	// 	if(this.index == undefined){ //if not already asigned an index
	// 		this.index=index_;
	// 		this.primaryParent=primaryParent_;

	// 		let rootEnd=true;
	// 		for(let i in this.children){

	// 			if(this.children[i].index==undefined){
	// 				this.children[i].assignDescendentsIndexes(index_+1,this)
	// 				rootEnd=false;
	// 			}else{
	// 				if(this.children[i].index>=this.index){
	// 					rootEnd=false;
	// 				}
	// 			}
	// 		}

	// 		if(rootEnd){ //this.children.length=0 ||   if any of the children have a hight index
	// 			this.isRootEnd=true;
	// 			this.enclosingStructure.rootEndNodes.push(this);
	// 		}else{
	// 			this.isRootEnd=false;
	// 		}
	// 	}
	// }




}