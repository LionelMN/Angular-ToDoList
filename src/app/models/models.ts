export interface Todos {
  _id: string,
  owner: string,
  title: string,
  details: string,
  createAt: number,
  date: any,
  completed: boolean,
  state: string
};

export interface Users {
  _id: string,
  username: string,
  password: string,
  todos: string[],
  email: string,
};
