'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import PDFGenerator from './PDFGenerator';
import ActaForm from '@/app/components/ActaForm';

export default function ActaDetails({ acta }) {
  const [showForm, setShowForm] = useState(false);
  if (!acta) {
    return <p className="text-center text-gray-500">No se encontró información del acta.</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Detalles del Acta #{acta.ID_ACT}
        </h2>

        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-medium text-gray-900">Cédula del Empleado que recibe:</span> {acta.EMP_CEDULA}
          </p>
          <p>
            <span className="font-medium text-gray-900">Empleado que recibe:</span> {acta.NOMBRE_RECIBE}
          </p>
          <p>
            <span className="font-medium text-gray-900">Fecha de Entrega:</span> {acta.FECH_ENTR}
          </p>
          <p>
            <span className="font-medium text-gray-900">Fecha de Devolución:</span> {acta.FECH_DEV}
          </p>
          <p>
            <span className="font-medium text-gray-900">Proyecto:</span> {acta.PROYECTO}
          </p>
          <p>
            <span className="font-medium text-gray-900">Job:</span> {acta.JOB}
          </p>
          <p>
            <span className="font-medium text-gray-900">Observaciones:</span> {acta.OBSERVACIONES || 'Sin observaciones'}
          </p>
          <p>
            <span className="font-medium text-gray-900">Estado:</span> {acta.ACT_ESTADO}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Detalles del Acta</h3>
          {acta.detalles && acta.detalles.length > 0 ? (
            <ul className="space-y-4">
              {acta.detalles.map((detalle, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm text-gray-800"
                >
                  <p>
                    <span className="font-medium text-gray-900">ID Equipo:</span> {detalle.equipo.ID_EQP}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Equipo:</span> {detalle.equipo.NOMBRE}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Descripción:</span> {detalle.equipo.DESCRIPCION}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Estado:</span> {detalle.equipo.ESTADO}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay detalles asociados a esta acta.</p>
          )}
        </div>

        <div className="flex">
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="justify-start px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Crear nuevo equipo
        </button>
          <PDFGenerator className="justify-end" acta={acta} />
        </div>
        <button></button>
      </div>
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
            <ActaForm
              actaInicial={acta}
              onSubmitSuccess={() => setShowForm(false)} // Cierra el formulario después del envío exitoso
            />

          </div>
        </div>
      )}
    </div>
  );
}
