class BackEnd{
	constructor(){
		this.storyEditor=new StoryEditor(currentStory, this);
		// console.log("create backend!!")

		//this.currentEditor = this.storyEditor;

		
		
		// this.sceneEditor = new SceneEditor(cu);
		
		// this.objectEditor;
		// this.effectEditor;
		// this.actionEditor;

		
		this.mainEditorWindow= new MainEditorWindow();

		this.setEditor(this.storyEditor);

		this.toolbox;

		this.secondaryEditorWindow = new SecondaryEditorWindow();

		
	}

	setEditor(editor_){
		// if(this.currentEditor != undefined){
		// 	console.log(this.currentEditor)
		// 	this.currentEditor.hide();
		// }
		
		// this.currentEditor = editor_;

		this.mainEditorWindow.setEditor(editor_);
	}



	display(editor_){

		// if(editor_ != undefined){
		// 	this.setEditor(editor_);
		// }
		this.mainEditorWindow.display();
		//this.currentEditor.display();

		this.secondaryEditorWindow.display();
	}
	hide(){
		this.mainEditorWindow.hide();
		this.secondaryEditorWindow.hide();
	}

}