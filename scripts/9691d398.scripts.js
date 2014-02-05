"use strict";var app=angular.module("geckoboardGithubApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).constant("GITHUB_API_URL","https://api.github.com").constant("GITHUB_USER","mikermcneil").config(["$routeProvider","GITHUB_USER",function(a,b){a.when("/",{redirectTo:"/users/"+b}).when("/users/:user",{templateUrl:"views/main.html",controller:"MainController",resolve:{user:["$route","$q","UserService",function(a,b,c){var d=b.defer(),e=c.data();return $.isEmptyObject(e)||e.login!==a.current.params.user?c.populate(a.current.params.user).then(function(a){d.resolve(a)},function(a){d.reject(a)}):d.resolve(e),d.promise}],repos:["$route","$q","UserService","ReposService",function(a,b,c,d){var e=b.defer(),f=c.data(),g=d.data();return $.isEmptyObject(g)||f.login!==a.current.params.user?d.populate(a.current.params.user).then(function(a){e.resolve(a)},function(a){e.reject(a)}):e.resolve(g),e.promise}]}}).when("/repos/:user/:repo",{templateUrl:"views/main.html",controller:"RepoController",resolve:{repo:["$route","$q","RepoService",function(a,b,c){return c.populate(a.current.params.user,a.current.params.repo)}],user:["$route","$q","UserService",function(a,b,c){var d=b.defer(),e=c.data();return $.isEmptyObject(e)||e.login!==a.current.params.user?c.populate(a.current.params.user).then(function(a){d.resolve(a)},function(a){d.reject(a)}):d.resolve(e),d.promise}]}}).otherwise({redirectTo:"/"})}]);app.controller("MainController",["$scope","user","repos",function(a,b,c){angular.forEach(c,function(a,b){c[b].iconCls=a.fork?"octicon-repo-forked":"octicon-repo"}),angular.isUndefined(b.id)?b.hasData=!1:(b.hasData=!0,"&s=440"!==b.avatar_url.substr(-6,6)&&(b.avatar_url+="&s=440")),a.user=b,a.repos=c}]),app.controller("RepoController",["$scope","$filter","repo","user",function(a,b,c,d){if(angular.isUndefined(d.id)?d.hasData=!1:(d.hasData=!0,"&s=440"!==d.avatar_url.substr(-6,6)&&(d.avatar_url+="&s=440")),angular.isUndefined(c.id))c.hasData=!1;else{c.hasData=!0;var e=b("orderBy"),f=[],g=[],h=4,i=0;if(angular.forEach(c.languages,function(a,b){"$promise"!==b&&"$resolved"!==b&&c.languages.hasOwnProperty(b)&&f.push({name:b,percentage:a})}),f.length>0){f=e(f,"perc",!0),f.length<h&&(h=f.length);for(var j=0;h>j;j++)g.push(f[j]),i+=f[j].percentage;angular.forEach(g,function(a){a.percentage=Math.round(100*a.percentage/i)}),c.languages=g}else c.languages=[]}a.repo=c,a.user=d}]),app.service("UserService",["$resource","$q","GITHUB_API_URL",function(a,b,c){var d=a(c+"/users/:user",{user:"@user"},{starred:{method:"GET",url:c+"/users/:user/starred?page=0&per_page=100",isArray:!0}}),e={};return{data:function(){return e},populate:function(a){var c=b.defer(),f=d.get({user:a}),g=d.starred({user:a});return b.when(f.$promise).then(function(a){return e=a,g.$promise},function(){return e={},g.$promise}).then(function(a){e.starred=a.length,c.resolve(e)},function(){e.starred=0,c.resolve(e)}),c.promise}}}]),app.service("ReposService",["$resource","$q","GITHUB_API_URL",function(a,b,c){var d=a(c+"/users/:user/repos?page=0&per_page=100",{user:"@user"}),e=[];return{data:function(){return e},populate:function(a){var c=b.defer();return b.when(d.query({user:a}).$promise).then(function(a){e=a,c.resolve(e)},function(){e=[],c.resolve(e)}),c.promise}}}]),app.service("RepoService",["$resource","$q","GITHUB_API_URL",function(a,b,c){var d=a(c+"/repos/:user/:repo",{user:"@user",repo:"@repo"},{branches:{method:"GET",url:c+"/repos/:user/:repo/branches?page=0&per_page=100",isArray:!0},releases:{method:"GET",url:c+"/repos/:user/:repo/releases?page=0&per_page=100",isArray:!0},contributors:{method:"GET",url:c+"/repos/:user/:repo/contributors?page=0&per_page=100",isArray:!0},tags:{method:"GET",url:c+"/repos/:user/:repo/tags?page=0&per_page=100",isArray:!0},languages:{method:"GET",url:c+"/repos/:user/:repo/languages?page=0&per_page=100"}}),e={};return{data:function(){return e},populate:function(a,c){var f=b.defer(),g=d.get({user:a,repo:c}),h=d.branches({user:a,repo:c}),i=d.releases({user:a,repo:c}),j=d.contributors({user:a,repo:c}),k=d.tags({user:a,repo:c}),l=d.languages({user:a,repo:c});return b.when(g.$promise).then(function(a){return e=a,h.$promise},function(){return e={},h.$promise}).then(function(a){return e.branches=a.length,i.$promise},function(){return e.branches=0,i.$promise}).then(function(a){return e.releases=a.length,j.$promise},function(){return e.releases=0,j.$promise}).then(function(a){return e.contributors=a.length,k.$promise},function(){return e.contributors=0,k.$promise}).then(function(a){return e.tags=a.length,l.$promise},function(){return e.tags=0,l.$promise}).then(function(a){e.languages=a,f.resolve(e)},function(){e.languages={},f.resolve(e)}),f.promise}}}]),app.directive("ghUser",function(){return{restrict:"E",templateUrl:"views/partials/User.html"}}),app.directive("ghRepos",function(){return{restrict:"E",templateUrl:"views/partials/Repos.html"}}),app.directive("ghRepo",function(){return{restrict:"E",templateUrl:"views/partials/Repo.html",link:function(a,b){angular.isUndefined(a.repo)?b.hide():b.show()}}}),app.directive("ghRepoLink",function(){return{restrict:"A",link:function(a,b){b.bind("click",$.proxy(function(){this.repository.iconCls="spinner"},a))}}});