import { userNameType } from "../Models/zodTypes";

// Imaginary database
const users: userNameType[] = [];

async function findMany() {
  return users;
}

async function getById(id: string) {
  users.find((user) => user.id === id);
}

async function create(user: userNameType){
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
