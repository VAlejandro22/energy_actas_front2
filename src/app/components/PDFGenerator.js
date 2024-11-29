import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import {getEquipoById} from '@/app/actions/funciones_Actas';
import { useEffect, useState } from 'react';
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
    display: 'flex',
    textAlign: 'center',    // Centra el texto horizontalmente
    justifyContent: 'center', // Centra contenido horizontal en flexbox
    alignItems: 'center',   // Centra contenido vertical en flexbox

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontSize: 10,
    flex: 1,
  },
  tableCell2: {

    padding: 0,
    fontSize: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
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
  logo: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    width: 50,
    height: 50,

  },

});

// Documento PDF
function PDFDocument({ acta }) {

  if (!acta) return null;



  return (
    <Document>
      <Page style={styles.page}>


        <View style={styles.header}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Image
                style={[styles.tableCell]}
                src="https://i.vimeocdn.com/portrait/10154280_640x640" // Reemplaza con la URL de tu imagen
              />
              <View style={[styles.tableCell2, { flex: 2 }]}>
                <Text style={[styles.tableCell]} >GT-SI-R-02</Text>
                <Text style={[styles.tableCell]}>
                  REGISTRO{'\n'}ACTA DE ENTREGA DE EQUIPOS
                </Text>
              </View>
              <View style={styles.tableCell2}>
                <Text style={[styles.tableCell]}>Emisión</Text>
                <Text style={[styles.tableCell]}>Versión</Text>
                <Text style={[styles.tableCell]}>Página</Text>
              </View>
            </View>
          </View>
        </View>




        {/* Datos Generales */}
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>PROYECTO</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{acta.PROYECTO || 'N/A'}</Text>
              <Text style={[styles.tableCell]}>JOB</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{acta.JOB||'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>FECHA DE ENTREGA</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{acta.FECH_ENTR||'N/A'}</Text>
              <Text style={[styles.tableCell]}>FECHA DEVOLUCION</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{acta.FECH_DEV || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Detalles de Equipos */}
        <Text style={styles.title}>POR MEDIO DE LA PRESENTE SE REALIZA LA ENTREGA DE LOS SIGUIENTE:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Cantidad</Text>
            <Text style={styles.tableCell}>Equipo</Text>
            <Text style={styles.tableCell}>Descripción</Text>
          </View>
          {acta.detalles.map((detalle, index) => (
           
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{detalle.equipo.CANTIDAD||'N/A'}</Text>
              <Text style={styles.tableCell}>{detalle.equipo.NOMBRE||'N/A'}</Text>
              <Text style={styles.tableCell}>
                {detalle.equipo.DESCRIPCION || 'N/A'}
              </Text>
            </View>
          ))}
        </View>

        {/* Firmas */}
        <Text style={styles.section}></Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>ENTREGADO POR</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>RECIBIDO POR</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>FIRMA</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}> </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>FIRMA</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}> </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>NOMBRE</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{acta.NOMBRE_ENTREGA || 'N/A'}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>NOMBRE</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{acta.NOMBRE_RECIBE || 'N/A'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>N.CEDULA</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{acta.EMP_ENTR_CEDULA || 'N/A'}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>N.CEDULA</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{acta.EMP_CEDULA || 'N/A'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>CARGO</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{acta.CARGO_ENTREGA || 'N/A'}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>CARGO</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{acta.CARGO_RECIBE || 'N/A'}</Text>
          </View>
          {/* Agregar */}
        </View>
        <Text style={styles.footer}>NOTA: Al momento de la devolucion del equipo si presenta danos por mal uso no registrados en el acta de entrega, o que no se haya reportado, el ususario sera responsable del costo del arreglo.</Text>

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
