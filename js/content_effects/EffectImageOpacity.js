
class OpacityImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
		this.opacity=JSON_.opacity;

		this.type="opacity";
	}
	apply(){
		this.parentContent.html.fe.style.opacity=this.vareables.opacity;
	}
	remove(){
		this.parentContent.html.fe.style.opacity=1;
		//this.parentContent.html.fe.classList.remove(this.vareables.className)
	}
	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("image-opacity");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Opacity Effect"
		this.editor.html.effectTitle.classList.add("effect-title")
		this.editor.html.form.append(this.editor.html.effectTitle);
		this.editor.html.classLabel = document.createElement("label");
		this.editor.html.classLabel.classList.add("effect-vareable")
		this.editor.html.classLabel.innerHTML="Opacity"
		this.editor.html.form.append(this.editor.html.classLabel);

		this.editor.html.addressInput =document.createElement("input");
		this.editor.html.form.append(this.editor.html.addressInput);
		this.editor.html.addressInput.classList.add("effect-input")

		this.editor.html.addressInput.value=this.vareables.opacity;
	}
}