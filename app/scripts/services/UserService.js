'use strict';

app.service ('UserService', ['$resource', 'GITHUB_API_URL', function ($resource, GITHUB_API_URL) {
    return $resource (GITHUB_API_URL + '/users/:user', {user: '@user'});
}]);