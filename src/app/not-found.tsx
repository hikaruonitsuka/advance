'use client';

import { House } from 'lucide-react';
import Link from 'next/link';

import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <PageFv />
      <div className="mt-20">
        <Inner>
          <div className="mx-auto flex max-w-2xl flex-col gap-y-10">
            <div className="flex flex-col gap-y-6">
              <Typography className="text-center" component={'h2'} variant={'h2'}>
                404エラー
              </Typography>
              <Typography className="flex justify-center" component={'p'} variant={'p'}>
                指定されたページが見つかりませんでした。URLが正しいことを確認してください。
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
