import { createBrowserClient } from '@supabase/ssr';

/**
 * ブラウザ側で利用するSupabaseクライアントを作成
 */
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
