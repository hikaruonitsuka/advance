// 公式ドキュメント通りの作成だが型エラーが出るので@types/cookieをインストールして対応
// https://github.com/supabase/ssr/issues/53

import { createServerClient } from '@supabase/ssr';
import { type CookieSerializeOptions } from 'cookie';
import { NextResponse, type NextRequest } from 'next/server';

import { Database } from '@/lib/supabase/database.types';

type CookieOptions = Partial<CookieSerializeOptions>;

/**
 * ユーザーのセッションを更新するためのミドルウェア関数
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
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

  // IMPORTANT: この間にロジックを追加してはいけない
  // 単純なミスでも、ユーザーがランダムにログアウトされる問題のデバッグが非常に困難になる可能性があります。

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // リダイレクト処理
  // ユーザーが存在しない場合、特定のページにも滞在していない場合はログインページへリダイレクト
  if (
    !user &&
    request.nextUrl.pathname !== '/' &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ユーザーがプロフィール設定を完了していない場合はプロフィール設定ページへリダイレクト
  if (user) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_profile_complete')
      .eq('auth_id', user.id)
      .single();

    if (error) {
      throw error;
    }

    // プロフィール作成がすでに済んでいるユーザーはそのまま返す
    if (profile.is_profile_complete) {
      return supabaseResponse;
    }

    // 作成が済んでいないユーザーはプロフィール作成ページへリダイレクト
    if (!request.nextUrl.pathname.startsWith('/user-setup')) {
      const url = request.nextUrl.clone();
      url.pathname = '/user-setup';
      return NextResponse.redirect(url);
    }
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
