# ng-halo

A simple, lightweight halo directive for AngularJS

### Installation

`$ bower install ng-halo`

Make sure to include the provided script and CSS:

`<link href="/bower_components/ng-halo/dist/halo.css" rel="stylesheet">`

`<script type="text/javascript" src="/bower_components/ng-halo/dist/halo.min.js"></script>`

Include the ng-halo dependency to your app:

`var app = angular.module('demoapp', ['ng-halo']);`

### Current Options

`percentage` (Int) 0-100, the percentage of the halo that should be filled.

`stroke-width` (Int) The stroke width of the halo

`stroke-color` (String) Hex colour value (e.g. '#0083a9') of the filled part of the halo.

### Example

```
<div class="some-holding-element">
    <halo
        percentage="haloPercentage"
        stroke-width="2"
        stroke-color="'#0083a9'">
    </halo>
</div>
```

```
angular
    .module('app', [
        'ng-halo',
    ])
    .controller("SomeController", ['$scope', '$interval', function($scope, $interval) {

        $scope.haloPercentage = 50;
        var interval = $interval(function() {
            $scope.haloPercentage = Math.floor(Math.random() * 100) + 1;
        }, 1000);

    }]);
```

### Customising

The halo fills it's parent element so to change it's size, just update the width/height of it's parent element.

If you need to tweak things more, here is a CSS snippet to help override the default styling

```
.ng-halo-holder {
    width: 100%;
    height: 100%;

    .donut-ring {
        // full halo behind the main halo
        stroke: rgba(0, 0, 0, 0.1);
    }

    circle {
        // the animation speed when the halo percentage changes
        transition: all 0.5s ease;
    }
}
```