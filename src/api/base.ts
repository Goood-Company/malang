// ✅ 1. Generic API 함수 생성 (GET / POST / UPDATE 등)

import { supabase } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

export type BaseResponse<T> = {
  data: T | null;
  error: Error | null;
};

export const customQuery = async <T>(
  queryFn: (q: SupabaseClient) => any
): Promise<BaseResponse<T>> => {
  const { data, error } = await queryFn(supabase);
  return { data: data ?? null, error };
};

// GET 요청
export const fetchSingle = async <T>(
  table: string,
  filters: Record<string, any>
): Promise<BaseResponse<T>> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .match(filters)
    .single();

  return { data: data ?? null, error };
};

export const fetchMultiple = async <T>(
  table: string,
  filters?: Record<string, any>
): Promise<BaseResponse<T[]>> => {
  let query = supabase.from(table).select("*");
  if (filters) query = query.match(filters);

  const { data, error } = await query;
  return { data: data ?? null, error };
};

// INSERT
export async function insertIntoTable<T>(
  table: string,
  payload: T
): Promise<BaseResponse<T>> {
  const { data, error } = await supabase.from(table).insert(payload).single();
  return { data: data ?? null, error };
}

// UPDATE
export async function updateTable<T>(
  table: string,
  match: Partial<T>,
  changes: Partial<T>
): Promise<BaseResponse<T[]>> {
  const { data, error } = await supabase
    .from(table)
    .update(changes)
    .match(match);
  return { data: data ?? null, error };
}
