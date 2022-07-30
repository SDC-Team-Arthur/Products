const request = require('supertest')('http://localhost:3000')

const express = require('express');

const expect = require('chai').expect;

describe ('GET styles for a product_id', function() {
  it('should return a 200 status when submitting a GET request', async function() {
    const response = await request.get('/products/1/styles');
    expect(response.status).to.equal(200);
  });

  it('should have the correct parameters in the response body', async function(done) {
    const response = await request.get('/products/1/styles')
    .then(() => {
      expect(response.body).to.have.property('product_id');
      expect(response.body).to.have.property('results');
      expect(response.body.results[0]).to.have.property('skus')
      done();
    })
    .catch((err) => {
      done(err);
    }).timeout(12000);


  })

  it('should return the amount of results specified in the count parameter if one is provided', async function() {
    const response = await request.get('/products/1/styles').query({count: 10})
    expect(response.body.length).to.equal(10);
  });

})