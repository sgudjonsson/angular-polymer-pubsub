
var EventListeners = function() {
	this.listeners = [];
};

EventListeners.prototype.addListener = function(handle) {
	this.listeners.push(handle);
};

EventListeners.prototype.trigger = function(data) {
    _.each(this.listeners, function(listener) {
        listener(data);
    });
};