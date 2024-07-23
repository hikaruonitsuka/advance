'use client';

import { FaGithub } from 'react-icons/fa6';

import { useAuth } from '@/hooks/useAuth';

export default function GithubLoginButton() {
  const { signInWithGithub } = useAuth();
  return (
    <button
      className="mx-auto flex w-full max-w-md items-center justify-center gap-x-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-bold transition-opacity hover:opacity-60 sm:text-base"
      onClick={() => void signInWithGithub()}
    >
      <FaGithub className="sm:size-5" />
      GitHub
    </button>
  );
}
