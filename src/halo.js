angular.module('ng-halo', []).
    directive('halo', function() {
        return {
            restrict: 'EA',
            template:
                  '<div class="ng-halo-holder">'
                + ' <svg width="100%" height="100%" viewBox="0 0 42 42" class="">'
                + '  <defs>'
                + '   <filter id="dropshadow">'
                + '   <feColorMatrix result="matrixOut" in="offOut" type="matrix" ng-attrvalues="{{ glowColor }}" />'
                + '   <feGaussianBlur in="matrixOut" stdDeviation="0.8"/> <!-- stdDeviation is how much to blur -->'
                + '   <feOffset dx="0" dy="0" result="offsetblur"/> <!-- how much to offset -->'
                + '   <feMerge> '
                + '       <feMergeNode/> <!-- this contains the offset blurred image -->'
                + '       <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->'
                + '   </feMerge>'
                + '   </filter>'
                + '  </defs>'
                + '  <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="{{ strokeWidth }}"></circle>'
                + '  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="{{ strokeColor }}" stroke-width="{{ strokeWidth }}" stroke-dasharray="{{ progress }} {{ remainder }}" stroke-dashoffset="25" style="filter:url(#dropshadow)"></circle>'
                + ' </svg>'
                + '</div>',
            scope: {
                percentage: '=',
                strokeWidth: '=',
                strokeColor: '='
            },
            controller: ['$scope', '$element', '$attrs', '$timeout', function($scope, $element, $attrs, $timeout) {
                var timer;
                var hexToRgb = function(hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
                }

                var rgbToMatrix = function(color) {
                    var r = (color.r/255).toFixed(2),
                        g = (color.g/255).toFixed(2),
                        b = (color.b/255).toFixed(2);

                    return r + ' 0 0 0 0 0 ' + g + ' 0 0 0 0 0 ' + b + ' 0 0 0 0 0 1 0';
                }

                // set some defaults
                $scope.glowColor = rgbToMatrix(hexToRgb($scope.strokeColor));
                $scope.progress = 0;
                $scope.remainder = 100;

                $scope.$watch('percentage', function(newVal) {
                    // use timeout to show the initial animation from zero to newVal
                    $timeout.cancel(timer);
                    timer = $timeout(function() {
                        $scope.progress = parseInt(newVal) <= 100 ? parseInt(newVal) : 100;
                        $scope.remainder = 100 - $scope.progress;
                    }, 100);
                });
            }]
        }
    });
