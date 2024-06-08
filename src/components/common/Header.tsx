import Link from 'next/link';

export default function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between p-4">
      <Link href="/">Logo</Link>
      <div className="flex items-center gap-x-4">
        <button>ログイン</button>
        <Link href="/">新規登録</Link>
      </div>
    </header>
  );
}
