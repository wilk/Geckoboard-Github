'use strict';

describe ('Service: ReposService', function () {
    var ReposService, GITHUB_API_URL, GITHUB_USER, $httpBackend;

    beforeEach (function () {
        module ('geckoboardGithubApp');

        inject (function (_$httpBackend_, _ReposService_, _GITHUB_API_URL_, _GITHUB_USER_) {
            $httpBackend = _$httpBackend_;
            ReposService = _ReposService_;
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
            expect(ReposService.data).toBeDefined ();
            expect(ReposService.data).toEqual (jasmine.any (Function));

            expect(ReposService.populate).toBeDefined ();
            expect(ReposService.populate).toEqual (jasmine.any (Function));
        });

        it ('should returns empty repos list', function () {
            expect(ReposService.data ()).toEqual ([]);
        });
    });

    describe ('when populate method is called', function () {
        it ('should returns the repos list', function () {
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/users/' + GITHUB_USER + '/repos?page=0&per_page=100')
                .respond ([{
                    "name": "activityoverlord",
                    "fork": false,
                    "stargazers_count": 0,
                    "language": "JavaScript",
                    "forks_count": 0
                } , {
                    "name": "angularsailsdemo",
                    "fork": true,
                    "stargazers_count": 3,
                    "language": "JavaScript",
                    "forks_count": 2
                }]);

            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER + '/repos?page=0&per_page=100');

            ReposService.populate (GITHUB_USER);

            $httpBackend.flush ();

            var repos = ReposService.data ();

            expect(repos.length).toBe (2);

            expect(repos[0].name).toBe ('activityoverlord');
            expect(repos[0].fork).toBe (false);
            expect(repos[0].stargazers_count).toBe (0);
            expect(repos[0].language).toBe ('JavaScript');
            expect(repos[0].forks_count).toBe (0);

            expect(repos[1].name).toBe ('angularsailsdemo');
            expect(repos[1].fork).toBe (true);
            expect(repos[1].stargazers_count).toBe (3);
            expect(repos[1].language).toBe ('JavaScript');
            expect(repos[1].forks_count).toBe (2);
        });
    });

    describe ('when repos population doesn\'t work', function () {
        it ('should returns empty repos list', function () {
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/users/' + GITHUB_USER + '/repos?page=0&per_page=100')
                .respond (404);

            $httpBackend.expectGET (GITHUB_API_URL + '/users/' + GITHUB_USER + '/repos?page=0&per_page=100');

            ReposService.populate (GITHUB_USER);

            $httpBackend.flush ();

            var repos = ReposService.data ();

            expect(repos.length).toBe (0);
            expect(repos).toEqual ([]);
        });
    });
});