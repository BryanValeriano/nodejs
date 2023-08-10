import { TRoute } from "./definitions";

export const routes: TRoute[] = [
  {
    method: 'GET',
    path: '/tasks',
    handler: () => {
      console.log('Reached GET /tasks endpoint')
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: () => {
      console.log('Reached POST /tasks endpoint')
    }
  }
];
