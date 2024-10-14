import { createClient } from '@supabase/supabase-js';

// Supabase CLIで生成した型定義ファイルをインポート
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントを作成
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
