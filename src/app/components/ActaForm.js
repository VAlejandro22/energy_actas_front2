import { useState, useEffect } from 'react';
import axios from 'axios';

function ActaForm({ initialData = {}, onSubmit }) {
  const [acta, setActa] = useState(initialData);
  const [empleados, setEmpleados] = useState([]);
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/empleados/').then(response => setEmpleados(response.data));
    axios.get('http://localhost:8000/equipos/').then(response => setEquipos(response.data));
    console.log(toString(empleados));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActa({ ...acta, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(acta);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <div>
        <label htmlFor="empleado" className="block text-sm font-medium">Empleado</label>
        <select
          name="empleado"
          value={acta.empleado || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          {empleados.map(emp => (
            <option key={emp.cedula} value={emp.cedula}>{emp.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="equipo" className="block text-sm font-medium">Equipo</label>
        <select
          name="equipo"
          value={acta.equipo || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          {equipos.map(eq => (
            <option key={eq.COD_EQP} value={eq.COD_EQP}>{eq.NOMBRE}</option>
          ))}
        </select>
      </div>
      {/* Otros campos */}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar</button>
    </form>
  );
}

export default ActaForm;
