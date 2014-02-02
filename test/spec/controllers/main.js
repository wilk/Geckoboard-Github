'use strict';

describe ('Controller: MainController', function () {
    // load the controller's module
    beforeEach (module ('geckoboardGithubApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach (inject (function ($controller, $rootScope) {
        scope = $rootScope.$new ();
        MainCtrl = $controller ('MainController', {
            $scope: scope ,
            user: {} ,
            repos: []
        });
    }));

    it ('should attach a list of awesomeThings to the scope', function () {
        expect(scope.user.hasData).toBe (false);
    });
});
