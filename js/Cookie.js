class Cookie{
	constructor(cookiesString_){
		if(cookiesString_==undefined){
			cookiesString_=document.cookie
		}
		let vareables = cookiesString_.split("; ");

		for (let vareable in vareables){
			let split=vareables[vareable].split("=");
			let name = split[0];
			let value = split[1];

			this[name] = value;
		}
		console.log(this)

	// 	function getCookie(name){
 //    	var pattern = RegExp(name + "=.[^;]*")
	//     var matched = document.cookie.match(pattern)
	//     if(matched){
	//         var cookie = matched[0].split('=')
	//         return cookie[1]
	//     }
	//     return false
	// }	
		
	}
	delete(varName_){
		document.cookie = varName_ + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"; //past date
	}
	set(varName_,varValue_){
		this[varName_]=varValue_;
		document.cookie=varName_ + "=" + varValue_;
	}
}