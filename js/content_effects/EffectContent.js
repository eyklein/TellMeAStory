var counter=0;
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

	addEditor(contentEditor_, effectType_,catagory_,clickableSubCatagory_){

		//console.log(this.parentContent.parentScene.id)
		contentEditor_.addEffectToEditor(this,catagory_,clickableSubCatagory_)
		//this.addEditorHTML(effectType_,catagory_,clickableSubCatagory_);
	}


	getEditorHTML(){
		if(this.editor==undefined || this.editor.html==undefined){
			if(this.createEditorHTML != undefined){
				this.createEditorHTML()
			}else{
				let fillerDiv=document.createElement("div")
				fillerDiv.innerHTML="No Editor Created"
				return fillerDiv;
			}
			
		}
		return this.editor.html.form;
	}


	
	apply(){
		// console.log(this)
		// console.log("Has no apply function")
	}



	setHTMLEditorForm(className_){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add(className_);
	}

	getHTMLTitle(Name_){

		let title = document.createElement("div");
		title.innerHTML=Name_;
		title.classList.add("effect-title")
		return title;

	}

	getHTMLInput(Name_, defaultValue_){

		let label = document.createElement("label");
		label.classList.add("effect-vareable")
		label.innerHTML=Name_;

		let input =document.createElement("input");
		input.classList.add("effect-input")
		input.value=defaultValue_;

		return [label, input];
	}


	getHTMLSelect(Name_, options_, defaultValue_){
		
		

		let label = document.createElement("label");
		label.classList.add("effect-vareable")
		label.innerHTML=Name_;

		let select = document.createElement("select");
		select.classList.add("effect-dropdown")

		let options = [];

		for(let i in options_){
			options[i] =document.createElement("option");
			options[i].text = options_[i];
		}


		for(let i in options){

			select.add(options[i])
			if(defaultValue_ == options[i].text){
				
				select.selectedIndex=i;
			}
		}

		return [label, select];

	}

	getJSON(){
		let json={}
		// json[this.type]={}

		
		

		for(let vareableName in this.vareables){			
			json[vareableName]=this.vareables[vareableName]

		}

		
		// console.log(json)
		return json;
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




