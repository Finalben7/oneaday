// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://avsfgrhmlaoyhohdzuia.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2c2ZncmhtbGFveWhvaGR6dWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTcxODcsImV4cCI6MjA2OTQ5MzE4N30.vcmn-ys3lZNqoAVQsuFybJ6gXkh3Eqc5496SofLUURw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
