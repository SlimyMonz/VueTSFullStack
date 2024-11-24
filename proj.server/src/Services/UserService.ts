import { UserRepository } from '../Repository/UserRepository';
import { UserData, UserType } from '../Models/zodTypes';


async function createUser(user: UserType) {

  const parsed = UserData.safeParse(user);
  
  if (!parsed.success) {
    throw new Error(`Invalid data: ${parsed.error.errors.map((e) => e.message).join(', ')}`);
  }
  return await UserRepository.user.create(user);
};

async function getManyUsers() {
  return await UserRepository.user.findMany()
}

async function getUserById(id: string){
  return await UserRepository.user.getById(id);
}

// exports to routes.ts to be used as endpoint functions
export const UserService = {
  createUser,
  getManyUsers,
  getUserById
};