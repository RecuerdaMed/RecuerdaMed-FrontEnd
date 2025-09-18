import Button from "../components/ui/Button.jsx";
import { useState } from "react";

function AddDrug() {
  const [addDrug, setAddDrug] = useState(false);

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
          <h4>Añadir</h4>
        </Button>

        {addDrug && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-[90%] p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="m-0 text-xl font-semibold">Nuevo Medicamento</h2>
              </div>
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
              <div className="flex justify-end gap-[0.75rem] mt-[1.5rem]">
                <button
                  onClick={closeButton}
                  className="text-gray-700 font-medium focus:outline-none cursor-pointer"
                >
                  Cancelar
                </button>
                <Button
                  onClick={closeButton}
                  className="bg-blue-600 text-white p-[1rem] border-none rounded-[0.375rem] cursor-pointer"
                >
                  Guardar
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