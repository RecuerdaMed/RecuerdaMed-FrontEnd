import Button from "../components/ui/Button.jsx";
import { useState } from "react";

function AddDrug() {
  // Para que el botón con el formulario funcione.
  const [addDrug, setAddDrug] = useState(false);

  // Para abrir el formulario
  const openButton = () => {
    setAddDrug(true);
  };


  const closeButton = () => {
    setAddDrug(false);
  };

  return (
    <>
      <div className="flex justify-center self-center">
        <Button className="w-[40px] h-[40px]" onClick={openButton}>
          <h4>Añadir Medicamento</h4>
        </Button>

        {/* En donde se encuentra el formulario*/}
        {addDrug && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
            {/* Contenido del modal */}
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-[90%] p-6">
              {/* Header del modal con botón X */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="m-0 text-xl font-semibold">Nuevo Medicamento</h2>
                
              </div>

              {/* Aquí irá tu formulario después */}
              <div className="p-[1rem]">
                <form>
                    <section>
                  <label htmlFor="medication-name">
                    
                    <h4>Nombre del Medicamento: </h4>
                    <input
                      type="text"
                      className="border-[#D9D9D9] border-[1px] rounded-[5px] h-[30px]"
                    />
                  </label>
                </section>
                <br />
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="flex flex-col">
                      <label htmlFor="start-time" className="mb-2 font-medium">
                        Hora de inicio:
                      </label>
                      <input
                        id="start-time"
                        type="time"
                        className="h-[30px] w-[120px] border border-[#D9D9D9] rounded-[5px] flex justify-center"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="freq" className="mb-2 font-medium">
                        Frecuencia (en horas):
                      </label>
                      <input
                        id="freq"
                        type="number"
                        min="1"
                        max="24"
                        className="h-[30px] w-[120px] border border-[#D9D9D9] rounded-[5px]"
                      />
                    </div>
                  </section>
                </form>
              </div>

              {/* Botones del modal */}
              <div className="flex justify-end gap-[0.75rem] mt-[1.5rem]">
                <Button
                  onClick={closeButton}
                  className="bg-[#f3f4f6] text-[#374151] p-[1rem] border-none rounded-[0.375rem]cursor-pointer"
                >
                  Agregar
                </Button>
                <Button
                  onClick={closeButton}
                  className="bg-[#f3f4f6] text-[#374151] p-[1rem] border-none rounded-[0.375rem]cursor-pointer"
                >
                  Cancelar 
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddDrug;
