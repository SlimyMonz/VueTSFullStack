import { userNameType } from "../Models/zodTypes";

type User = { id: string; name: string };

// Imaginary database
const users: User[] = [];

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
