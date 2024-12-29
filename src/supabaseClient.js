import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dcnxdutrefhujkqiwvue.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbnhkdXRyZWZodWprcWl3dnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NzUwNzUsImV4cCI6MjA1MTA1MTA3NX0.17YY9SJxqDACHdw43r0lRwYqYJG1goZnOiGcQK6HPKY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 