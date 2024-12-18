import GithubLoginButton from '@/components/button/GithubLoginButton';
import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';

export default function Login() {
  return (
    <>
      <PageFv />
      <div className="mt-20">
        <Inner>
          <div className="mx-auto flex max-w-2xl flex-col gap-y-10">
            <GithubLoginButton />
          </div>
        </Inner>
      </div>
    </>
  );
}
