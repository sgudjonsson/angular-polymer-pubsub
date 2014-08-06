
var Arguments = function() { }

Arguments.required = function(args, message) {
	if(!_.isArray(args))
		args = [args];

	if(_.some(args, function(v) { return _.isEmpty(v); }))
		throw new ArgumentsError(args, message || 'Arguments are required');
};
