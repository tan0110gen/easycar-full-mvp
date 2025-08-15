'use client';
import { useEffect, useMemo, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';

export default function AccountPage(){
  const supabase = useMemo(()=>createBrowserSupabase(),[]);
  const [email, setEmail] = useState('');
  const [session, setSession] = useState<any>(null);

  useEffect(()=>{
    (async()=>{
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    })();
  },[]);

  async function signIn(e: React.FormEvent){
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
    if(error) alert(error.message);
    else alert('Magic link sent. Check your email.');
  }
  async function signOut(){ await supabase.auth.signOut(); window.location.reload(); }

  return (
    <section className="container py-8">
      {!session ? (
        <form onSubmit={signIn} className="max-w-md space-y-3">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2"/>
          <button className="px-4 py-2 rounded-lg bg-sky-500 font-semibold">Send magic link</button>
        </form>
      ) : (
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">You are signed in</h1>
          <button onClick={signOut} className="px-4 py-2 rounded-lg border border-neutral-700">Sign out</button>
        </div>
      )}
    </section>
  );
}