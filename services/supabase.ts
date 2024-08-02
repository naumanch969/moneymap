
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://ozfvhfjhuynjyevicwsk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96ZnZoZmpodXluanlldmljd3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MDE3MzUsImV4cCI6MjAzODA3NzczNX0.crs90aYEiU9HHcbWpPMlsaQdA7NFAoL0xej0EZxv0HI'
)