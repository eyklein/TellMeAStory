
class ReplaceImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		//so that it loads
		this.replacmentImage=document.createElement("img");
		this.replacmentImage.src=this.vareables['url'];

		this.random=Math.random();

		this.type="replace";

		
		//this.oldImage=this.parentContent.html.fe;


		// this.replacmentImage.style["position"]=this.oldImage.style["position"];
		// this.replacmentImage.style["top"]=this.oldImage.style["top"];
		// this.replacmentImage.style["left"]=this.oldImage.style["left"];
		// this.replacmentImage.style["right"]=this.oldImage.style["right"];
		// this.replacmentImage.style["bottom"]=this.oldImage.style["bottom"];
		// this.replacmentImage.style["width"]=this.oldImage.style["width"];
		// this.replacmentImage.style["height"]=this.oldImage.style["height"];
		
		// img.style.width=iconWidth+'px';
		// img.style.height=iconHeight+'px';
		// this.html.be.divIcon.appendChild(img);
		//this.url;
	}
	apply(){


		this.oldImageURL=this.parentContent.html.fe.src;//=this.content.value;


		this.parentContent.html.fe.src=this.vareables['url'];
		

	}
	remove(){
		
		this.parentContent.html.fe.src=this.oldImageURL;
	}

	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("image-replace");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Replace Image Effect"
		this.editor.html.effectTitle.classList.add("effect-title")
		this.editor.html.form.append(this.editor.html.effectTitle);

		this.editor.html.classLabel = document.createElement("label");
		this.editor.html.classLabel.classList.add("effect-vareable")
		this.editor.html.classLabel.innerHTML="URL"
		this.editor.html.form.append(this.editor.html.classLabel);

		this.editor.html.addressInput =document.createElement("input");
		this.editor.html.form.append(this.editor.html.addressInput);
		this.editor.html.addressInput.classList.add("effect-input")

		this.editor.html.addressInput.value=this.vareables.url;
	}

	// "replace":{
 //      "url": "img/Toy-Soldier-animated.gif"
 //    }
}