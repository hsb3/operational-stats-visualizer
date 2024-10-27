const request = require('supertest');
const express = require('express');
const app = require('../process-inspector-react/src/index'); // Adjust the path if necessary

describe('API Endpoints', () => {
  it('should fetch all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch a project by ID', async () => {
    const res = await request(app).get('/api/projects/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', '1');
  });

  it('should return 404 for a non-existent project', async () => {
    const res = await request(app).get('/api/projects/999');
    expect(res.statusCode).toEqual(404);
  });
});
