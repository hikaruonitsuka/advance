import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col items-center gap-y-6 p-4">
      <div className="flex items-center gap-x-8">
        <Link href="/">プライバシーポリシー</Link>
        <Link href="/">利用規約</Link>
      </div>
      <p className="text-xs">
        <small>® 2024 app</small>
      </p>
    </footer>
  );
}
