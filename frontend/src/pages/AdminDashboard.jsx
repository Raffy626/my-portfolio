import React, {useEffect, useState} from "react";
import { fetchPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from "../api";

export default function AdminDashboard(){
  const [list,setList]=useState([]);
  const [form,setForm]=useState({title:"",description:"",imageUrl:"",repoLink:"",demoLink:"",tags:""});
  const [editing,setEditing]=useState(null);

  async function load(){ const data = await fetchPortfolios(); setList(data); }
  useEffect(()=>{ load(); },[]);

  async function submit(e){
    e.preventDefault();
    const payload = {...form, tags: form.tags.split(",").map(s=>s.trim()).filter(Boolean)};
    if(editing){
      await updatePortfolio(editing._id, payload);
      setEditing(null);
    } else {
      await createPortfolio(payload);
    }
    setForm({title:"",description:"",imageUrl:"",repoLink:"",demoLink:"",tags:""});
    load();
  }

  function startEdit(p){
    setEditing(p);
    setForm({...p, tags: (p.tags||[]).join(", ")});
  }

  async function remove(id){
    if(!confirm("Delete?")) return;
    await deletePortfolio(id);
    load();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded">
          <h3 className="mb-4">{editing ? "Edit Project" : "Create Project"}</h3>
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full p-2 bg-gray-800 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
            <textarea className="w-full p-2 bg-gray-800 rounded" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
            <input className="w-full p-2 bg-gray-800 rounded" placeholder="Image URL" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})}/>
            <input className="w-full p-2 bg-gray-800 rounded" placeholder="Repo link" value={form.repoLink} onChange={e=>setForm({...form,repoLink:e.target.value})}/>
            <input className="w-full p-2 bg-gray-800 rounded" placeholder="Demo link" value={form.demoLink} onChange={e=>setForm({...form,demoLink:e.target.value})}/>
            <input className="w-full p-2 bg-gray-800 rounded" placeholder="Tags comma separated" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})}/>
            <button className="px-4 py-2 bg-indigo-500 rounded">{editing ? "Save" : "Create"}</button>
          </form>
        </div>

        <div>
          <h3 className="mb-4">Your Projects</h3>
          <div className="space-y-3">
            {list.map(p=>(
              <div key={p._id} className="bg-gray-900 p-4 rounded flex justify-between items-start">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-gray-400">{(p.tags||[]).join(", ")}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>startEdit(p)} className="px-3 py-1 bg-indigo-600 rounded">Edit</button>
                  <button onClick={()=>remove(p._id)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
                </div>
              </div>
            ))}
            {list.length===0 && <div className="text-gray-400">No projects yet</div>}
          </div>
        </div>
      </div>
    </div>
  );
}