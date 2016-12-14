var request = require("request");

var base_url = "https://nameless-coast-72894.herokuapp.com/"

describe("Test Homepage GET/", function() {
  it("ritorna status code 200", function(done) {
    request.get(base_url, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe("Test /caricagiorni GET/", function() {
  it("returns status code 200", function(done) {
    request.get(
      base_url + "caricagiorni/", 
      function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
    });
  }); 
});