import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

/**
 * 認証コードを処理してリダイレクト処理を行うGETリクエストハンドラ
 *
 * リクエストURLから認証コードを取得し、Supabaseクライアントを使用して、認証コードをセッションに交換する。
 * 認証が成功した場合、リクエストヘッダーや環境変数に基づいて適切なURLにリダイレクトを行う。
 * 認証コードが無効な場合やエラーが発生した場合は、エラーページにリダイレクトする。
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // 閲覧ページにリダイレクトするためのパス
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // エラー時はエラーページにリダイレクト
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
