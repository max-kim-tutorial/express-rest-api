const app = require("../server2");
const request = require("supertest");

describe("GET /users는", () => {
  it("...", (done) => {
    request(app)
      .get("/users")
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });
});
