import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { Control } from 'react-hook-form';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import CreateUserFormSchema from '../schema';

type AvatarInputFieldProps = {
  control: Control<CreateUserFormSchema>;
};

const AvatarInputField = ({ control }: AvatarInputFieldProps) => {
  const [preview, setPreview] = useState('');

  // オブジェクトURLを生成してFileListとプレビュー用の画像URLを返す
  const getImageData = (
    event: ChangeEvent<HTMLInputElement>,
  ): { files: FileList | undefined; previewUrl: string | undefined } => {
    if (!event.target.files || event.target.files.length === 0) {
      return { files: undefined, previewUrl: undefined };
    }

    const dataTransfer = new DataTransfer();

    Array.from(event.target.files).forEach((image) => dataTransfer.items.add(image));

    const files = dataTransfer.files;
    const previewUrl = URL.createObjectURL(event.target.files[0]!);

    return { files, previewUrl };
  };

  // 画像データを取得してプレビューとフォームの状態を更新する
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (value: FileList | undefined) => void,
    setPreview: (url: string) => void,
  ) => {
    const { files, previewUrl } = getImageData(event);

    // ファイルが存在しない場合はリセット
    if (!files || !previewUrl) {
      setPreview('');
      onChange(undefined);
      return;
    }

    // プレビューとフォーム状態を更新
    setPreview(previewUrl);
    onChange(files);
  };

  return (
    <div className="grid gap-y-4">
      {preview && (
        <div className="mx-auto aspect-square w-24 overflow-hidden rounded-full border border-gray-300">
          <Image alt="" className="size-full object-cover object-center" height={96} src={preview} width={96} />
        </div>
      )}
      <FormField
        control={control}
        name="avatar_image"
        // onChangeを引数にとる時、valueの指定が必要なのでコメントでエラーを出さないようにしている
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem className="grid gap-y-2">
            <FormLabel className="w-fit">アバターを設定</FormLabel>
            <FormControl>
              <Input
                accept="image/*"
                onChange={(event) => handleFileChange(event, onChange, setPreview)}
                type="file"
                {...fieldProps}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AvatarInputField;
