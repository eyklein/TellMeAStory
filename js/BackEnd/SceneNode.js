
class SceneNode{ //not to be confused with nodejs
	constructor(scene_){
		this.scene=scene_;
		this.id=this.scene.id

		this.parents=[];
		this.parentsInfo={};
		this.primaryParent;


		this.children=[];
		this.childrenInfo={};

		this.widthFull=0;//if every child has its own spot
		this.widthCombined=0;//if only one child has its own spot

		this.posIndex={};
		this.posIndex.x=0;
		this.posIndex.y=0;
		this.posIndex.xRelative=0;//relative to siblings 



		
		//offset effects children and siblings bot not object
		//mesured in increments not in pixels
		// this.offset={} //this offset based on previous
		// this.offset.x = 1;
		// this.offset.y = 1;

		// this.space={} //space needed before the next
		// this.space.x = 1;
		// this.space.y = 1;

		// this.position={} //absolute position
		// this.position.x;
		// this.position.y;
		// this.posIndex={}
		// this.posIndex.x;
		// this.posIndex.y;

		// this.spacingIndex={}
		// this.spacingIndex.x;
		// this.spacingIndex.y;

		



		
		
		// //this.siblingNodes=[];
		// this.prevSiblingNodes=[];
	}

	setParents(){
		this.parentNodes=[];
		for(let scene in this.scene.prevScenes){ //first one will be the main parent the rest will be clones
			this.parentNodes.push(this.scene.prevScenes[scene].scene.be.node)
		}
	}
	setChildren(){
		this.childrenNodes=[];
		for(let scene in this.scene.nextScenes){
			this.childrenNodes.push(this.scene.nextScenes[scene].scene.be.node)
		}
	}

	setPrevSiblings(){
		this.prevSiblingNodes=this.getPrevSiblings();
	}

	getPrevSiblings(){

		if(this.parentNodes.length>0){
			// console.log(this.parentNodes[0].scene)
			let myPositionInFam = this.parentNodes[0].childrenNodes.indexOf(this)


			return this.parentNodes[0].childrenNodes.slice(0,myPositionInFam);

		}else{
			return [];
		}
		 
	}

	setRelativePosition(){ //position relative to siblings
		
		if(!this.isBase){
			for(let i in this.primaryParent.children){
				if(this.primaryParent.children[i]==this){
					//console.log(this.posIndex)
					break;
				}else{
					if(this.primaryParent.children[i].index==this.index){//make sure the index of added children is this index (they are at the same level)
						this.posIndex.xRelative+=this.primaryParent.children[i].widthFull;
					}
					
				}
			}
		}else if(this.isBase){// for the base nodes without a parent        this.scene.play.baseSceneNodes.indexOf(this) != -1){

			for(let i in this.scene.play.baseSceneNodes){
				if(this.scene.play.baseSceneNodes[i]==this){
					break;
				}else{
					this.posIndex.xRelative+=this.scene.play.baseSceneNodes[i].widthFull;
				}
			}
			
		}

		
	}


	setPosition(){ //must set relative position first also must call top down from partent to child
		this.posIndex.y = this.index;

		//let shift=0;

		//console.log("set pos parent = " +this.primaryParent);
		if(this.primaryParent != undefined && this.primaryParent != null){
			this.posIndex.x = this.primaryParent.posIndex.x +this.posIndex.xRelative
		}else{
			//console.log(this);
			this.posIndex.x = this.posIndex.xRelative
		}

		for(let i in this.children){//top down
			if(this.children[i].primaryParent==this){
				this.children[i].setPosition()
			}
		}
		
		// if(this.parents.length>0){
		// 	for(let i in this.parents[0].children){
		// 		if(this.parents[0].children[i]==this){
		// 			break;
		// 		}else{
		// 			this.posIndex.x+=this.parents[0].children[i].widthFull;
		// 		}
		// 	}
		// }else if(this.isBase){// for the base nodes without a parent        this.scene.play.baseSceneNodes.indexOf(this) != -1){

		// 	for(let i in this.scene.play.baseSceneNodes){
		// 		if(this.scene.play.baseSceneNodes[i]==this){
		// 			break;
		// 		}else{
		// 			this.posIndex.x+=this.scene.play.baseSceneNodes[i].widthFull;
		// 		}
		// 	}
		// 	//this.scene.play.baseSceneNodes.indexOf(this)
		// }


	}

	assignDescendentsIndexes(index_,primaryParent_){


		if(this.index == undefined){ //if not already asigned an index
			this.index=index_;
			this.primaryParent=primaryParent_;

			let rootEnd=true;
			for(let i in this.children){

				if(this.children[i].index==undefined){
					this.children[i].assignDescendentsIndexes(index_+1,this)
					rootEnd=false;
				}else{
					if(this.children[i].index>=this.index){
						rootEnd=false;
					}
				}
			}

			if(rootEnd){ //this.children.length=0 ||   if any of the children have a hight index
				this.isRootEnd=true;
				this.scene.play.rootEndSceneNodes.push(this);
			}else{
				this.isRootEnd=false;
			}
		}
	}
	// setWidthIndexBottomUp(){
		

	// }
	// setPositionIndexTopDown(){
	// 	for(let node of this.childrenNodes){
	// 		node.setPositionIndexTopDown()
	// 	}
	// 	this.posIndex.x=this.prevSiblingNodes
	// 	this.posIndex.x=this.parentNodes[0].posIndex.x+this.prevSiblingNodes.length;
	// 	for(let node of this.childrenNodes){
	// 		node.setPositionIndexDown();
	// 	}
	// }

	// addWidthParents(){
	// 	for(let parentScene for this.parents){
	// 		parentScene.width++;
	// 	}
	// }

	setFullWidthCascadeUp(widthChild_){
		this.widthFull +=widthChild_
		for(let i in this.parents){
			if(this.parents[i].index<this.index){
				this.parents[i].setFullWidthCascadeUp(1);//add 1 to all the parents
			}
		}
	}

	// setCombinedWidthCascadeUp(widthChild_){
	// 	this.widthCombined +=widthChild_
	// 	for(let i in this.parents){
	// 		if(i==0){
	// 			this.parents[i].setFullWidthCascadeUp(this.widthFull)
	// 		}
	// 	}
	// }

	
	// setParent(){
	// 	if(this.scene.prevScenesArray.length>0){
	// 		this.parentNode=this.scene.prevScenesArray[0].be.node;
	// 		//this.scene.prevScenesArray[0].be.node.children.push()
	// 	}else{
	// 		this.parentNode=null;//add to some master node
	// 	}

	// }
	
	

	// setPosition(){
	// 	this.position.y=this.scene.index;
	// 	let xpos=0;
	// 	for(let i in this.prevSiblingNodes){
	// 		//console.log(this.prevSiblingNodes[i])
	// 		xpos += this.prevSiblingNodes[i].be.spacing.unitWidths;
	// 	}

	// 	this.position.x=xpos;

	// }



}