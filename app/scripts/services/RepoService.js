'use strict';

app.service ('RepoService', ['$resource', '$q', '$filter', 'GITHUB_API_URL', function ($resource, $q, $filter, GITHUB_API_URL) {
    var repoResource = $resource (GITHUB_API_URL + '/repos/:user/:repo', {user: '@user', repo: '@repo'}, {
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
            } ,
            languages: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/repos/:user/:repo/languages'
            }
        });

    return {
        populate: function (user, repo) {
            var deferred = $q.defer () ,
                repoRequest = repoResource.get ({user: user, repo: repo}) ,
                branchesRequest = repoResource.branches ({user: user, repo: repo}) ,
                releasesRequest = repoResource.releases ({user: user, repo: repo}) ,
                contributorsRequest = repoResource.contributors ({user: user, repo: repo}) ,
                issuesRequest = repoResource.issues ({user: user, repo: repo}) ,
                languagesRequest = repoResource.languages ({user: user, repo: repo});

            $q
                .all ({
                    repo: repoRequest.$promise ,
                    branches: branchesRequest.$promise ,
                    releases: releasesRequest.$promise ,
                    contributors: contributorsRequest.$promise ,
                    issues: issuesRequest.$promise ,
                    languages: languagesRequest.$promise
                })
                .then (function (data) {
                    var repoData = data.repo ,
                        orderBy = $filter ('orderBy') ,
                        rawLanguages = [] ,
                        languages = [] ,
                        limit = 4 ,
                        total = 0;

                    repoData.branches = data.branches.length;
                    repoData.releases = data.releases.length;
                    repoData.contributors = data.contributors.length;
                    repoData.issues = data.issues.length;

                    angular.forEach (data.languages, function (perc, lang) {
                        if (lang !== '$promise' && lang !== '$resolved') {
                            if (data.languages.hasOwnProperty (lang)) {
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

                    deferred.resolve (repoData);
                }, function (error) {
                    deferred.reject (error);
                });

            return deferred.promise;
        }
    };
}]);