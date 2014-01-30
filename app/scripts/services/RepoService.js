'use strict';

app.service ('RepoService', ['$resource', 'GITHUB_API_URL', function ($resource, GITHUB_API_URL) {
    return $resource (GITHUB_API_URL + '/repos/:user/:repo', {user: '@user', repo: '@repo'}, {
        branches: {
            method: 'GET' ,
            url: GITHUB_API_URL + '/repos/:user/:repo/branches' ,
            isArray: true
        } ,
        releases: {
            method: 'GET' ,
            url: GITHUB_API_URL + '/repos/:user/:repo/releases' ,
            isArray: true
        } ,
        contributors: {
            method: 'GET' ,
            url: GITHUB_API_URL + '/repos/:user/:repo/contributors' ,
            isArray: true
        } ,
        issues: {
            method: 'GET' ,
            url: GITHUB_API_URL + '/repos/:user/:repo/issues' ,
            isArray: true
        }
    });
}]);