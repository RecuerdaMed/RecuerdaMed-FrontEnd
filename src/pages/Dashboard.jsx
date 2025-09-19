import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllDrugs, markAsTaken } from "../services/Services";
import { notificationService } from "../services/NotificationService";
import { parseISO, isSameDay, format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Bell, Clock, Repeat } from "lucide-react";
import Button from "../components/ui/Button";
import { WelcomeMessage } from "../components/ui/WelcomeMessage";

export default function Dashboard() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const today = useMemo(() => new Date(), []);
  const todayLabel = useMemo(
    () => format(today, "EEEE, d 'de' MMMM", { locale: es }),
    [today]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllDrugs();
      const medicationsList = Array.isArray(data) ? data : [];
      setDrugs(medicationsList);
      if (notificationsEnabled && medicationsList.length > 0) {
        notificationService.startMedicationChecker(medicationsList);
      }
    } catch (err) {
      setError("Error al cargar los medicamentos. Verifica tu conexión.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [notificationsEnabled]);

  useEffect(() => {
    load();
    return () => {
      notificationService.clearAllAlarms();
    };
  }, [load]);

  const enableNotifications = async () => {
    try {
      const granted = await notificationService.requestPermission();
      if (granted) {
        setNotificationsEnabled(true);
        notificationService.startMedicationChecker(drugs);
        setError("success:Notificaciones activadas correctamente");
        setTimeout(() => setError(""), 4000);
      } else {
        setError("Los permisos de notificación son necesarios para recibir recordatorios automáticos. Puedes habilitarlos en la configuración de tu navegador.");
      }
    } catch (err) {
      setError("Error al habilitar notificaciones: " + err.message);
    }
  };

  const disableNotifications = () => {
    notificationService.clearAllAlarms();
    setNotificationsEnabled(false);
    setError("info:Notificaciones desactivadas");
    setTimeout(() => setError(""), 3000);
  };

  const isDueToday = (d) => {
    const start = d.startDate ? parseISO(d.startDate) : null;
    const end = d.endDate ? parseISO(d.endDate) : null;
    if (!start) return false;
    const inRange = isSameDay(today, start) || (today >= start && (!end || today <= end));
    return inRange && !d.taken;
  };

  const todays = drugs
    .filter(isDueToday)
    .sort((a, b) => (a.nextIntakeTime || "").localeCompare(b.nextIntakeTime || ""));

  const upcoming = todays
    .slice()
    .filter((d) => d.nextIntakeTime)
    .sort((a, b) => a.nextIntakeTime.localeCompare(b.nextIntakeTime));

  const pendingCount = todays.length;

  const takeNow = async (id) => {
    try {
      await markAsTaken(id);
      await load();
      notificationService.speakReminder("Medicamento registrado como tomado");
    } catch (err) {
      setError("Error al registrar el medicamento como tomado");
      console.error(err);
    }
  };

  const testNotification = () => {
    notificationService.showBrowserNotification("Prueba de recordatorio", {
      body: "El sistema de notificaciones funciona correctamente"
    });
    notificationService.speakReminder("Prueba de recordatorio por voz");
    notificationService.playAlarmSound();
  };

  const getErrorType = (errorMsg) => {
    if (errorMsg.startsWith("success:")) return "success";
    if (errorMsg.startsWith("info:")) return "info";
    return "error";
  };

  const cleanErrorMessage = (errorMsg) => {
    return errorMsg.replace(/^(success:|info:|error:)/, "");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <WelcomeMessage />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="text-left">
              <h1 className="text-3xl font-light text-gray-800 mb-1">Recordatorios</h1>
              <p className="text-lg text-blue-600 font-medium">{todayLabel}</p>

              {error && (
                <div
                  className={`mt-4 p-4 rounded-lg border-l-4 ${getErrorType(error) === "success"
                      ? "bg-green-50 border-green-400 text-green-700"
                      : getErrorType(error) === "info"
                        ? "bg-blue-50 border-blue-400 text-blue-700"
                        : "bg-red-50 border-red-400 text-red-700"
                    }`}
                >
                  <p className="text-sm font-medium">{cleanErrorMessage(error)}</p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/medicamentos">
                  <Button variant="primary" size="lg">Mi medicación</Button>
                </Link>
                <Link to="/calendar">
                  <Button variant="secondary" size="lg">Ver calendario</Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Recordatorios automáticos</h2>
                <div className="mb-6">
                  {!notificationsEnabled ? (
                    <Button
                      onClick={enableNotifications}
                      variant="success"
                      size="large"
                      className="w-full"
                    >
                      Activar recordatorios
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={disableNotifications}
                        variant="dangerOutline"
                        size="medium"
                        className="w-full"
                      >
                        Desactivar recordatorios
                      </Button>
                      <Button
                        onClick={testNotification}
                        variant="neutral"
                        size="medium"
                        className="w-full"
                      >
                        Probar notificación
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {notificationsEnabled
                    ? "Los recordatorios están activos. Recibirás alertas visuales y sonoras para no olvidar tu medicación."
                    : "Activa los recordatorios para recibir alertas automáticas cuando sea la hora de tomar tu medicación."}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 mt-10 lg:mt-20">
            <section className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Medicamentos pendientes
                  </h2>
                  {pendingCount > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {loading && (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-3 text-gray-600">Cargando medicamentos...</p>
                  </div>
                )}

                {!loading && pendingCount === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      ¡Perfecto! No tienes medicamentos pendientes hoy
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Has cumplido con tu tratamiento del día
                    </p>
                    <Link to="/medicamentos">
                      <Button variant="primary">
                        Gestionar medicamentos
                      </Button>
                    </Link>
                  </div>
                )}

                {!loading && pendingCount > 0 && (
                  <div className="space-y-4">
                    {todays.map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                            <h3 className="font-semibold text-gray-800">
                              {d.drugName}
                            </h3>
                            {d.dosage && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {d.dosage}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 ml-6">
                            {d.nextIntakeTime && (
                              <span className="inline-flex items-center mr-4">
                                <Clock className="w-4 h-4 mr-1" />
                                {d.nextIntakeTime}
                              </span>
                            )}
                            {d.frequencyHours && (
                              <span className="inline-flex items-center">
                                <Repeat className="w-4 h-4 mr-1" />
                                Cada {d.frequencyHours}h
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => takeNow(d.id)}
                          variant="success"
                          disabled={loading}
                          className="ml-4"
                        >
                          Marcar como tomada
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {upcoming.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Próximas tomas programadas
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {upcoming.map((d) => (
                      <div key={d.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <h3 className="font-medium text-gray-800">{d.drugName}</h3>
                        </div>
                        <div className="text-sm text-gray-600 ml-5">
                          <p className="font-medium">{d.nextIntakeTime || "Sin hora especificada"}</p>
                          {d.dosage && <p>{d.dosage}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
