// 公式ドキュメント通りの作成だが型エラーが出るので@types/cookieをインストールして対応
// https://github.com/supabase/ssr/issues/53

import { createServerClient } from '@supabase/ssr';
import { type CookieSerializeOptions } from 'cookie';
import { cookies } from 'next/headers';

type CookieOptions = Partial<CookieSerializeOptions>;

/**
 * サーバー側で利用するSupabaseクライアントを作成
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options as CookieOptions));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
