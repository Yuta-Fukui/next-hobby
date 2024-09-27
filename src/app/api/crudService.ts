import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/models/database.types";

type Condition<T> = {
  [K in keyof T]?: T[K];
};

type TableName =
  | "_prisma_migrations"
  | "AuditLog"
  | "Report"
  | "Session"
  | "Task"
  | "User"
  | "UserActivity";

// 一つのレコードを作成
export const createRecord = async <T>(table: TableName, insertData: T) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .insert([insertData as Tables<TableName>])
    .select();
  if (error) {
    console.error(`Error creating record in ${table}:`, error);
    return "error";
  }
  return data;
};

// Read (複数条件でのレコード取得)
export const getRecords = async <T>(
  table: TableName,
  conditions: Condition<T> = {}
): Promise<T[]> => {
  const supabase = createClient();
  let query = supabase.from(table).select("*");
  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(key, value as string | number);
  }
  const { data, error } = await query;
  if (error) {
    console.error(`Error fetching records from ${table}:`, error);
    return [];
  }
  return data as T[];
};

// Read (IDでのレコード取得)
export const getRecordById = async <T>(
  table: TableName,
  conditions: Condition<T> = {}
): Promise<T | null> => {
  const supabase = createClient();
  let query = supabase.from(table).select("*");
  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(key, value as string | number);
  }
  const { data, error } = await query.single();
  if (error) {
    console.error(`Error fetching record by id from ${table}:`, error);
    return null;
  }
  return data as T;
};

// Update (複数条件でのレコード更新)
export const updateRecords = async <T>(
  table: TableName,
  conditions: Condition<T> = {},
  updatedFields: Partial<T>
): Promise<T[] | null> => {
  const supabase = createClient();
  let query = supabase.from(table).update(updatedFields);
  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(key, value as string | number);
  }
  const { data, error } = await query.select();
  console.log(data);
  if (error) {
    console.error(`Error updating records in ${table}:`, error);
    return null;
  }
  return data as T[];
};

// Delete (複数条件でのレコード削除)
export const deleteRecords = async <T>(
  table: TableName,
  conditions: Condition<T> = {}
): Promise<T[] | null> => {
  const supabase = createClient();
  let query = supabase.from(table).delete();
  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(key, value as string | number);
  }
  const { data, error } = await query;
  console.log(data);
  if (error) {
    console.error(`Error deleting records from ${table}:`, error);
     th
    return null;
  }
  return data;
};
