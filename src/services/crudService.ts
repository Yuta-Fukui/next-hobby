import { supabase } from '@/utils/supabaseClient';

type Condition<T> = {
  [K in keyof T]?: T[K];
};

// Create
export const createRecord = async <T>(
  table: string,
  data: Omit<T, "id">
): Promise<T[] | null> => {
  const { data: result, error } = await supabase.from(table).insert([data]);
  if (error) {
    console.error(`Error creating record in ${table}:`, error);
    return null;
  }
  return result;
};

// Read (複数条件でのレコード取得)
export const getRecords = async <T>(table: string, conditions: Condition<T> = {}): Promise<T[]> => {
  let query = supabase.from(table).select('*');
  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(String(key), value);
  }
  const { data, error } = await query;
  if (error) {
    console.error(`Error fetching records from ${table}:`, error);
    return [];
  }
  return data;
};

// Read (IDでのレコード取得)
export const getRecordById = async <T>(table: string, id: number | string): Promise<T | null> => {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching record by id from ${table}:`, error);
    return null;
  }
  return data;
};

// Update (複数条件でのレコード更新)
export const updateRecords = async <T>(table: string, conditions: Condition<T> = {}, updatedFields: Partial<T>): Promise<T[] | null> => {
  let query = supabase.from(table).update(updatedFields);
  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(String(key), value);
  }
  const { data, error } = await query;
  if (error) {
    console.error(`Error updating records in ${table}:`, error);
    return null;
  }
  return data;
};

// Delete (複数条件でのレコード削除)
export const deleteRecords = async <T>(table: string, conditions: Condition<T> = {}): Promise<T[] | null> => {
  let query = supabase.from(table).delete();
  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(String(key), value);
  }
  const { data, error } = await query;
  if (error) {
    console.error(`Error deleting records from ${table}:`, error);
    return null;
  }
  return data;
};