'use client';

import { House } from 'lucide-react';
import Link from 'next/link';

import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);
  return (
    <>
      <PageFv />
      <div className="mt-20">
        <Inner>
          <div className="mx-auto flex max-w-2xl flex-col gap-y-10">
            <div className="flex flex-col gap-y-6">
              <Typography className="text-center" component={'h2'} variant={'h2'}>
                サーバーでエラーが<span className="inline-block">発生しました</span>
              </Typography>
              <Typography className="flex justify-center" component={'p'} variant={'p'}>
                サーバー側で問題が発生しました。しばらくしてから再度お試しください。
              </Typography>
            </div>
            <Button asChild className="mx-auto w-fit">
              <Link className="flex gap-x-2" href="/">
                <House size={20} />
                <span>ホームへ戻る</span>
              </Link>
            </Button>
          </div>
        </Inner>
      </div>
    </>
  );
}
