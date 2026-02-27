import { useEffect, useState } from 'react'
import api from '../services/api'

export default function DeviationsPage() {
  const [deviations, setDeviations] = useState([])
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ task_id:'', category:'', description:'', severity:'Major', is_repeat:false })
  const [caForm, setCaForm] = useState({ deviation_id:'', action_description:'', owner_id:'', due_date:'', status:'Open' })

  async function load() {
    const [d, u] = await Promise.all([api.get('/deviations'), api.get('/users')])
    setDeviations(d.data)
    setUsers(u.data)
  }
  useEffect(() => { load() }, [])

  return <div className="grid2">
    <form className="card" onSubmit={async e => { e.preventDefault(); await api.post('/deviations', { ...form, task_id:Number(form.task_id) }); load() }}>
      <h3>Log Deviation</h3>
      <input placeholder="Task ID" onChange={e => setForm({...form, task_id:e.target.value})} />
      <input placeholder="Category" onChange={e => setForm({...form, category:e.target.value})} />
      <textarea placeholder="Description" onChange={e => setForm({...form, description:e.target.value})} />
      <select onChange={e => setForm({...form, severity:e.target.value})}><option>Minor</option><option>Major</option><option>Critical</option></select>
      <label><input type="checkbox" onChange={e => setForm({...form, is_repeat:e.target.checked})} /> Repeat deviation</label>
      <button>Create Deviation</button>
    </form>

    <form className="card" onSubmit={async e => { e.preventDefault(); await api.post('/corrective-actions', { ...caForm, deviation_id:Number(caForm.deviation_id), owner_id:Number(caForm.owner_id) }); load() }}>
      <h3>Create Corrective Action</h3>
      <input placeholder="Deviation ID" onChange={e => setCaForm({...caForm, deviation_id:e.target.value})} />
      <textarea placeholder="Action Description" onChange={e => setCaForm({...caForm, action_description:e.target.value})} />
      <select onChange={e => setCaForm({...caForm, owner_id:Number(e.target.value)})}><option>Owner</option>{users.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}</select>
      <input type="date" onChange={e => setCaForm({...caForm, due_date:e.target.value})} />
      <select onChange={e => setCaForm({...caForm, status:e.target.value})}><option>Open</option><option>Closed</option></select>
      <button>Create CA</button>
    </form>

    <div className="card full"><h3>Deviation List</h3><table><thead><tr><th>ID</th><th>Task</th><th>Category</th><th>Severity</th><th>Status</th></tr></thead><tbody>{deviations.map(d => <tr key={d.id}><td>{d.id}</td><td>{d.task_id}</td><td>{d.category}</td><td>{d.severity}</td><td>{d.status}</td></tr>)}</tbody></table></div>
  </div>
}
