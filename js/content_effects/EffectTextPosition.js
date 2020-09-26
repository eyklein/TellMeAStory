class PositionTextEffect extends TextEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="position";
	}
	apply(){
		if(this.vareables.type == "appendIn"){
			
			// console.log(this.parentContent.id)
			this.parentContent.htmlParent=document.getElementById(this.vareables.parentClass)
			// console.log(typeof(this.parentContent.htmlParent.append))

		}
		else if(this.vareables.type == "absolute"){
			this.parentContent.html.fe.style.position="absolute";

			for(let vareable in this.vareables){
				this.parentContent.html.fe.style[vareable]=this.vareables[vareable];
			}
			
			this.parentContent.htmlParent=document.getElementById("content")


		}
	}

 // "position":{
 // "type":"appendIn",
 // "parentClass":"main_text"
 // }

// "position":{
// "type":"absolute",
// "top": "45%",
// "left": "37.39%"
// }

	createEditorHTML(){

		this.setHTMLEditorForm("text-position");

		this.editor.html.effectTitle = this.getHTMLTitle("Position Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);


		//Class Name
		let typeSelect = this.getHTMLSelect("Type", ["none", "absolute", "fixed", "relative", "static", "sticky", "appendIn"], this.vareables.type)
		this.editor.html.typeTitle = typeSelect[0]
		this.editor.html.typeSelect= typeSelect[1]
		this.editor.html.form.append(this.editor.html.typeTitle);
		this.editor.html.form.append(this.editor.html.typeSelect);

		this.editor.html.form.append(document.createElement("br"))


		

		this.editor.html.typeSelect.addEventListener("change",this.updateTypeSubOptions.bind(this))

		this.editor.html.subOptions=document.createElement("div");
		this.editor.html.form.append(this.editor.html.subOptions);
		this.updateTypeSubOptions()



	}
	updateTypeSubOptions(){

		this.editor.html.subOptions.innerHTML = ''
		
		if(this.editor.html.typeSelect.value == "appendIn"){

			let parentID = this.getHTMLInput("Parent ID", this.vareables.parentClass)
			this.editor.html.parentLable = parentID[0]
			this.editor.html.parentInput= parentID[1]
			this.editor.html.subOptions.append(this.editor.html.parentLable);
			this.editor.html.subOptions.append(this.editor.html.parentInput);	

			this.editor.html.subOptions.append(document.createElement("br"));

		}else{

			let xPos = this.getHTMLInput("Left Pos", this.vareables.left)
			this.editor.html.xPosLabel = xPos[0]
			this.editor.html.xPosInput= xPos[1]
			this.editor.html.subOptions.append(this.editor.html.xPosLabel);
			this.editor.html.subOptions.append(this.editor.html.xPosInput);	

			this.editor.html.subOptions.append(document.createElement("br"));

			let yPos = this.getHTMLInput("Top Pos", this.vareables.top)
			this.editor.html.yPosLabel = yPos[0]
			this.editor.html.yPosInput= yPos[1]
			this.editor.html.subOptions.append(this.editor.html.yPosLabel);
			this.editor.html.subOptions.append(this.editor.html.yPosInput);	

			this.editor.html.subOptions.append(document.createElement("br"));

		}
	}
}