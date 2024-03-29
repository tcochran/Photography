angular.module('project', []).
  config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {controller:ProjectsCtrl, templateUrl:'/projects_template'}).
      when('/projects/:projectName', {controller:ProjectCtrl, templateUrl:'/project_template'}).
      otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(true);
  });


function ProjectsCtrl($scope, $http) {
  $http({method: 'GET', url: '/projects.json'}).
    success(function(data, status, headers, config) { $scope.projects = data });  
}

function ProjectCtrl($scope, $http, $routeParams) {
  
  var imageHeight = 632;
  $scope.selectedPhoto = 0;
  $http({method: 'GET', url: '/projects/' + $routeParams.projectName + '.json' }).
    success(function(data, status, headers, config) { $scope.project = data; });
  
  $(document).keydown(function(kevent) { 
    if (kevent.keyCode == 39 || kevent.keyCode == 13 || kevent.keyCode == 32)
     $scope.nextPhoto(); 
    else if (kevent.keyCode == 37)
      $scope.previousPhoto();
  });

  $scope.nextPhoto = function() {  
    if ($scope.selectedPhoto < $scope.project.images.length - 1)
    { 
      $scope.selectedPhoto++;      
      $(".image-list").animate({top: -($scope.selectedPhoto * imageHeight) + 'px'}, 350);
    }
  };

  $scope.previousPhoto = function() { 
    if ($scope.selectedPhoto > 0)
    {
      $scope.selectedPhoto--;
      $(".image-list").animate({top: -($scope.selectedPhoto * imageHeight) + 'px'}, 350);
    }
  };  
}


