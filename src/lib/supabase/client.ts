import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/lib/supabase/database.types';

/**
 * ブラウザ側で利用するSupabaseクライアントを作成
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
