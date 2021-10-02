export class User {
  _id: string;
  name: string;
  description: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, description, email, image, createdAt, updatedAt }: User) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.email = email;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type UpdatableProperty = Partial<Pick<User, 'name' | 'description' | 'image'>>;
