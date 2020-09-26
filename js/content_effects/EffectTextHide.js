class HideTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="hide";

	}

	apply(){
		// console.log("*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&applying fill property&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
		// console.log(this)
		this.parentContent.html.fe.style.display="none";//="hidden";
	}

	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("text-hide");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Hide Effect"
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
		options[0].text = "hide";
		options[1] =document.createElement("option");
		options[1].text = "fade";
		

		for(let i in options){

			this.editor.html.classSelect.add(options[i])
			if(this.vareables.className == options[i].text){
				
				this.editor.html.classSelect.selectedIndex=i;
			}
		}

	}
}