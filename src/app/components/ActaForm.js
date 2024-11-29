'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { createActa, updateActa, getEmpleados, getEquipos, createEquipo } from '@/app/actions/funciones_Actas';
import EquipoForm from '@/app/components/EquipoForm';
export default function ActaForm({ actaInicial = null, onSubmitSuccess = () => { } }) {
  const [acta, setActa] = useState({
    EMP_CEDULA: '',
    FECH_ENTR: '',
    FECH_DEV: '',
    PROYECTO: 'OFICINA',
    JOB: '',
    OBSERVACIONES: '',
    ACT_ESTADO: '',
    detalles: [],
    EMP_ENTR_CEDULA: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState({
    // FECH_ENTR: '',
    // FECH_DEV: '',
    equipos_ID_EQP: '',
    estado: 'ENTREGADO',

  });

  const [empleados, setEmpleados] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const empleadosOptions = empleados.map((empleado) => ({
    value: empleado.cedula,
    label: empleado.apellido +' '+ empleado.nombre,
  }));
  const equiposOptions = equipos.map((equipo) => ({
    value: equipo.ID_EQP,
    label: equipo.NOMBRE,
  }));

  useEffect(() => {
    if (actaInicial) {
      setActa({ ...actaInicial, detalles: actaInicial.detalles || [] });
      console.log(actaInicial);
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
      // FECH_ENTR: '',
      // FECH_DEV: '',
      equipos_ID_EQP: '',
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

      if (acta.ID_ACT) {
        // Actualización
        await updateActa(acta.ID_ACT, actaJson);
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
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          {acta.ID_ACT ? "Editar Acta" : "Crear Nueva Acta"}
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Se entrega al Empleado:
          </label>
          <Select
            options={empleadosOptions}
            value={empleadosOptions.find((option) => option.value === acta.EMP_CEDULA) || null}
            onChange={(selectedOption) => {
              const selectedUsuario = empleados.find((empleado) => empleado.cedula === selectedOption?.value);
              if (selectedUsuario) {
                setActa({
                  ...acta,
                  EMP_CEDULA: selectedUsuario.cedula,
                });
              }
            }}
            placeholder="Buscar y seleccionar responsable"
            className="w-full"
            isClearable
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Es entregado por:
          </label>
          <Select
            options={empleadosOptions}
            value={empleadosOptions.find((option) => option.value === acta.EMP_ENTR_CEDULA) || null}
            onChange={(selectedOption2) => {
              const selectedUsuario2 = empleados.find((empleado) => empleado.cedula === selectedOption2?.value);
              if (selectedUsuario2) {
                setActa({
                  ...acta,
                  EMP_ENTR_CEDULA: selectedUsuario2.cedula,
                });
              }
            }}
            placeholder="Buscar y seleccionar responsable"
            className="w-full"
            isClearable
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Fecha de Entrega
          </label>
          <input
            type="datetime-local"
            name="FECH_ENTR"
            value={acta.FECH_ENTR}
            onChange={handleActaChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Fecha de Devolución
          </label>
          <input
            type="datetime-local"
            name="FECH_DEV"
            value={acta.FECH_DEV}
            onChange={handleActaChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            PROYECTO
          </label>
          <input
            type="text"
            name="PROYECTO"
            value={acta.PROYECTO}
            onChange={handleActaChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            JOB
          </label>
          <input
            type="text"
            name="JOB"
            value={acta.JOB}
            onChange={handleActaChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            OBSERVACIONES
          </label>
          <textarea
            name="OBSERVACIONES"
            value={acta.OBSERVACIONES}
            onChange={handleActaChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Estado
          </label>
          <select
            name="estado"
            value={acta.ACT_ESTADO || ""}
            onChange={handleActaChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Seleccione el estado
            </option>
            <option value="ENTREGADO">ENTREGADO</option>
            <option value="PENDIENTE">PENDIENTE</option>
          </select>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mt-8">Equipos</h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Equipo</label>
          <Select
            options={equiposOptions}
            value={equiposOptions.find((option) => option.value === detalle.equipos_ID_EQP) || null}
            onChange={(selectedOption) => {
              const selectedEquipo = equipos.find((equipo) => equipo.ID_EQP === selectedOption?.value);
              if (selectedEquipo) {
                setDetalle({
                  ...detalle,
                  equipos_ID_EQP: selectedEquipo.ID_EQP,
                });
              }
            }}
            placeholder="Buscar y seleccionar equipo"
            className="w-full"
            isClearable
          />
        </div>

        <button
          type="button"
          onClick={addDetalle}
          className="px-4 py-2 mr-10 bg-green-500 text-white rounded-lg hover:bg-green-300"
        >
          Añadir Equipo
        </button>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Crear nuevo equipo
        </button>

        <ul className="list-disc pl-6">
          {acta.detalles.map((d, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                ID Equipo: {d.equipos_ID_EQP}

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
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-500"
        >
          {acta.ID_ACT ? "Guardar Cambios" : "Crear Acta"}
        </button>
      </form>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
            <EquipoForm
              onSubmit={async (equipo) => {
                try {
                  await createEquipo(equipo);
                  await fetchData();
                  alert("Equipo creado exitosamente.");
                } catch (error) {
                  console.error("Error al crear el equipo:", error);
                  alert("Hubo un error al crear el equipo.");
                }
              }}
              onSubmitSuccess={() => setShowForm(false)} // Cierra el formulario después del envío exitoso
            />

          </div>
        </div>
      )}
    </div>

  );
}
