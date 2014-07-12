/**
 * Publisher is a wrapper for a topics-based publisher/subcriber js library
 */
var Publisher = (function(ctx) {

    var ps = ctx.PubSub;
    if(!ps)
        throw "We need PubSub.JS to work!";

    return {
        subscribe: function(topic, callback) {
            return ps.subscribe(topic, callback);
        },
        unsubscribe: function(id) {
            ps.unsubscribe(id);
        },
        publish: function(topic, data) {
            ps.publish(topic, data);
        }
    };

})(this);