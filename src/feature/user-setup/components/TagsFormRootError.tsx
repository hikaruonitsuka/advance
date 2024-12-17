import React from 'react';
import { useFormState } from 'react-hook-form';

import { cn } from '@/lib/utils';

import CreateUserFormSchema from '../schema';

const TagsFormRootError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    // TODO:重複項目のバリデーションが送信時にしか効かないので後で詳細を調べる
    const { errors } = useFormState<CreateUserFormSchema>();
    const rootError = errors.tags?.root;

    if (!rootError) {
      return null;
    }
    return (
      <p className={cn('text-destructive text-sm font-medium', className)} ref={ref} {...props}>
        {rootError.message}
      </p>
    );
  },
);
TagsFormRootError.displayName = 'CategoriesFormRootError';

export default TagsFormRootError;
