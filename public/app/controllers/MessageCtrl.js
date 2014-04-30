(function() {

    var MessageCtrl = function($scope, MessageService) {
        $scope.message = {};

        // Load all messages
        MessageService.findAll().then(function(messages) {
            $scope.messages = messages.data;
        });

        // Create a new message
        $scope.newMessage = function() {
            MessageService.create($scope.message).then(function(response) {
                // Clean the form
                $scope.message = {};

                // Push new message into scope
                $scope.messages.push(response.data.data);
            });
        };
    };

    MessageCtrl.$inject = ['$scope', 'MessageService'];

    angular.module('guestbook').controller('MessageCtrl', MessageCtrl);

})();
