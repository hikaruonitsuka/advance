import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';

export default function login() {
  return (
    <>
      <PageFv />
      <div className="mt-20">
        <Inner>
          <Typography className="text-center" component={'h2'} variant={'h2'}>
            新規登録
          </Typography>
          <Typography className="mt-6" component={'p'} variant={'p'}>
            テキストテキストテキストテキストテキストテキストテキスト
          </Typography>
        </Inner>
      </div>
    </>
  );
}
