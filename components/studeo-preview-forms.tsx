"use client";

import { FormEvent, useState } from "react";
import { NoticeBanner } from "@/components/studeo-shell";

type PreviewStatus = "idle" | "submitting" | "success";

function PreviewNotice() {
  return (
    <NoticeBanner
      title="Mode aperçu"
      detail="Le formulaire peut être testé, mais aucune donnée ne sera enregistrée avant le raccordement métier."
      tone="info"
    />
  );
}

function Result({ status, message }: { status: PreviewStatus; message: string }) {
  if (status === "idle") return null;
  return (
    <p className="studeo-action-result is-success" role="status">
      {status === "submitting"
        ? "Vérification de l’aperçu…"
        : `${message} dans l’aperçu. Aucune donnée enregistrée.`}
    </p>
  );
}

function PreviewCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section aria-live="polite">
      <h2 className="studeo-preview-title">Aperçu</h2>
      <div className="studeo-panel">
        <strong>{title}</strong>
        {lines.map((line) => (
          <p className="muted" key={line}>
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

export function TaskPreviewForm() {
  const [status, setStatus] = useState<PreviewStatus>("idle");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [dueDate, setDueDate] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 450));
    setStatus("success");
  }

  const priorityLabel =
    { low: "basse", normal: "normale", urgent: "urgente" }[priority] ??
    "normale";

  return (
    <>
      <form className="studeo-panel studeo-form" onSubmit={submit}>
        <label className="studeo-field">
          <span>Titre de la tâche *</span>
          <input
            maxLength={160}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex : Exercices de mathématiques"
            required
            value={title}
          />
        </label>
        <label className="studeo-field">
          <span>Description</span>
          <textarea
            maxLength={2000}
            placeholder="Ajouter des détails (optionnel)"
          />
        </label>
        <label className="studeo-field">
          <span>Matière</span>
          <select defaultValue="math">
            <option value="math">Mathématiques</option>
            <option value="french">Français</option>
            <option value="physics">Physique</option>
          </select>
        </label>
        <div className="studeo-form-row">
          <label className="studeo-field">
            <span>Priorité</span>
            <select
              onChange={(event) => setPriority(event.target.value)}
              value={priority}
            >
              <option value="low">Basse</option>
              <option value="normal">Normale</option>
              <option value="urgent">Urgente</option>
            </select>
          </label>
          <label className="studeo-field">
            <span>Date limite</span>
            <input
              onChange={(event) => setDueDate(event.target.value)}
              type="date"
              value={dueDate}
            />
          </label>
        </div>
        <div className="studeo-form-row">
          <label className="studeo-field">
            <span>Rappel</span>
            <select defaultValue="none">
              <option value="none">Aucun rappel</option>
              <option value="day">La veille</option>
              <option value="hour">1 heure avant</option>
            </select>
          </label>
          <label className="studeo-field">
            <span>Étiquettes</span>
            <input placeholder="Ex : devoir, révision" />
          </label>
        </div>
        <button
          className="studeo-primary"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Vérification…" : "Tester l’aperçu"}
        </button>
        <Result status={status} message="Tâche validée" />
      </form>
      <div>
        <PreviewNotice />
        <PreviewCard
          title={title.trim() || "Exercices de mathématiques"}
          lines={[
            `Priorité ${priorityLabel} · ${dueDate ? formatDate(dueDate) : "échéance à définir"}`,
          ]}
        />
      </div>
    </>
  );
}

export function EventPreviewForm() {
  const [status, setStatus] = useState<PreviewStatus>("idle");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [location, setLocation] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 450));
    setStatus("success");
  }

  return (
    <>
      <form className="studeo-panel studeo-form" onSubmit={submit}>
        <label className="studeo-field">
          <span>Titre de l&apos;événement *</span>
          <input
            maxLength={160}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex : Contrôle de mathématiques"
            required
            value={title}
          />
        </label>
        <label className="studeo-field">
          <span>Type d&apos;événement</span>
          <select defaultValue="course">
            <option value="course">Cours</option>
            <option value="exam">Contrôle</option>
            <option value="presentation">Exposé</option>
            <option value="other">Autre</option>
          </select>
        </label>
        <label className="studeo-field">
          <span>Matière</span>
          <select defaultValue="math">
            <option value="math">Mathématiques</option>
            <option value="french">Français</option>
            <option value="physics">Physique</option>
          </select>
        </label>
        <div className="studeo-form-row">
          <label className="studeo-field">
            <span>Date *</span>
            <input
              onChange={(event) => setDate(event.target.value)}
              required
              type="date"
              value={date}
            />
          </label>
          <label className="studeo-field">
            <span>Heure *</span>
            <input
              onChange={(event) => setTime(event.target.value)}
              required
              type="time"
              value={time}
            />
          </label>
        </div>
        <div className="studeo-form-row">
          <label className="studeo-field">
            <span>Durée</span>
            <select
              onChange={(event) => setDuration(Number(event.target.value))}
              value={duration}
            >
              <option value="30">30 min</option>
              <option value="60">1h</option>
              <option value="90">1h30</option>
            </select>
          </label>
          <label className="studeo-field">
            <span>Lieu</span>
            <input
              maxLength={160}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Salle 204"
              value={location}
            />
          </label>
        </div>
        <label className="studeo-field">
          <span>Notification</span>
          <select defaultValue="15">
            <option value="0">À l&apos;heure de l&apos;événement</option>
            <option value="5">5 minutes avant</option>
            <option value="15">15 minutes avant</option>
            <option value="30">30 minutes avant</option>
          </select>
        </label>
        <label className="studeo-field">
          <span>Description</span>
          <textarea
            maxLength={2000}
            placeholder="Ajouter des notes (optionnel)"
          />
        </label>
        <button
          className="studeo-primary"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Vérification…" : "Tester l’aperçu"}
        </button>
        <Result status={status} message="Événement validé" />
      </form>
      <div>
        <PreviewNotice />
        <PreviewCard
          title={title.trim() || "Contrôle de mathématiques"}
          lines={[
            `${date ? formatDate(date) : "Date à définir"} · ${time || "09:30"} – ${endTime(time || "09:30", duration)}`,
            location.trim() || "Lieu à définir",
          ]}
        />
      </div>
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

function endTime(value: string, duration: number) {
  const [hours, minutes] = value.split(":").map(Number);
  const total = (hours * 60 + minutes + duration) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}
