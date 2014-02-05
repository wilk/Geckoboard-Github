'use strict';

/**
 * Geckoboard Github Application
 * Built with love
 */
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
                    // User data
                    user: ['$route', '$q', 'UserService', function ($route, $q, UserService) {
                        var deferred = $q.defer () ,
                            user = UserService.data ();

                        // Reload user data only if the user has changed or it hasn't loaded yet
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
                    // Repos list
                    repos: ['$route', '$q', 'UserService', 'ReposService', function ($route, $q, UserService, ReposService) {
                        var deferred = $q.defer () ,
                            user = UserService.data () ,
                            repos = ReposService.data ();

                        // Reload repos data only if the user has changed or repos list hasn't loaded yet
                        if ($.isEmptyObject (repos) || user.login !== $route.current.params.user) {
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
                    // Repo data
                    repo: ['$route', '$q', 'RepoService', function ($route, $q, RepoService) {
                        return RepoService.populate ($route.current.params.user, $route.current.params.repo);
                    }] ,
                    // User data
                    user: ['$route', '$q', 'UserService', function ($route, $q, UserService) {
                        var deferred = $q.defer () ,
                            user = UserService.data ();

                        // Reload user data only if the user has changed or it hasn't loaded
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