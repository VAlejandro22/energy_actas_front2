import { useState } from 'react';

function EquipoForm({ initialData = {}, onSubmit }) {
  const [equipo, setEquipo] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipo({ ...equipo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(equipo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          name="NOMBRE"
          value={equipo.NOMBRE || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium">Descripción</label>
        <textarea
          name="DESCRIPCION"
          value={equipo.DESCRIPCION || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="estado" className="block text-sm font-medium">Estado</label>
        <select
          name="ESTADO"
          value={equipo.ESTADO || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      {/* Otros campos de la entidad equipo */}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar</button>
    </form>
  );
}

export default EquipoForm;
