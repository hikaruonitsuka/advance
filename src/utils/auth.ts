import { Session, SupabaseClient } from '@supabase/supabase-js';

/**
 * セッションからユーザーIDを取得する関数
 * @param supabaseClient Supabaseクライアント
 * @param session セッション情報
 * @returns ユーザーID
 */
export async function getUserFromSession(
  supabaseClient: SupabaseClient,
  session: Session | null,
): Promise<string | null> {
  if (!session) {
    // セッションが存在しない場合はAPIを呼び出さずにnullを返す（APIコール回数を減らす）
    return null;
  }

  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    console.error('ユーザー情報の取得中にエラーが発生しました:', error);
    return null;
  }

  return data.user.id;
}
