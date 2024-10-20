// 公式ドキュメント通りの作成だが型エラーが出るので@types/cookieをインストールして対応
// https://github.com/supabase/ssr/issues/53

import { createServerClient } from '@supabase/ssr';
import { type CookieSerializeOptions } from 'cookie';
import { NextResponse, type NextRequest } from 'next/server';

type CookieOptions = Partial<CookieSerializeOptions>;

/**
 * ユーザーのセッションを更新するためのミドルウェア関数
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as CookieOptions),
          );
        },
      },
    },
  );

  // IMPORTANT: createServerClient と supabase.auth.getUser の間にロジックを書かないでください。
  // 単純なミスでも、ユーザーがランダムにログアウトされる問題のデバッグが非常に困難になる可能性があります。

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  if (!user && !isLoginPage) {
    // ユーザーがいない場合、ユーザーをログインページにリダイレクトする可能性があります
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // IMPORTANT: supabaseResponse オブジェクトをそのまま返す必要があります。NextResponse.next() で新しいレスポンスオブジェクトを作成する場合は、以下の手順を守ってください:
  // 1. リクエストを渡します。例:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. クッキーをコピーします。例:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. myNewResponse オブジェクトを必要に応じて変更しますが、クッキーは変更しないでください！
  // 4. 最後に:
  //    return myNewResponse
  // これを行わないと、ブラウザとサーバーが同期を失い、ユーザーのセッションが予期せず終了する可能性があります！

  return supabaseResponse;
}
