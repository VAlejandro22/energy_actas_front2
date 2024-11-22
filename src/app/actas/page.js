'use client';

import { useEffect, useState } from 'react';
import { getActas } from '@/app/actions/funciones_Actas';
import ActaList from '@/app/components/ActaList';
import ActaForm from '@/app/components/ActaForm';

export default function Actas() {
  const [actas, setActas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario
  const [selectedActa, setSelectedActa] = useState(null); // Estado para la acta seleccionada para edición o creación

  const fetchActas = async () => {
    try {
      const data = await getActas();
      setActas(data || []);
    } catch (error) {
      console.error('Error fetching actas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActas();
  }, []);

  const handleCreateNewActa = () => {
    setSelectedActa(null); // Limpia cualquier acta seleccionada
    setShowForm(true); // Muestra el formulario para crear una nueva acta
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false); // Oculta el formulario después de guardar
    fetchActas(); // Actualiza la lista de actas
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Actas</h1>

      {/* Botón para crear una nueva acta */}
      <button
        onClick={handleCreateNewActa}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Crear Nueva Acta
      </button>

      {isLoading ? (
        <p>Cargando actas...</p>
      ) : (
        <ActaList actas={actas} />
      )}

      {/* Mostrar el formulario para crear o editar una acta */}
      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-4 right-4 text-red-500 hover:underline"
      >
        Cerrar
      </button>
      <ActaForm
        actaInicial={selectedActa}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </div>
  </div>
)}

    </div>
  );
}
