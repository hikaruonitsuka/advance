'use client';

import { Control, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import CreateUserFormSchema from '../schema';

import AvatarInputField from './AvatarInputField';
import TagsInputField from './TagsInputField';

type CreateUserFormProps = {
  form: UseFormReturn<CreateUserFormSchema>;
  control: Control<CreateUserFormSchema>;
  fields: FieldArrayWithId<CreateUserFormSchema, 'tags'>[];
  append: UseFieldArrayAppend<CreateUserFormSchema, 'tags'>;
  remove: UseFieldArrayRemove;
  uploading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

export const CreateUserForm = ({ form, control, fields, append, remove, uploading, onSubmit }: CreateUserFormProps) => {
  return (
    <Form {...form}>
      <form className="grid gap-y-10" onSubmit={onSubmit}>
        <AvatarInputField control={control} />
        <FormField
          control={control}
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
          control={control}
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
            <legend className="text-base font-bold">学習タグ</legend>
            <TagsInputField append={append} control={control} fields={fields} remove={remove} />
          </fieldset>
        </FormItem>
        <FormField
          control={control}
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
          control={control}
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
          {uploading ? 'アップロード中...' : '生成する'}
        </Button>
      </form>
    </Form>
  );
};

export default CreateUserForm;
