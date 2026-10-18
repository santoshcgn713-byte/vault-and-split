'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
type Mode = 'signin' | 'signup' | 'reset'
export default function Login() {
  const [mode, setMode] = useState<Mode>('signin')
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false)
  const supabase = createClient()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMsg('')
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMsg(error.message); else window.location.href = '/dashboard'
    } else if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: origin + '/auth/callback' } })
      setMsg(error ? error.message : 'Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: origin + '/auth/callback?next=/update-password' })
      setMsg(error ? error.message : 'If that email has an account, a reset link is on its way.')
    }
    setBusy(false)
  }
  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: origin + '/auth/callback' } })
    if (error) setMsg(error.message)
  }
  return (
    <main>
      <h1>{mode === 'signup' ? 'Create account' : mode === 'reset' ? 'Reset password' : 'Welcome'}</h1>
      <p>Your everyday tools in one private place.</p>
      {mode !== 'reset' && <button type="button" onClick={google}>Continue with Google</button>}
      <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
        {mode === 'signup' && <label>Name<input value={name} onChange={e => setName(e.target.value)} required autoComplete="name" /></label>}
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label>
        {mode !== 'reset' && <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} /></label>}
        <button className="primary" disabled={busy}>{mode === 'signup' ? 'Create account' : mode === 'reset' ? 'Send reset link' : 'Sign in'}</button>
      </form>
      {msg && <div className="msg" role="status">{msg}</div>}
      <div className="msg">
        {mode === 'signin' && <><a href="#" onClick={e => { e.preventDefault(); setMode('reset') }}>Forgot password?</a> · <a href="#" onClick={e => { e.preventDefault(); setMode('signup') }}>Create an account</a></>}
        {mode !== 'signin' && <a href="#" onClick={e => { e.preventDefault(); setMode('signin') }}>Back to sign in</a>}
      </div>
    </main>
  )
}
