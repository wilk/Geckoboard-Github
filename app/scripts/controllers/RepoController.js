'use strict';

app.controller ('RepoController', ['$scope', '$filter', 'repo', 'user', function ($scope, $filter, repo, user) {
    if (angular.isUndefined (user.id)) user.hasData = false;
    else {
        user.hasData = true;

        if (angular.isUndefined ($scope.user)) user.avatar_url += '&s=440';
        else if ($scope.user.id !== user.id) user.avatar_url += '&s=440';
    }

    if (angular.isUndefined (repo.id)) repo.hasData = false;
    else {
        repo.hasData = true;

        var orderBy = $filter ('orderBy') ,
            rawLanguages = [] ,
            languages = [] ,
            limit = 4 ,
            total = 0;

        angular.forEach (repo.languages, function (perc, lang) {
            if (lang !== '$promise' && lang !== '$resolved') {
                if (repo.languages.hasOwnProperty (lang)) {
                    rawLanguages.push ({name: lang, percentage: perc});
                }
            }
        });

        if (rawLanguages.length > 0) {
            rawLanguages = orderBy (rawLanguages, 'perc', true);

            if (rawLanguages.length < limit) limit = rawLanguages.length;
            for (var i = 0; i < limit; i++) {
                languages.push (rawLanguages[i]);
                total += rawLanguages[i].percentage;
            }

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