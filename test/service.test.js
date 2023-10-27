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
  it("should get all pizza", function (done) {
    chai.request(app)
      .get('/v1/pizza')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.data).to.have.an('array');
        expect(res.body.data[0]).to.be.eql({ P_Id: 1, P_Category: "hawaii", P_Price: 20 })
        done();
      });
  });

  it("should get specific pizza with query", function (done) {
    chai.request(app)
      .get('/v1/pizza')
      .query({ id: 1, category: "hawaii", price: 20 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.data).to.have.an('array');
        expect(res.body.data[0]).to.be.eql({ P_Id: 1, P_Category: "hawaii", P_Price: 20 })
        done();
      });
  });

  it("should not get specific pizza with query", function (done) {
    chai.request(app)
      .get('/v1/pizza')
      .query({ id: 2, category: "Test", price: 50 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.an('object');
        expect(res.body.message).to.be.eql("No pizza found!")
        done();
      });
  });

  it("should get one pizza with parameter", function (done) {
    const pizzaId = 1;
    chai.request(app)
      .get(`/v1/pizza/${pizzaId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.data).to.be.eql({ P_Id: 1, P_Category: "hawaii", P_Price: 20 })
        done();
      });
  });

  it("should not get one pizza with parameter", function (done) {
    const pizzaId = -1;
    chai.request(app)
      .get(`/v1/pizza/${pizzaId}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.an('object');
        expect(res.body.message).to.be.eql("No pizza found!")
        done();
      });
  });
  it('should create new pizza', (done) => {
    const newPizza = {
      "P_Id": 4,
      "P_Category": "Cheese",
      "P_Price": 20,
    };
    chai.request(app)
      .post(`/v1/pizza`)
      .send(newPizza)
      .end((err, res) => {
        console.log(res.request._data.Price);
        console.log(newPizza.P_Price);
        expect(res.body.message).to.equal('Successfully Created A New Pizza');
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should not create with existing id', (done) => {
    const newPizza = {
      "P_Id": 1,
      "P_Category": "Vege",
      "P_Price": 25,
    };
    chai.request(app)
      .post(`/v1/pizza`)
      .send(newPizza)
      .end((err, res) => {
        //expect(res.body.message).to.equal('Something wrong!');
        expect(res).to.have.status(500);
        done();
      });
  });
  it("should update one pizza", function (done) {
    const pizzaId = 2;
    chai.request(app)
      .patch(`/v1/pizza/${pizzaId}`)
      .send({ category: 'bbq', price: 35 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.message).to.be.eql("Successfully updated the pizza details")
        done();
      });
  });

  it("should respond differently when update non-existing data", function (done) {
    const pizzaId = -1;
    chai.request(app)
      .patch(`/v1/pizza/${pizzaId}`)
      .send({ category: 'BBQ', price: 35 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.eql("Something wrong!")
        done();
      });
  });
  it('should delete pizza', (done) => {
    const pizzaId = 4;
    chai.request(app)
      .delete(`/v1/pizza/${pizzaId}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('Successfully Deleted A Pizza');
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should respond differently when delete non-existing data', (done) => {
    const pizzaId = -1;
    chai.request(app)
      .delete(`/v1/pizza/${pizzaId}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('Nothing Happened');
        expect(res).to.have.status(200);
        done();
      });
  });
})