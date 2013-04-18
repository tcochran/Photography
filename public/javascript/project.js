angular.module('project', []).
  config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {controller:ProjectsCtrl, templateUrl:'/projects_template'}).
      when('/projects/:projectName', {controller:ProjectCtrl, templateUrl:'/project_template'}).
      otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(true);
  });


function ProjectsCtrl($scope, $http) {
  console.log("projects")
  $http({method: 'GET', url: '/projects.json'}).
    success(function(data, status, headers, config) { $scope.projects = data });

  $scope.query = "jeri";

  
}

function ProjectCtrl($scope, $http, $routeParams) {
  
  var imageHeight = 782;

  $scope.selectedPhoto = 0;

  $http({method: 'GET', url: '/projects.json'}).
    success(function(data, status, headers, config) { $scope.project = data[0]; });

  $scope.nextPhoto = function() {  
    if ($scope.selectedPhoto < $scope.project.images.length - 1)
    { 
      $scope.selectedPhoto++;      
      $(".image-list").animate({top: -($scope.selectedPhoto * imageHeight) + 'px'}, 500);
    }
  };

  $scope.previousPhoto = function() { 
    if ($scope.selectedPhoto > 0)
    {
      $scope.selectedPhoto--;
      $(".image-list").animate({top: -($scope.selectedPhoto * imageHeight) + 'px'}, 500);
    }
  };  
}