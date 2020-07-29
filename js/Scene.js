class Scene{
	constructor(sceneJson_,play_){
		this.sceneData=sceneJson_;
		this.contentsLib={};
		this.actionsLib={};
		this.actionsIn=[];//these are the actions that can start the scene
		this.actionsOut=[];//these are the first actions in the scene
		this.activatedWithScene=[];
		this.id=this.sceneData.id;
		this.name=this.sceneData.name;
		this.play=play_;
		this.html={};



		this.node=new SceneNode(this);
		this.baseNodes=[]; //contentNodes
		this.rootEndNodes=[];
		this.exitNodes=[];


		//this.setLastAndNextContentNodes();
		// this.prevScenes={}//the previous scene(s) that get to this scene
		// this.nextScenes={}//the next scene(s)

		// this.nextScenesArray=[]//the next scene(s)
		// this.prevScenesArray=[]//the next scene(s)

		// this.scenesUp;//all the scenes that led up to this one (only get one posibility)
		// this.index;


		//this.backEndModual={};

		//console.log(this.play);
	}

	displayFrontEnd(){
		//window.location.hash = this.id;
		for(let i=0;i<this.actionsOut.length;i++){
			this.actionsOut[i].activate();
		}
	}

	addContents(sceneJson_){
		if(this.sceneData.contents){

			for(let content of this.sceneData.contents){
				// console.log(content.content.type)
				if(content.content.type=="audio"){
					this.contentsLib[content.id]=new AudioContent(content,this)
				}else if(content.content.type=="text"){
					this.contentsLib[content.id]=new TextContent(content,this)
				}else if(content.content.type=="img"){
					this.contentsLib[content.id]=new ImageContent(content,this)
				}else{
					this.contentsLib[content.id]=new Content(content,this)
				}
				
			}
		}

	}


	addActions(sceneJson_){

		if(this.sceneData.contents){

			
			for(let action of this.sceneData.actions){
				// console.log(this.id+ " : " + action.id)
				if(this.actionsLib[action.id]==undefined){
					this.actionsLib[action.id]=new Action(action,this)
				}else{
					let namingOffset=1;
					while(this.actionsLib[action.id+namingOffset]!=undefined){
						namingOffset++;
					}
					this.actionsLib[action.id+namingOffset]=new Action(action,this)
				}
				
			}
			
		}
	}

	addBackEnd(){
		this.be={};
		//this.be.node=new PositionNode(this);


		this.be.html=document.createElement("div");
		this.be.html.style['background-color']="blue";
		this.be.html.style.width="80px";
		this.be.html.style.height="30px";
		this.be.html.style.position="absolute";
		this.be.html.innerHTML=this.id;
		this.be.html.style.opacity=.8;

		// this.be.spacing={};
		// this.be.spacing.top=0;//default
		// this.be.spacing.left=0;


		


		// this.be.spacing={}
		// this.be.spacing.myUnitWidth=Math.max(1,size(this.nextScenes));
	}

	setLastAndNextContentNodes(){
	
			for(let action in this.actionsLib){
				//console.log(action)
				let head = this.actionsLib[action].head;
				let tail = this.actionsLib[action].head;


				if(head instanceof Scene){

					this.baseNodes.push(head.node);
					tail.node.isBase=true;
					
				}else if(tail instanceof Scene){
					this.exitNodes.push(tail)
				}else if(head instanceof Content && tail instanceof Content){

					if(tail.node.parents.indexOf(head.node) == -1){ 
						
						tail.node.parents.push(head.node);


						tail.node.parentsInfo[head.id]={};
						tail.node.parentsInfo[head.id].count=1;
						tail.node.parentsInfo[head.id].scene = head;
						tail.node.parentsInfo[head.id].node = head.node;
						tail.node.parentsInfo[head.id].order = tail.node.parents.length-1;



					}
					else{
						tail.node.parentsInfo[head.id].count++;
					}





					if(head.node.children.indexOf(tail.node) == -1){ // prevent duplicat paths from head to tail such as a time or a click triger

						head.node.children.push(tail)

						head.node.childrenInfo[tail.id]={};
						head.node.childrenInfo[tail.id].count=1;
						head.node.childrenInfo[tail.id].scene = tail;
						head.node.childrenInfo[tail.id].node = tail.node;
						head.node.childrenInfo[tail.id].order = head.node.children.length-1;
					
						
					}else{
						leadingScene.node.childrenInfo[trailingScene.id].count++;
					}

				}
			}


		//}
	}


	setContentIndexNumbers(){


		for(let i in this.baseNodes){
			console.log(this.baseNodes[i])
			this.baseNodes[i].assignDescendentsIndexes(0);
		}

		
	}

	// getBackEndLeftPos(){
	// 	this.scenesUp[this.scenesUp];
	// }



	setBackEndPosition(){
		console.log("SET BECK END POSITION -------- left : " +this.be.spacing.left)
		
		this.be.html.style.top=this.be.spacing.top + "px";
		this.be.html.style.left=this.be.spacing.left + "px";

		

	}
	getUnitWidths(){//reterns all the unit widths with cascading children

		console.log("getUnitWidths !!!!!!!!!!!!!!!!!!!!")
		let childrensWidths=[];

		let deaperNextScenes={}
		for(let ns in this.nextScenes){
			if(this.nextScenes[ns].scene.index > this.index){
				deaperNextScenes[ns]=this.nextScenes[ns]
			}

		}
		if(size(deaperNextScenes)>0){
			for(let ns in deaperNextScenes){
				// console.log(ns)

				childrensWidths.push(deaperNextScenes[ns].scene.getUnitWidths())
			}
			Math.sumArray(childrensWidths)

			return Math.sumArray(childrensWidths)
		}else{

			//this.be.width = this.be.spacing.myUnitWidth;
			return this.be.spacing.myUnitWidth;
		}
	}

	setBESpacingWidth(){
		//this.be.siblibgIndex = this.getSiblingIndex();
		
		//this.be.spacing.unitWidths=this.getUnitWidths(); //could be more efficent ??? 
	}

	// getSiblingIndex(){
	// 	if(this.prevScenesArray.length>0){
	// 		for(let i in this.prevScenesArray){
	// 			console.log(this.prevScenesArray[i].id + "  compair to " + this.id)
	// 			if(this.prevScenesArray[i]==this){
	// 				console.log("true")
	// 				return i;
	// 			}
	// 		}
	// 		return null;
			
	// 	}
	// }




	addInheritance(inheritedContent_){
		//console.log(inheritedContent_)
		if(inheritedContent_!=undefined){
			for(let i in inheritedContent_){
				this.contentsLib[inheritedContent_[i].id]=inheritedContent_[i];
				//console.log(inheritedContent_[i].id)
			}
		}
	}

	setIndexNumberRecusive(lastIndex_,array_){
		
		if(this.index==undefined){
			this.index=lastIndex_+1;
			this.scenesUp = array_;
			let nextArray=[];
			for(let i in array_){
				nextArray.push(array_[i])
			}

			nextArray.push(this)

			for(let scene in this.nextScenes){
				
				this.nextScenes[scene].scene.setIndexNumberRecusive(this.index, nextArray);
			}
		}
	}
	// positionBE(){
	// 	this.be.html.style.top=this.node.pos.y + "px";
	// 	this.be.html.style.left=this.node.pos.x + "px";
	// }





	getName(){
		return this.sceneData.name;
	}

	createProperties(){
		for(let contentId in this.contentsLib){
			// console.log("Creating property  " + contentId);
			this.contentsLib[contentId].createEffects();
		}

	}
	applyProperties(){
		for(let contentId in this.contentsLib){
			this.contentsLib[contentId].applyEffects();
		}
	}


}


//this creates the buttons to go the the back end of that scene
// Scene.prototype.createBackEndButton=function(){


// 	this.html.be.sceneButton=document.createElement("button");
// 	this.html.be.sceneButton.innerHTML = this.name;
// 	this.html.be.sceneButton.refrenceScene=this;
// 	this.html.be.sceneButton.addEventListener ("click", function() {
// 		this.refrenceScene.updateIconContent();
// 		this.refrenceScene.play.windowManager.sceneModual.display(this.refrenceScene);
// 	});

// }

Scene.prototype.updateIconContent=function(){

	for(let id in this.contentsLib){
		this.contentsLib[id].updateIconContent()
	}
}


Scene.prototype.adjustPosBEInScene=function(){
	// for(let id in this.actionsLib){
	// 	this.actionsLib[id].setWidthHeight();
	// }

	for(let id in this.actionsLib){
		this.actionsLib[id].setWidthHeight();
	}

	for(let i =0; i< this.actionsOut.length;i++){
		this.actionsOut[i].setPosChain();

	}
	for(let id in this.actionsLib){
		this.actionsLib[id].updateArrow(this.actionsLib[id].html.be.width, this.actionsLib[id].html.be.height)
	}
}

Scene.prototype.addHTMLtoSceneContainer=function(){

	//add the scenes div which contains all the back end elements to the main content div on the page
	
	//this.play.be.html.content.append(this.html.be.container);


	for(let id in this.actionsLib){

		this.actionsLib[id].addHTMLtoSceneContainer();
		//this.htmlElements.be.container.appendChild(this.actionsOut[i].head);
	}
}


// Scene.prototype.nestHTMLElementsBE=function(){

// 	//add the scenes div which contains all the back end elements to the main content div on the page
	
// 	//this.play.be.html.content.append(this.html.be.container);


// 	for(let id in this.actionsLib){

// 		this.actionsLib[id].nestHTMLElementsBE();
// 		//this.htmlElements.be.container.appendChild(this.actionsOut[i].head);
// 	}
// }
Scene.prototype.getBackEndHTML=function(){
	return this.html.be.container;
}

Scene.prototype.createFrontEndHTML=function(){
	//this create the front end html for all the content

	

	for(let id in this.contentsLib){
		
		if(this.contentsLib[id].parentScene == this){//prevent universal or shared content from rendering over and over
			this.contentsLib[id].createFrontEndHTML();
		}
		
		
	}
}

Scene.prototype.createBackEndHTML=function(){
	//this create the front end html for all the content
	//this will be the partent of all the content and action divs


	// console.log("creating HTML for #  " + this.code)
	this.html.be.container=document.createElement("div");
	this.html.be.container.classList.add('back-end-scene')

	this.html.be.dummyContainer=document.createElement("div");
	this.html.be.dummyContainer.classList.add('dummyContainer')
	
}



Scene.prototype.setCleanJSON=function(){
	this.JSON={}
	this.JSON.name=this.name;
	this.JSON.id=this.id;
}



//returns the event with the geven ID
Scene.prototype.getContentByID=function(idName_){
	// for(let id in this.contentsLib){
	// 	// console.log(this.parentScene)
	// 	// console.log(this.parentScene.events[i].id +" ??==?? " +idName_);
	// 	if(this.contentsLib[id].id==idName_){
	// 		return this.contents[i];
	// 	}
	// }
	// console.log("could not find ID " +idName_)
	//return null;
	return this.contentsLib[idName_]
}


Scene.prototype.getJSON=function(){
// {
//   "name":"intro",
//   "id":"aa",
//   "actions":[]
//   "contents":[]
// }
	let jsonScene={}
	jsonScene.name=this.name;
	jsonScene.id=this.id;


	jsonScene.actions=[];
	let index=0;
	for(let id in this.actionsLib){
	 	jsonScene.actions[index]=this.actionsLib[id].getJSON()
	 	index++;
	}


	jsonScene.contents=[];
	index=0;
	for(let id in this.contentsLib){
		jsonScene.contents[index]=this.contentsLib[id].getJSON()
		index++;
	}

	return jsonScene;

}


