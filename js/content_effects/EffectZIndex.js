class ZIndexEffect extends ContentEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
		this.type="z-index";
	}
	apply(){
		// console.log("applying glow image effect with class " + this.vareables.className)
		this.parentContent.html.fe.style["z-index"]=this.vareables.index
	}
	// "z-index":{
 //                "index":103
 //              }

 	createEditorHTML(){
  		this.setHTMLEditorForm("z-index");

		this.editor.html.effectTitle = this.getHTMLTitle("Z-Index Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let index = this.getHTMLInput("Z-Index", this.vareables["index"])
		this.editor.html.indexLabel = index[0]
		this.editor.html.indexInput= index[1]
		this.editor.html.form.append(this.editor.html.indexLabel);
		this.editor.html.form.append(this.editor.html.indexInput);
		

		this.editor.html.form.append(document.createElement("br"))

		
	}
}