import Link from 'next/link';

import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';

import GithubLoginButton from '@/features/login/GithubLoginButton';

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
              <GithubLoginButton />
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
