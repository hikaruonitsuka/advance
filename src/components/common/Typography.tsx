import clsx from 'clsx';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { match } from 'ts-pattern';

import type { Simplify } from 'type-fest';

type Props = Simplify<{
  component: React.ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  children: React.ReactNode;
  className?: ClassNameValue;
}>;

const Typography = ({ component, variant, className, children, ...props }: Props) => {
  const Component = component;

  // variant未指定だとstyleを適用しない
  const fontStyle = variant
    ? match(variant)
        .with('h1', () => clsx('text-3xl'))
        .with('h2', () => clsx('text-2xl', 'font-bold'))
        .with('h3', () => clsx('text-xl'))
        .with('h4', () => clsx('text-lg'))
        .with('p', () => clsx('text-sm', 'sm:text-base'))
        .exhaustive()
    : '';

  // variant, className共に未指定だとclassを出力しない
  const mergedClassName = variant || className ? twMerge(fontStyle, className) : undefined;

  return (
    <Component className={mergedClassName} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
