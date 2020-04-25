const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../vidly');
  });
  afterEach(async () => {
    server.close(); //close the server
    await Genre.remove({}); //clean up database
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' }
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('if id is valid should return a genre', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });
    it('if id is invalid should return 404', async () => {
      const res = await request(server).get('/api/genres/1');
      expect(res.status).toBe(404);
    });

    it('if no genre with the given id exist should return 404', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });

    it('if invalid login return 401 status', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('if client sends an invalid genre that is < 5 charaters returns a 404 status', async () => {
      name = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('if client sends an invalid genre that is > 50 charaters returns a 404 status', async () => {
      name = new Array(52).join('a');
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('if client sends an valid genre saves the genre', async () => {
      await exec();
      const genre = Genre.find({ name: 'genre1' });
      expect(genre).not.toBeNull();
    });

    it('if client sends an valid genre returns the genre', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});
