interface IBaseResolver<T, U> {
  findOneById(id: string): Promise<T>;
  find(args): Promise<T[]>;
  save(itemInput);
}
