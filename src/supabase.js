import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://llwjtdmvhtyafvvsqaar.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsd2p0ZG12aHR5YWZ2dnNxYWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwNTIxODYsImV4cCI6MTk5NTYyODE4Nn0.0oYRcCNl8kWglf3w2YG5mkwTfsB7hVSq4XJ-MeSgeKk'
)

export default supabase
