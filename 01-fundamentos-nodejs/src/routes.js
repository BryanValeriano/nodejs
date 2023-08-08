import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';
const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query;
      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null);
      return res.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const user = {
        id: randomUUID(),
        name: req.body.name,
        email: req.body.email
      };
      database.insert('users', user);
      return res.writeHead(201).end();
    }
  },
  {
    method: 'UPDATE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      database.update('users', id, req.params);
      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      database.delete('users', req.params.id);
      return res.writeHead(204).end();
    }
  },
];
