import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { BASE_URL } from '@/const';
import supabase from '@/lib/supabase';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null); // ログイン状態を管理

  useEffect(() => {
    // ログイン状態の変化を監視
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    // イベントリスナーの解除
    return () => authData.subscription.unsubscribe();
  }, []);

  // GitHub でログイン
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${BASE_URL}/register/user-setup`,
      },
    });
  };

  // サインアウト
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { session, signInWithGithub, signOut };
};
