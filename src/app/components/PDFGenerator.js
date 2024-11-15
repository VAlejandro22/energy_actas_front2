import { Document, Page, Text, PDFDownloadLink } from '@react-pdf/renderer';

function PDFDocument({ acta }) {
  return (
    <Document>
      <Page>
        <Text>Acta de Entrega</Text>
        <Text>Empleado: {acta.empleado}</Text>
        <Text>Proyecto: {acta.proyecto}</Text>
        {/* Más detalles */}
      </Page>
    </Document>
  );
}

function PDFGenerator({ acta }) {
  return (
    <PDFDownloadLink
      document={<PDFDocument acta={acta} />}
      fileName={`acta_${acta.id}.pdf`}
    >
      {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
    </PDFDownloadLink>
  );
}

export default PDFGenerator;
