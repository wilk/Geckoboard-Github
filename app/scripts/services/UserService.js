'use strict';

app.service ('UserService', ['$resource', '$q', 'GITHUB_API_URL', function ($resource, $q, GITHUB_API_URL) {
    var userResource = $resource (GITHUB_API_URL + '/users/:user', {user: '@user'}, {
            starred: {
                method: 'GET' ,
                url: GITHUB_API_URL + '/users/:user/starred' ,
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
                .all ({
                    user: userRequest.$promise ,
                    starred: starredRequest.$promise
                })
                .then (function (data) {
                    userModel = data.user;
                    userModel.avatar_url += '&s=440';
                    userModel.starred = data.starred.length;

                    deferred.resolve (userModel);
                }, function (error) {
                    deferred.reject (error);
                });

            return deferred.promise;
        }
    };
}]);