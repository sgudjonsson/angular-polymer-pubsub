angular
    .module('app', [])
    .value('user', window.User)
    .directive('authStatus', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: '/app/templates/auth-status.html',
            controller: ['$scope', 'user', function($scope, user) {
                $scope.userIsLoggedIn = false;

                user.onAuthenticated(function(state) {
                    if($scope.userIsLoggedIn != state.isAuthenticated) {
                        $scope.$apply(function() {
                            $scope.userIsLoggedIn = state.isAuthenticated;
                        });
                    }
                });
            }],
        }
    })
    .directive('loginForm', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                username: '@',
                password: '@'
            },
            templateUrl: '/app/templates/login-form.html',
            controller: ['$scope', 'user', function($scope, user) {
                $scope.isAuthenticated = false;

                $scope.login = function() {
                    user.login($scope.username, $scope.password)
                        .then(function(state) {
                            $scope.$apply(function() {
                                $scope.isAuthenticated = state.isAuthenticated;
                            });
                        });
                }

                $scope.logout = function() {
                    user.logout()
                        .then(function(state) {
                            $scope.$apply(function() {
                                $scope.isAuthenticated = state.isAuthenticated;
                            });
                        });
                }

                user.onAuthenticated(function(state) {
                    if($scope.isAuthenticated != state.isAuthenticated) {
                        $scope.$apply(function() {
                            $scope.isAuthenticated = state.isAuthenticated;
                        });
                    }
                });

            }]
        }
    })
    .controller('AppController', ['$scope', function($scope) {

    }])
    ;