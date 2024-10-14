'use client';

import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { session, signInWithGithub, signOut } = useAuth();

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
      <Link href="/">Logo</Link>
      {session ? (
        <button onClick={() => signOut()}>ログアウト</button>
      ) : (
        <div className="flex items-center gap-x-4">
          <button onClick={() => signInWithGithub()}>ログイン</button>
          <Link href="/register">新規登録</Link>
        </div>
      )}
    </header>
  );
}
