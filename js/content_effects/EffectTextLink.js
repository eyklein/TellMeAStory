class LinkTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);	

		this.type="link";	
	}

	apply(){
		
		this.parentContent.html.fe.innerHTML = this.parentContent.html.fe.innerText.link(this.vareables.src);

	}

	createEditorHTML(){

		this.setHTMLEditorForm("text-link");

		this.editor.html.effectTitle = this.getHTMLTitle("Link Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let link = this.getHTMLInput("URL", this.vareables.src)
		this.editor.html.linkLabel = link[0]
		this.editor.html.linkInput= fill[1]
		this.editor.html.form.append(this.editor.html.linkLabel);
		this.editor.html.form.append(this.editor.html.linkInput);


		// this.editor.html.linkInput.style["background-color"]=this.editor.html.fillInput.value;

		// this.editor.html.fillInput.addEventListener("input", function(){
		// 	this.editor.html.fillInput.style["background-color"]=this.editor.html.fillInput.value;
			
		// 	if(lightOrDark(this.editor.html.fillInput.value)=="dark"){
		// 		this.editor.html.fillInput.style.color = "#fff"
		// 	}else if(lightOrDark(this.editor.html.fillInput.value)=="light"){
		// 		this.editor.html.fillInput.style["color"] = "#000"
		// 	}

		// }.bind(this))
		

		this.editor.html.form.append(document.createElement("br"))









		// this.editor={}
		// this.editor.html = {}
		// this.editor.html.form = document.createElement("form");
		// this.editor.html.form.classList.add("effect-editor-form");
		// this.editor.html.form.classList.add("image-hide");

		// this.editor.html.effectTitle = document.createElement("div");
		// this.editor.html.effectTitle.innerHTML="Effect Blank"

		// this.editor.html.form.append(this.editor.html.effectTitle)

		

	}

}