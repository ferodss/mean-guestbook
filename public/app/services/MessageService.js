(function() {

    var MessageService = function($http) {
        return {
            findAll: function() {
                return $http.get('/api/messages');
            },
            
            create: function(message) {
                return $http.post('/api/messages', message);
            }
        };
    };

    MessageService.$inject = ['$http'];

    angular.module('guestbook').factory('MessageService', MessageService);

})();
