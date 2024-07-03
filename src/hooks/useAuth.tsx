import { useState } from 'react';

import supabase from '@/lib/supabase';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGithub = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return { signInWithGithub, loading, error };
};
