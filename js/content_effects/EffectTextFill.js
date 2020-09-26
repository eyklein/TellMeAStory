class FillTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="fill";

	}

	apply(){
		this.parentContent.html.fe.style.color=this.vareables.color;
	}

	createEditorHTML(){
  		this.setHTMLEditorForm("text-fill");

		this.editor.html.effectTitle = this.getHTMLTitle("Fill Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let fill = this.getHTMLInput("Fill", this.vareables.color)
		this.editor.html.fillLabel = fill[0]
		this.editor.html.fillInput= fill[1]
		this.editor.html.form.append(this.editor.html.fillLabel);
		this.editor.html.form.append(this.editor.html.fillInput);


		this.editor.html.fillInput.style["background-color"]=this.editor.html.fillInput.value;

		this.editor.html.fillInput.addEventListener("input", function(){
			this.editor.html.fillInput.style["background-color"]=this.editor.html.fillInput.value;
			
			if(lightOrDark(this.editor.html.fillInput.value)=="dark"){
				this.editor.html.fillInput.style.color = "#fff"
			}else if(lightOrDark(this.editor.html.fillInput.value)=="light"){
				this.editor.html.fillInput.style["color"] = "#000"
			}

		}.bind(this))
		

		this.editor.html.form.append(document.createElement("br"))

		
	}
}