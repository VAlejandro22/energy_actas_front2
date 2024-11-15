import Link from 'next/link';

function ActaList({ actas }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actas.map(acta => (
        <div key={acta.id} className="p-4 border rounded shadow-sm">
          <h2 className="text-lg font-bold">Acta #{acta.id}</h2>
          <p><strong>Empleado:</strong> {acta.empleado}</p>
          <p><strong>Proyecto:</strong> {acta.proyecto}</p>
          <Link href={`/actas/${acta.id}`}>
            <a className="text-blue-500 hover:underline">Ver detalles</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ActaList;
