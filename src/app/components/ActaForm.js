'use client';

import { useState, useEffect } from 'react';
import { createActa, updateActa, getEmpleados, getEquipos } from '@/app/actions/funciones_Actas';

export default function ActaForm({ actaInicial = null, onSubmitSuccess = () => { } }) {
  const [acta, setActa] = useState({
    emp_cedula: '',
    fecha_entrega: '',
    fecha_devolucion: '',
    proyecto: 'OFICINA',
    job: '',
    observaciones: '',
    estado: '',
    detalles: [],
  });

  const [detalle, setDetalle] = useState({
    fecha_entrega: '',
    fecha_devolucion: '',
    equipos_id_eqp: '',
    estado: 'ENTREGADO',
  });

  const [empleados, setEmpleados] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para búsqueda
  const [empleadoSearch, setEmpleadoSearch] = useState('');
  const [equipoSearch, setEquipoSearch] = useState('');



  useEffect(() => {
    if (actaInicial) {
      setActa({ ...actaInicial, detalles: actaInicial.detalles || [] });
    }
  }, [actaInicial]);

  const fetchData = async () => {
    try {
      const [empleadosData, equiposData] = await Promise.all([getEmpleados(), getEquipos()]);
      setEmpleados(empleadosData || []);
      setEquipos(equiposData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActaChange = (e) => {
    const { name, value } = e.target;
    setActa({ ...acta, [name]: value });
  };

  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalle({ ...detalle, [name]: value });
  };

  const addDetalle = () => {
    setActa({ ...acta, detalles: [...acta.detalles, { ...detalle }] });
    setDetalle({
      fecha_entrega: '',
      fecha_devolucion: '',
      equipos_id_eqp: '',
      estado: 'ENTREGADO',
    });
  };

  const removeDetalle = (index) => {
    const nuevosDetalles = acta.detalles.filter((_, i) => i !== index);
    setActa({ ...acta, detalles: nuevosDetalles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir el objeto acta a JSON
      const actaJson = JSON.stringify(acta);

      if (acta.id_act) {
        // Actualización
        await updateActa(acta.id_act, actaJson);
        console.log('Acta actualizada exitosamente');
      } else {
        // Creación
        await createActa(actaJson);
        console.log('Acta creada exitosamente');
        console.log(actaJson); // Mostrar el JSON generado
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error al guardar el acta:', error);
    }
  };


  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4">
        {acta.id_act ? 'Editar Acta' : 'Crear Nueva Acta'}
      </h2>

      <div>
        {/* <label className="block text-sm font-medium">Cédula del Empleado</label>
        <input
          type="text"
          placeholder="Buscar empleado..."
          value={empleadoSearch}
          onChange={(e) => setEmpleadoSearch(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <ul className="border p-2 rounded max-h-40 overflow-y-auto">
          {empleados
            .filter((emp) =>
              emp.nombre.toLowerCase().includes(empleadoSearch.toLowerCase())
            )
            .map((emp) => (
              <li
                key={emp.cedula}
                onClick={() => setActa({ ...acta, emp_cedula: emp.cedula })}
                className={`p-2 cursor-pointer ${acta.emp_cedula === emp.cedula ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                  }`}
              >
                {emp.nombre} - {emp.cedula}
              </li>
            ))}
        </ul> */}
        <label className="block text-sm font-medium">Cédula del Empleado</label>
        <input
          list="empleados-list"
          name="emp_cedula"
          value={acta.emp_cedula || ''}
          onChange={handleActaChange}
          placeholder="Seleccione o escriba un empleado"
          required
          className="w-full border p-2 rounded"
        />
        <datalist id="empleados-list">
          {empleados.map((emp) => (
            <option key={emp.cedula} value={emp.cedula}>
              {emp.nombre}
            </option>
          ))}
        </datalist>
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de Entrega</label>
        <input
          type="datetime-local"
          name="fecha_entrega"
          value={acta.fecha_entrega}
          onChange={handleActaChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de Devolución</label>
        <input
          type="datetime-local"
          name="fecha_devolucion"
          value={acta.fecha_devolucion}
          onChange={handleActaChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Proyecto</label>
        <input
          type="text"
          name="proyecto"
          value={acta.proyecto}
          onChange={handleActaChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Job</label>
        <input
          type="text"
          name="job"
          value={acta.job}
          onChange={handleActaChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Observaciones</label>
        <textarea
          name="observaciones"
          value={acta.observaciones}
          onChange={handleActaChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Estado</label>
        <input
          type="text"
          name="estado"
          value={acta.estado}
          onChange={handleActaChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <h3 className="text-lg font-bold mt-6">Detalles del Acta</h3>
      <div>
        <label className="block text-sm font-medium">Fecha de Entrega</label>
        <input
          type="date"
          name="fecha_entrega"
          value={detalle.fecha_entrega}
          onChange={handleDetalleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de Devolución</label>
        <input
          type="date"
          name="fecha_devolucion"
          value={detalle.fecha_devolucion}
          onChange={handleDetalleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        {/* <label className="block text-sm font-medium">Equipo</label>
        <select
          name="equipos_id_eqp"
          value={detalle.equipos_id_eqp || ''}
          onChange={handleDetalleChange}
          className="w-full border p-2 rounded"
        >
          <option value="" disabled>
            Seleccione un equipo
          </option>
          {equipos.map((equip) => (
            <option key={equip[0]} value={equip[0]}>
              {equip[4]}
            </option>
          ))}
        </select> */}
        <label className="block text-sm font-medium">Equipo</label>
        <input
          list="equipos-list"
          name="equipos_id_eqp"
          value={detalle.equipos_id_eqp || ''}
          onChange={handleDetalleChange}
          placeholder="Seleccione o escriba un equipo"
          required
          className="w-full border p-2 rounded"
        />
        <datalist id="equipos-list">
          {equipos.map((equip) => (
            <option key={equip[0]} value={equip[0]}>
              {equip[4]}
            </option>
          ))}
        </datalist>
      </div>


      <button
        type="button"
        onClick={addDetalle}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Añadir Detalle
      </button>

      <ul className="list-disc pl-6">
        {acta.detalles.map((d, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>
              ID Equipo: {d.equipos_id_eqp}, Fecha Entrega: {d.fecha_entrega}, Fecha
              Devolución: {d.fecha_devolucion}
            </span>
            <button
              type="button"
              onClick={() => removeDetalle(index)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {acta.id_act ? 'Guardar Cambios' : 'Crear Acta'}
      </button>
    </form>
  );
}
