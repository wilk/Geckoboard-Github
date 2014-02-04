'use strict';

describe ('Controller: MainController', function () {
    var fixtures , createController, $scope;

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

            $scope = $rootScope.$new ();

            fixtures = {
                user: {
                    "login": "mikermcneil",
                    "id": 618009,
                    "avatar_url": "https://gravatar.com/avatar/199046437b76e6ca73e00b4cc182a1c5?d=https%3A%2F%2Fidenticons.github.com%2F3559bfe5740ed5aac38d3e0e554dbaae.png&r=x",
                    "starred_url": "https://api.github.com/users/mikermcneil/starred",
                    "type": "User",
                    "name": "Mike McNeil",
                    "location": "Austin, TX",
                    "email": "customers@balderdash.co",
                    "followers": 222,
                    "following": 161,
                    "created_at": "2011-02-14T20:51:12Z"
                },
                repos: [
                    {
                        "name": "activityoverlord",
                        "fork": true,
                        "stargazers_count": 0,
                        "language": "JavaScript",
                        "forks_count": 0
                    },
                    {
                        "name": "angularsailsdemo",
                        "fork": true,
                        "stargazers_count": 3,
                        "language": "JavaScript",
                        "forks_count": 2
                    },
                    {
                        "name": "asset-rack",
                        "fork": true,
                        "stargazers_count": 0,
                        "language": "CoffeeScript",
                        "forks_count": 0
                    },
                    {
                        "name": "backbone-ninjas-feb-27",
                        "fork": false,
                        "stargazers_count": 0,
                        "language": "JavaScript",
                        "forks_count": 0
                    },
                    {
                        "name": "backbone-to-sails",
                        "fork": false,
                        "stargazers_count": 16,
                        "language": "JavaScript",
                        "forks_count": 2
                    }
                ],
                repo: {
                    "name": "sails",
                    "description": "Realtime MVC Framework for Node.js",
                    "fork": false,
                    "stargazers_count": 4989,
                    "forks_count": 534,
                    "subscribers_count": 449
                }
            };

            return $controller ('MainController', {
                $scope: $scope ,
                user: user ,
                repos: repos
            });
        };
    }));

    describe ('when user and repos data are not loaded yet', function () {
        it ('should return empty user data', function () {
            var controller = createController ();

            expect($scope.user.hasData).toBe (false);
        });

        it ('should return empty repository list', function () {
            var controller = createController ();

            expect($scope.repos).toEqual (jasmine.any (Object));
            expect($scope.repos.length).toEqual (0);
        });
    });

    describe ('when user and repos are loaded', function () {
        it ('should set user hasData flag and format avatar url', function () {
            var controller = createController (fixtures.user, fixtures.repos);

            expect($scope.user.hasData).toBe (true);
            expect($scope.user.avatar_url.substr (-6, 6)).toEqual ('&s=440');
        });

        it ('should append the right icon class to each repository', function () {
            var controller = createController (fixtures.user, fixtures.repos);

            expect($scope.repos).toEqual (jasmine.any (Object));
            expect($scope.repos.length).toBeGreaterThan (0);
            expect($scope.repos).toHaveEachRightIconClass ();
        });
    });
});