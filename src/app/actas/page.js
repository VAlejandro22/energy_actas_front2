'use client';

import { useEffect, useState } from 'react';
import { getActas } from '@/app/actions/funciones_Actas';
import ActaList from '@/app/components/ActaList';
import ActaForm from '@/app/components/ActaForm';
import { deleteActa } from '@/app/actions/funciones_Actas';

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
    <div className="container mx-auto py-10 px-6 sm:px-12 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center tracking-tight">
        Listado de Actas
      </h1>

      {/* Botón para crear una nueva acta */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleCreateNewActa}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          Crear Nueva Acta
        </button>
      </div>

      {/* Mensaje de carga o lista de actas */}
      {isLoading ? (
        <p className="text-center text-gray-500 font-medium">Cargando actas...</p>
      ) : (
        <ActaList
          actas={actas}
          deleteActa={async (id) => {
            try {
              await deleteActa(id);
              setActas((prevActas) => prevActas.filter((acta) => acta.ID_ACT !== id));
            } catch (error) {
              console.error("Error al eliminar el acta:", error);
              alert("Hubo un error al eliminar el acta.");
            }
          }}
        />
      )}

      {/* Mostrar el formulario para crear o editar una acta */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-8">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              ✖
            </button>
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              {selectedActa ? "Editar Acta" : "Nueva Acta"}
            </h2>
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
