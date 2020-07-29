class SceneEditor{
	constructor(scene_,storyEditor_,backEnd_){
		this.backEnd=backEnd_;
		this.scene=scene_;
		this.storyEditor = storyEditor_;

		

		this.html=document.createElement("div");
		this.html.id="story-editor"
		this.html.style.position='absolute';
		this.html.style.top='0px';
		this.html.style.left='0px';

		this.addContentDivs()

		//this.addContentDivs()


	}

	addContentDivs(){
		for(let content in this.scene.contentsLib){
			//document.getElementById("")
			//console.log(this.scene.contentsLib[content].node)
			// console.log("this.scene.contentsLib[content].node.html.container")
			// console.log(this.scene.contentsLib[content].node.html.container)
			this.html.appendChild(this.scene.contentsLib[content].node.html.container)
			//this.backEnd.editorWindow.html.appendChild(this.story.scenesLib[scene].be.html)
		}
	}
	hide(){
		this.backEnd.editorWindow.html.innerHTML="";
	}
	display(){
		//console.log("display story")
		// for(let scene in this.story.scenesLib){
		// 	this.story.scenesLib[scene].positionBE();
		// }
		console.log(this.html)
		this.backEnd.editorWindow.html.appendChild(this.html)
		//this.backEnd.editorWindow.html.appendChild(this.html)
	}
}