class LinkImageEffect extends ImageEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
		
		
	}

	apply(){
		// console.log("APPLIYING HREF #############    " + this.vareables.src)
		// let htmlLink=document.createElement("a");
		//htmlLink.href = this.vareables.src;
		this.parentContent.html.fe.addEventListener("click", function(){
			if(this.vareables.type == "tab"){
				window.open(this.vareables.src);
			}else if(this.vareables.type == "window"){
				window.open(this.vareables.src,this.vareables.name,
    "toolbar=yes,scrollbars=yes,resizable=yes, location=yes,menubar=yes");
			}else if(this.vareables.type == "redirect"){
				window.location.href = this.vareables.src;

			}
		}.bind(this))

		//htmlLink

		//this.parentContent.html.fe = htmlLink;
		//this.parentContent.html.fe.href = this.vareables.src;
		//console.log(this.parentContent.html.fe)

	}

	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("image-glow");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Link Effect"
		this.editor.html.effectTitle.classList.add("effect-title")
		this.editor.html.form.append(this.editor.html.effectTitle);
		this.editor.html.classLabel = document.createElement("label");
		this.editor.html.classLabel.classList.add("effect-vareable")
		this.editor.html.classLabel.innerHTML="Link Address"
		this.editor.html.form.append(this.editor.html.classLabel);

		this.editor.html.addressInput =document.createElement("input");
		this.editor.html.form.append(this.editor.html.addressInput);
		this.editor.html.addressInput.classList.add("address-input")

		this.editor.html.addressInput.value=this.vareables.value;
	}
}