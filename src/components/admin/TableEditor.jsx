'use client';

import { useState } from 'react';

export default function TableEditor({ initialData, name }) {
  // Default structure if nothing exists
  const defaultData = { 
    headers: ['Talle', 'Pecho', 'Cintura', 'Cadera'], 
    rows: [['S', '', '', ''], ['M', '', '', ''], ['L', '', '', '']] 
  };

  const [data, setData] = useState(initialData || defaultData);

  const addRow = () => {
    setData({ ...data, rows: [...data.rows, Array(data.headers.length).fill('')] });
  };

  const addCol = () => {
    const newHeader = prompt('Nombre de la nueva columna (ej: Largo)');
    if (newHeader) {
      setData({
        headers: [...data.headers, newHeader],
        rows: data.rows.map(r => [...r, ''])
      });
    }
  };

  const updateHeader = (i, val) => {
    const newHeaders = [...data.headers];
    newHeaders[i] = val;
    setData({ ...data, headers: newHeaders });
  };

  const updateCell = (ri, ci, val) => {
    const newRows = [...data.rows];
    newRows[ri][ci] = val;
    setData({ ...data, rows: newRows });
  };

  const removeRow = (ri) => {
    if (data.rows.length > 1) {
        setData({ ...data, rows: data.rows.filter((_, idx) => idx !== ri) });
    }
  };

  return (
    <div style={{ border: '1px solid #eaeaea', padding: '1.5rem', background: '#fff', borderRadius: '4px' }}>
      {/* Hidden input to pass data to Server Action */}
      <input type="hidden" name={name} value={JSON.stringify(data)} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#666' }}>Editor de Guía de Talles</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" onClick={addCol} className="btn-secondary" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>+ Columna</button>
            <button type="button" onClick={addRow} className="btn-secondary" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>+ Fila</button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
            <tr style={{ background: '#f5f5f5' }}>
                {data.headers.map((h, i) => (
                <th key={i} style={{ border: '1px solid #eee', padding: '8px' }}>
                    <input 
                    type="text" 
                    value={h} 
                    onChange={(e) => updateHeader(i, e.target.value)}
                    style={{ width: '100%', border: 'none', fontWeight: 'bold', textAlign: 'center', background: 'transparent', outline: 'none' }}
                    />
                </th>
                ))}
                <th style={{ width: '30px', border: '1px solid #eee' }}></th>
            </tr>
            </thead>
            <tbody>
            {data.rows.map((row, ri) => (
                <tr key={ri}>
                {row.map((cell, ci) => (
                    <td key={ci} style={{ border: '1px solid #eee', padding: '8px' }}>
                    <input 
                        type="text" 
                        value={cell} 
                        onChange={(e) => updateCell(ri, ci, e.target.value)}
                        placeholder="--"
                        style={{ width: '100%', border: 'none', textAlign: 'center', outline: 'none' }}
                    />
                    </td>
                ))}
                <td style={{ border: '1px solid #eee', textAlign: 'center' }}>
                    <button type="button" onClick={() => removeRow(ri)} style={{ border: 'none', background: 'none', color: '#ccc', cursor: 'pointer' }}>&times;</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
