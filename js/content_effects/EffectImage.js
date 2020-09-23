class ImageEffect extends ContentEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
	}
	getEditorHTML(){
		if(this.editor==undefined || this.editor.html==undefined){
			this.createEditorHTML()
		}
		return this.editor.html.form;
	}
	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("image-hide");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Effect Blank"

		this.editor.html.form.append(this.editor.html.effectTitle)

		

	}

}