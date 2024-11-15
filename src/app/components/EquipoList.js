import Link from 'next/link';

function EquipoList({ equipos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {equipos.map((equipo) => (
        <div key={equipo[0]} className="p-4 border rounded shadow-sm">
          <h2 className="text-lg font-bold">{equipo[4]}</h2>
          <p>{equipo[5]}</p>
          <p><strong>Estado:</strong> {equipo[7]}</p>
          <Link href={`/equipos/${equipo[0]}`}>
            {/* <a className="text-blue-500 hover:underline">Ver detalles</a> */}
            Ver detalles
          </Link>
        </div>
      ))}
      
    </div>
  );
}

export default EquipoList;
