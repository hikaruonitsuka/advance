import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { BASE_URL } from '@/const';
import supabase from '@/lib/supabase';

/**
 * ログイン状態を管理するカスタムフック
 * @returns {object} ログイン状態とログイン・ログアウト処理
 */
export const useAuth = () => {
  // セッションを管理
  const [session, setSession] = useState<Session | null>(null);

  // supabase.auth.onAuthStateChangeでセッションの変化を監視
  useEffect(() => {
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    // authDataのクリーンアップ
    return () => authData.subscription.unsubscribe();
  }, []);

  // supabase.auth.signInWithOAuthでGitHub認証を行う
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${BASE_URL}/register/user-setup`,
      },
    });
  };

  // supabase.auth.signOutでログアウト処理を行う
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { session, signInWithGithub, signOut };
};
