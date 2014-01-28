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
                    user: ['$route', 'UserService', function ($route, UserService) {
                        return UserService.get ({user: $route.current.params.user});
                    }] ,
                    repos: ['$route', 'ReposService', function ($route, ReposService) {
                        return ReposService.query ({user: $route.current.params.user});
                    }]
                }
            })
            .when ('/repos/:user/:repo', {
                templateUrl: 'views/repo.html' ,
                controller: 'RepoController' ,
                resolve: {
                    repo: ['$route', 'RepoService', function ($route, RepoService) {
                        return RepoService.get ({user: $route.current.params.user, repo: $route.current.params.repo});
                    }]
                }
            })
            .otherwise ({
                redirectTo: '/'
            });
    }]);
