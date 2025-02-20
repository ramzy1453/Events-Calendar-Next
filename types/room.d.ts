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
