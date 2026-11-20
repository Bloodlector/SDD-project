import { useState, useRef, type CSSProperties } from "react";
import { createRecord } from "../../api/records.js";
import { FB_BLUE, FB_TEXT } from "../../styles/palette";

type FormState = "idle" | "sending" | "success" | "error" | "unknown";

export function RecordForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [recordId, setRecordId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const hasNameError = state === "error" && name.trim() === "";
  const hasDescError = state === "error" && description.trim() === "";

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setState("idle");
    setRecordId(null);
    setErrorMessage("");

    if (name.trim() === "" || description.trim() === "") {
      setState("error");
      setErrorMessage("Заполните все поля");
      if (name.trim() === "") {
        nameRef.current?.focus();
      }
      return;
    }

    setState("sending");

    const result = await createRecord(name, description);

    if ("error" in result) {
      setState("error");
      setErrorMessage(result.error);
    } else {
      setRecordId(result.data.record.id);
      setState("success");
      setName("");
      setDescription("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const cardStyle: CSSProperties = {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 8,
    background: "#FFFFFF",
    color: FB_TEXT,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    marginBottom: 12,
    border: `1px solid ${hasNameError || hasDescError ? "#e34c5c" : "#ddd"}`,
    borderRadius: 4,
    fontSize: 14,
    boxSizing: "border-box",
  };

  const buttonStyle: CSSProperties = {
    width: "100%",
    padding: "10px 16px",
    background: state === "sending" ? "#ccc" : FB_BLUE,
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontSize: 14,
    cursor: state === "sending" ? "not-allowed" : "pointer",
    marginTop: 8,
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ margin: "0 0 16px", color: FB_BLUE }}>Отправить запись</h2>
      <form onSubmit={(e) => {
        void handleSubmit(e);
      }}>
        <label>
          Название:
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            placeholder="Введите название"
            disabled={state === "sending"}
          />
        </label>
        {hasNameError && (
          <span style={{ color: "#e34c5c", fontSize: 12, display: "block", marginBottom: 8 }}>
            Поле обязательно для заполнения
          </span>
        )}

        <label>
          Описание:
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
            placeholder="Введите описание"
            disabled={state === "sending"}
          />
        </label>
        {hasDescError && (
          <span style={{ color: "#e34c5c", fontSize: 12, display: "block", marginBottom: 8 }}>
            Поле обязательно для заполнения
          </span>
        )}

        <button type="submit" style={buttonStyle} disabled={state === "sending"}>
          {state === "sending" ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {state === "success" && recordId && (
        <div
          role="status"
          aria-live="polite"
          style={{ marginTop: 12, padding: 8, background: "#e8f5e9", borderRadius: 4, color: "#2e7d32" }}
        >
          Запись отправлена. Номер записи: {recordId}
        </div>
      )}

      {state === "error" && errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          style={{ marginTop: 12, padding: 8, background: "#fce4ec", borderRadius: 4, color: "#c62828" }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
