export class MaxDistanceError extends Error {
  constructor() {
    super('Max distance between user and gym reached.');
  }
}
