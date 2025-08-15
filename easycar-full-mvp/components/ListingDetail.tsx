'use client';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { createBrowserSupabase } from '@/lib/supabase';
import Link from 'next/link';

type Row = { id: string; make: string; model: string; year: number; mileage: number; price: number; city: string; email: string; description: string; images: string[]; };

export default function ListingDetail(){
  const supabase = useMemo(()=>createBrowserSupabase(),[]);
  const params = useParams();
  const id = params?.id as string;
  const [row, setRow] = useState<Row | null>(null);
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState<{id:string; body:string; created_at:string;}[]>([]);

  useEffect(()=>{
    (async()=>{
      const { data } = await supabase.from('listings').select('*').eq('id', id).single();
      setRow(data as any);
    })();
    const ch = supabase.channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `listing_id=eq.${id}` },
        payload => setChat(prev=>[...(prev), payload.new as any]))
      .subscribe();
    (async()=>{
      const { data } = await supabase.from('messages').select('*').eq('listing_id', id).order('created_at',{ascending:true});
      setChat(data as any || []);
    })();
    return ()=>{ supabase.removeChannel(ch); };
  }, [id]);

  async function send(){
    if(!msg.trim()) return;
    const { error } = await supabase.from('messages').insert([{ listing_id: id, body: msg }]);
    if(!error) setMsg('');
  }

  if(!row) return <section className="container py-8">Loading…</section>;
  return (
    <section className="container py-8">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {(row.images?.length ? row.images : ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop']).map((src,i)=>(
            <img key={i} className="rounded-lg border border-neutral-800" src={src} alt="car"/>
          ))}
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">{row.make} {row.model}</h1>
          <div className="text-neutral-400">{row.year} • {row.mileage.toLocaleString()} mi • {row.city}</div>
          <div className="text-xl font-bold">${row.price.toLocaleString()}</div>
          <p className="text-neutral-300">{row.description}</p>
          <div className="flex gap-2">
            <a className="px-4 py-2 rounded-lg bg-sky-500 font-semibold" href={`mailto:${encodeURIComponent(row.email)}?subject=Interested in your ${encodeURIComponent(row.make+' '+row.model)}`}>Message seller</a>
            <Link className="px-4 py-2 rounded-lg border border-neutral-700" href="/listings">Back</Link>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Chat (demo)</h2>
            <div className="border border-neutral-800 rounded-lg p-3 h-64 overflow-auto space-y-2 bg-neutral-900">
              {chat.map((m)=> <div key={m.id} className="text-sm"><span className="text-neutral-500">{new Date(m.created_at).toLocaleString()}:</span> {m.body}</div>)}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Write a message" className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-2"/>
              <button onClick={send} className="px-3 rounded-lg bg-sky-500">Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}