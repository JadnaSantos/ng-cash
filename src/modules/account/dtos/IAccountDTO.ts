class IAccount {
  id?: number;
  balance?: number;

  private constructor({ id }: IAccount) {
    return Object.assign(this, {
      id
    });
  }

  static create({ id }: IAccount) {
    const account = new IAccount({ id });
    return account;
  }
}

export { IAccount };
