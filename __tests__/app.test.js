const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const db = require('../src/config/db');

let runCount = 0;

beforeAll(async () => {
  await db.connectMongo();
  await db.connectRedis();
});

afterAll(async () => {
  await db.close();
});

beforeEach(() => {
  runCount += 1;
});


describe('API Endpoints', () => {
  test('GET /api/courses/:id should respond with 200 if course exists', async () => {
    const existingCourseId = '678a980ffda0ca20caff7160'; // Replace with an actual existing course ID
    const response = await request(app).get(`/api/courses/${existingCourseId}`);
    expect(response.statusCode).toBe(200);
  });

  test('GET /api/courses/:id should respond with 404 if course does not exist', async () => {
    const nonExistingCourseId = 'ffffffffffffffffffffffff';
    const response = await request(app).get(`/api/courses/${nonExistingCourseId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Course not found');
  });

  // test('POST /api/courses should create a new course', async () => {
  //   const newCourse = {
  //     title: `New Course ${runCount}`,
  //     description: `Course Description ${runCount}`,
  //     duration: 10,
  //     price: 100
  //   };
  //   const response = await request(app).post('/api/courses/create').send(newCourse);
  //   expect(response.statusCode).toBe(201);
  //   expect(response.body).toHaveProperty('_id');
  // });
});

