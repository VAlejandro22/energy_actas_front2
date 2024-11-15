'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ActaList from '@/app/components/ActaList';
import ActaForm from '@/app/components/ActaForm';

export default function Actas() {
  const [actas, setActas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/actas/').then(response => setActas(response.data));
  }, []);

  

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Actas</h1>
      <ActaList actas={actas} />
      <ActaForm  />
    </div>
  );
}
