import { useState } from "react";
import { login, register } from "../../api/auth.js";
import { Cat } from "../../components/Cat";

const FB_BLUE = "#1877F2";
const FB_BLUE_DARK = "#166FE5";
const FB_BACKGROUND = "#F0F2F5";
const FB_TEXT = "#1C1E21";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

export function Auth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
  });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isRegisterCloseHovered, setIsRegisterCloseHovered] = useState(false);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(username, password);

    if ("error" in result) {
      setError(result.error);
    } else {
      setAuthState({ isAuthenticated: true, username });
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await register(username, password);

    if ("error" in result) {
      setError(result.error);
    } else {
      setShowRegisterModal(false);
      setError("Регистрация успешна! Теперь войдите в систему.");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, username: null });
    setUsername("");
    setPassword("");
  };

  // Main screen after authentication
  if (authState.isAuthenticated) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: FB_BACKGROUND,
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <button
          type="button"
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "10px 24px",
            border: "none",
            borderRadius: 6,
            background: isCloseHovered ? FB_BLUE_DARK : FB_BLUE,
            color: "#FFFFFF",
            fontSize: 17,
            fontWeight: 700,
            cursor: "pointer",
            zIndex: 1001,
          }}
          onMouseEnter={() => { setIsCloseHovered(true); }}
          onMouseLeave={() => { setIsCloseHovered(false); }}
          onClick={handleLogout}
        >
          Выйти
        </button>
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              minWidth: 400,
              padding: 32,
              borderRadius: 8,
              background: "#FFFFFF",
              color: FB_TEXT,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: "0 0 16px", color: FB_BLUE }}>
              Добро пожаловать, {authState.username}!
            </h1>
            <p style={{ margin: "0 0 24px", color: "#65676B" }}>
              Вы успешно авторизовались в системе
            </p>
          </div>
        </div>
        <Cat />
      </div>
    );
  }

  // Login form
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: FB_BACKGROUND,
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          minWidth: 320,
          padding: 24,
          borderRadius: 8,
          background: "#FFFFFF",
          color: FB_TEXT,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0 0 20px", color: FB_BLUE }}>Авторизация</h2>

        <form onSubmit={(e) => {
          handleLogin(e).catch(() => {});
        }}>
          <div style={{ marginBottom: 16, textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Имя пользователя
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); }}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: 6,
                fontSize: 15,
                boxSizing: "border-box",
                outline: "none",
              }}
              onFocus={(e) => { e.target.style.borderColor = FB_BLUE; }}
              onBlur={(e) => { e.target.style.borderColor = "#ddd"; }}
            />
          </div>

          <div style={{ marginBottom: 20, textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: 6,
                fontSize: 15,
                boxSizing: "border-box",
                outline: "none",
              }}
              onFocus={(e) => { e.target.style.borderColor = FB_BLUE; }}
              onBlur={(e) => { e.target.style.borderColor = "#ddd"; }}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: 16,
                padding: "8px 12px",
                background: "#ffeaea",
                color: "#d32f2f",
                borderRadius: 6,
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "10px 24px",
              border: "none",
              borderRadius: 6,
              background: isButtonHovered ? FB_BLUE_DARK : FB_BLUE,
              color: "#FFFFFF",
              fontSize: 17,
              fontWeight: 700,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={() => { setIsButtonHovered(true); }}
            onMouseLeave={() => { setIsButtonHovered(false); }}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid #eee",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setShowRegisterModal(true);
              setError("");
            }}
            style={{
              background: "none",
              border: "none",
              color: FB_BLUE,
              fontSize: 15,
              cursor: "pointer",
              fontWeight: 600,
              padding: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)",
          }}
          onClick={() => {
            setShowRegisterModal(false);
            setError("");
          }}
        >
          <div
            style={{
              minWidth: 320,
              padding: 24,
              borderRadius: 8,
              background: "#FFFFFF",
              color: FB_TEXT,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
            onClick={(event) => { event.stopPropagation(); }}
          >
            <h2 style={{ margin: "0 0 20px", color: FB_BLUE }}>Регистрация</h2>

            <form onSubmit={(e) => {
              handleRegister(e).catch(() => {});
            }}>
              <div style={{ marginBottom: 16, textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); }}
                  required
                  minLength={3}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    fontSize: 15,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = FB_BLUE; }}
                  onBlur={(e) => { e.target.style.borderColor = "#ddd"; }}
                />
              </div>

              <div style={{ marginBottom: 20, textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); }}
                  required
                  minLength={6}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    fontSize: 15,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = FB_BLUE; }}
                  onBlur={(e) => { e.target.style.borderColor = "#ddd"; }}
                />
              </div>

              {error && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: "8px 12px",
                    background: "#ffeaea",
                    color: "#d32f2f",
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: 6,
                  background: isRegisterHovered ? FB_BLUE_DARK : FB_BLUE,
                  color: "#FFFFFF",
                  fontSize: 17,
                  fontWeight: 700,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={() => { setIsRegisterHovered(true); }}
                onMouseLeave={() => { setIsRegisterHovered(false); }}
              >
                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
              </button>
            </form>

            <div style={{ marginTop: 20 }}>
              <button
                type="button"
                onClick={() => {
                  setShowRegisterModal(false);
                  setError("");
                }}
                style={{
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: 6,
                  background: isRegisterCloseHovered ? FB_BLUE_DARK : FB_BLUE,
                  color: "#FFFFFF",
                  fontSize: 17,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onMouseEnter={() => { setIsRegisterCloseHovered(true); }}
                onMouseLeave={() => { setIsRegisterCloseHovered(false); }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
