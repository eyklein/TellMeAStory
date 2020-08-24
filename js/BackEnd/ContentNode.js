
class ContentNode{ //not to be confused with nodejs
	constructor(content_,sceneSpacificInfo_){
		//this.enclosingStructure;//this is the story or scene depending on what this node if for
		this.isBase=false;
		this.content=content_;

		this.height=30;
		this.width=90;
		this.left;
		this.top;

		//this.leftPos;
		//this.indices=[];

		this.positions={}


		this.sceneSpacificInfo = sceneSpacificInfo_;





	}
	createPositions(){//create the positions for all the inputs (these show up as bars)
		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				this.positions[elicityType][i].html=document.createElement("div");
				this.positions[elicityType][i].html.style.width=this.width+"px";
				this.positions[elicityType][i].html.style.height=2+"px";

				this.positions[elicityType][i].html.style.position="absolute";

				

				if(elicityType == "display"){
					this.positions[elicityType][i].html.style['background-color']="green";
				}else if(elicityType == "hide"){
					this.positions[elicityType][i].html.style['background-color']="red";
				}

				this.html.container.appendChild(this.positions[elicityType][i].html);

			}
		}
	}

	updatePositions(){
		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				this.positions[elicityType][i].html.style.top=this.positions[elicityType][i].y +"px";
				this.positions[elicityType][i].html.style.left=this.positions[elicityType][i].x +"px";

			}
		}
		
	}

	getMinPosition(){
		let minPos = {}

		for(let elicityType in this.positions){
			for(let i in this.positions[elicityType]){
				if(minPos.x==undefined || minPos.x>this.positions[elicityType][i].x){
					minPos.x = this.positions[elicityType][i].x;
				}
				if(minPos.y==undefined || minPos.y>this.positions[elicityType][i].y){
					minPos.y = this.positions[elicityType][i].y;
				}

			}
		}
		console.log("minPos")
		console.log(minPos)
		return minPos;
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
		console.log("maxPos")
		console.log(maxPos)
		return maxPos;
	}

	createHTML(){

		this.html={};

		this.html.container=document.createElement("div");

		this.html.container.style.width=this.width+"px";
		this.html.container.style.display="inline-block;"
		this.html.container.style.position="absolute";
		



		this.html.info=document.createElement("div");
		this.html.info.style['color']="white";
		this.html.info.style['font-size']="10px";
		
		this.html.info.style.position="absolute";
		this.html.info.style.opacity=.8;
		this.html.info.style['background-color']="gray";

		let minPos = this.getMinPosition();
		let maxPos = this.getMaxPosition();

		this.html.info.style.left=minPos.x+"px";
		this.html.info.style.top=minPos.y+"px";


		this.html.info.style.width=(maxPos.x - minPos.x) + "px";
		this.html.info.style.height=(maxPos.y - minPos.y) + "px";

		this.html.container.appendChild(this.html.info);
		
		
		//this  bar will be when display is hit
		// this.html.display = document.createElement("div");
		// this.html.display.style.width=this.width+"px";
		// this.html.display.style.height=2+"px";
		// this.html.display.style.position="absolute";
		// this.html.display.style['background-color']="green";
		// this.html.container.appendChild(this.html.display);


			//this  bar will be when hide is hit
		// this.html.hide = document.createElement("div");
		// this.html.hide.style.width=this.width+"px";
		// this.html.hide.style.height=2+"px";
		// this.html.hide.style.position="absolute";
		// this.html.hide.style.top=Math.random()*50+"px";

		// this.html.hide.style['background-color']="red";

		// this.html.container.appendChild(this.html.hide);


		this.html.info.style.opacity=.8;



		

		//console.log(this.content)

		
		this.html.info.innerHTML= this.content.name

		//this.html.container.style.top = Math.random()*300+"px";
		//console.log(this.content.id)
		

		if(this.content.actionsIn.length>0){ //this content is used and not just part of universal
			
			this.html.container.style.display = "block";
			//this.html.container.style.left = this.left + "px";
			//console.log((this.content.actionsIn[0].pos.y   + " --------- " + this.content.actionsIn[0].height))
			//this.html.container.style.top=this.content.getFirstAction().getHeadPosition().y+ "px";
		}else{//hide
			this.html.container.style.display = "none";
		}


		this.createPositions();
		this.updatePositions();

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

	setIndex(index_){

		// console.log("Set index " + this.content.parentScene.id + this.content.id)

		if(this.index==undefined){
			this.index = index_;
			this.left=this.index*100
			for(let i in this.content.actionsOut){
				this.content.actionsOut[i].setIndex(index_);
			}
			
		}
	}

	setPosition(topPos_, leftPos_, elicit_){

		if(this.positions[elicit_]==undefined){
			this.positions[elicit_]=[];
		}
		let tempPos={}
		tempPos.y=topPos_;
		tempPos.x=this.index*100//leftPos_;
		this.positions[elicit_].push(tempPos);

		for(let i in this.content.actionsOut){
			this.content.actionsOut[i].setPosition(this.index*100+this.width, topPos_)
		}

		// if(elicit_ == "display" || elicit_ == "clickable" || elicit_ == "activate"){//this should be for activate if there is an activate action
		// 	if(this.head instanceof Content){
		// 		//console.log("-" + this.head.id)
		// 		// this.scene.contentsIndexes[this.head.id]=xIndex_;
		// 		//this.scene.contentNodes[this.head.id].xIndex=xIndex_;
		// 		//console.log(this.head)
		// 		if(this.head.node.pos.xIndex == undefined){
		// 			this.head.node.pos.xIndex = xIndex_
		// 			this.head.node.pos.x = this.head.node.pos.xIndex*100-this.head.node.width;
		// 		}
		// 		//this.head.node.pos.xIndex = xIndex_
		// 		for(let i in this.head.actionsOut){ //this.head is the content acton was pionting to
		// 		//console.log(this.head.actionsOut[i].id + "   -    " + this.head.actionsOut[i].pos.set)
		// 		//if(this.head.actionsOut[i].pos.set == false){
					
		// 			this.head.actionsOut[i].setPosition(this.pos.y + this.height , xIndex_+1)

		// 			if(this.tail instanceof Content && this.head instanceof Content){
		// 				this.width = this.tail.node.pos.x - this.head.node.pos.x;
		// 			}
					
		// 		//}
				
		// 		}
		// 	}
		// 	//console.log(this.head)

		// }
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