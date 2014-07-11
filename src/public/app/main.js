angular
    .module('app', [])
    .value('Publisher', window.Publisher)
    .service('publisher', ['Publisher', function(Publisher) {
        this.subscribe = function(topic, callback) {
            Publisher.subscribe(topic, callback)
        };

        this.publish = function(topic, data) {
            Publisher.publish(topic, data);
        }
    }])
    .controller('AppController', ['$scope', 'publisher', function($scope, publisher) {
        $scope.isAuthenticated = false;
        $scope.username = 'john';
        $scope.motherfucker = {
            foo: [
                {asdf:1,qwerqwer:"asdfsdf"}
            ],
            ble: { msg: "fuuuuuuuuu" }
        };

        $scope.doLogin = function(username, password) {
            $scope.$apply(function() {
                $scope.username = username;
            });
        }

        $scope.toggleAuthenticated = function() {
            publisher.publish('user-authenticated', { isAuthenticated: !$scope.isAuthenticated });
        }

        publisher.subscribe('user-authenticated', function(msg, data) {
            $scope.$apply(function() {
                $scope.isAuthenticated = data.isAuthenticated;
            })
        });
    }])
    ;