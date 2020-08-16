class ContentCluster{
	constructor(content_){
		this.content=content_; // usually content sometimes a scene for entering or exiting scene
		this.actionsIn=[]
		this.actionsOut=[]
	}

	addActionIn(action_){
		this.actionsIn.push(action_)
	}
	addActionOut(action_){
		this.actionsOut.push(action_)
	}

	rankActionsIn(){
		
	}
	
}