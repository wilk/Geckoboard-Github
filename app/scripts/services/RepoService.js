'use strict';

app.service ('RepoService', ['$resource', '$q', '$filter', 'GITHUB_API_URL', function ($resource, $q, $filter, GITHUB_API_URL) {
    var repoResource = $resource (GITHUB_API_URL + '/repos/:user/:repo', {user: '@user', repo: '@repo'}, {
            branches: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/branches?page=0&per_page=100' ,
                isArray: true
            } ,
            releases: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/releases?page=0&per_page=100' ,
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
        });

    return {
        populate: function (user, repo) {
            var deferred = $q.defer () ,
                repoRequest = repoResource.get ({user: user, repo: repo}) ,
                branchesRequest = repoResource.branches ({user: user, repo: repo}) ,
                releasesRequest = repoResource.releases ({user: user, repo: repo}) ,
                contributorsRequest = repoResource.contributors ({user: user, repo: repo}) ,
                tagsRequest = repoResource.tags ({user: user, repo: repo}) ,
                languagesRequest = repoResource.languages ({user: user, repo: repo}) ,
                repoData = {};

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
                    return releasesRequest.$promise;
                }, function (error) {
                    repoData.branches = 0;
                    return releasesRequest.$promise;
                })
                .then (function (data) {
                    repoData.releases = data.length;
                    return contributorsRequest.$promise;
                }, function (error) {
                    repoData.releases = 0;
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
                    var orderBy = $filter ('orderBy') ,
                        rawLanguages = [] ,
                        languages = [] ,
                        limit = 4 ,
                        total = 0;

                    angular.forEach (data, function (perc, lang) {
                        if (lang !== '$promise' && lang !== '$resolved') {
                            if (data.hasOwnProperty (lang)) {
                                rawLanguages.push ({name: lang, percentage: perc});
                            }
                        }
                    });

                    if (rawLanguages.length > 0) {
                        rawLanguages = orderBy (rawLanguages, 'perc', true);

                        if (rawLanguages.length < limit) limit = rawLanguages.length;
                        angular.forEach (rawLanguages, function (language) {
                            languages.push (language);
                            total += language.percentage;
                            limit--;

                            if (limit === 0) return false;
                        });

                        angular.forEach (languages, function (lang) {
                            lang.percentage = Math.round ((lang.percentage * 100) / total);
                        });

                        repoData.languages = languages;
                    }
                    else repoData.languages = [];

                    deferred.resolve (repoData);
                }, function (error) {
                    repoData.languages = [];

                    deferred.resolve (repoData);
                });

            return deferred.promise;
        }
    };
}]);