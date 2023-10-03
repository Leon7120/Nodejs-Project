
const app = require('./routes/index');
const request = require('supertest');


describe('/GET user', () => {
  it('it should Get all users', (done) => {
    request(app)
      .get('/pizza')
      .expect(200)
      done();
  });

  it('it should Get one users', (done) => {
    request(app)
      .get('/pizza/1')
      .expect(200)
      done();
  });
});