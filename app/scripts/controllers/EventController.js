'use strict';

app.controller ('EventController', ['$scope', '$q', 'RepoService', function ($scope, $q, RepoService) {
    var me = this;

    me.showRepoDetails = function (user, repo, $event) {
        var repoRequest = RepoService.get ({user: user, repo: repo}) ,
            branchesRequest = RepoService.branches ({user: user, repo: repo}) ,
            releasesRequest = RepoService.releases ({user: user, repo: repo}) ,
            contributorsRequest = RepoService.contributors ({user: user, repo: repo}) ,
            issuesRequest = RepoService.issues ({user: user, repo: repo});

        $q
            .all ({
                repo: repoRequest.$promise ,
                branches: branchesRequest.$promise ,
                releases: releasesRequest.$promise ,
                contributors: contributorsRequest.$promise ,
                issues: issuesRequest.$promise
            })
            .then (function (data) {
                var repoData = data.repo;

                repoData.branches = data.branches.length;
                repoData.releases = data.releases.length;
                repoData.contributors = data.contributors.length;
                repoData.issues = data.issues.length;

                $scope.repo = repoData;

                $scope.$emit ('repo', $scope.repo);
            }, function (error) {
                // @todo: handle the error
            });

        $event.preventDefault ();
    };

    me.showRepos = function ($event) {
        // @todo: if empty $scope.repos, retrieve them with ReposService
        $scope.$emit ('repos', $scope.repos);

        $event.preventDefault ();
    };
}]);
