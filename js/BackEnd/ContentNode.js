
var log=false;
class ContentNode{ //not to be confused with nodejs
	constructor(content_){
		//this.enclosingStructure;//this is the story or scene depending on what this node if for
		this.isBase=false;
		this.content=content_;

		this.height=10;
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

		this.editor=new ContentEditorElement(this, currentStory.backEnd);
	}

	addPosition(backendData_){
		if(backendData_ != undefined){
			if(backendData_.pos != undefined && backendData_.pos.x != undefined){
				this.xPos = backendData_.pos.x;
			}
			//console.log(this.content.parentScene.id)
			if(backendData_[this.content.parentScene.id] != undefined){
				//console.log(this.content.id)
				if(backendData_[this.content.parentScene.id].pos != undefined && backendData_[this.content.parentScene.id].pos.x != undefined){
					
					this.xPos = backendData_[this.content.parentScene.id].pos.x;
					
				}
			}	
		}

		if(this.content instanceof SudoContent){
			if(this.order != undefined){
				this.xPos = 50 + this.order*100
			}
		}
	}
	createPositions(){//create the positions for all the inputs (these show up as bars)
		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){

				this.positions[elicityType][i].creatHTML();//=//new ElicitNode(this, elicityType);
				this.positions[elicityType][i].editor.addToContentEditor()
				//this.positions[elicityType][i].createEditor();

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
	}

	

	toggleSelection(){
		if(this.selected){
			this.deselect();
		}else{
			this.select();
		}
	}

	select(){
		// console.log(this)

		this.editor.display();

		this.selected=true;
		this.html.info.classList.add("selected");
		if(selectedNodes.indexOf(this)==-1){
			selectedNodes.push(this);
		}

		for(let id in this.positions){
			for(let i in this.positions[id]){
				this.positions[id][i].selectArrows()
			}
		}

		
		
	}
	deselect(){
		this.editor.hide();

		this.selected=false;
		this.html.info.classList.remove("selected");
		if(selectedNodes.indexOf(this)==-1){
			//selectedNodes.push(selected);
		}else{
			selectedNodes.splice(selectedNodes.indexOf(this), 1);
		}

		for(let id in this.positions){
			for(let i in this.positions[id]){
				this.positions[id][i].deselectArrows()
			}
		}
	}

	shiftX(deltaX_){

		this.xPos = (this.html.info.offsetLeft + deltaX_)

		this.html.info.style.left = this.xPos + "px";

		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				this.positions[elicityType][i].updateX();
				// this.positions[elicityType][i].posIn=
				// this.positions[elicityType][i].html.style.left = (this.positions[elicityType][i].html.offsetLeft + deltaX_) + "px";
			}
		}
	}


	getMaxYPos(){
		let maxPos = {};

		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				// console.log(this.positions[elicityType][i].posOut.y)
				if(maxPos.y==undefined || maxPos.y<this.positions[elicityType][i].posOut.y){
					maxPos.y = this.positions[elicityType][i].posOut.y;

				}

			}
		}

		

		return maxPos.y;
	}

	getMinYPos(){
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
		return minPos.y;
	}

	update(){

		//console.log(this.content instanceof AudioContent)
		//console.log("UPDATE!!!!!@")
		if(this.content instanceof AudioContent){
			// console.log(this.content.effects.general.clipping)
			this.html.info.style.height = this.content.effects.general.clipping.vareables.duration*10+ "px";

			

			// console.log(this.content);
			// console.log(this.content.audioDisplay)
			// console.log(audioCanvase)

			// let audioCanvase = this.content.audioDisplay.getCanvaseWrap()

			// this.html.info.append(audioCanvase)
			

			//this.html.info.style.height="1000px"
			// console.log(this.content.uniqueIdentifier)
			// console.log(this.content.duration)
			// console.log("this.content.duration*timeScale   " + this.content.duration+"*"+timeScale +" = "+this.content.duration*timeScale)
		}else if(this.content instanceof ImageContent){
			if(this.positions['unclickable'] != undefined && this.positions['unclickable'].length>=1){ //this is just for the activation but not set yet!!!!!
				this.html.info.style["background-image"] = "linear-gradient(to bottom, rgba(255,165,0,0), rgba(255,165,0,1))";
				this.html.info.style["background-color"] = "white";
				// this.html.info.style["padding-top"] = "40px";
				this.html.info.style["font-size"] = "10px";
				this.html.info.style["margin-top"] = "-50px";
				//console.log(this.content)
				
				this.html.image=document.createElement("img");
				this.html.info.append(this.html.image)
				this.html.image.style.height="50px";
				this.html.image.style["margin-top"]="-15px";
				this.html.image.src=this.content.content.value;
				// this.html.info.style["background-image"] = "url(" + this.content.content.value + " )";

			}else if(false){

			}else if(this.positions['clickable'] != undefined && this.positions['clickable'].length>=1){
				this.html.info.style["background-image"] = "linear-gradient(to bottom, rgba(255,165,0,1), rgba(255,165,0,0))";
				this.html.info.style["background-color"] = "white";
				this.html.info.style["padding-bottom"] = "40px";
				this.html.info.style["font-size"] = "10px";
				// this.html.info.style["margin-top"] = "-50px";
			}
		}else{
			let iconHeight=this.getMaxYPos() - this.getMinYPos();
			// if(iconHeight>0){
				this.html.info.style.height =  iconHeight + "px";
			// }else{
				//this.html.info.style.height =  100 + "px";
				// this.html.info.style["background-image"] = "linear-gradient(to bottom, rgba(0,0,255,0), rgba(0,0,255,1), rgba(0,0,255,0))";
				// this.html.info.style["background-image"] = "linear-gradient(to bottom, rgba(0,0,255,0), rgba(0,0,255,1))";
				// this.html.info.style["background-color"] = "white";
				// this.html.info.style["padding-top"] = "40px";
				// this.html.info.style["font-size"] = "10px";
				// this.html.info.style["margin-top"] = "-50px";

			// }
			
		}

		this.updatePositions()
		//this.shiftX(10);

	}


	createHTML(){

		this.html={};

		this.html.container=document.createElement("div");

		this.html.container.style.width=this.width+"px";
		this.html.container.style.display="inline-block;"
		this.html.container.style.position="absolute";
		this.html.container.classList.add("container");

		



		this.html.info=document.createElement("div");
		this.html.info.classList.add("info");
		this.html.info.classList.add("info-"+this.content.type);

	
		
		

		let minYPos = this.getMinYPos();

		this.html.info.style.left=this.xPos + "px";
		this.html.info.style.top=minYPos+"px";


		this.html.info.style.width=this.width+"px"

		this.html.container.appendChild(this.html.info);
	
		this.html.info.innerHTML= this.content.name;
		

		if(this.content.actionsIn.length>0 || this.content instanceof SudoContent){ //this content is used and not just part of universal
			this.html.container.style.display = "block";
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
	}


	setYPosition(topPos_, action_, setTime_){//action_ is the action into the content node

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
					this.content.parentScene.actionsOut[i].setYPosition(topPos_, setTime_);
	
					this.content.parentScene.actionsOut[i].tailElicitNode=newElicitNode;
				}
			}

			else if(this.content.inOut=="out"){

				
				let newElicitNode = new ElicitNode(this, action_, topPos_)
				// console.log(newElicitNode)
				this.positions["display"].push(newElicitNode);
			}

		}else{

			if(this.positions[action_.elicit]==undefined){
				this.positions[action_.elicit]=[];
			}

			//create the "line" or "elicitNode" that action_ is pionting to
			// console.log("norm " + this.content.id)
			let newElicitNode = new ElicitNode(this, action_, topPos_)
			this.positions[action_.elicit].push(newElicitNode);

			for(let i in this.content.actionsOut){

				//if the action in was clickable make all the click actions out
				if(action_.elicit == "clickable"){
					//console.log(this.content.actionsOut[i].trigger="click")
					if(this.content.actionsOut[i].trigger=="click"){
						if(this.content.parentScene.id=="SC" && this.content.name == "No! No! Do the voices"){
							log=true;
						}else{
							log=false;
						}
						

						newElicitNode.actionsOut.push(this.content.actionsOut[i]);
						

						this.content.actionsOut[i].tailElicitNode=newElicitNode;

						this.content.actionsOut[i].setYPosition(topPos_);
					}


				}else if(action_.elicit == "display"){//if the action in was display make all the time trigger actions out
					if(this.content.actionsOut[i].trigger=="time"){
						newElicitNode.actionsOut.push(this.content.actionsOut[i]);
						this.content.actionsOut[i].setYPosition(topPos_);

						this.content.actionsOut[i].tailElicitNode=newElicitNode;
						this.content.actionsOut[i].setYPosition(topPos_);
					}
				}
			}
		}	
	}
	updateYPosition(setTime_){//action_ is the action into the content node

		for(let id in this.positions){
			for(let i in this.positions[id]){
				this.positions[id][i].updateYPos();

				this.positions[id][i].updateActionsOut(setTime_);
				// for(let j in this.positions[id][i].actionsOut){
				// 	this.positions[id][i].actionsOut.updateYPosition()
				// }
			}
		}

		this.html.info.style.top=this.getMinYPos()+"px";
		



	}
}