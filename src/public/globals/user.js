/**
 * [description]
 * @param  {[type]} globals
 * @return {[type]}
 */
var User = (function(globals, xhr, EventListeners, Arguments, Q) {

    /**
     * The current user's state
     * @type {Object}
     */
    var _state = {
            isAuthenticated: false,
            token: undefined
        };

    /**
     * OnAuthenticated event
     * @type {EventListeners}
     */
    var _onAuthenticated = new EventListeners();

    /**
     * Performs a login with a username and password, returns a promise
     * @param  {string} username The username
     * @param  {string} password The password
     * @return {Promise} A promise that is resolved when the user is logged in
     */
    function login(username, password) {

        // assert the required arguments
        Arguments.required([username, password], 'Both username and password arguments are required!');

        // setup our promise
        var d = Q.defer();

        xhr.post('/api/login', { username: username, password: password })
            .success(function(response) {
                _state.isAuthenticated = response.isAuthenticated;
                _state.token = response.token;

                _onAuthenticated.trigger(_state)

                d.resolve(_.clone(_state));
            })
            .error(function(message) {
                d.reject(message);
            });

        return d.promise;
    }

    /**
     * Performs a logout for the current user
     * @return {Promise} A promise that is resolve when the user has been logged out from our server
     */
    function logout() {
        var d = Q.defer();

        xhr.post('/api/logout', { })
            .success(function(response) {
                _state.isAuthenticated = false;
                _state.token = undefined;
 
                _onAuthenticated.trigger(_state)
 
                d.resolve(_.clone(_state));
            });

        return d.promise;
    }

    return {
        /**
         * Returns true if the user is authenticated
         * @return {Boolean} Returns true if the user is authenticated
         */
        get isAuthenticated() {
            return _state.isAuthenticated;
        },

        /**
         * The user's token
         * @return {string} Returns the user's token
         */
        get token() {
            return _state.token;
        },

        /**
         * Performs a login
         * @param  {string} username Username
         * @param  {string} password Password
         * @return {Promise} A promise that is resolved when the user has logged in
         */
        login: login,

        /**
         * Performs a logout
         * @return {Promise} A promise that is resolved when the user has logged out
         */
        logout: logout,

        /**
         * Registers a listener for on-authenticated
         * @param {Function} callback The listener's callback function
         */
        onAuthenticated: function(callback) {
            _onAuthenticated.addListener(callback);
        }

    };

})(this, qwest, EventListeners, Arguments, Q);