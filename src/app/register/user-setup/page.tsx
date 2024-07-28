import Inner from '@/components/common/Inner';
import PageFv from '@/components/common/PageFv';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export default function userSetup() {
  return (
    <>
      <PageFv />
      <div className="mt-20">
        <Inner>
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-col gap-y-6">
              <Typography className="text-center" component="h2" variant="h2">
                キャラクター作成
              </Typography>
              <Typography className="flex justify-center" component="p" variant="p">
                あなたの分身となるキャラクターを作成しましょう。
              </Typography>
            </div>
            <div className="mt-10 flex flex-col gap-y-10">
              <div className="flex flex-col gap-y-2">
                <Label className="font-bold" htmlFor="avatar">
                  アバター画像
                </Label>
                <Input type="file" />
                {/* <div className="aspect-square w-40 self-center rounded-full bg-gray-300"></div> */}
              </div>
              <div className="flex flex-col gap-y-2">
                <Label className="font-bold" htmlFor="name">
                  プロフィール名
                </Label>
                <Input placeholder="プロフィール名を入力" type="text" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label className="font-bold">性別</Label>
                <RadioGroup defaultValue="male">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" />
                    <Label htmlFor="male">男性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" />
                    <Label htmlFor="female">女性</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label className="font-bold" htmlFor="learningCategory">
                  学習カテゴリ
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Nextjs">Next.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label className="font-bold" htmlFor="message">
                  自己紹介
                </Label>
                <Textarea placeholder="自己紹介文を入力" />
              </div>
              <div className="flex flex-col gap-y-8">
                <Label className="flex flex-col gap-y-1 font-bold" htmlFor="message">
                  プライバシー設定
                  <span className="text-xs font-normal">他の利用者のタイムラインに表示されないようにします</span>
                </Label>
                <div className="flex items-center gap-x-4">
                  <Switch />
                  <span>プライベートモードをオンにする</span>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <div className="text-center">
                <Button>生成する</Button>
              </div>
            </div>
          </div>
        </Inner>
      </div>
    </>
  );
}
