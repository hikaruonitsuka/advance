import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';

import CreateUserForm from '@/feature/user-setup/components/CreateUserForm';

export default function userSetup() {
  return (
    <>
      <PageFv />
      <div className="mt-20">
        <Inner>
          <div className="mx-auto max-w-xl">
            <div className="flex flex-col gap-y-6">
              <Typography className="text-center" component="h2" variant="h2">
                キャラクター作成
              </Typography>
              <Typography className="flex justify-center" component="p" variant="p">
                あなたの分身となるキャラクターを作成しましょう。
              </Typography>
            </div>
            <CreateUserForm />
          </div>
        </Inner>
      </div>
    </>
  );
}
