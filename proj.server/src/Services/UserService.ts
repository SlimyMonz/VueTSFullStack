import { UserRepository } from '../Repository/UserRepository';
import { userNameSchema, userNameType } from '../Models/zodTypes';


async function createUser(user: userNameType) {

  const parsed = userNameSchema.safeParse(user);
  
  if (!parsed.success) {
    throw new Error(`Invalid data: ${parsed.error.errors.map((e) => e.message).join(', ')}`);
  }
  return UserRepository.user.create(user);
};

async function findManyUsers() {
  return UserRepository.user.findMany()
}

async function findUserById(id: string){
  return UserRepository.user.findById(id);
}

export const UserService = {
  createUser,
  findManyUsers,
  findUserById
};