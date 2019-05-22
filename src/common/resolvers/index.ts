export { createBaseResolver } from './base.resolver';
export { createTreeResolver } from './tree.resolver';
export interface BaseResolverOptions {
  /**
   * Specifies the plural
   */
  plural?: string;
}

export const pluralName = (name: string, options: BaseResolverOptions) =>
  (options && options.plural) || `${name}s`;
