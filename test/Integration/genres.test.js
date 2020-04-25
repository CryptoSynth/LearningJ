const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

describe('/api/genres', () => {
  let server;
  beforeEach(() => (server = require('../../index')));
  afterEach(async () => {
    await server.close(); //close the server
    await Genre.remove({}); //clean up database
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      const genres = [{ name: 'genre1' }, { name: 'genre2' }];

      await Genre.collection.insertMany(genres);

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
      const res = await request(server).get(`/api/genres/1`);
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

  describe('PUT /:id', () => {
    let token;
    let newName;
    let genre;
    let id;

    const exec = async () => {
      return await request(server)
        .put(`/api/genres/${id}`)
        .set('x-auth-token', token)
        .send({ name: newName });
    };

    beforeEach(async () => {
      const genre = await new Genre({ name: 'testing123' });
      await genre.save();

      token = new User().generateAuthToken();
      id = genre._id;
      newName = 'testing123456';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {
      newName = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      newName = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('if id is invalid should return 404', async () => {
      id = '1';

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('if no genre with the given id exist should return 404', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('if id is valid should update the genre', async () => {
      await exec();

      const updatedGenre = await Genre.findById(id);

      expect(updatedGenre.name).toBe(newName);
    });

    it('should return the updated genre if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName);
    });
  });
});
