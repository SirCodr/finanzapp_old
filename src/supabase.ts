import { Database } from '@src/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
)

export default supabase
