
class GlowImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="glow";
	}
	apply(){
		// console.log("applying glow image effect with class " + this.vareables.className)
		this.parentContent.html.fe.classList.add(this.vareables.className)
	}
	remove(){
		this.parentContent.html.fe.classList.remove(this.vareables.className)
	}

	// createEditorHTML(){
 //  		this.setHTMLEditorForm("text-dimansions");

	// 	this.editor.html.effectTitle = this.getHTMLTitle("Dimension Effect")
	// 	this.editor.html.form.append(this.editor.html.effectTitle);

	// 	let width = this.getHTMLInput("Width", this.vareables.width)
	// 	this.editor.html.widthLabel = width[0]
	// 	this.editor.html.widthInput= width[1]
	// 	this.editor.html.form.append(this.editor.html.widthLabel);
	// 	this.editor.html.form.append(this.editor.html.widthInput);

	// 	this.editor.html.form.append(document.createElement("br"))

		
	// 	let height= this.getHTMLInput("Height", this.vareables.height)
	// 	this.editor.html.heightLabel = height[0]
	// 	this.editor.html.heightInput = height[1] 
		
	// 	this.editor.html.form.append(this.editor.html.heightLabel);
	// 	this.editor.html.form.append(this.editor.html.heightInput);
	// }

	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("image-glow");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Glow Effect"
		this.editor.html.effectTitle.classList.add("effect-title")
		this.editor.html.form.append(this.editor.html.effectTitle);



		let className = this.getHTMLSelect("Class Name", ["none", "glow", "glow-gif", "glow-gif-blue", "glow-gif-rid"], this.vareables.className)
		this.editor.html.classLabel = className[0]
		this.editor.html.classInput= className[1]
		this.editor.html.form.append(this.editor.html.classLabel);
		this.editor.html.form.append(this.editor.html.classInput);

		this.editor.html.form.append(document.createElement("br"))




	
	}
	getEditorHTML(){
		if(this.editor==undefined || this.editor.html==undefined){
			this.createEditorHTML()
		}
		return this.editor.html.form;
	}
}