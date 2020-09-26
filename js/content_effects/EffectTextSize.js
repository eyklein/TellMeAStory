class SizeTextEffect extends TextEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
		this.type="size";

	}
	apply(){
		if(this.vareables.type == "scalable"){

			scalableTextEffects.push(this)
		}
		
	}
	updateSize(width_){
		this.parentContent.html.fe.style['font-size'] = width_*this.vareables.value+'px';
	}

	// "size":{
 //                "type":"scalable",
 //                "value":0.04
 //              }


	createEditorHTML(){

		this.setHTMLEditorForm("text-Size");

		this.editor.html.effectTitle = this.getHTMLTitle("Size Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let size = this.getHTMLInput("Value", this.vareables.value)
		this.editor.html.sizeLabel = size[0]
		this.editor.html.sizeInput= size[1]
		this.editor.html.form.append(this.editor.html.sizeLabel);
		this.editor.html.form.append(this.editor.html.sizeInput);

		this.editor.html.form.append(document.createElement("br"))

		let type = this.getHTMLSelect("Type", ["scalable", "px", "vw"], this.vareables.type)
		this.editor.html.typeLabel = type[0]
		this.editor.html.typeInput= type[1]
		this.editor.html.form.append(this.editor.html.typeLabel);
		this.editor.html.form.append(this.editor.html.typeInput);

		this.editor.html.form.append(document.createElement("br"))

		

	}

}