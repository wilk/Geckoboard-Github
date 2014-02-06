'use strict';

describe ('Service: RepoService', function () {
    var GITHUB_USER_REPO = 'sails',
        RepoService, GITHUB_API_URL, GITHUB_USER, $httpBackend;

    beforeEach (function () {
        module ('geckoboardGithubApp');

        inject (function (_$httpBackend_, _RepoService_, _GITHUB_API_URL_, _GITHUB_USER_) {
            $httpBackend = _$httpBackend_;
            RepoService = _RepoService_;
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
            expect(RepoService.data).toBeDefined ();
            expect(RepoService.data).toEqual (jasmine.any (Function));

            expect(RepoService.populate).toBeDefined ();
            expect(RepoService.populate).toEqual (jasmine.any (Function));
        });

        it ('should returns empty repo data', function () {
            expect(RepoService.data ()).toEqual ({});
        });
    });

    describe ('when populate method is called', function () {
        it ('should returns repo data', function () {
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO)
                .respond ({
                    "name": "sails",
                    "description": "Realtime MVC Framework for Node.js",
                    "fork": false
                });
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/branches?page=0&per_page=100')
                .respond ([{
                    "name": "associations",
                    "commit": {
                        "sha": "a76ce660588cd9db43f09488f7b0e1af49fd5843",
                        "url": "https://api.github.com/repos/mikermcneil/sails/commits/a76ce660588cd9db43f09488f7b0e1af49fd5843"
                    }
                },
                {
                    "name": "berkeley",
                    "commit": {
                        "sha": "06dff8ae4f3d4fde835fa9099ba8b246b4460dea",
                        "url": "https://api.github.com/repos/mikermcneil/sails/commits/06dff8ae4f3d4fde835fa9099ba8b246b4460dea"
                    }
                },
                {
                    "name": "config",
                    "commit": {
                        "sha": "5f1f700b72c58b60689e6d3ea0078397a591c41c",
                        "url": "https://api.github.com/repos/mikermcneil/sails/commits/5f1f700b72c58b60689e6d3ea0078397a591c41c"
                    }
                }]);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/commits?page=0&per_page=100')
                .respond ([]);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/contributors?page=0&per_page=100')
                .respond ([{
                    "login": "mikermcneil",
                    "id": 618009,
                    "contributions": 2133
                },
                {
                    "login": "Zolmeister",
                    "id": 700546,
                    "contributions": 75
                }]);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/tags?page=0&per_page=100')
                .respond ([{
                    "name": "v0.9.7",
                    "zipball_url": "https://api.github.com/repos/mikermcneil/sails/zipball/v0.9.7",
                    "tarball_url": "https://api.github.com/repos/mikermcneil/sails/tarball/v0.9.7",
                    "commit": {
                        "sha": "717d85b96533c5705a061fd63bfd08061b3d89a6",
                        "url": "https://api.github.com/repos/mikermcneil/sails/commits/717d85b96533c5705a061fd63bfd08061b3d89a6"
                    }
                },
                {
                    "name": "v0.9.6",
                    "zipball_url": "https://api.github.com/repos/mikermcneil/sails/zipball/v0.9.6",
                    "tarball_url": "https://api.github.com/repos/mikermcneil/sails/tarball/v0.9.6",
                    "commit": {
                        "sha": "a16349432b7bffc8d1607c53b5f3e20b45dc2e1f",
                        "url": "https://api.github.com/repos/mikermcneil/sails/commits/a16349432b7bffc8d1607c53b5f3e20b45dc2e1f"
                    }
                }]);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/languages?page=0&per_page=100')
                .respond ({
                    "JavaScript": 22830,
                    "Python": 898
                });

            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO);
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/branches?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/commits?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/contributors?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/tags?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/languages?page=0&per_page=100');

            RepoService.populate (GITHUB_USER, GITHUB_USER_REPO);

            $httpBackend.flush ();

            var repo = RepoService.data ();

            expect(repo.name).toBe ('sails');
            expect(repo.description).toBe ('Realtime MVC Framework for Node.js');
            expect(repo.fork).toBe (false);
            expect(repo.branches).toBe (3);
            expect(repo.commits).toBe (0);
            expect(repo.contributors).toBe (2);
            expect(repo.tags).toBe (2);
            expect(repo.languages.JavaScript).toBe (22830);
            expect(repo.languages.Python).toBe (898);
        });
    });

    describe ('when repo population doesn\'t work', function () {
        it ('should returns empty repo data', function () {
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO)
                .respond (404);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/branches?page=0&per_page=100')
                .respond (404);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/commits?page=0&per_page=100')
                .respond (404);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/contributors?page=0&per_page=100')
                .respond (404);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/tags?page=0&per_page=100')
                .respond (404);
            $httpBackend
                .when ('GET', GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/languages?page=0&per_page=100')
                .respond (404);

            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO);
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/branches?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/commits?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/contributors?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/tags?page=0&per_page=100');
            $httpBackend.expectGET (GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_USER_REPO + '/languages?page=0&per_page=100');

            RepoService.populate (GITHUB_USER, GITHUB_USER_REPO);

            $httpBackend.flush ();

            var repo = RepoService.data ();

            expect(repo.name).toBeUndefined ();
            expect(repo.branches).toBe (0);
            expect(repo.commits).toBe (0);
            expect(repo.contributors).toBe (0);
            expect(repo.tags).toBe (0);
            expect(repo.languages).toEqual ({});
        });
    });
});