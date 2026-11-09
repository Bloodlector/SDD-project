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
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Главная");

  const menuItems = ["Главная", "Новости", "Сообщения", "Друзья", "Настройки"];

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
        {/* Top bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 56,
            background: "#FFFFFF",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: FB_BLUE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              A
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: FB_BLUE }}>
              App
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: 6,
                background: isProfileHovered ? "#E4E6E9" : "#F0F2F5",
                color: FB_TEXT,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
              onClick={() => {}}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="5" r="3.5" />
                <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
              </svg>
              Профиль
            </button>
            <button
              type="button"
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: 6,
                background: isCloseHovered ? FB_BLUE_DARK : FB_BLUE,
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Left sidebar */}
        <div
          style={{
            position: "fixed",
            top: 56,
            left: 0,
            bottom: 0,
            width: 240,
            background: "#FFFFFF",
            borderRight: "1px solid #E4E6E9",
            padding: "16px 8px",
            zIndex: 999,
            overflowY: "auto",
          }}
        >
          <nav>
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => { setActiveMenu(item); }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 12px",
                  border: "none",
                  borderRadius: 8,
                  background: activeMenu === item ? "#E7F3FF" : "transparent",
                  color: activeMenu === item ? FB_BLUE : FB_TEXT,
                  fontSize: 15,
                  fontWeight: activeMenu === item ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 2,
                }}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div
          style={{
            position: "fixed",
            top: 56,
            left: 240,
            right: 0,
            bottom: 0,
            padding: 24,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              maxWidth: 680,
              margin: "0 auto",
              background: "#FFFFFF",
              borderRadius: 8,
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              padding: 24,
            }}
          >
            <h2 style={{ margin: "0 0 16px", color: FB_TEXT, fontSize: 24 }}>
              {activeMenu}
            </h2>
            <p style={{ margin: 0, color: "#65676B", fontSize: 16 }}>
              Раздел &laquo;{activeMenu}&raquo; — в разработке
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
