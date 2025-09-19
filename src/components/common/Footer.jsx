export default function Footer() {
  return (
    <footer
      className="border-t border-gray-300 py-6 text-sm text-gray-600 text-center space-y-4"
      role="contentinfo"
    >
      <nav aria-label="Enlaces del pie de página" className="flex justify-center gap-6">
        <a
          href="/contact"
          className="text-[#295ADC] font-semibold text-base hover:underline focus:outline-none focus:ring-2 focus:ring-[#295ADC]"
        >
          Contáctanos
        </a>
        <a
          href="/privacy"
          className="text-[#295ADC] font-semibold text-base hover:underline focus:outline-none focus:ring-2 focus:ring-[#295ADC]"
        >
          Política de Privacidad
        </a>
      </nav>

      <p aria-label="Derechos reservados">
        © 2025 <span className="font-semibold">Sanitas, S.A. de Seguros</span>. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}
