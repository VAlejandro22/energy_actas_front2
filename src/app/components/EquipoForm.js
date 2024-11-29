import { useState } from 'react';

function EquipoForm({ initialData = {}, onSubmit, onSubmitSuccess = () => { } }) {
  const [equipo, setEquipo] = useState({
    ip: '',
    cod_eqp: '',
    mac_adress: '',
    nombre: '',
    descripcion: '',
    eqp_tipo: '',
    estado: '',
    ...initialData, // Sobrescribir con datos iniciales si los hay
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipo({ ...equipo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(equipo);
    onSubmitSuccess(); // Llama a la función para cerrar el formulario
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <div>
        <label htmlFor="ip" className="block text-sm font-medium">IP</label>
        <input
          type="text"
          name="ip"
          value={equipo.ip || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="cod_eqp" className="block text-sm font-medium">Código del Equipo</label>
        <input
          type="text"
          name="cod_eqp"
          value={equipo.cod_eqp || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="mac_adress" className="block text-sm font-medium">MAC Address</label>
        <input
          type="text"
          name="mac_adress"
          value={equipo.mac_adress || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={equipo.nombre || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium">Descripción</label>
        <textarea
          name="descripcion"
          value={equipo.descripcion || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="eqp_tipo" className="block text-sm font-medium">Tipo de Equipo</label>
        <input
          type="text"
          name="eqp_tipo"
          value={equipo.eqp_tipo || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="estado" className="block text-sm font-medium">Estado</label>
        <select
          name="estado"
          value={equipo.estado || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="" disabled>Seleccionar estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Guardar Equipo
      </button>
    </form>
  );
}

export default EquipoForm;
