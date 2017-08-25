(function () {
    'use strict';

    angular
        .module('app', [
            'ng-halo',
        ])
        .controller("SomeController", ['$scope', '$interval', function($scope, $interval) {

            $scope.haloPercentage = 50;
            var interval;

            interval = $interval(function() {
                $scope.haloPercentage = Math.floor(Math.random() * 100) + 1;
            }, 1000);

        }]);

})();
