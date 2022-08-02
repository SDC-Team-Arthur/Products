const request = require('supertest')('http://localhost:3000')

const expect = require('chai').expect;

describe ('GET product_id', function() {
  it ('returns a 200 status when submitting a GET request', async function () {
    const response = await request.get('/products/1');
    expect(response.status).to.equal(200);
})

  it ('returns all correct product level information for a specified product id (11)', async function () {
    const response = await request.get('/products/11');
    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(11);
    expect(response.body.name).to.equal('Air Minis 250');
    expect(response.body.slogan).to.equal('Full court support');
    expect(response.body.description).to.equal('This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.');
    expect(response.body.category).to.equal('Basketball Shoes');
    expect(response.body.default_price).to.equal('49');
    expect(Object.keys(response.body).length).to.equal(7);
  })
  done();
})