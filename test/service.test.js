const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
chai.use(chaiHttp);

describe("Test API", () => {

  it("Check", function (done) {
    expect(true).to.be.true;
    expect(false).to.be.equal(false);
    done();
  })
  it("should get all users", function (done) {
    chai.request(app)
      .get('/v1/pizza')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.data).to.have.an('array');
        expect(res.body.data[0]).to.be.eql({ PizzaId: 1, Category: "hawaii", Price: 20 })
        done();
      });
  });
  it('should handle error', (done) => {
    chai.request(app)
      .get('/v1/pizza')
      .query(Error("Error"))
      .end((err, res) => {
        
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        
        done()
      });
  });
  it("should get one users", function (done) {
    const pizzaId = 1;
    chai.request(app)
      .get(`/v1/pizza/${pizzaId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.data).to.have.an('array');
        expect(res.body.data[0]).to.be.eql({ PizzaId: 1, Category: "hawaii", Price: 20 })
        done();
      });
  });

})