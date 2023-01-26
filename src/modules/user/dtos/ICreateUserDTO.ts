interface ICreateUserDTO {
  id?: string;
  username: string;
  password: string;
  accountId?: number
  created_at?: Date | undefined;
  updated_at?: Date | undefined;
}

export { ICreateUserDTO };
