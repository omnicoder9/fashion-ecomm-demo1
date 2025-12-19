import React, { useState } from 'react';

// Hard-coded customers for demo
const initialCustomers = [
  { id: 1, email: 'customer1@example.com', credits: 10, notes: 'Loyal customer' },
  { id: 2, email: 'customer2@example.com', credits: 5, notes: '' },
];

const AdminCRM = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [notes, setNotes] = useState({});

  const handleNoteChange = (id, note) => {
    setNotes({ ...notes, [id]: note });
  };

  const saveNote = (id) => {
    const updated = customers.map(c => c.id === id ? { ...c, notes: notes[id] } : c);
    setCustomers(updated);
  };

  return (
    <div>
      <h2>Admin CRM Dashboard</h2>
      <table>
        <thead>
          <tr><th>Email</th><th>Credits</th><th>Notes</th><th>Action</th></tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.email}</td>
              <td>{cust.credits}</td>
              <td>
                <input
                  value={notes[cust.id] || cust.notes}
                  onChange={(e) => handleNoteChange(cust.id, e.target.value)}
                />
              </td>
              <td><button onClick={() => saveNote(cust.id)}>Save</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCRM;