describe('PhoneCat App', function() {


  beforeEach(function() {
      browser().navigateTo('/index');
    });

  it('should redirect index.html to index.html#/phones', function() {
    expect(repeater('li').count()).toEqual(4);
  });

});