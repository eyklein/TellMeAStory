class ContentEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		this.parentContent=parentContent_;
		this.effectCatagory=effectCatagory_;
		this.html={};
		this.html.be={}
		this.vareables={}



		//this.parentContent.cNode.editor.
	
	
		// console.log(JSON_)	
		for(let vareable in JSON_){
			
			this.vareables[vareable]=JSON_[vareable];		
		}
		// console.log("creating effect")
		// console.log(this)

		// this.addEditor();
		
	}

	addEditor(effectType_,catagory_,clickableSubCatagory_){

		console.log(this.parentContent.parentScene.id)
		this.parentContent.cNode.editor.addEffectToEditor(this,catagory_,clickableSubCatagory_)
		//this.addEditorHTML(effectType_,catagory_,clickableSubCatagory_);
	}
	getEditorHTML(){
		let fillerDiv=document.createElement("div")
		fillerDiv.innerHTML="No Editor Created"
		return fillerDiv;
	}
	apply(){
		// console.log(this)
		// console.log("Has no apply function")
	}
};


ContentEffect.prototype.createBackEndHTML=function(){
	this.be.html.container=document.createElement("div");
	this.be.html.container.classList.add("effect-container");

	this.be.html.vareables={}
	for(let vareableName in this.vareables){
		this.be.html.vareables[vareableName]={}


		this.be.html.vareables[vareableName].container=document.createElement("div");
		this.be.html.vareables[vareableName].container.classList.add("effect-cotainer-" + vareableName);
		this.be.html.container.append(this.be.html.vareables[vareableName].container)



		this.be.html.vareables[vareableName].title = document.createElement("span");
		this.be.html.vareables[vareableName].title.classList.add("effect-title");
		this.be.html.vareables[vareableName].title.innerHTML = vareableName + ' : ';
		this.be.html.vareables[vareableName].container.append(this.be.html.vareables[vareableName].title)


		this.be.html.vareables[vareableName].input = document.createElement("input");
		this.be.html.vareables[vareableName].input.classList.add("effect-input");
		this.be.html.vareables[vareableName].input.type="number";
		this.be.html.vareables[vareableName].input.value=this.vareables[vareableName]
		this.be.html.vareables[vareableName].input.min = '0';
		this.be.html.vareables[vareableName].input.max = '30';
		this.be.html.vareables[vareableName].input.vareableName=vareableName;
		this.be.html.vareables[vareableName].container.append(this.be.html.vareables[vareableName].input)



		this.be.html.vareables[vareableName].input.onchange=function(event_){
			this.vareables[vareableName]=event_.target.value;
			this.parentContent.audioObjectHandler.audioDisplay.draw(event_.target.value,25);
		}.bind(this);

		this.updateChange();

	}

	
}

ContentEffect.prototype.updateChange=function(){
	this.parentContent.updateIconContent();
}




ContentEffect.prototype.getJSON=function(){
	// let property={}
	// property.vareables={};

	// for(let vareableName in this.vareables){
	// 	property.vareables[vareableName]={}
	// 	property.vareables[vareableName].value=this.vareables[vareableName].value;
	// 	property.vareables[vareableName].type=this.vareables[vareableName].type;

	// }
	// property.type=this.type;

	// return property;
}