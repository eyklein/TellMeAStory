class SecondaryEditorWindow{
	constructor(){
		//this.div=document.createElement("div");

		this.pos={};
		this.pos.right=0;
		this.pos.top=0;

		this.width="30%";
		this.height="80%";

		this.createHTML();

		//this.current

	}
	removeContentHTML(contentEditorElement_){
		this.html.removeChild(contentEditorElement_.html.container)
	}
	
	addContentHTML(contentEditorElement_){
		this.html.append(contentEditorElement_.html.container)
		
		// console.log("adding22@@@@@@@@@@");

	}

	createHTML(){
		this.html = document.createElement("div");
		this.html.style.position = "absolute";
		this.html.style.right = this.pos.right;
		this.html.style.top = this.pos.top;
		this.html.style.width = this.width//this.width + "px";
		this.html.style.height = this.height//this.height + "px";

		this.html.style.overflow = "scroll";
		this.html.style['z-index']=100;
		this.html.style["background-color"] = "rgb(223 223 223)";


		

		this.html.addEventListener("click", function(e){
			// console.log(e.target)
			if(e.target==this.html && !shiftPressed){
				clearSelectedNodes();
			}
		}.bind(this));




	}

	display(){
		//document.getElementById('content').appendChild(this.html)
		document.body.appendChild(this.html)
	}
	hide(){
		document.body.removeChild(this.html);
	}
	

}