class BackEnd{
	constructor(){
		this.storyEditor=new StoryEditor(currentStory, this);
		console.log("create backend!!")

		//this.currentEditor = this.storyEditor;

		this.setEditor(this.storyEditor);
		
		// this.sceneEditor = new SceneEditor(cu);
		
		// this.objectEditor;
		// this.effectEditor;
		// this.actionEditor;

		this.toolbox;
		this.editorWindow= new EditorWindow();

		
	}

	setEditor(editor_){
		if(this.currentEditor != undefined){
			console.log(this.currentEditor)
			this.currentEditor.hide();
		}
		
		this.currentEditor = editor_;
	}



	display(editor_){

		if(editor_ != undefined){
			this.currentEditor
		}
		this.editorWindow.display();
		this.currentEditor.display();
	}

}