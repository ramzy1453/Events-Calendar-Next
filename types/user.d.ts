export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}
