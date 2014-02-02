'use strict';

app.service ('UserService', ['$resource', '$q', 'GITHUB_API_URL', function ($resource, $q, GITHUB_API_URL) {
    var userResource = $resource (GITHUB_API_URL + '/users/:user', {user: '@user'}, {
            starred: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/users/:user/starred?page=0&per_page=100' ,
                isArray: true
            }
        }) ,
        userModel = {};

    return {
        data: function () {
            return userModel;
        } ,
        populate: function (user) {
            var deferred = $q.defer () ,
                userRequest = userResource.get ({user: user}) ,
                starredRequest = userResource.starred ({user: user});

            $q
                .when (userRequest.$promise)
                .then (function (data) {
                    userModel = data;
                    userModel.avatar_url += '&s=440';
                    return starredRequest.$promise;
                }, function (error) {
                    userModel = {};
                    return starredRequest.$promise;
                })
                .then (function (data) {
                    userModel.starred = data.length;

                    deferred.resolve (userModel);
                }, function (error) {
                    userModel.starred = 0;

                    deferred.resolve (userModel);
                });

            return deferred.promise;
        }
    };
}]);