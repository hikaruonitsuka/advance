import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/lib/supabase/database.types';

type Tags = {
  id?: string;
  name: string;
}[];

export const RegisterTagsAndLinkProfile = async (
  authId: string,
  tags: Tags,
  supabase: SupabaseClient<Database>,
): Promise<void> => {
  // タグの登録
  const { error: registerError } = await supabase.from('tags').upsert(
    tags.map((tag) => ({ name: tag.name })),
    // upsertメソッドを使って既存のタグがある場合は無視、ない場合は新規登録する
    { onConflict: 'name', ignoreDuplicates: true },
  );

  if (registerError) {
    throw new Error(registerError.message);
  }

  // 入力されたタグを取得（一度登録してUUIDを生成後、タグの名前から取得）
  const { data: inputTags, error: fetchError } = await supabase
    .from('tags')
    .select('id, name')
    .in(
      'name',
      tags.map((tag) => tag.name),
    );

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  // タグとプロフィールの紐付け
  const { error: linkError } = await supabase.from('profile_tags').insert(
    inputTags.map((tag) => ({
      auth_id: authId,
      tag_id: tag.id,
    })),
  );

  if (linkError) {
    throw new Error(linkError.message);
  }
};

export const registerAvatarImage = async (
  authId: string,
  avatarFile: File,
  supabase: SupabaseClient<Database>,
): Promise<string> => {
  // 拡張子を取得
  const extension = avatarFile.name.split('.').pop()?.toLowerCase();

  // 一意なファイル名を生成
  const fileName = `${authId}/avatar-image.${extension}`;

  // アップロード処理
  const { data, error } = await supabase.storage.from('avatars').upload(fileName, avatarFile, {
    upsert: true, // 上書き許可
  });

  if (error) {
    throw new Error(error.message);
  }

  // 新しい画像パスを更新データに追加
  return data.path;
};
