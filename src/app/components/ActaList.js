import Link from 'next/link';
import PDFGenerator from './PDFGenerator'; // Asegúrate de importar el componente PDFGenerator
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import dynamic from 'next/dynamic';

const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });

function ActaList({ actas }) {
  const generatePDF = () => {
    const input = document.getElementById('content-to-pdf');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('document.pdf');
    });
  };

  // const generatePDF2 = () => {
  //   const element = document.getElementById('content-to-pdf');
  //   html2pdf()
  //     .from(element)
  //     .save('document.pdf');
  // };



  return (
    <div id="content-to-pdf" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actas.map((acta) => (
        <div key={acta.ID_ACT} className="p-4 border rounded shadow-sm">
          <h2 className="text-lg font-bold">Acta #{acta.ID_ACT}</h2>
          <p><strong>Cedula Empleado:</strong> {acta.EMP_CEDULA}</p>
          <p><strong>Proyecto:</strong> {acta.PROYECTO}</p>
          <p><strong>JOB:</strong> {acta.JOB}</p>
          <p><strong>Fecha de entrega:</strong> {acta.FECH_ENTR}</p>
          <p><strong>Fecha de devolucion:</strong> {acta.FECH_DEV}</p>

          {/* Enlace para ver detalles */}
          <Link href={`/actas/detalle_acta/${acta.ID_ACT}`} className="text-blue-500 hover:underline">
            Ver detalles
          </Link>
          

        </div>
      ))}
    </div>
  );
}

export default ActaList;
