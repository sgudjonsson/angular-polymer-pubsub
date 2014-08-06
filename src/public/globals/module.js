
var Module = (function(stuff) {

	var _private = stuff.do(),
		_foo = undefined;

	return {
		get publicVariable() {
			return _private;
		}
	};

})(stuff);
