
// const app = require('../routes/index');
// const request = require('supertest');


// describe('/API Pizza', () => {
//   it(' Get all pizza', (done) => {
//     const response = request(app)
//       .get('/pizza')
//     expect(response.statusCode).toBe(200)
//     expect(response.body.data.length >= 1).toBe(true);
//     done();
//   });

//   it('Get one pizza', (done) => {
//     request(app)
//       .get('/pizza/1')
//       .expect(200)
//     done();
//   });

//   // it('Post one pizza', (done) => {
//   //   request(app)
//   //     .post('/pizza')
//   //     .send({ category: "bbq", price: 30 })
//   //     .expect(200)
//   //   done();
//   // });

//   it('Get one pizza', (done) => {
//     request(app)
//       .get('/pizza/1')
//       .expect(200)
//     done();
//   });
// });