'use strict';

describe ('Service: UserService', function () {
    var UserService, GITHUB_API_URL, GITHUB_USER, $httpBackend;

    beforeEach (function () {
        module ('geckoboardGithubApp');

        inject (function (_$httpBackend_, _UserService_, _GITHUB_API_URL_, _GITHUB_USER_) {
            $httpBackend = _$httpBackend_;
            UserService = _UserService_;
            GITHUB_API_URL = _GITHUB_API_URL_;
            GITHUB_USER = _GITHUB_USER_;
        });
    });

    afterEach (function () {
        $httpBackend.verifyNoOutstandingExpectation ();
        $httpBackend.verifyNoOutstandingRequest ();
    });

    describe ('when is initialized', function () {
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

    describe ('when populate method is called', function () {
        it ('should returns user data', function () {
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

            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER);
            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER + '/starred?page=0&per_page=100');

            UserService.populate (GITHUB_USER);

            $httpBackend.flush ();

            var user = UserService.data ();

            expect(user.login).toBe (GITHUB_USER);
            expect(user.id).toBe (618009);
            expect(user.starred).toBe (3);
        });
    });

    describe ('when user population doesn\'t work', function () {
        it ('should returns empty user data', function () {
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/users/' + GITHUB_USER)
                .respond (404);

            $httpBackend
                .when ('GET', GITHUB_API_URL + '/users/' + GITHUB_USER + '/starred?page=0&per_page=100')
                .respond (404);

            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER);
            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER + '/starred?page=0&per_page=100');

            UserService.populate (GITHUB_USER);

            $httpBackend.flush ();

            var user = UserService.data ();

            expect(user.login).toBeUndefined ();
            expect(user.id).toBeUndefined ();
            expect(user.starred).toBe (0);
        });
    });
});