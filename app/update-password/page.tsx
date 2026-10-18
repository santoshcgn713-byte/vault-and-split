'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
export default function UpdatePassword() {
  const [password, setPassword] = useState(''); const [msg, setMsg] = useState('')
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await createClient().auth.updateUser({ password })
    if (error) setMsg(error.message); else window.location.href = '/dashboard'
  }
  return (
    <main><h1>New password</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
        <label>New password<input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required autoComplete="new-password" /></label>
        <button className="primary">Save password</button>
      </form>
      {msg && <div className="msg" role="status">{msg}</div>}
    </main>
  )
}
