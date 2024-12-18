import { type NextRequest } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

/**
 * 特定のリクエストパスを除外するためのマッチャー設定を含むミドルウェア
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

/*
 * 以下のパスを除外します:
 * - _next/static (静的ファイル)
 * - _next/image (画像最適化ファイル)
 * - favicon.ico (ファビコンファイル)
 * - .svg, .png, .jpg, .jpeg, .gif, .webp 拡張子のファイル
 *
 * 以下のヘッダーが存在しない場合にマッチします:
 * https://zenn.dev/sasatech/articles/035e634d7ea8c3
 *
 * - next-router-prefetch
 * - purpose: prefetch
 */
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
