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
                            user = UserService.data ();

                        if ($.isEmptyObject (user) || user.login !== $route.current.params.user) {
                            UserService
                                .populate ($route.current.params.user)
                                .then (function (data) {
                                    deferred.resolve (data);
                                }, function (error) {
                                    deferred.reject (error);
                                });
                        }
                        else deferred.resolve (user);

                        return deferred.promise;
                    }] ,
                    repos: ['$route', '$q', 'ReposService', function ($route, $q, ReposService) {
                        var deferred = $q.defer () ,
                            repos = ReposService.data ();

                        if ($.isEmptyObject (repos)) {
                            ReposService
                                .populate ($route.current.params.user)
                                .then (function (data) {
                                    deferred.resolve (data);
                                }, function (error) {
                                    deferred.reject (error);
                                });
                        }
                        else deferred.resolve (repos);

                        return deferred.promise;
                    }]
                }
            })
            .when ('/repos/:user/:repo', {
                templateUrl: 'views/main.html' ,
                controller: 'RepoController' ,
                resolve: {
                    repo: ['$route', '$q', 'RepoService', function ($route, $q, RepoService) {
                        return RepoService.populate ($route.current.params.user, $route.current.params.repo);
                    }] ,
                    user: ['$route', '$q', 'UserService', function ($route, $q, UserService) {
                        var deferred = $q.defer () ,
                            user = UserService.data ();

                        if ($.isEmptyObject (user) || user.login !== $route.current.params.user) {
                            UserService
                                .populate ($route.current.params.user)
                                .then (function (data) {
                                    deferred.resolve (data);
                                }, function (error) {
                                    deferred.reject (error);
                                });
                        }
                        else deferred.resolve (user);

                        return deferred.promise;
                    }]
                }
            })
            .otherwise ({
                redirectTo: '/'
            });
    }]);
