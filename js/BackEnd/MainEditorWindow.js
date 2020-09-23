class MainEditorWindow{
	constructor(){
		//this.div=document.createElement("div");

		this.pos={};
		this.pos.x=0;
		this.pos.y=0;

		this.width="70%";
		this.height="80%";

		this.createHTML();

		this.currentEditor;

	}

	createHTML(){
		this.html = document.createElement("div");
		this.html.style.position = "absolute";
		this.html.style.left = this.pos.x;
		this.html.style.top = this.pos.y;
		this.html.style.width = this.width//this.width + "px";
		this.html.style.height = this.height//this.height + "px";

		this.html.style.overflow = "scroll";

		this.html.style['z-index']=100;

		this.html.style["background-color"] = "#fff";

		this.html.addEventListener("click", function(e){
			// console.log(e.target)
			if(e.target==this.html && !shiftPressed){
				clearSelectedNodes();
			}
		}.bind(this));

	}

	setEditor(editor_){
		if(this.currentEditor != undefined){
			this.currentEditor.hide();
		}
		
		this.currentEditor = editor_;
	}

	display(){
		//document.getElementById('content').appendChild(this.html)
		document.body.appendChild(this.html)
		this.currentEditor.display()
	}
	

}