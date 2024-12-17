import { FaGithub } from 'react-icons/fa6';

import { signInWithGithub } from '@/app/action/auth';

export default function GithubLoginButton() {
  return (
    <form action={signInWithGithub}>
      <button className="mx-auto flex w-full max-w-md items-center justify-center gap-x-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-bold transition-opacity hover:opacity-60 sm:text-base">
        <FaGithub className="sm:size-5" />
        GitHub
      </button>
    </form>
  );
}
