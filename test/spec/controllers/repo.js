'use strict';

describe ('Controller: RepoController', function () {
    var fixtures, createController, $scope;

    // load the controller's module
    beforeEach (module ('geckoboardGithubApp'));

    // Initialize the controller and a mock scope
    beforeEach (inject (function ($injector) {
        var $controller = $injector.get ('$controller') ,
            $rootScope = $injector.get ('$rootScope') ,
            $filter = $injector.get ('$filter');

        createController = function (user, repo) {
            user = user || {};
            repo = repo || {};

            $scope = $rootScope.$new ();

            fixtures = {
                user: {
                    "login": "mikermcneil",
                    "id": 618009,
                    "url": "https://api.github.com/users/mikermcneil",
                    "starred_url": "https://api.github.com/users/mikermcneil/starred",
                    "type": "User",
                    "name": "Mike McNeil",
                    "location": "Austin, TX",
                    "email": "customers@balderdash.co",
                    "followers": 222,
                    "following": 161,
                    "created_at": "2011-02-14T20:51:12Z"
                },
                repo: {
                    "name": "sails",
                    "id": 3757512,
                    "description": "Realtime MVC Framework for Node.js",
                    "fork": false,
                    "stargazers_count": 4989,
                    "forks_count": 534,
                    "subscribers_count": 449,
                    "languages": {
                        "Javascript": 600,
                        "Ruby": 250,
                        "Python": 100,
                        "PHP": 50,
                        "Java": 2
                    }
                }
            };

            return $controller ('RepoController', {
                $scope: $scope ,
                $filter: $filter ,
                user: user ,
                repo: repo
            });
        };
    }));

    describe ('when user and repo data are not loaded yet', function () {
        it ('should return empty user data', function () {
            var controller = createController ();

            expect($scope.user.hasData).toBe (false);
        });

        it ('should return empty repository data', function () {
            var controller = createController ();

            expect($scope.repo.hasData).toBe (false);
            expect($scope.repo.languages).toBeUndefined ();
        });
    });

    describe ('when user and repo are loaded', function () {
        it ('should set user hasData flag', function () {
            var controller = createController (fixtures.user, fixtures.repo);

            expect($scope.user.hasData).toBe (true);
        });

        it ('should set repo hasData flag', function () {
            var controller = createController (fixtures.user, fixtures.repo);

            expect($scope.repo.hasData).toBe (true);
        });

        it ('should format repo languages', function () {
            var controller = createController (fixtures.user, fixtures.repo);

            expect($scope.repo.languages).toEqual ([{
                name: 'Javascript' ,
                percentage: 60
            } , {
                name: 'Ruby' ,
                percentage: 25
            } , {
                name: 'Python' ,
                percentage: 10
            } , {
                name: 'PHP' ,
                percentage: 5
            }]);
        });
    });
});