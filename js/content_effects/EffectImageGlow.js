
class GlowImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
	}
	apply(){
		// console.log("applying glow image effect with class " + this.vareables.className)
		this.parentContent.html.fe.classList.add(this.vareables.className)
	}
	remove(){
		this.parentContent.html.fe.classList.remove(this.vareables.className)
	}

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
		this.editor.html.classLabel = document.createElement("label");
		this.editor.html.classLabel.classList.add("effect-vareable")
		this.editor.html.classLabel.innerHTML="Class Name"
		this.editor.html.form.append(this.editor.html.classLabel);
		this.editor.html.classSelect =document.createElement("select");
		this.editor.html.form.append(this.editor.html.classSelect);
		this.editor.html.classSelect.classList.add("effect-dropdown")

		let options = [];


		options[0] =document.createElement("option");
		options[0].text = "none";
		options[1] =document.createElement("option");
		options[1].text = "glow";
		options[2] =document.createElement("option");
		options[2].text = "glow-gif";
		options[3] =document.createElement("option");
		options[3].text = "glow-gif-blue";
		options[4] =document.createElement("option");
		options[4].text = "glow-gif-red";

		for(let i in options){

			this.editor.html.classSelect.add(options[i])
			if(this.vareables.className == options[i].text){
				
				this.editor.html.classSelect.selectedIndex=i;
			}
		}

	}
	getEditorHTML(){
		if(this.editor==undefined || this.editor.html==undefined){
			this.createEditorHTML()
		}
		return this.editor.html.form;
	}
}