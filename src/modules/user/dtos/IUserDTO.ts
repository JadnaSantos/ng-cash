class IUser {
  id?: string;
  username: string;
  password: string;

  private constructor({ username, password }: IUser) {
    return Object.assign(this, {
      username,
      password
    });
  }

  static create({ username, password }: IUser) {
    const user = new IUser({ username, password });
    return user;
  }
}

export { IUser };
