import { userNameType } from "../Models/zodTypes";

// Imaginary database
const users: userNameType[] = [];

async function findMany() {
  return users;
}

async function findById(id: string) {
  users.find((user) => user.id === id);
}

async function create(user: userNameType){
  user.id = String(users.length + 1);
  users.push(user);
  return user;
};

export const UserRepository = {
  user: {
    findMany,
    findById,
    create,
  },
};
