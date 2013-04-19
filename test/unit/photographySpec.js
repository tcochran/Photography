describe('PhoneCat controllers', function() {
 
  describe('ProjectsCtrl', function(){

    var scope, ctrl, $httpBackend;
 
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/projects.json').
          respond([{name: 'Project 1'}, {name: 'Project 2'}]);
 
      scope = $rootScope.$new();
      ctrl = $controller(ProjectsCtrl, {$scope: scope});
    }));
 
    it('Get list of phones', function() {
      expect(scope.projects).toBeUndefined();
      $httpBackend.flush();
     
      expect(scope.projects).toEqual([ {name: 'Project 1'}, {name: 'Project 2'}]);
    });
  });
});