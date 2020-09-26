class DimensionsTextEffect extends TextEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="dimensions";
	}
	apply(){
		
		for(let vareable in this.vareables){
			this.parentContent.html.fe.style[vareable]=this.vareables[vareable];
		}
	}

			// "dimensions":{
   //              "width": "80%",
   //              "height": "80%"
   //           }

   createEditorHTML(){
  		this.setHTMLEditorForm("text-dimansions");

		this.editor.html.effectTitle = this.getHTMLTitle("Dimension Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let width = this.getHTMLInput("Width", this.vareables.width)
		this.editor.html.widthLabel = width[0]
		this.editor.html.widthInput= width[1]
		this.editor.html.form.append(this.editor.html.widthLabel);
		this.editor.html.form.append(this.editor.html.widthInput);

		this.editor.html.form.append(document.createElement("br"))

		
		let height= this.getHTMLInput("Height", this.vareables.height)
		this.editor.html.heightLabel = height[0]
		this.editor.html.heightInput = height[1] 
		
		this.editor.html.form.append(this.editor.html.heightLabel);
		this.editor.html.form.append(this.editor.html.heightInput);
	}

}