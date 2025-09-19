export function WelcomeMessage() {
  return (
    <section className="text-center py-8 mb-8 bg-gradient-to-b from-blue-50 to-white rounded-xl mx-4">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 leading-relaxed">
          ¡Bienvenido a tu gestor de medicación!
        </h1>
        <p className="text-lg md:text-xl text-blue-600 mb-6 leading-relaxed">
          Nunca más olvides una toma
        </p>
        
       
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1">Recordatorios claros</h3>
            <p className="text-sm text-gray-600">Nunca olvides tomar tu medicación</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-1">Calendario visual</h3>
            <p className="text-sm text-gray-600">Ve tu tratamiento de forma clara</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            
            <h3 className="font-semibold text-gray-800 mb-1">Fácil de usar</h3>
            <p className="text-sm text-gray-600">Diseñado pensando en ti</p>
          </div>
        </div>
      </div>
    </section>
  );
}
