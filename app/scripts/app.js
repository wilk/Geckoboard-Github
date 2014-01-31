'use strict';

var app = angular
    .module ('geckoboardGithubApp', [
        'ngCookies' ,
        'ngResource' ,
        'ngSanitize' ,
        'ngRoute'
    ])
    .constant ('GITHUB_API_URL', 'https://api.github.com')
    .constant ('GITHUB_USER', 'mikermcneil')
    .config (['$routeProvider', 'GITHUB_USER', function ($routeProvider, GITHUB_USER) {
        $routeProvider
            .when ('/', {
                redirectTo: '/users/' + GITHUB_USER
            })
            .when ('/users/:user', {
                templateUrl: 'views/main.html' ,
                controller: 'MainController' ,
                resolve: {
                    user: ['$route', '$q', 'UserService', function ($route, $q, UserService) {
                        var deferred = $q.defer () ,
                            userParam = $route.current.params.user ,
                            userRequest = UserService.get ({user: userParam}) ,
                            starredRequest = UserService.starred ({user: userParam});

                        $q
                            .all ({
                                user: userRequest.$promise ,
                                starred: starredRequest.$promise
                            })
                            .then (function (data) {
                                var user = data.user;
                                user.starred = data.starred.length;

                                deferred.resolve (user);
                            }, function (error) {
                                deferred.reject (error);
                            });

                        return deferred.promise;
                    }] ,
                    repos: ['$route', 'ReposService', function ($route, ReposService) {
                        return ReposService.query ({user: $route.current.params.user});
                    }]
                }
            })
            .when ('/repos/:user/:repo', {
                templateUrl: 'views/main.html' ,
                controller: 'RepoController' ,
                resolve: {
                    repo: ['$route', '$q', 'RepoService', function ($route, $q, RepoService) {
                        var deferred = $q.defer () ,
                            userParam = $route.current.params.user ,
                            repoParam = $route.current.params.repo ,
                            repoRequest = RepoService.get ({user: userParam, repo: repoParam}) ,
                            branchesRequest = RepoService.branches ({user: userParam, repo: repoParam}) ,
                            releasesRequest = RepoService.releases ({user: userParam, repo: repoParam}) ,
                            contributorsRequest = RepoService.contributors ({user: userParam, repo: repoParam}) ,
                            issuesRequest = RepoService.issues ({user: userParam, repo: repoParam});

                        $q
                            .all ({
                                repo: repoRequest.$promise ,
                                branches: branchesRequest.$promise ,
                                releases: releasesRequest.$promise ,
                                contributors: contributorsRequest.$promise ,
                                issues: issuesRequest.$promise
                            })
                            .then (function (data) {
                                var repo = data.repo;

                                repo.branches = data.branches.length;
                                repo.releases = data.releases.length;
                                repo.contributors = data.contributors.length;
                                repo.issues = data.issues.length;

                                deferred.resolve (repo);
                            }, function (error) {
                                deferred.reject (error);
                            });

                        return deferred.promise;
                    }] ,
                    user: ['$route', '$q', 'UserService', function ($route, $q, UserService) {
                        var deferred = $q.defer () ,
                            userParam = $route.current.params.user ,
                            userRequest = UserService.get ({user: userParam}) ,
                            starredRequest = UserService.starred ({user: userParam});

                        $q
                            .all ({
                                user: userRequest.$promise ,
                                starred: starredRequest.$promise
                            })
                            .then (function (data) {
                                var user = data.user;
                                user.starred = data.starred.length;

                                deferred.resolve (user);
                            }, function (error) {
                                deferred.reject (error);
                            });

                        return deferred.promise;
                    }]
                }
            })
            .otherwise ({
                redirectTo: '/'
            });
    }]);
