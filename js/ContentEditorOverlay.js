// function ContentEditorOverlay(){
// 	//console.log(scene_)
// 	this.html = {};
// 	this.currentContentModual;

// 	this.createHTML();

// }

// ContentEditorOverlay.prototype.changeType=function(type_){
// 	this.currentContentModual.changeType(type_);
// }
// ContentEditorOverlay.prototype.getType=function(){
// 	return this.currentContentModual.getType();
// }

// ContentEditorOverlay.prototype.createHTML=function(){
// 	this.html.main = document.createElement("div");
// 	this.html.main.classList.add("content-editor");
// 	this.html.main.style.display = "none";
// 	// this.html.main.style.position="fixed";

// 	this.html.viewport = document.createElement("div");
// 	this.html.viewport.classList.add("content-viewport");
// 	this.html.main.appendChild(this.html.viewport)


// 	this.html.saveButton=document.createElement("button");
// 	this.html.saveButton.innerHTML="Save";
// 	this.html.main.appendChild(this.html.saveButton);
// 	this.html.saveButton.thisObject=this;
// 	this.html.saveButton.addEventListener ("click", function(event_) {
// 		//console.log(event_.target.thisObject);
// 		event_.target.thisObject.currentContentModual.save();
// 	});



// 	this.html.canselButton=document.createElement("button");
// 	this.html.canselButton.innerHTML="X";
// 	this.html.main.appendChild(this.html.canselButton);
// 	this.html.canselButton.thisObject=this;
// 	this.html.canselButton.addEventListener ("click", function(event_) {
// 		//console.log(event_.target.thisObject);

// 		//this should clear any edits first
// 		event_.target.thisObject.cancel();
// 		event_.target.thisObject.display(false);
// 	});

// 	this.html.selectContentType=document.createElement("select");
// 	this.html.selectContentType.innerHTML="<option>Text</option><option>Clickable Text</option><option>Image</option><option>Audio</option>"
// 	this.html.main.appendChild(this.html.selectContentType);

// 	document.getElementById('editor').appendChild(this.html.main)
// }
// ContentEditorOverlay.prototype.updateContent=function(){
// 	this.currentContentModual.updateContent();
// }
// ContentEditorOverlay.prototype.asignModual=function(contentModual_){
// 	this.currentContentModual=contentModual_;
// }

// ContentEditorOverlay.prototype.updateVeiwPort=function(){
// 	this.html.viewport.innerHTML="";
// 	this.html.viewport.appendChild(this.currentContentModual.getVeiwPort())
// 	this.html.viewport.appendChild(this.currentContentModual.getToolBox())

	
// }


// ContentEditorOverlay.prototype.display=function(condition_){
// 	//this.html.main.appendChild(this.getVeiwPort());


// 	if(condition_ == null || condition_){
		
// 		this.html.main.style.display = "block";
// 	}else{
// 		this.html.main.style.display = "none";
// 	}
// }

// ContentEditorOverlay.prototype.cancel=function(){
// 	this.currentContentModual.cancel();

	
// }


