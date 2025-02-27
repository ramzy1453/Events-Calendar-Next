export interface IRoom {
  _id: Types.ObjectId;
  name: string;
  description: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRoom {
  name: string;
  description: string;
}

export interface IMember {
  _id: Types.ObjectId;
  user: IUser;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
