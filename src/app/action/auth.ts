'use server';
import 'server-only';
import { redirect } from 'next/navigation';

import { BASE_URL } from '@/const';
import { createClient } from '@/lib/supabase/server';

/**
 * GitHubアカウントでサインイン処理
 *
 * GitHubアカウントでサインインするためのOAuth認証を開始する非同期関数
 * 認証が成功した場合、リダイレクト処理を行う
 */
export const signInWithGithub = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${BASE_URL}/api/auth/callback`,
    },
  });

  // 認証後のリダイレクト
  // 値は必ずstringかnullになるため、非nullアサーション演算子を使用
  redirect(data.url!);
};

/**
 * サインアウト処理
 *
 * サインアウト処理を行う非同期関数
 */
export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
};

/**
 * セッション情報取得
 *
 * セッション情報を取得する非同期関数
 * セッション情報が存在する場合はユーザーIDを返す
 */
export const getSession = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user.id;
};
