// app.js
const { useState, useEffect } = React;
const {
  Trash2,
  Plus,
  Award,
  Users,
  BarChart3,
  Save,
  RefreshCw,
  Trophy,
  Lock,
  RotateCcw,
} = lucideReact;

function SistemaCalificacion() {
  const [perfil, setPerfil] = useState(null);
  const [juradoActual, setJuradoActual] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState("");

  // ---------- CARGA INICIAL ----------
  useEffect(() => {
    const saved = window.localStorage.getItem("proyectos-calificacion");
    if (saved) {
      setProyectos(JSON.parse(saved));
    }
  }, []);

  // ---------- GUARDAR ----------
  const guardarProyectos = (lista) => {
    window.localStorage.setItem("proyectos-calificacion", JSON.stringify(lista));
  };

  // ---------- AÑADIR PROYECTO ----------
  const añadirProyecto = () => {
    if (!nuevoProyecto.trim()) return;
    const nuevo = {
      id: Date.now(),
      nombre: nuevoProyecto.trim(),
      calificaciones: {},
    };
    const lista = [...proyectos, nuevo];
    setProyectos(lista);
    guardarProyectos(lista);
    setNuevoProyecto("");
  };

  // ---------- BORRAR PROYECTO ----------
  const borrarProyecto = (id) => {
    const lista = proyectos.filter((p) => p.id !== id);
    setProyectos(lista);
    guardarProyectos(lista);
  };

  // ---------- CALIFICAR ----------
  const calificar = (idProyecto, valor) => {
    if (!juradoActual.trim()) {
      alert("Introduce tu nombre de jurado primero");
      return;
    }

    const lista = proyectos.map((p) =>
      p.id === idProyecto
        ? {
            ...p,
            calificaciones: {
              ...p.calificaciones,
              [juradoActual]: valor,
            },
          }
        : p
    );

    setProyectos(lista);
    guardarProyectos(lista);
  };

  // ---------- RESET CALIFICACIONES ----------
  const resetearCalificaciones = () => {
    if (!window.confirm("¿Seguro que quieres borrar TODAS las calificaciones?"))
      return;

    const lista = proyectos.map((p) => ({ ...p, calificaciones: {} }));
    setProyectos(lista);
    guardarProyectos(lista);
    alert("Calificaciones borradas correctamente");
  };

  // ---------- REINICIAR SISTEMA ----------
  const reiniciarSistema = () => {
    if (
      !window.confirm(
        "⚠ Esto borrará todos los proyectos y cargará los nuevos. ¿Continuar?"
      )
    )
      return;

    const nuevosProyectos = [
      { id: 1, nombre: "2º ANIMACIÓN 3D", calificaciones: {} },
      { id: 2, nombre: "1º VDJ", calificaciones: {} },
      { id: 3, nombre: "2º MKT Y PUBLI", calificaciones: {} },
      { id: 4, nombre: "2º MICRO", calificaciones: {} },
      { id: 5, nombre: "1º EDIFICACIÓN", calificaciones: {} },
      { id: 6, nombre: "2º VDJ", calificaciones: {} },
      { id: 7, nombre: "1º ARI", calificaciones: {} },
      { id: 8, nombre: "1º MICRO", calificaciones: {} },
      { id: 9, nombre: "2º ARI", calificaciones: {} },
      { id: 10, nombre: "2º SONIDO", calificaciones: {} },
      { id: 11, nombre: "2º DAW", calificaciones: {} },
    ];

    setProyectos(nuevosProyectos);
    guardarProyectos(nuevosProyectos);
    alert("Sistema reiniciado correctamente");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Trophy /> Sistema de Calificación
      </h1>

      {/* Jurado */}
      <div className="mb-6">
        <label className="block font-semibold mb-1 flex items-center gap-2">
          <Users /> Nombre del jurado:
        </label>
        <input
          className="border p-2 w-full rounded"
          value={juradoActual}
          onChange={(e) => setJuradoActual(e.target.value)}
          placeholder="Escribe tu nombre"
        />
      </div>

      {/* Añadir proyecto */}
      <div className="flex items-center gap-2 mb-6">
        <input
          className="border p-2 rounded flex-1"
          value={nuevoProyecto}
          onChange={(e) => setNuevoProyecto(e.target.value)}
          placeholder="Nuevo proyecto"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={añadirProyecto}
        >
          <Plus /> Añadir
        </button>
      </div>

      {/* Lista de proyectos */}
      <div className="space-y-4">
        {proyectos.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow-sm bg-white">
            <div className="flex justify-between mb-2">
              <strong>{p.nombre}</strong>
              <button onClick={() => borrarProyecto(p.id)} className="text-red-600">
                <Trash2 />
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => calificar(p.id, n)}
                  className="border px-3 py-1 rounded"
                >
                  {n}
                </button>
              ))}
            </div>

            {Object.keys(p.calificaciones).length > 0 && (
              <div className="mt-3 text-sm">
                <strong>Calificaciones:</strong>{" "}
                {Object.entries(p.calificaciones)
                  .map(([j, v]) => `${j}: ${v}`)
                  .join(" | ")}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botones de control */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={resetearCalificaciones}
          className="bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RotateCcw /> Reset Cal.
        </button>

        <button
          onClick={reiniciarSistema}
          className="bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw /> Reiniciar Sistema
        </button>
      </div>
    </div>
  );
}

// Montar el componente en el HTML
ReactDOM.createRoot(document.getElementById("root")).render(<SistemaCalificacion />);
