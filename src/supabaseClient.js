import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ifkbzojpvyxahrhkjjzf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5ba4N2NNBn1KZP6tJLEnzw_11W9bCZ4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);