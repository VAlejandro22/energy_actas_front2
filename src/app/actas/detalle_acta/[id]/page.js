'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ActaDetails from '@/app/components/ActaDetails';
import { getActaById,getEquipoById,getEmpleadoByCedula } from '@/app/actions/funciones_Actas';

export default function UploadPage() {
  const [acta, setActa] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchActa = async () => {
    try {
      const data = await getActaById(id);
      setActa(data || {});
      
    } catch (error) {
      console.error('Error fetching acta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchActa();
    }

  }, [id]);

  if (isLoading) {
    return <p>Cargando acta...</p>;
  }

  return (
    <div>
      <ActaDetails acta={acta} />
    </div>
  );
}
