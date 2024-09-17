import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecords,
  deleteRecords,
} from "./crudService";

import { Post } from "@/models/post";

const TABLE_NAME = "posts";

export const createPost = async (postData: Omit<Post, "id">) => {
  return await createRecord<Post>(TABLE_NAME, postData);
};

export const getPostsByConditions = async (conditions: Partial<Post>) => {
  return await getRecords<Post>(TABLE_NAME, conditions);
};

export const getPostById = async (id: number) => {
  return await getRecordById<Post>(TABLE_NAME, id);
};

export const updatePost = async (id: number, updatedFields: Partial<Post>) => {
  return await updateRecords<Post>(TABLE_NAME, { id }, updatedFields);
};

export const deletePost = async (id: number) => {
  return await deleteRecords<Post>(TABLE_NAME, { id });
};
