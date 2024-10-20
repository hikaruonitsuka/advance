import Link from 'next/link';

import { getSession, signInWithGithub, signOut } from '@/app/action/auth';

export default async function Header() {
  const userId = await getSession();
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
      <Link href="/">Logo</Link>
      {userId ? (
        <form action={signOut}>
          <button>ログアウト</button>
        </form>
      ) : (
        <div className="flex items-center gap-x-4">
          <form action={signInWithGithub}>
            <button>ログイン</button>
          </form>
          <Link href="/register">新規登録</Link>
        </div>
      )}
    </header>
  );
}
