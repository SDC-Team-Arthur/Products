const request = require('supertest')('http://localhost:3000')

const express = require('express');

const expect = require('chai').expect;

describe ('GET product_id', function() {
  it('should return a 200 status when submitting a GET request', async function() {
    const response = await request.get('/products');
    expect(response.status).to.equal(200);
  });

  it('should return 5 results by default when count is not provided as a parameter', async function() {
    const response = await request.get('/products');
    expect(response.body.length).to.equal(5);
  })

  it('should return the amount of results specified in the count parameter if one is provided', async function() {
    const response = await request.get('/products').query({count: 10})
    expect(response.body.length).to.equal(10);
  });

  // it('should return 1 page of results by default when page is not provided as a parameter', async function() {
  //   const response = await request.get('/products');
  //   expect(response)
  // })
})