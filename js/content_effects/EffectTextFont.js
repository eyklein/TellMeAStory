class FontTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
		this.type="font";
	}

	apply(){
		this.parentContent.html.fe.style['font-family']=this.vareables["font-family"];

	}

			// "font":{
   //              "font-family":"indieFlower"
   //          }

	createEditorHTML(){
  		this.setHTMLEditorForm("text-font");

		this.editor.html.effectTitle = this.getHTMLTitle("Font Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let font = this.getHTMLInput("Font Family", this.vareables["font-family"])
		this.editor.html.fontLabel = font[0]
		this.editor.html.fontInput= font[1]
		this.editor.html.form.append(this.editor.html.fontLabel);
		this.editor.html.form.append(this.editor.html.fontInput);


		this.editor.html.fontInput.style["font-family"]=this.editor.html.fontInput.value;

		this.editor.html.fontInput.addEventListener("input", function(){
			this.editor.html.fontInput.style["font-family"]=this.editor.html.fontInput.value;
		}.bind(this))
		

		this.editor.html.form.append(document.createElement("br"))

		
	}
}