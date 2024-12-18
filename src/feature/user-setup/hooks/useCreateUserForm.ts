import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { createClient } from '@/lib/supabase/client';
import { getUserFromSession } from '@/utils/auth';

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
