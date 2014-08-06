
var ArgumentsError = function(args, message) {
	this.arguments = args;
	this.message = message;
}

ArgumentsError.prototype = new Error();
ArgumentsError.prototype.constructor = ArgumentsError;