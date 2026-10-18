import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('display_name').eq('id', user!.id).single()
  const name = profile?.display_name || user?.email?.split('@')[0] || 'there'
  return (
    <main>
      <h1>Hi, {name}</h1>
      <p>What would you like to do?</p>
      <div className="grid">
        <Link href="/vault" className="card"><div className="ico" /><b>Personal Vault</b><span>Your documents, kept in your own Google Drive.</span></Link>
        <Link href="/expenses" className="card"><div className="ico" style={{ background: '#248A3D' }} /><b>Expense Sharing</b><span>Split costs and see who owes whom.</span></Link>
        {[1, 2].map(i => <div key={i} className="card soon"><div className="ico" style={{ background: '#8E8E93' }} /><b>Something new</b><span className="pill">Coming Soon</span></div>)}
      </div>
      <form action="/auth/signout" method="post"><button style={{ width: '100%', marginTop: 18 }}>Sign out</button></form>
    </main>
  )
}
