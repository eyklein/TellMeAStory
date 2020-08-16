
class ContentNode{ //not to be confused with nodejs
	constructor(content_){
		//this.enclosingStructure;//this is the story or scene depending on what this node if for
		this.isBase=false;
		this.content=content_;

		this.height=30;
		this.width=90;




		


		// this.parentsInfo={};
		// this.primaryParent;


		// this.children=[];
		// this.childrenInfo={};

		// this.widthFull=0;//if every child has its own spot
		// this.widthCombined=0;//if only one child has its own spot

		// this.posIndex={};
		// this.posIndex.x=0;
		// this.posIndex.y=0;
		// this.posIndex.xRelative=0;//relative to siblings 

		// this.pos={};

		// this.height=30;
		// this.width=90;

		// this.content=content_;
		// this.enclosingStructure=this.content.parentScene;
		// this.id=this.content.id


		//this.createHTML();
		// this.html.svgPathsArrows=[];
		

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
		this.html.info.style.width="100px";
		this.html.info.style.height="100px";
		this.html.info.style.position="absolute";
		this.html.info.style.opacity=.8;
		this.html.info.style['background-color']="gray";

		this.html.container.appendChild(this.html.info);
		
		
		//this  bar will be when display is hit
		this.html.display = document.createElement("div");
		this.html.display.style.width=this.width+"px";
		this.html.display.style.height=2+"px";
		this.html.display.style.position="absolute";
		this.html.display.style['background-color']="green";
		this.html.container.appendChild(this.html.display);


			//this  bar will be when hide is hit
		this.html.hide = document.createElement("div");
		this.html.hide.style.width=this.width+"px";
		this.html.hide.style.height=2+"px";
		this.html.hide.style.position="absolute";
		this.html.hide.style.top=Math.random()*50+"px";

		this.html.hide.style['background-color']="red";

		this.html.container.appendChild(this.html.hide);


		this.html.info.style.opacity=.8;



		

		//console.log(this.content)

		
		this.html.info.innerHTML= this.content.name

		//this.html.container.style.top = Math.random()*300+"px";

		//console.log(this.content.actionsIn)
		if(this.content.actionsIn.length>0){
			this.html.container.style.left=this.content.pos.xIndex*200+ "px";
			this.html.container.style.top=(this.content.actionsIn[0].pos.y+this.content.actionsIn[0].height)+ "px";
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