class StrokeTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="stroke";
	}

	apply(){
		if(this.vareables.thickness != null && this.vareables.color != null){
			this.parentContent.html.fe.style['-webkit-text-stroke']=this.vareables.thickness + " " + this.vareables.color;
		}
	}

	 // 			"stroke": {
	 //                "color": "#00ff00",
	 //                "thickness": "0px"
	 //              }

	createEditorHTML(){
  		this.setHTMLEditorForm("text-stroke");

		this.editor.html.effectTitle = this.getHTMLTitle("Stroke Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let color = this.getHTMLInput("Stroke", this.vareables.color)
		this.editor.html.colorLabel = color[0]
		this.editor.html.colorInput= color[1]
		this.editor.html.form.append(this.editor.html.colorLabel);
		this.editor.html.form.append(this.editor.html.colorInput);


		this.editor.html.colorInput.style['-webkit-text-stroke']=this.editor.html.colorInput.value;

		this.editor.html.colorInput.addEventListener("input", function(){
			this.editor.html.colorInput.style['-webkit-text-stroke']=this.editor.html.colorInput.value;
		}.bind(this))
		

		this.editor.html.form.append(document.createElement("br"))


		let width = this.getHTMLInput("Width", this.vareables.thickness)
		this.editor.html.widthLabel = width[0]
		this.editor.html.widthInput= width[1]
		this.editor.html.form.append(this.editor.html.widthLabel);
		this.editor.html.form.append(this.editor.html.widthInput);


		this.editor.html.colorInput.style['-webkit-text-stroke-width']=this.editor.html.widthInput.value;

		this.editor.html.widthInput.addEventListener("input", function(){
			this.editor.html.colorInput.style['-webkit-text-stroke-width']=this.editor.html.widthInput.value;
		
		}.bind(this))
		this.editor.html.form.append(document.createElement("br"))


		
	}
}