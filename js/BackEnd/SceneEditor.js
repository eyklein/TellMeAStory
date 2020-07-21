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

		//this.addContentDivs()


	}

	addContentDivs(){
		for(let content in this.scene.contentsLib){
			//document.getElementById("")
			this.html.appendChild(this.scene.contentsLib.node.html.container)
			//this.backEnd.editorWindow.html.appendChild(this.story.scenesLib[scene].be.html)
		}
	}

	display(){
		//console.log("display story")
		// for(let scene in this.story.scenesLib){
		// 	this.story.scenesLib[scene].positionBE();
		// }

		this.backEnd.editorWindow.html.appendChild(this.html)
		//this.backEnd.editorWindow.html.appendChild(this.html)
	}
}