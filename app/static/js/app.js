(function () {

'use strict';
angular
.module('app', [
          'ngRoute', 
          'app.landing'])
.config(['$routeProvider', 
function ($routeProvider) {


  $routeProvider
    .when('/landing', {
      templateUrl: 'static/html/landing.html',
      controller: 'landingController'
    })
    .otherwise({
      redirectTo: '/landing'
    });
}])  

})();