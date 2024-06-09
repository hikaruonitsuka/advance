import clsx from 'clsx';
import { FC } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { match } from 'ts-pattern';

import type { Simplify } from 'type-fest';

type Props = Simplify<{
  component: React.ElementType;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  children: React.ReactNode;
  className?: ClassNameValue;
}>;

const Typography: FC<Props> = ({ component, variant, className, children, ...props }) => {
  const Component = component;

  const fontStyle = match(variant)
    .with('h1', () => clsx('text-3xl'))
    .with('h2', () => clsx('text-2xl', 'font-bold'))
    .with('h3', () => clsx('text-xl'))
    .with('h4', () => clsx('text-lg'))
    .with('p', () => clsx('text-base'))
    .exhaustive();

  return (
    <Component className={twMerge(fontStyle, className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
