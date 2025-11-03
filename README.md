# Anmeldung Exkursion – Studierenden-Workflow

## Zielsetzung
- Self-Service-Prozess bauen, mit dem Studierende verfügbare Exkursionen finden, sich anmelden, ihren Status verfolgen und ggf. stornieren können.
- Saubere Übergabe der Anmeldedaten an das Team `Laufende_Exkursion` (Anzeige & Verwaltung) sowie langfristig an die zentrale API.
- Durchgehend Corporate-Design-konforme Oberfläche inkl. eingebundenem Header (`<div data-include="header"></div>` + `../Corporate_Design/js/ui/include.js`).

## Nutzerfluss (MVP)
1. Einstieg über eine Übersichtsseite (`index.html`) mit Hinweistexten, FAQs und Call-to-Action zum Formular.
2. Mehrstufiges Formular (`anmeldung.html`) mit Validierungen für Stammdaten, Kontaktdaten, Auswahl der Exkursion, Hinweise (z. B. Datenschutz).
3. Bestätigungsseite (`status.html`) mit Buchungsnummer, aktuellem Status (Zusage, Warteliste, Wartet auf Prüfung) und Möglichkeit zum Storno.
4. Optional: Mail-/Download-Bestätigung simulieren (PDF oder E-Mail-Template als Mockup).

## Seiten & Artefakte (geplant)
| Datei | Zweck | Status |
| --- | --- | --- |
| `index.html` | Landing inkl. CTA, FAQs, Links zu Richtlinien | in Arbeit |
| `anmeldung.html` | Multi-Step-Formular mit Progressbar, Validierung, DSGVO-Checkbox | in Arbeit |
| `status.html` | Statusanzeige + Buttons zum Daten-Update/Storno | in Arbeit |
| `css/anmeldung.css` | Ergänzende Styles (nur Erweiterungen zum Corporate Design) | in Arbeit |
| `js/anmeldung.js` | Formularlogik, lokale Speicherung/Mock-API Calls | in Arbeit |
| `docs/flows.md` | Dokumentation zu User Journey, Wireframes/Links | in Arbeit |

> Hinweis: Datenhaltung zunächst via `localStorage` oder statischer JSON (`../api/exkursionen.json`). Schnittstelle mit dem API-Team abstimmen.

## Team & Zuständigkeiten
| Aufgabe | Owner | Status | Notizen |
| --- | --- | --- | --- |
| Requirements sammeln, Personas definieren | Vincent | offen | Interviews/Recherche, Rücksprache mit Projektleitung |
| Wireframes & Copy (Landing + Formular) | Vincent & Sinan | offen | Low-Fidelity in Figma, Screenshot/Link in `docs/` ablegen |
| HTML/CSS Grundgerüst (`index.html`, Header-Einbindung) | Sinan | in Arbeit | Grundgerüst & Layout angelegt |
| Formularlogik & Validierungen | Vincent | in Arbeit | Basis-Navigation & Validierungshooks vorbereitet |
| Status-Handling & lokale Persistenz | Sinan | in Arbeit | Mock-Daten + localStorage-Speicher angelegt |
| QA & Dokumentation | beide | offen | Testfälle, README-Updates, Screenshots |

Status-Legende: `offen`, `in Arbeit`, `fertig`, `blockiert`.

## Abstimmungen & Schnittstellen
- `Laufende_Exkursion`: Gemeinsames Datenmodell (Exkursions-ID, Datum, max. Plätze, Verantwortliche), Deeplinks aus dem Plan auf das Anmeldeformular.
- `Corporate_Design`: Header/Footer unverändert übernehmen, alle neuen Komponenten zuerst gegen `Corporate_Design/css/corporate-design.css` prüfen.
- `API`: Vorbereiten einer POST-Struktur (`/exkursionen/anmeldung`) und einer GET-Abfrage für Status (`/exkursionen/anmeldung/{id}`), bis API produktiv ist Mock-Endpunkte verwenden.

## Nächste Schritte (Woche 1)
1. Kickoff-Call mit Laufende-Exkursion + Corporate-Design-Team, um Datenfelder und Komponenten abzustimmen.
2. Low-Fi-Wireframes erstellen und im `docs/`-Ordner (oder verlinkt) dokumentieren.
3. Grundgerüst (`index.html`, `anmeldung.html`, Header-Einbindung) erstellen und mit leeren Sektionen commiten.

## Offene Fragen
- Brauchen wir Genehmigungs-Workflow (z. B. Warteliste -> manuelle Freigabe)?
- Welche Pflichtfelder fordert die Studiengangsleitung (Telefon, Notfallkontakt, Versicherung)?
- Soll ein Upload (z. B. Einverständniserklärung) möglich sein?

## Ressourcen
- Corporate Design Vorgaben: `../Corporate_Design/css/corporate-design.css`
- Beispiel-Header: `../Corporate_Design/components/header.html`
- Projektweite README: `../README.md`

> Bitte diesen Stand nach jedem Sprint aktualisieren (Status-Spalte, neue Artefakte, Entscheidungen).
