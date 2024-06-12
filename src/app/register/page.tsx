import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';

import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';

export default function Register() {
  return (
    <>
      <PageFv />
      <div className="mt-20">
        <Inner>
          <div className="mx-auto flex max-w-2xl flex-col gap-y-10">
            <div className="flex flex-col gap-y-6">
              <Typography className="text-center" component={'h2'} variant={'h2'}>
                新規登録
              </Typography>
              <Typography className="flex justify-center" component={'p'} variant={'p'}>
                ユーザー名はタイムラインに表示されます。 （設定で非表示が可能です）
              </Typography>
            </div>
            <div className="flex flex-col gap-y-4">
              <button className="mx-auto flex w-full max-w-md items-center justify-center gap-x-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-bold transition-opacity hover:opacity-60 sm:text-base">
                <FaGithub className="sm:size-5" />
                GitHub
              </button>
              <Typography className="text-sm sm:text-center" component={'p'} variant={'p'}>
                <Link className="underline transition-opacity hover:opacity-60" href="/">
                  利用規約
                </Link>
                と
                <Link className="underline transition-opacity hover:opacity-60" href="/privacy-policy">
                  プライバシーポリシー
                </Link>
                に同意したことになります。
              </Typography>
            </div>
          </div>
        </Inner>
      </div>
    </>
  );
}
