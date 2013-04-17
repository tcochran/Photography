angular.module('project', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ProjectsCtrl, templateUrl:'projects_template'}).
      when('/projects/:projectName', {controller:ProjectCtrl, templateUrl:'project_template'}).
      otherwise({redirectTo:'/'});
  });


function ProjectsCtrl($scope, $http) {
  console.log("projects")
  $http({method: 'GET', url: '/projects.json'}).
    success(function(data, status, headers, config) { $scope.projects = data });
}

function ProjectCtrl($scope, $http, $routeParams) {
  console.log("project")
  console.log($routeParams)
  $http({method: 'GET', url: '/projects.json'}).
    success(function(data, status, headers, config) { $scope.project = data[0] });
}