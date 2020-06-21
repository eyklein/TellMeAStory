class Conditional{
	constructor(data_){
		
		this.variableString=data_;
		
	}
	eval(){
		console.log(this.variableString )
		console.log(eval(this.variableString))
		return eval(this.variableString);
	}
	// setVareable(){
	// 	let splitVar=vareableString.split(".");
	// 	let variable=window;
	// 	for(let varName of splitVar){
	// 		variable=variable[varName];
	// 	}
	// 	this.variable
	// }
}