import { Control, FieldArrayWithId, UseFieldArrayPrepend, UseFieldArrayRemove } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import CreateUserFormSchema from '../schema';

import TagsFormRootError from './TagsFormRootError';

type TagsInputFieldProps = {
  control: Control<CreateUserFormSchema>;
  fields: FieldArrayWithId<CreateUserFormSchema, 'tags', 'id'>[];
  append: UseFieldArrayPrepend<CreateUserFormSchema>;
  remove: UseFieldArrayRemove;
};

// カテゴリの入力欄だけEnterキー押下時のSubmitを無効化
const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

const TagsInputField = ({ control, fields, append, remove }: TagsInputFieldProps) => {
  return (
    <div className="grid gap-y-4">
      {fields.map((field, index) => {
        const isFirstField = index === 0;
        return (
          <div className="grid gap-y-2" key={field.id}>
            <FormField
              control={control}
              name={`tags.${index}.name`}
              render={({ field }) => (
                <>
                  <FormItem className="flex gap-x-4">
                    <FormControl>
                      <Input
                        className="max-w-[260px] sm:max-w-[300px]"
                        placeholder="学習に関連するカテゴリを入力"
                        {...field}
                        onKeyDown={handleOnKeyDown}
                      />
                    </FormControl>
                    {!isFirstField || fields.length < 3 ? (
                      <Button
                        onClick={() => (isFirstField ? append({ name: '' }) : remove(index))}
                        type="button"
                        variant={isFirstField ? 'success' : 'destructive'}
                      >
                        {isFirstField ? '追加' : '削除'}
                      </Button>
                    ) : null}
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />
          </div>
        );
      })}
      <TagsFormRootError />
    </div>
  );
};

export default TagsInputField;
