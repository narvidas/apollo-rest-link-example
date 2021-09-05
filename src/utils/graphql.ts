export interface GetVars {
  path: string;
}

export type UpdateVars<T> = {
  path: string;
  body: T;
};
