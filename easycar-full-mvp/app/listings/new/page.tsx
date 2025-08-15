'use client';
import { useEffect, useMemo, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';
import { MAKES, YEARS, CITIES } from '@/lib/data';

export default function NewListingPage(){
  const supabase = useMemo(()=>createBrowserSupabase(),[]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(YEARS[0]);
  const [mileage, setMileage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [city, setCity] = useState('Los Angeles, CA');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const models = make ? MAKES[make] : [];

  async function uploadToCloudinary(file: File){
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body: fd });
    if(!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.secure_url as string;
  }

  async function submit(e: React.FormEvent){
    e.preventDefault();
    setLoading(true);
    try {
      const imgs: string[] = [];
      for(const f of files.slice(0,10)){
        const url = await uploadToCloudinary(f);
        imgs.push(url);
      }
      const { data, error } = await supabase.from('listings').insert([{
        make, model, year, mileage, price, city, email, description, images: imgs
      }]).select().single();
      if(error) throw error;
      window.location.href = `/listings/${data.id}`;
    } catch(err:any){
      alert(err.message || 'Failed to publish');
    } finally { setLoading(false); }
  }

  return (
    <section className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">List a car</h1>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400">Make</label>
            <select required value={make} onChange={e=>{setMake(e.target.value);setModel('');}} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2">
              <option value="">Select make</option>
              {Object.keys(MAKES).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-neutral-400">Model</label>
            <select required value={model} onChange={e=>setModel(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2">
              <option value="">Select model</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-neutral-400">Year</label>
              <select value={year} onChange={e=>setYear(Number(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2">
                {YEARS.map(y=><option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400">Mileage (mi)</label>
              <input required type="number" min={0} value={mileage} onChange={e=>setMileage(Number(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-neutral-400">Price ($)</label>
              <input required type="number" min={0} value={price} onChange={e=>setPrice(Number(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2"/>
            </div>
            <div>
              <label className="block text-sm text-neutral-400">City</label>
              <select value={city} onChange={e=>setCity(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2">
                {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-neutral-400">Contact email</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2"/>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400">Description</label>
            <textarea required rows={6} value={description} onChange={e=>setDescription(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm text-neutral-400">Photos (up to 10)</label>
            <input type="file" multiple accept="image/*" onChange={e=>setFiles(Array.from(e.target.files||[]))} />
            <div className="grid grid-cols-5 gap-2 mt-2">
              {files.slice(0,10).map((f,i)=>(<div key={i} className="text-xs text-neutral-400 truncate">{f.name}</div>))}
            </div>
          </div>
          <button disabled={loading} className="px-4 py-2 rounded-lg bg-sky-500 font-semibold">{loading?'Publishing...':'Publish listing'}</button>
        </div>
      </form>
    </section>
  );
}