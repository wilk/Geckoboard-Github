'use strict';

describe ('Controller: MainController', function () {
    var createController;

    // load the controller's module
    beforeEach (module ('geckoboardGithubApp'));

    jasmine.Matchers.prototype.toHaveEachRightIconClass = function () {
        var repos = this.actual;

        if (!repos) return false;
        if (repos && repos.length === 0) return false;

        for (var i = 0; i < repos.length; i++) {
            if ((repos[i].fork && repos[i].iconCls !== 'octicon-repo-forked') || (!repos[i].fork && repos[i].iconCls !== 'octicon-repo')) return false;
        }

        return true;
    };

    // Initialize the controller and a mock scope
    beforeEach (inject (function ($injector) {
        var $controller = $injector.get ('$controller') ,
            $rootScope = $injector.get ('$rootScope');

        createController = function (user, repos) {
            user = user || {};
            repos = repos || [];

            return $controller ('MainController', {
                $scope: $rootScope.$new () ,
                user: user ,
                repos: repos
            });
        };
    }));

    describe ('when user and repos data are not yet retrieved', function () {
        var controller = createController ();

        it ('should return empty user data', function () {
            expect(controller.scope.user.hasData).toBe (false);
        });

        it ('should return empty repository list', function () {
            expect(controller.scope.repos).toEqual (jasmine.any (Object));
            expect(controller.scope.repos.length).toEqual (0);
        });
    });

    describe ('when user and repos are retrieved', function () {
        var controller = createController ({id: '0101'}, [{fork: true},{fork: false}]);

        it ('should set user hasData flag', function () {
            expect(controller.scope.user.hasData).toBe (true);
        });

        it ('should append the right icon class to each repository', function () {
            expect(controller.scope.repos).toEqual (jasmine.any (Object));
            expect(controller.scope.repos.length).toBeGreaterThan (0);
            expect(controller.scope.repos).toHaveEachRightIconClass ();
        });
    });
});
