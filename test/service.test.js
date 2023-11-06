const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const sinon = require('sinon');
const pizzaServices = require("../controller/pizza.services")
chai.use(chaiHttp);

let pizzaData;
describe("Test API", () => {
  beforeEach(function (done) {
    // This runs before each test
    chai.request(app)
      .get('/v1/pizza')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.data).to.have.an('array');
        pizzaData = res.body.data[0];
        done();
      });
  });
  afterEach(function () {
    // Restore the default sandbox here
    sinon.restore();
  });
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
        done();
      });
  });

  it("should get specific pizza with query", function (done) {
    chai.request(app)
      .get('/v1/pizza')
      .query(pizzaData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object');
        expect(res.body.data).to.have.an('array');
        expect(res.body.data[0]).to.be.eql(pizzaData);
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
        expect(res.body.data).to.be.eql(pizzaData)
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
      "id": 100,
      "category": "testing",
      "price": 50,
    };
    sinon.stub(pizzaServices, 'createPizza').returns({
      message: 'Successfully Created A New Pizza',
      status: 201,
      data: newPizza
    });
    chai.request(app)
      .post(`/v1/pizza`)
      .send(newPizza)
      .end((err, res) => {
        expect(res.body.message).to.equal('Successfully Created A New Pizza');
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should not create with existing id', (done) => {
    const newPizza = {
      "id": 1,
      "category": "Vege",
      "price": 25,
    };
    chai.request(app)
      .post(`/v1/pizza`)
      .send(newPizza)
      .end((err, res) => {
        //expect(res.body.message).to.equal('Something wrong!');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should not create with missing field', (done) => {
    const newPizza = {
      "id": 1,
      "category": "",
      "price": 25,
    };
    chai.request(app)
      .post(`/v1/pizza`)
      .send(newPizza)
      .end((err, res) => {
        //expect(res.body.message).to.equal('Something wrong!');
        expect(res).to.have.status(400);
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
    const pizzaId = 1;
    sinon.stub(pizzaServices, 'deletePizza').returns({
      message: 'Successfully Deleted A Pizza',
      status: 200,
      data: pizzaId
    });
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
  it('should handle errors when deleting a pizza with an invalid ID', (done) => {
    const invalidPizzaId = 'invalid-id';
    chai.request(app)
      .delete(`/v1/pizza/${invalidPizzaId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.an('object');
        expect(res.body.message).to.be.eql("Server Problem");
        done();
      });
  });
  it('should handle errors when getting a pizza with an invalid ID', (done) => {
    const invalidPizzaId = 'invalid-id';
    chai.request(app)
      .get(`/v1/pizza/${invalidPizzaId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.an('object');
        expect(res.body.message).to.be.eql("Server Problem");
        done();
      });
  });
})