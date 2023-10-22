// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

    $scope.submit = function () {
        // move to forecast page
        $location.path("/forecast");
    }

}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function ($scope, $routeParams, cityService, weatherService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);

    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }

    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    };

}]);

weatherApp.service('weatherService', ['$resource', function ($resource) {

    this.GetWeather = function (city, days) {
        var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast', {
            callback: "JSON_CALLBACK"
        }, { get: { method: "JSONP" } });

        return weatherAPI.get({ id: 524901, appid: 'af72258296ff8fe7a404f26f1c5e88bf', cnt: days });
    };

}]);
