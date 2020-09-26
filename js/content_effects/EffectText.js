class TextEffect extends ContentEffect{
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
	}
}