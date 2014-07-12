var User = (function(ctx) {

    /**
     * The current user's state
     * @type {Object}
     */
    var _state = {
            isAuthenticated: false,
            token: undefined
        };

    /**
     * Performs a login with a username and password, returns a promise
     * @param  {string} username The username
     * @param  {string} password The password
     * @return {Promise}         A promise that is resolved when the user is logged in
     */
    function login(username, password) {
        var deferred = Q.defer();

        setTimeout(function() {
            _state.isAuthenticated = true;
            _state.token = '0123456789';

            deferred.resolve(_.clone(_state));
        }, 0)

        return deferred.promise;
    }

    /**
     * Performs a logout for the current user
     * @return {Promise} A promise that is resolve when the user has been logged out from our server
     */
    function logout() {
        var deferred = Q.defer();

        setTimeout(function() {
            _state.isAuthenticated = false;
            _state.token = undefined;

            deferred.resolve(_.clone(_state));
        }, 0)

        return deferred.promise;
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
         * @return {Promise}         A promise that is resolved when the user has logged in
         */
        login: function(username, password) {
            return login(username, password);
        },

        /**
         * Performs a logout
         * @return {Promise} A promise that is resolved when the user has logged out
         */
        logout: function() {
            return logout();
        }

    };

})(this);