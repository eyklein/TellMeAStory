
class ContentNode extends Node{ //not to be confused with nodejs
	constructor(content_){
		super(content_);
		this.content=content_;
		this.enclosingStructure=this.content.parentScene;
		this.id=this.content.id


		this.createHTML();
		this.html.svgPathsArrows=[];
		

	}

	createHTML(){
		super.createHTML()
		this.html.node.style['background-color']="red";

		//console.log(this.content)

		this.html.node.innerHTML= this.content.name
	}



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