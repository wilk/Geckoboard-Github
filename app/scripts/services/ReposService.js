'use strict';

app.service ('ReposService', ['$resource', '$q', 'GITHUB_API_URL', function ($resource, $q, GITHUB_API_URL) {
    var reposResource = $resource (GITHUB_API_URL + '/users/:user/repos?page=0&per_page=100', {user: '@user'}) ,
        reposModel = {};

    return {
        data: function () {
            return reposModel;
        } ,
        populate: function (user) {
            var deferred = $q.defer ();

            $q
                .when (reposResource.query({user: user}).$promise)
                .then (function (data) {
                    reposModel = data;

                    deferred.resolve (reposModel);
                }, function (error) {
                    reposModel = {};
                    deferred.resolve (reposModel);
                });

            return deferred.promise;
        }
    };
}]);