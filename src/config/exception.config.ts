export class EntityNotFound extends Error {
  constructor(entity: string) {
    super(`${entity} not Found`);
  }
}
