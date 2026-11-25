/**
 * Recibe las confirmaciones de la página y las guarda en esta hoja de Google Sheets.
 * Si la misma persona (mismo teléfono) vuelve a confirmar, ACTUALIZA su fila en lugar de duplicarla.
 */
const HOJA = "Confirmaciones";
const COLUMNAS = ["Fecha", "Nombre", "Asistencia", "Teléfono", "Comentarios"];
const solo10 = (t) => String(t || "").replace(/\D/g, "").slice(-10);

function doPost(e) {
  const p = e.parameter || {};
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(HOJA);
    if (!sh) {
      sh = ss.insertSheet(HOJA);
      sh.appendRow(COLUMNAS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, COLUMNAS.length).setFontWeight("bold").setBackground("#14286b").setFontColor("#ffffff");
      sh.getRange("D:D").setNumberFormat("@");
    }
    const fila = [new Date(), p.nombre || "", p.asistencia || "", p.telefono || "", p.comentarios || ""];

    let destino = -1;
    const tel = solo10(p.telefono);
    if (tel && sh.getLastRow() > 1) {
      const tels = sh.getRange(2, 4, sh.getLastRow() - 1, 1).getValues().flat().map(solo10);
      const i = tels.indexOf(tel);
      if (i >= 0) destino = i + 2;
    }
    if (destino > 0) sh.getRange(destino, 1, 1, fila.length).setValues([fila]);
    else sh.appendRow(fila);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return ContentService.createTextOutput("OK"); }
