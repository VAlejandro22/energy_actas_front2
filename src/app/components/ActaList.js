import Link from 'next/link';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import dynamic from 'next/dynamic';

const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });

function ActaList({ actas, deleteActa }) {
  const generatePDF = () => {
    const input = document.getElementById('content-to-pdf');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('document.pdf');
    });
  };

  return (
    <div id="content-to-pdf" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actas.map((acta) => (
        <div
          key={acta.ID_ACT}
          className="p-6 bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Acta #{acta.ID_ACT}
          </h2>
          <p className="text-gray-600">
            <strong className="font-medium">Cédula Empleado:</strong> {acta.EMP_CEDULA}
          </p>
          <p className="text-gray-600">
            <strong className="font-medium">Proyecto:</strong> {acta.PROYECTO}
          </p>
          <p className="text-gray-600">
            <strong className="font-medium">JOB:</strong> {acta.JOB}
          </p>
          <p className="text-gray-600">
            <strong className="font-medium">Fecha de entrega:</strong> {acta.FECH_ENTR}
          </p>
          <p className="text-gray-600 mb-4">
            <strong className="font-medium">Fecha de devolución:</strong> {acta.FECH_DEV}
          </p>

          <div className="flex items-center justify-between">
            {/* Enlace para ver detalles */}
            <Link
              href={`/actas/detalle_acta/${acta.ID_ACT}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Ver detalles
            </Link>

            {/* Botón para eliminar */}
            <button
              onClick={async () => await deleteActa(acta.ID_ACT)}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActaList;
