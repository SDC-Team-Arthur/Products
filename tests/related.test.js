const request = require('supertest')('http://localhost:3000')

const express = require('express');

const expect = require('chai').expect;

describe ('GET related_products for a product_id', function() {
  it('should return a 200 status when submitting a GET request', async function() {
    const response = await request.get('/products/1/related');
    expect(response.status).to.equal(200);
  });

  it('should return an array in the response body', async function() {
    const response = await request.get('/products/1/related');
    expect(Array.isArray(response.body)).to.equal(true)


  })

  it('should return related product_ids as numbers', async function() {
    const response = await request.get('/products/1/related')
    expect(typeof response.body[0]).to.equal('number');
  });

  it('should return the correct related product_ids', async function() {
    const response = await request.get('/products/1/related');
    expect(response.body[0]).to.equal(2);
    expect(response.body[1]).to.equal(3);
    expect(response.body[2]).to.equal(8);
    expect(response.body[3]).to.equal(7);
    expect(response.body.length).to.equal(4);
  })

  // it('should return 1 page of results by default when page is not provided as a parameter', async function() {
  //   const response = await request.get('/products');
  //   expect(response)
  // })
})