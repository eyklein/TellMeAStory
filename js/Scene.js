class Scene{
	constructor(sceneJson_,play_){
		this.sceneData=sceneJson_;
		this.contentsLib={};
		this.actionsLib={};
		this.actionsIn=[];//these are the actions that can start the scene
		this.actionsOut=[];//these are the first actions in the scene not actions out of the scene
		this.activatedWithScene=[];
		this.id=this.sceneData.id;
		this.name=this.sceneData.name;
		this.play=play_;
		this.html={};
		this.contentsIndexes={};

		this.node=new SceneNode(this);
		//this.contentNodes={}
		
		//this.baseNodes=[]; //contentNodes
		//this.rootEndNodes=[];
		// this.exitNodes=[];

		this.sudoContent={};
		this.sudoContent.in;
		this.sudoContent.out={};
		this.sudoOutCounter=0;
		this.type="scene"

		this.backEnd={}
		this.backEnd.contentClusters={};


		//this.backEnd.arrows=[];

		//this.setPositionActions();
	}

	displayFrontEnd(){
		for(let i=0;i<this.actionsOut.length;i++){
		
			this.actionsOut[i].activate();

		}
	}

	addContents(sceneJson_){
		if(this.sceneData.contents){
			//console.log(this.id)
			for(let content of this.sceneData.contents){
				this.contentsLib[content.id] = this.createContent(content);
			}

			//add sudo content that starts the scene
			this.sudoContent.in = new SudoContent(null, this, "in", 20);

			//out sudo content will be added when looking at the actions

			//add sudo content that ends the scene
			// for(let i in this.node.children){
			// 	// stored in the current display scene
			// 	// console.log(this.node.children[i])
			// 	// this.sudoContent.out[this.node.children[i].scene.id]=new SudoContent(null, this.node.children[i].scene)

			// 	//or stored in the coresponding scene
			// }
			



			

		}
	}

	createContent(content_){
		//console.log(content_)
		if(content_.content.type=="audio"){
			return new AudioContent(content_,this)
		}else if(content_.content.type=="text"){
			return new TextContent(content_,this)
		}else if(content_.content.type=="img"){
			return new ImageContent(content_,this)
		}else{
			return new Content(content_,this)
		}
		
	}


	// getContentNode(contentID_){
	// 	return this.contentsLib[contentID_].getNode(this)
	// }

	addActions(sceneJson_){
		if(this.sceneData.contents){
			for(let action of this.sceneData.actions){
				let actionIDName;
				if(this.actionsLib[action.id]==undefined){
					actionIDName=action.id;
					this.actionsLib[action.id]=new Action(action,this)
				}else{
					let namingOffset=1;
					while(this.actionsLib[action.id+namingOffset]!=undefined){
						namingOffset++;
					}

					actionIDName=action.id+namingOffset;
					this.actionsLib[action.id+namingOffset]=new Action(action,this)
				}


				//add sudo content of actions out
				if(this.actionsLib[actionIDName].head instanceof Scene){
					//console.log("***********************************************************" + this.sudoOutCounter)
					this.sudoContent.out[this.actionsLib[actionIDName].head.id]=new SudoContent(null ,this.actionsLib[actionIDName].head, "out", 50 + this.sudoOutCounter*100);
					//this.sudoContent.out[this.actionsLib[actionIDName].head.id].cNode.order = this.sudoOutCounter;
					this.sudoOutCounter++;
					this.sudoContent.out[this.actionsLib[actionIDName].head.id].cNode.createHTML();
				}
			}
		}
	}

	setHightActions(){
		//let hOffset=50;
	
		for(let i in this.actionsLib){
			this.actionsLib[i].setHeight();
		}
	}

	// setPositionActions(){
	// 	let hOffset=50;
	
	// 	for(let i in this.actionsOut){
	// 		this.actionsOut[i].setPosition(hOffset , 1);
	// 	}
	// }


	// createSceneBackEnd(){
	// 	//scenes in
	// 	// for(let id in this.node.parentsInfo){
	// 	// 	if(this.backEnd.contentClusters[id] == undefined){
	// 	// 		this.backEnd.contentClusters[id] = new ContentCluster(this.node.parentsInfo[id].scene);
	// 	// 	}
	// 	// }

	// 	//this
	// 	this.backEnd.contentClusters[this.id] = new ContentCluster(this);

	// 	//scenes out
	// 	for(let id in this.node.childrenInfo){
	// 		if(this.backEnd.contentClusters[id] == undefined){
	// 			this.backEnd.contentClusters[id] = new ContentCluster(this.node.childrenInfo[id].scene);
	// 		}

	// 	}


	// 	for(let id in this.contentsLib){
	// 		if(this.backEnd.contentClusters[id] == undefined){
	// 			//console.log(id);
	// 			//console.log(this.contentsLib[id].uniqueIdentifier);
	// 			this.backEnd.contentClusters[id]=new ContentCluster(this.contentsLib[id]);
	// 		}
	// 	}


	// 	for(let action in this.actionsLib){


	// 		this.actionsLib[action].setSize();
	// 	}


	// 	//console.log(this.backEnd.contentClusters)
	// 	for(let action in this.actionsLib){
	// 		this.backEnd.contentClusters[this.actionsLib[action].tail.id].addActionIn(this.actionsLib[action])

	// 		this.backEnd.contentClusters[this.actionsLib[action].head.id].addActionOut(this.actionsLib[action])
	// 	}
		


		
	// }

	// setLastAndNextContentNodes(){ //not sure if this will work with the shared contents
	// 		for(let action in this.actionsLib){
	// 			if(action.elicit == "display"){
				
	// 			let head = this.actionsLib[action].head;
	// 			let tail = this.actionsLib[action].tail;

	// 			if(head instanceof Scene && tail instanceof Content){
	// 				this.baseNodes.push(tail.node);
	// 				tail.node.isBase=true;
					
	// 			}else if(tail instanceof Scene && head instanceof Content){
	// 				this.exitNodes.push(head.node)
	// 			}else if(head instanceof Content && tail instanceof Content){

	// 				if(tail.node.parents.indexOf(head.node) == -1){ 
	// 					tail.node.parents.push(head.node);
	// 					tail.node.parentsInfo[head.id]={};
	// 					tail.node.parentsInfo[head.id].count=1;
	// 					tail.node.parentsInfo[head.id].scene = head;
	// 					tail.node.parentsInfo[head.id].node = head.node;
	// 					tail.node.parentsInfo[head.id].order = tail.node.parents.length-1;
	// 				}
	// 				else{
	// 					tail.node.parentsInfo[head.id].count++;
	// 				}

	// 				if(head.node.children.indexOf(tail.node) == -1){ // prevent duplicat paths from head to tail such as a time or a click triger
	// 					head.node.children.push(tail.node);
	// 					head.node.childrenInfo[tail.id]={};
	// 					head.node.childrenInfo[tail.id].count=1;
	// 					head.node.childrenInfo[tail.id].scene = tail;
	// 					head.node.childrenInfo[tail.id].node = tail.node;
	// 					head.node.childrenInfo[tail.id].order = head.node.children.length-1;						
	// 				}else{
	// 					head.node.childrenInfo[tail.id].count++;
	// 				}
	// 			}
	// 		}	
	// 	}
	// }

	//??**????????
	setBackEndActionAndContentPositions(){
		//this.contentsIndexes={};
		// for(let id in this.contentsLib){
		

		
		// console.log("index content through actions");
		// for(let id in this.actionsOut){
		// 	// this.actionsOut[id].addIndex(0);
		// 	this.actionsOut[id].setIndex(0);
		// }

		// console.log("set Action Heights")
		for(let id in this.actionsLib){
			this.actionsLib[id].setSize();
		}

		this.sudoContent.in.cNode.setYPosition(50, null, Date.now()); //set the position of a sudo node that is this scenes display sudo node

		for(let id in this.actionsLib){
			this.actionsLib[id].createBackEndHTML();
		}
		

		for(let i in this.actionsIn){
			this.actionsIn[i].createBackEndHTML();
		}
		for(let i in this.actionsOut){
			this.actionsOut[i].createBackEndHTML();
		}



		// for(let i in this.actionsOut){
		// 	// this.actionsOut[id].addIndex(0);
		// 	//let indexOut=this.actionsOut.indexOf(this.actionsOut[id])

		// 	this.actionsOut[i].setYPosition(50);
		// }

		

		// console.log("create the content nodes HTML")
		for(let id in this.contentsLib){
			this.contentsLib[id].cNode.createHTML();
		}


		this.sudoContent.in.cNode.createHTML();


		for(let id in this.sudoContent.out){
			this.sudoContent.out[id].cNode.createHTML();
		}



		

		// console.log("test all content indexes set")
		// for(let id in this.contentsLib){
		// 	if(this.contentsLib[id].node.index==undefined && this.contentsLib[id]){
		// 		console.log("FALSE!!!!!!!!!!!!!!!!!!!")
		// 		console.log(this.contentsLib[id].node.index)
		// 		console.log(this.contentsLib[id].node)
		// 	}
		// }

		// console.log("test all actions indexes set")
		// for(let id in this.actionsLib){
		// 	if(this.actionsLib[id].index==undefined){
		// 		console.log("FALSE!!!!!!!!!!!!!!!!!!!")
		// 	}
		// }

		

		//for()


	}


	// setContentIndexNumbers(){


	// 	// for(let i in this.baseNodes){
	// 	// 	this.baseNodes[i].assignDescendentsIndexes(0);
	// 	// }

		
	// }

	setContentFullWidth(){//sets the width the the children nodes will take up
		for(let i in this.rootEndNodes){
			this.rootEndNodes[i].setFullWidthCascadeUp(1)
		}
	}

	// getBackEndLeftPos(){
	// 	this.scenesUp[this.scenesUp];
	// }



	setBackEndPosition(){
		this.be.html.style.top=this.be.spacing.top + "px";
		this.be.html.style.left=this.be.spacing.left + "px";
	}

	getUnitWidths(){//reterns all the unit widths with cascading children
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


	addInheritance(inheritedContent_){
		//console.log(inheritedContent_)
		if(inheritedContent_!=undefined){
			for(let i in inheritedContent_){
				this.contentsLib[inheritedContent_[i].id]=inheritedContent_[i];
				//console.log(inheritedContent_[i].id)
			}
		}
	}

	addEffectEditors(){
		for(let id in this.contentsLib){
			//console.log(this.contentsLib[id])
			this.contentsLib[id].addEffectEditors();

		}
	}

	// addBackEndEditors(){
	// 	for(let id in this.contentsLib){
	// 		this.contentsLib[id].addBackEndEditors();

	// 	}
	// }

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

	getName(){
		return this.sceneData.name;
	}

	// createProperties(){
	// 	console.log("createProperties()")
	// 	for(let contentId in this.contentsLib){
	// 		// console.log("Creating property  " + contentId);
	// 		this.contentsLib[contentId].createEffects();
	// 	}

	// }
	applyProperties(){
		for(let contentId in this.contentsLib){
			this.contentsLib[contentId].applyEffects();
		}
	}

	updateContentSize(){
		for(let id in this.contentsLib){
			
			this.contentsLib[id].cNode.update();
		}
	}
	createFrontEndHTML(){
		//this create the front end html for all the content
		//console.log("create front end " + this.id)
		for(let id in this.contentsLib){
			//if(this.contentsLib[id].parentScene == this){//prevent universal or shared content from rendering over and over
			//console.log(id + "-")
			if(this.contentsLib[id].frontEndCreated==false){
				//console.log(id + "o")
				this.contentsLib[id].createFrontEndHTML();
			}
			//}
		}
	}

	createContentEffectEditors(){ //all exsept for audio (audio is added in the audio loader)
		for(let id in this.contentsLib){
			if(!this.contentsLib[id] instanceof AudioContent){
				this.contentsLib[id].addEffectEditors();
			}
			
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


