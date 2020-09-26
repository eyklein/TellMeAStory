class ClippingAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);

		this.type="clipping";

		// this.vareables.start==0;
		
		// this.vareables.duration==null;
	}

	createEditorHTML(){

		this.setHTMLEditorForm("audio-clipping");

		this.editor.html.effectTitle = this.getHTMLTitle("Clipping Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let start = this.getHTMLInput("Start Time", this.vareables.start)
		this.editor.html.startLabel = start[0]
		this.editor.html.startInput= start[1]
		this.editor.html.form.append(this.editor.html.startLabel);
		this.editor.html.form.append(this.editor.html.startInput);

		this.editor.html.form.append(document.createElement("br"));

		let duration = this.getHTMLInput("Duration", this.vareables.duration)
		this.editor.html.durationLabel = duration[0]
		this.editor.html.durationInput= duration[1]
		this.editor.html.form.append(this.editor.html.durationLabel);
		this.editor.html.form.append(this.editor.html.durationInput);


		//change effect
		this.editor.html.startInput.addEventListener("change",function(e){
			this.vareables.start=e.target.value*1;
			this.parentContent.changeStart(this.vareables.start)
		}.bind(this))

		this.editor.html.durationInput.addEventListener("change",function(e){
			this.vareables.duration=e.target.value*1;
			this.parentContent.changeDuration(this.vareables.duration)
		}.bind(this))


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