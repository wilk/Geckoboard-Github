'use strict';

describe ('Service: UserService', function () {
    beforeEach (module ('geckoboardGithubApp'));
    var $appInjector = angular.injector (['geckoboardGithubApp']) ,
        UserService = $appInjector.get ('UserService') ,
        GITHUB_API_URL = $appInjector.get ('GITHUB_API_URL') ,
        GITHUB_USER = $appInjector.get ('GITHUB_USER') ,
        $httpBackend;

    // @todo: load fixtures

    beforeEach (function () {

    });

    beforeEach (inject (function ($injector) {
        $httpBackend = $injector.get ('$httpBackend');

        $httpBackend
            .when ('GET', GITHUB_API_URL + '/users/' + GITHUB_USER)
            .respond ({
                login: GITHUB_USER ,
                id: 618009
            });

        $httpBackend
            .when ('GET', GITHUB_API_URL + '/users/' + GITHUB_USER + '/starred?page=0&per_page=100')
            .respond ([{
                id: 10
            }, {
                id: 20
            }, {
                id: 30
            }]);
    }));

    afterEach (function () {
        $httpBackend.verifyNoOutstandingExpectation ();
        $httpBackend.verifyNoOutstandingRequest ();
    });

    xdescribe ('when is initialized', function () {
        it ('should contains data and populate methods', function () {
            expect(UserService.data).toBeDefined ();
            expect(UserService.data).toEqual (jasmine.any (Function));

            expect(UserService.populate).toBeDefined ();
            expect(UserService.populate).toEqual (jasmine.any (Function));
        });

        it ('should returns empty user data', function () {
            expect(UserService.data ()).toEqual ({});
        });
    });

    xdescribe ('when populate method is called', function () {
        it ('should returns user data', function () {
            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER);
            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER + '/starred');

            UserService.populate (GITHUB_USER);

            $httpBackend.flush ();

            expect(UserService.data ()).toEqual ({
                login: GITHUB_USER ,
                id: 618009 ,
                starred: 3
            });

            /*var data = UserService.populate (GITHUB_USER);

            $httpBackend.flush ();

            angular.equals(data, {login: GITHUB_USER,id: 618009,starred: 3}).toBeTruthy();*/

            /*UserService
                .populate (GITHUB_USER)
                .then (function () {
                    expect(UserService.data ()).toEqual ({});

                    $httpBackend.flush ();
                });*/
        });
    });
});
