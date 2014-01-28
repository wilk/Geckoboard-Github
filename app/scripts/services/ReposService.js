'use strict';

app.service ('ReposService', ['$resource', 'GITHUB_API_URL', function ($resource, GITHUB_API_URL) {
    return $resource (GITHUB_API_URL + '/users/:user/repos', {user: '@user'});
}]);