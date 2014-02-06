'use strict';

/**
 * Repo Controller
 * It handles single repo model
 */
app.controller ('RepoController', ['$scope', '$filter', 'repo', 'user', function ($scope, $filter, repo, user) {
    // Check if user data has been loaded
    if (angular.isUndefined (user.id)) user.hasData = false;
    else {
        user.hasData = true;

        // Load a 220x220 avatar
        if (user.avatar_url && user.avatar_url.substr (-6, 6) !== '&s=440') user.avatar_url += '&s=440';
    }

    // Check if repo data has been loaded
    if (angular.isUndefined (repo.id)) repo.hasData = false;
    else {
        repo.hasData = true;

        // Sort repo languages by percentage
        var orderBy = $filter ('orderBy') ,
            rawLanguages = [] ,
            languages = [] ,
            limit = 4 ,
            total = 0;

        // Move languages from object to array
        angular.forEach (repo.languages, function (perc, lang) {
            if (lang !== '$promise' && lang !== '$resolved') {
                if (repo.languages.hasOwnProperty (lang)) {
                    rawLanguages.push ({name: lang, percentage: perc});
                }
            }
        });

        if (rawLanguages.length > 0) {
            // Sort by percentage
            rawLanguages = orderBy (rawLanguages, 'perc', true);

            // Calculate percentage
            if (rawLanguages.length < limit) limit = rawLanguages.length;
            for (var i = 0; i < limit; i++) {
                languages.push (rawLanguages[i]);
                total += rawLanguages[i].percentage;
            }

            // Replace numerical percentage
            angular.forEach (languages, function (lang) {
                lang.percentage = Math.round ((lang.percentage * 100) / total);
            });

            repo.languages = languages;
        }
        else repo.languages = [];
    }

    $scope.repo = repo;
    $scope.user = user;
}]);