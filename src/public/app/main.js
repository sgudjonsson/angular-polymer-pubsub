angular
    .module('app', [])
    .value('PubSub', PubSub)
    .service('pubsub', ['PubSub', function(PubSub) {
        this.subscribe = function(topic, callback) {
            PubSub.subscribe(topic, callback)
        };

        this.publish = function(topic, data) {
            PubSub.publish(topic, data);
        }
    }])
    .controller('AppController', ['$scope', 'pubsub', function($scope, pubsub) {
        $scope.isAuthenticated = false;

        $scope.toggleAuthenticated = function() {
            pubsub.publish('user-authenticated', { isAuthenticated: !$scope.isAuthenticated });
        }

        pubsub.subscribe('user-authenticated', function(msg, data) {
            $scope.$apply(function() {
                $scope.isAuthenticated = data.isAuthenticated;
            })
        });
    }])
    ;