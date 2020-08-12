class ContentCluster{
	constructor(content_){
		this.content=content_;
		this.actionsIn=[]
		this.actionsOut=[]
	}

	addActionIn(action_){
		this.actionsIn.push(action_)
	}
	addActionOut(action_){
		this.actionsOut.push(action_)
	}
	
}