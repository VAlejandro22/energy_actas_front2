import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontSize: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'justify',
  },
});

// Documento PDF
function PDFDocument({ acta }) {
  if (!acta) return null;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Encabezado */}
        <Text style={styles.header}>GT-SI-R-02</Text>
        <Text style={styles.header}>ACTA DE ENTREGA DE EQUIPOS</Text>

        {/* Datos Generales */}
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Uso</Text>
              <Text style={styles.tableCell}>{acta.USO || 'N/A'}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>Proyecto</Text>
              <Text style={styles.tableCell}>{acta.PROYECTO}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Fecha de Entrega</Text>
              <Text style={styles.tableCell}>{acta.FECH_ENTR}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>Fecha de Devolución</Text>
              <Text style={styles.tableCell}>{acta.FECH_DEV || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Detalles de Equipos */}
        <Text style={styles.title}>Entrega de lo siguiente:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Cantidad</Text>
            <Text style={styles.tableCell}>Equipo</Text>
            <Text style={styles.tableCell}>Descripción</Text>
          </View>
          {acta.detalles.map((detalle, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>1</Text>
              <Text style={styles.tableCell}>{detalle.equipos_ID_EQP}</Text>
              <Text style={styles.tableCell}>
                {detalle.DESCRIPCION || 'Sin descripción'}
              </Text>
            </View>
          ))}
        </View>

        {/* Firmas */}
        <Text style={styles.section}></Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>Entregado Por</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Recibido Por</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>Nombre: {acta.ENTREGADO_POR}</Text>
          </View>
          {/* Agregar */}
        </View>
      </Page>
    </Document>
  );
}

// Botón para Descargar el PDF
function PDFGenerator({ acta }) {
  return (
    <div className="mt-4">
      <PDFDownloadLink
        document={<PDFDocument acta={acta} />}
        fileName={`acta_${acta.ID_ACT}.pdf`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
      </PDFDownloadLink>
    </div>
  );
}

export default PDFGenerator;
