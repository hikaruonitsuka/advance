import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';

export default function Register() {
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
          <div className="mt-10">
            <button className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-bold">GitHub</button>
          </div>
          <Typography className="mt-4 text-sm" component={'p'} variant={'p'}>
            利用規約とプライバシーポリシーに同意したことになります。
          </Typography>
        </Inner>
      </div>
    </>
  );
}
