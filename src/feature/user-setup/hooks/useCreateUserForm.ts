import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { createClient } from '@/lib/supabase/client';
import { getUserFromSession } from '@/utils/auth';

import { registerAvatarImage, RegisterTagsAndLinkProfile } from '../function/register';
import CreateUserFormSchema from '../schema';

export const useCreateUserForm = () => {
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

  // フォーム本体のコントロール用の変数を取得
  const { control, handleSubmit } = form;

  // 送信時の処理
  const onSubmit = async (values: CreateUserFormSchema) => {
    setUploading(true);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authId = await getUserFromSession(supabase, session);

      if (!authId) {
        throw new Error('ログインしていないか、セッションが無効です。');
      }

      // 登録データを作成
      const registerData = {
        avatar_image_url: '',
        name: values.name,
        gender: values.gender,
        is_private: values.is_private,
        is_profile_complete: true, // プロフィールが完了しているかどうかをここで管理
        self_introduction: values.self_introduction,
      };

      // タグ登録とプロフィールとの紐付けを行う
      await RegisterTagsAndLinkProfile(authId, values.tags, supabase);

      // 画像がアップロードされている場合はアップロードしてアバターの画像パスを取得する
      if (values.avatar_image instanceof File) {
        const avatarImagePath = await registerAvatarImage(authId, values.avatar_image, supabase);
        registerData.avatar_image_url = avatarImagePath;
      }

      // プロフィールを登録
      const { error } = await supabase.from('profiles').update(registerData).eq('auth_id', authId).select();

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      // TODO:エラー処理をもう少し具体的にしたいためまた後で修正
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // 学習タグはReact Hook Form のuseFieldArrayメソッドで管理
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  return {
    form,
    control,
    fields,
    append,
    remove,
    uploading,
    onSubmit: handleSubmit(onSubmit),
  };
};
