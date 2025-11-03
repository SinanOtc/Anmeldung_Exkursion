# User Flows – Anmeldung Exkursion

## 1. Übersicht → Anmeldung
1. Studierende:r landet auf `index.html`.
2. Klick auf „Jetzt anmelden“ öffnet `anmeldung.html`.
3. Formular Schritt 1 prüft Stammdaten (Pflichtfelder, Matrikelnummer).
4. Nach erfolgreicher Validierung Weiter zu Schritt 2.

## 2. Formularabschluss
1. Schritt 2 sammelt Kontakt- und Notfalldaten.
2. Schritt 3 enthält Hinweise und DSGVO-Bestätigung.
3. Nach Submit wird eine Buchungs-ID generiert und in `localStorage` abgelegt.
4. Browser leitet zu `status.html?booking=<ID>` weiter.

## 3. Status prüfen & Stornieren
1. Auf `status.html` wird die Buchungs-ID automatisch geladen (wenn Parameter vorhanden).
2. Die Seite zeigt Status, Exkursion, Datum, Hinweise.
3. Aktion „Teilnahme stornieren“ setzt den Status auf „Storniert“ und speichert.
4. „Anfrage anpassen“ führt zurück zum Formular mit neuem Eintrag.

## Datenmodell (Mock)
```json
{
  "id": "EX-1739964360000",
  "tripId": "EX-BEL-2025-01",
  "tripName": "Belgrad Tech & City Tour",
  "date": "15.05.2025",
  "status": "Zugelassen",
  "createdAt": "2025-01-15T08:46:00.000Z",
  "notes": ""
}
```

> Im finalen System werden diese Informationen per API mit dem Team „Laufende Exkursion“ geteilt.
