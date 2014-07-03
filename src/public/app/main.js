angular
    .module('app', [])
    .value('PubSub', PubSub)
    .service('pubsub', ['$rootScope','PubSub', function($rootScope, PubSub) {
        this.subscribe = function(topic, callback) {
            PubSub.subscribe(topic, callback)
        };

        this.publish = function(topic, data) {
            PubSub.publish(topic, data);
        }
    }])
    .controller('AppController', ['$scope', 'pubsub', function($scope, pubsub) {
        $scope.isAuthorized = false;

        $scope.toggleAuthorized = function() {
            pubsub.publish('user-authorized', { isAuthorized: !$scope.isAuthorized });
        }

        pubsub.subscribe('user-authorized', function(msg, data) {
            $scope.$apply(function() {
                $scope.isAuthorized = data.isAuthorized;
            })
        });
    }])
    ;