'use strict';

app.service ('ReposService', ['$resource', '$q', 'GITHUB_API_URL', function ($resource, $q, GITHUB_API_URL) {
    var reposResource = $resource (GITHUB_API_URL + '/users/:user/repos', {user: '@user'}) ,
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
                    angular.forEach (data, function (value, key) {
                        data[key].iconCls = value.fork ? 'octicon-repo-forked' : 'octicon-repo';
                    });

                    reposModel = data;

                    deferred.resolve (data);
                }, function (error) {
                    deferred.reject (error);
                });

            return deferred.promise;
        }
    };
}]);