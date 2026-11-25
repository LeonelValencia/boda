# 💙 Boda Leonel & Ariday — invitación web (React + Vite)

Una sola página para todos los invitados (sin nombres ni lugares personalizados).

## Probar
```bash
npm install
npm run dev      # http://localhost:5173
```

## Personalizar
Todo (fecha, hora de la recepción, WhatsApp, vestimenta, fecha límite) está en **`src/config.js`**.
Pendientes: `recepcion.hora`, `whatsapp`, `rsvpEndpoint`.
La foto de ustedes está en `public/img/pareja.jpg` (reemplázala conservando el nombre).

## Recibir confirmaciones (Google Sheets, gratis)
1. Hoja nueva en Google Sheets → **Extensiones → Apps Script**.
2. Pega `apps-script/Code.gs` → Guardar.
3. **Implementar → Nueva implementación → Aplicación web** · Ejecutar como *Yo* · Acceso *Cualquier persona*.
4. Copia la URL `/exec` en `src/config.js` → `rsvpEndpoint`.
Cada respuesta cae en la pestaña **Confirmaciones** (Nombre, Asistencia, Teléfono, Comentarios). Si alguien vuelve a confirmar con el mismo teléfono, se actualiza su fila.
(Si ya habías creado el script anterior: pega el código nuevo y haz **Implementar → Administrar → Nueva versión**.)
Sin `rsvpEndpoint`, el botón abre WhatsApp con la respuesta escrita (necesita `whatsapp`).

## Publicar en GitHub Pages
```bash
git init && git add . && git commit -m "Invitación de boda"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/boda.git
git push -u origin main
```
GitHub → **Settings → Pages → Source: GitHub Actions**. Quedará en `https://TU-USUARIO.github.io/boda/`.
