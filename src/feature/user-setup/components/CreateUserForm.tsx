'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { CreateUserFormSchema } from '@/feature/user-setup/schema';
import { createClient } from '@/lib/supabase/client';
import { getUserFromSession } from '@/utils/auth';

import AvatarInputField from './AvatarInputField';
import TagsInputField from './TagsInputField';

export const CreateUserForm = () => {
  const [uploading, setUploading] = useState(false);

  // useFormでフォームの状態を管理
  const form = useForm<CreateUserFormSchema>({
    resolver: zodResolver(CreateUserFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      avatar_image: undefined,
      avatar_image_url: '',
      name: '',
      gender: 'male',
      tags: [{ name: '' }],
      is_private: true,
      is_profile_complete: false,
      self_introduction: '',
    },
  });

  // 送信時の処理
  const onSubmit = async (values: CreateUserFormSchema) => {
    setUploading(true);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // 現在のユーザーIDを取得
      const authId = await getUserFromSession(supabase, session);

      if (!authId) {
        throw new Error('ログインしていないか、セッションが無効です。');
      }

      // 更新データを作成
      const updateData = {
        avatar_image_url: '',
        name: values.name,
        gender: values.gender,
        is_private: values.is_private,
        is_profile_complete: false, // プロフィールが完了しているかどうかをここで管理
        self_introduction: values.self_introduction,
      };

      // 画像がアップロードされている場合はアップロード
      const avatarFile = values.avatar_image;
      if (avatarFile instanceof File) {
        // 拡張子を取得
        const extension = avatarFile.name.split('.').pop()?.toLowerCase();

        if (!extension) {
          throw new Error('ファイル拡張子が無効です。');
        }

        // 一意なファイル名を生成
        const fileName = `${authId}/avatar-image.${extension}`;

        // アップロード処理
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            upsert: true, // 上書き許可
          });

        if (uploadError) {
          throw new Error(`画像アップロードエラー: ${uploadError.message}`);
        }

        // 新しい画像パスを更新データに追加
        updateData.avatar_image_url = uploadData.path;
      }

      console.log(updateData);

      // プロフィールを更新
      const { error } = await supabase.from('profiles').update(updateData).eq('auth_id', authId).select();

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // フォーム本体のコントロール用の変数を取得
  const { control } = form;

  // 学習カテゴリはuseFieldArrayで管理
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  return (
    <div className="mt-10">
      <Form {...form}>
        <form className="grid gap-y-10" onSubmit={form.handleSubmit(onSubmit)}>
          <AvatarInputField control={control} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-y-2">
                <FormLabel className="w-fit">名前</FormLabel>
                <FormControl>
                  <Input placeholder="利用するユーザー名を入力" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="grid gap-y-2">
                <fieldset className="contents">
                  <legend className="text-base font-bold">性別</legend>
                  <FormControl>
                    <RadioGroup className="gap-x-6" defaultValue={field.value} onValueChange={field.onChange}>
                      <FormItem className="inline-flex items-center gap-x-2">
                        <FormControl>
                          <RadioGroupItem id="male" value="male" />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal" htmlFor="male">
                          男性
                        </FormLabel>
                      </FormItem>
                      <FormItem className="inline-flex items-center gap-x-2">
                        <FormControl>
                          <RadioGroupItem id="female" value="female" />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal" htmlFor="female">
                          女性
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </fieldset>
              </FormItem>
            )}
          />
          <FormItem className="grid gap-y-2">
            <fieldset className="contents">
              <legend className="text-base font-bold">学習カテゴリ</legend>
              <TagsInputField append={append} control={control} fields={fields} remove={remove} />
            </fieldset>
          </FormItem>
          <FormField
            control={form.control}
            name="self_introduction"
            render={({ field }) => (
              <FormItem className="grid gap-y-2">
                <FormLabel className="w-fit">自己紹介</FormLabel>
                <FormControl>
                  <Textarea placeholder="学んでいる分野や自己アピールについて書いてみましょう" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_private"
            render={({ field }) => (
              <FormItem className="grid gap-y-2">
                <FormLabel className="w-fit">プライバシー設定</FormLabel>
                <FormDescription>他の利用者のタイムラインに表示されないようにします</FormDescription>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mx-auto mt-16 w-fit" disabled={uploading} type="submit">
            生成する
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateUserForm;
