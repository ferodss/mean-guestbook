(function() {

    angular.module('guestbook', ['ngRoute',])
        .config([   '$routeProvider', '$locationProvider',
            function($routeProvider,  $locationProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'views/messages.html',
                        controller: 'MessageCtrl',
                    });

                $locationProvider.html5Mode(true);
        }]);

})();
