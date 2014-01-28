'use strict';

app.service ('RepoService', ['$resource', 'GITHUB_API_URL', function ($resource, GITHUB_API_URL) {
    return $resource (GITHUB_API_URL + '/repos/:user/:repo', {user: '@user', repo: '@repo'});
}]);