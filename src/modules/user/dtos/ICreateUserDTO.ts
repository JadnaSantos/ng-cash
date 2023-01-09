interface ICreateUserDTO {
  id?: string;
  username: string;
  password: string;
  created_at?: Date | undefined;
  updated_at?: Date | undefined;
}

export { ICreateUserDTO };
