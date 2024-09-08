import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecords,
  deleteRecords,
} from "./crudService";

import { User } from "@/models/user";

const TABLE_NAME = "users";

export const createUser = async (userData: Omit<User, "id">) => {
  return await createRecord<User>(TABLE_NAME, userData);
};

export const getUsersByConditions = async (conditions: Partial<User>) => {
  return await getRecords<User>(TABLE_NAME, conditions);
};

export const getUserById = async (id: number) => {
  return await getRecordById<User>(TABLE_NAME, id);
};

export const updateUser = async (id: number, updatedFields: Partial<User>) => {
  return await updateRecords<User>(TABLE_NAME, { id }, updatedFields);
};

export const deleteUser = async (id: number) => {
  return await deleteRecords<User>(TABLE_NAME, { id });
};
