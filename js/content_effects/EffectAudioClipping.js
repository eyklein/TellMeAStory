class ClippingAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);

		// this.vareables.start==0;
		
		// this.vareables.duration==null;
	}

	createEditorHTML(){
		this.editor={};
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("audioclipping");

		this.editor.html.startLabel = document.createElement("label");
		this.editor.html.startLabel.innerHTML="Start Time (s)"
		this.editor.html.form.append(this.editor.html.startLabel);
		this.editor.html.startInput = document.createElement("input");
		this.editor.html.startInput.value = this.vareables.start;
		this.editor.html.form.append(this.editor.html.startInput);
		this.editor.html.startInput.classList.add("effect-input");

		this.editor.html.form.append(document.createElement("br"));


		this.editor.html.durationLabel = document.createElement("label");
		this.editor.html.durationLabel.innerHTML="Duration Time (s)"
		this.editor.html.form.append(this.editor.html.durationLabel);
		this.editor.html.durationInput = document.createElement("input");
		this.editor.html.durationInput.value = this.vareables.duration;
		this.editor.html.form.append(this.editor.html.durationInput);
		this.editor.html.durationInput.classList.add("effect-input");
	}
	getEditorHTML(){
		if(this.editor==undefined || this.editor.html==undefined){
			this.createEditorHTML()
		}
		return this.editor.html.form;
	}

	
	

	apply(){
		// console.log("apply clipping property")
		this.parentContent.start=this.vareables.start;
		this.parentContent.duration=this.vareables.duration;

		//console.log(this.parentContent)

		this.parentContent.setInitalTimeVars();


	}
}