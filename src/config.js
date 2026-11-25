// ============================================================
//  ✏️  TODO LO QUE PUEDES PERSONALIZAR ESTÁ EN ESTE ARCHIVO
// ============================================================

export const config = {
  novios: {
    el: "Leonel",
    ella: "Ariday",
    monograma: "L & A",
  },

  // Fecha y hora de la ceremonia (zona horaria de Morelos, UTC-6)
  fechaBoda: "2027-01-10T13:00:00-06:00",
  fechaTexto: "Domingo, 10 de enero de 2027",

  // Última fecha para confirmar (inclusive)
  fechaLimiteRSVP: "2026-12-31T23:59:59-06:00",
  fechaLimiteTexto: "31 de diciembre de 2026",

  codigoVestimenta: "Semiformal – Formal",

  ceremonia: {
    titulo: "La Ceremonia Religiosa",
    hora: "1:00 PM",
    lugar: "Iglesia Adventista de Xoxocotla 1 (Central)",
    direccion: "Calle 20 de Noviembre, callejón Privado S/N, Xoxocotla, Morelos",
    // Si tienes el enlace exacto de Google Maps, pégalo aquí. Si lo dejas vacío se busca por dirección.
    mapa: "",
  },

  recepcion: {
    titulo: "La Recepción",
    hora: "4:00 PM", // ← pon la hora (ej. "3:00 PM") y aparecerá automáticamente
    lugar: "Salón Paraíso Escondido (La Escondida Jardín)",
    direccion: "Callejón Privada La Escondida s/n, Xoxocotla, Morelos",
    mapa: "",
  },

  // WhatsApp de contacto con lada, solo números. Ej: "527341234567". Vacío = se oculta el botón.
  whatsapp: "527341241149",

  // ---- Confirmación de asistencia ----
  // Pega aquí la URL de tu Apps Script (ver README). Si está vacío, la confirmación
  // se envía por WhatsApp (necesita el número de arriba).
  rsvpEndpoint: "https://script.google.com/macros/s/AKfycbwS992SuJs2q2XKsb8SOgVI1sq0UIre7ahpP_k5mipkJQiU-zR7-mNW9vQ8mNkyJGjO/exec",


};
