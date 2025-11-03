/* Baseline-Logik für den Anmeldeprototyp */

const trips = [
  {
    id: "EX-BEL-2025-01",
    name: "Belgrad Tech & City Tour",
    date: "15.05.2025",
    seats: 25,
    waitlist: false,
  },
  {
    id: "EX-SAP-2025-02",
    name: "SAP Walldorf Innovation Day",
    date: "22.05.2025",
    seats: 40,
    waitlist: true,
  },
];

const storageKey = "ae-bookings";

const form = document.querySelector("#exkursion-form");
const steps = form ? Array.from(form.querySelectorAll(".form-step")) : [];
const nextBtn = form?.querySelector("[data-next]");
const prevBtn = form?.querySelector("[data-prev]");
const submitBtn = form?.querySelector("[data-submit]");
const progressBar = document.querySelector("[data-progress]");

const statusForm = document.querySelector("#status-form");
const statusSection = document.querySelector("[data-status-result]");
const statusLabel = document.querySelector("[data-status-label]");
const statusTrip = document.querySelector("[data-status-trip]");
const statusDate = document.querySelector("[data-status-date]");
const statusNotes = document.querySelector("[data-status-notes]");
const historyList = document.querySelector("[data-history]");

const cancelBtn = document.querySelector("[data-cancel]");
const editBtn = document.querySelector("[data-edit]");

let activeStep = 0;

function validateStep(step) {
  const fields = step.querySelectorAll("input, select, textarea");
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

function loadBookings() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Konnte Buchungen nicht lesen:", err);
    return [];
  }
}

function saveBooking(booking) {
  const bookings = loadBookings();
  bookings.push(booking);
  localStorage.setItem(storageKey, JSON.stringify(bookings));
}

function updateHistory() {
  if (!historyList) return;
  const bookings = loadBookings().slice(-5).reverse();
  historyList.innerHTML = "";
  if (!bookings.length) {
    historyList.innerHTML = "<li>Noch keine Anmeldungen vorhanden.</li>";
    return;
  }
  bookings.forEach((booking) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${booking.tripName}</strong> – ${booking.date} – Status: ${booking.status}`;
    historyList.appendChild(li);
  });
}

function setStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
  activeStep = index;
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.hidden = index === steps.length - 1;
  if (submitBtn) submitBtn.hidden = index !== steps.length - 1;
  if (progressBar) progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
}

function initForm() {
  if (!form) return;

  const select = form.querySelector('select[name="tripId"]');
  trips.forEach((trip) => {
    const option = document.createElement("option");
    option.value = trip.id;
    option.textContent = `${trip.name} – ${trip.date}`;
    select?.appendChild(option);
  });

  setStep(0);

  nextBtn?.addEventListener("click", () => {
    const currentStep = steps[activeStep];
    if (!validateStep(currentStep)) return;
    setStep(Math.min(activeStep + 1, steps.length - 1));
  });

  prevBtn?.addEventListener("click", () => {
    setStep(Math.max(activeStep - 1, 0));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const trip = trips.find((item) => item.id === data.tripId);
    const bookingId = `EX-${Date.now()}`;
    const status = trip?.waitlist ? "Warteliste" : "Zugelassen";

    saveBooking({
      id: bookingId,
      tripId: data.tripId,
      tripName: trip?.name ?? "Unbekannt",
      date: trip?.date ?? "",
      createdAt: new Date().toISOString(),
      status,
      notes: data.notes ?? "",
    });

    updateHistory();
    window.location.href = `status.html?booking=${encodeURIComponent(bookingId)}`;
  });
}

function renderStatus(booking) {
  if (!statusSection) return;
  statusSection.hidden = !booking;
  if (!booking) return;
  statusLabel.textContent = booking.status;
  statusTrip.textContent = booking.tripName;
  statusDate.textContent = booking.date;
  statusNotes.textContent = booking.notes || "Keine zusätzlichen Hinweise.";
}

function initStatusPage() {
  if (!statusForm) return;
  updateHistory();

  const params = new URLSearchParams(window.location.search);
  const initialBooking = params.get("booking");
  if (initialBooking) {
    showBooking(initialBooking);
  }

  statusForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(statusForm);
    const bookingId = formData.get("bookingId");
    if (!bookingId) return;
    showBooking(bookingId.toString());
  });

  cancelBtn?.addEventListener("click", () => {
    const currentId = statusLabel?.dataset?.bookingId;
    if (!currentId) return;
    const bookings = loadBookings();
    const updated = bookings.map((entry) =>
      entry.id === currentId ? { ...entry, status: "Storniert" } : entry,
    );
    localStorage.setItem(storageKey, JSON.stringify(updated));
    showBooking(currentId);
  });

  editBtn?.addEventListener("click", () => {
    window.location.href = "anmeldung.html";
  });
}

function showBooking(bookingId) {
  const bookings = loadBookings();
  const booking = bookings.find((entry) => entry.id === bookingId);
  if (!booking) {
    renderStatus(null);
    statusSection?.setAttribute("aria-live", "polite");
    statusSection?.insertAdjacentHTML(
      "afterbegin",
      '<p class="error">Keine Buchung gefunden. Bitte prüfe die Buchungsnummer.</p>',
    );
    return;
  }
  statusLabel.dataset.bookingId = bookingId;
  renderStatus(booking);
}

initForm();
initStatusPage();
