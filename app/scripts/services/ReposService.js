'use strict';

/**
 * Repos Service
 * It loads every repository associated to the user
 */
app.service ('ReposService', ['$resource', '$q', 'GITHUB_API_URL', function ($resource, $q, GITHUB_API_URL) {
    var reposResource = $resource (GITHUB_API_URL + '/users/:user/repos?page=0&per_page=100', {user: '@user'}) ,
        reposModel = [];

    return {
        /**
         * Get repos model
         * @returns {Object} Repos model
         */
        data: function () {
            return reposModel;
        } ,
        /**
         * Populate repos model
         * @param {String} user The user that owns the repos
         * @returns {promise} A promise that it will be resolved with repos model
         */
        populate: function (user) {
            var deferred = $q.defer ();

            $q
                .when (reposResource.query({user: user}).$promise)
                .then (function (data) {
                    reposModel = data;

                    deferred.resolve (reposModel);
                }, function (error) {
                    reposModel = [];
                    deferred.resolve (reposModel);
                });

            return deferred.promise;
        }
    };
}]);