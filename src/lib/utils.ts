import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsxとtwMergeを組み合わせて、Tailwind CSSのクラス名をマージし、重複するクラスを正しく処理
 *
 * @param {...ClassValue[]} inputs - クラス名、またはクラス名の配列
 * @returns {string} - マージされたクラス名の文字列
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
