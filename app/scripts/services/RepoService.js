'use strict';

/**
 * Repo Service
 * It loads everything associated to a repo
 */
app.service ('RepoService', ['$resource', '$q', 'GITHUB_API_URL', function ($resource, $q, GITHUB_API_URL) {
    var repoResource = $resource (GITHUB_API_URL + '/repos/:user/:repo', {user: '@user', repo: '@repo'}, {
            branches: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/branches?page=0&per_page=100' ,
                isArray: true
            } ,
            commits: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/commits?page=0&per_page=100' ,
                isArray: true
            } ,
            contributors: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/contributors?page=0&per_page=100' ,
                isArray: true
            } ,
            tags: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/tags?page=0&per_page=100' ,
                isArray: true
            } ,
            languages: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/languages?page=0&per_page=100'
            }
        }) ,
        repoData = {}

    return {
        /**
         * Get repo model
         * @returns {Object} Repo model
         */
        data: function () {
            return repoData;
        } ,
        /**
         * Populate repo model
         * @param {String} user The user that owns the repo
         * @param {String} repo The name of the repository
         * @returns {promise} A promise that it will be resolved with repo model
         */
        populate: function (user, repo) {
            var deferred = $q.defer () ,
                repoRequest = repoResource.get ({user: user, repo: repo}) ,
                branchesRequest = repoResource.branches ({user: user, repo: repo}) ,
                commitsRequest = repoResource.commits ({user: user, repo: repo}) ,
                contributorsRequest = repoResource.contributors ({user: user, repo: repo}) ,
                tagsRequest = repoResource.tags ({user: user, repo: repo}) ,
                languagesRequest = repoResource.languages ({user: user, repo: repo});

            // Requests chain
            $q
                .when (repoRequest.$promise)
                .then (function (data) {
                    repoData = data;
                    return branchesRequest.$promise;
                }, function (error) {
                    repoData = {};
                    return branchesRequest.$promise;
                })
                .then (function (data) {
                    repoData.branches = data.length;
                    return commitsRequest.$promise;
                }, function (error) {
                    repoData.branches = 0;
                    return commitsRequest.$promise;
                })
                .then (function (data) {
                    repoData.commits = data.length;
                    return contributorsRequest.$promise;
                }, function (error) {
                    repoData.commits = 0;
                    return contributorsRequest.$promise;
                })
                .then (function (data) {
                    repoData.contributors = data.length;
                    return tagsRequest.$promise;
                }, function (error) {
                    repoData.contributors = 0;
                    return tagsRequest.$promise;
                })
                .then (function (data) {
                    repoData.tags = data.length;
                    return languagesRequest.$promise;
                }, function (error) {
                    repoData.tags = 0;
                    return languagesRequest.$promise;
                })
                .then (function (data) {
                    repoData.languages = data;

                    deferred.resolve (repoData);
                }, function (error) {
                    repoData.languages = {};

                    deferred.resolve (repoData);
                });

            return deferred.promise;
        }
    };
}]);