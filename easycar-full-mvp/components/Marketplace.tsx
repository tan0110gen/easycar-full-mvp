'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createBrowserSupabase } from '@/lib/supabase';

type Row = { id: string; make: string; model: string; year: number; mileage: number; price: number; city: string; images: string[]; };

export default function Marketplace(){
  const supabase = useMemo(()=>createBrowserSupabase(),[]);
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState('');
  const [make, setMake] = useState('');
  const [sort, setSort] = useState('new');

  useEffect(()=>{
    (async()=>{
      const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if(!error && data) setRows(data as any);
    })();
  },[]);

  let filtered = rows.filter(r => (`${r.make} ${r.model}`).toLowerCase().includes(q.toLowerCase()));
  if(make) filtered = filtered.filter(r=>r.make===make);
  if(sort==='price-asc') filtered.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc') filtered.sort((a,b)=>b.price-a.price);
  if(sort==='year-asc') filtered.sort((a,b)=>a.year-b.year);
  if(sort==='year-desc') filtered.sort((a,b)=>b.year-a.year);

  return (
    <section className="container py-8">
      <div className="flex flex-wrap gap-3 items-end mb-4">
        <input placeholder="Search make/model" value={q} onChange={e=>setQ(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-lg p-2" />
        <select value={make} onChange={e=>setMake(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-lg p-2">
          <option value="">All makes</option>
          {Array.from(new Set(rows.map(r=>r.make))).map(m=><option key={m}>{m}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-lg p-2">
          <option value="new">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="year-desc">Year ↓</option>
          <option value="year-asc">Year ↑</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(r => (
          <article key={r.id} className="border border-neutral-800 rounded-xl overflow-hidden">
            <img className="w-full h-48 object-cover" src={(r.images&&r.images[0]) || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'} alt="car" />
            <div className="p-3">
              <h3 className="font-semibold">{r.make} {r.model}</h3>
              <div className="text-sm text-neutral-400 flex gap-3"><span>{r.year}</span><span>{r.mileage.toLocaleString()} mi</span><span className="ml-auto">{r.city}</span></div>
              <div className="font-bold mt-1">${r.price.toLocaleString()}</div>
            </div>
            <div className="p-3 border-t border-neutral-800 flex gap-2">
              <Link className="flex-1 text-center rounded-lg border border-neutral-700 py-2" href={`/listings/${r.id}`}>View</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}