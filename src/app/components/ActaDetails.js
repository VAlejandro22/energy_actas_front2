'use client';

import React from 'react';
import PDFGenerator from './PDFGenerator';
import { getActaById,getEquipoById,getEmpleadoByCedula } from '@/app/actions/funciones_Actas';

export default function ActaDetails({ acta }) {


  if (!acta) {
    return <p>No se encontró información del acta.</p>;
  }

  return (
    <div className="p-6 border rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4">Detalles del Acta #{acta.ID_ACT}</h2>

      <div className="space-y-2">
        <p>
          <span className="font-medium">Cédula del Empleado que recibe:</span> {acta.EMP_CEDULA}
        </p>
        <p>
          <span className="font-medium">Empleado que recibe:</span> {acta.NOMBRE_RECIBE}
        </p>
        <p>
          <span className="font-medium">Fecha de Entrega:</span> {acta.FECH_ENTR}
        </p>
        <p>
          <span className="font-medium">Fecha de Devolución:</span> {acta.FECH_DEV}
        </p>
        <p>
          <span className="font-medium">Proyecto:</span> {acta.PROYECTO}
        </p>
        <p>
          <span className="font-medium">Job:</span> {acta.JOB}
        </p>
        <p>
          <span className="font-medium">Observaciones:</span> {acta.OBSERVACIONES || 'Sin observaciones'}
        </p>
        <p>
          <span className="font-medium">Estado:</span> {acta.ACT_ESTADO}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mt-6 mb-2">Detalles del Acta</h3>
        {acta.detalles && acta.detalles.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {acta.detalles.map((detalle, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded">
                <p>
                  <span className="font-medium">ID Equipo:</span> {detalle.equipo.ID_EQP}
                </p>
                <p>
                  <span className="font-medium">Equipo:</span> {detalle.equipo.NOMBRE}
                </p>
                <p>
                  <span className="font-medium">Descripcion:</span> {detalle.equipo.DESCRIPCION}
                </p>
                <p>
                  <span className="font-medium">Estado:</span> {detalle.equipo.ESTADO}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay detalles asociados a esta acta.</p>
        )}
      </div>
      <PDFGenerator acta={acta} />
    </div>
  );
}
