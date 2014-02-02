'use strict';

describe ('Service: UserService', function () {
    var $appInjector = angular.injector (['geckoboardGithubApp']) ,
        UserService = $appInjector.get ('UserService') ,
        GITHUB_API_URL = $appInjector.get ('GITHUB_API_URL') ,
        GITHUB_USER = $appInjector.get ('GITHUB_USER') ,
        $q, $httpBackend;

    // @todo: load fixtures

    beforeEach (inject (function ($injector) {
        $httpBackend = $injector.get ('$httpBackend');
        $q = $injector.get ('$q');

        $httpBackend
            .when ('GET', GITHUB_API_URL + '/users/' + GITHUB_USER)
            .respond ({
                login: GITHUB_USER ,
                id: 618009
            });
    }));

    describe ('when is initialized', function () {
        it ('should contains data and populate methods', function () {
            expect(UserService.data).toBeDefined ();
            expect(typeof UserService.data).toBe ('function');

            expect(UserService.populate).toBeDefined ();
            expect(typeof UserService.populate).toBe ('function');
        });

        it ('should returns empty user data', function () {
            expect(UserService.data ()).toEqual ({});
        });
    });

    describe ('when populate method is called', function () {
        it ('should returns user data', function () {
            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER);
            
            $q
                .when (UserService.populate (GITHUB_USER))
                .then (function () {
                    expect(UserService.data ()).toEqual ({
                        login: GITHUB_USER ,
                        id: 618009
                    });
                });
        });
    });
});
