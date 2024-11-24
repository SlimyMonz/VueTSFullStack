import { UserType } from "../Models/zodTypes";

// Imaginary database
const users: UserType[] = [];

async function findMany() {
  return users;
}

async function getById(id: string) {
  return users.find((user) => user.id === id);
}

async function create(user: UserType){
  users.push(user);
  return user;
};

export const UserRepository = {
  user: {
    findMany,
    getById,
    create,
  },
};
