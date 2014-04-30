(function() {

    var MessageService = function($http) {
        return {
            // get all messages
            all: function() {
                return $http.get('/api/messages');
            },
            
            // create a new message
            create: function(message) {
                return $http.post('/api/messages', message);
            }
        };
    };

    MessageService.$inject = ['$http'];

    angular.module('guestbook').factory('MessageService', MessageService);

})();
