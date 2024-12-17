import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const CreateUserFormSchema = z.object({
  // ファイルのバリデーション用の型
  avatar_image: z
    .custom<FileList>()
    .refine((file) => file.length !== 0, { message: '必須です' })
    .transform((file) => file[0])
    .refine((file) => file!.size <= 5000000, { message: 'ファイルサイズは5MB以下にしてください' })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file!.type), {
      message: 'JPEG・PNG・WebP形式のファイルをアップロードしてください',
    })
    .optional(),
  // 実際にデータベースに格納するURLの型
  avatar_image_url: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: '名前を入力してください' })
    .max(20, { message: '名前は20文字以内にしてください' }),
  gender: z.enum(['male', 'female']),
  tags: z
    .array(
      z.object({
        name: z.string().min(1, 'タグを入力してください').max(20, { message: 'タグは20文字以内にしてください' }),
      }),
    )
    .refine(
      (tags) => {
        // タグ名が重複していないかチェック
        const names = tags.map((category) => category.name);
        const uniqueNames = new Set(names);
        return names.length === uniqueNames.size;
      },
      { message: 'カテゴリ名が重複しています' },
    ),
  self_introduction: z.string().trim().max(200, { message: '自己紹介は200文字以内にしてください' }).optional(),
  is_private: z.boolean().default(true),
  is_profile_complete: z.boolean().default(false),
});

export default CreateUserFormSchema;

export type CreateUserFormSchema = z.infer<typeof CreateUserFormSchema>;
