import { useState } from 'react'

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loginInput, setLoginInput] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [error, setError] = useState('')

  function getUsers() {
    return JSON.parse(localStorage.getItem('fit_users') || '[]')
  }

  function switchMode(m) {
    setMode(m)
    setError('')
    setLogin('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
    setLoginInput('')
    setPasswordLogin('')
  }

  function handleRegister() {
    setError('')
    if (!login.trim() || !email.trim() || !password || !passwordConfirm) {
      setError('Uzupełnij wszystkie pola.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Podaj prawidłowy adres email.')
      return
    }
    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków.')
      return
    }
    if (password !== passwordConfirm) {
      setError('Hasła nie są zgodne.')
      return
    }
    const users = getUsers()
    if (users.some(u => u.login === login.trim())) {
      setError('Podany login jest już zajęty.')
      return
    }
    if (users.some(u => u.email === email.trim().toLowerCase())) {
      setError('Podany email jest już zarejestrowany.')
      return
    }
    const newUser = {
      login: login.trim(),
      email: email.trim().toLowerCase(),
      password,
    }
    localStorage.setItem('fit_users', JSON.stringify([...users, newUser]))
    onLogin(login.trim())
  }

  function handleLogin() {
    setError('')
    if (!loginInput.trim() || !passwordLogin) {
      setError('Uzupełnij login/email i hasło.')
      return
    }
    const users = getUsers()
    const identifier = loginInput.trim().toLowerCase()
    const user = users.find(
      u =>
        (u.login.toLowerCase() === identifier || u.email === identifier) &&
        u.password === passwordLogin
    )
    if (!user) {
      setError('Nieprawidłowy login/email lub hasło.')
      return
    }
    onLogin(user.login)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">💪</div>
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Zaloguj się
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Utwórz konto
          </button>
        </div>

        {mode === 'register' ? (
          <div className="auth-form">
            <p className="auth-subtitle">Podaj swoje dane, aby zacząć</p>
            <div className="auth-field">
              <label>Login</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Twój login"
                value={login}
                onChange={e => setLogin(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
              />
            </div>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                className="auth-input"
                placeholder="Twój email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
              />
            </div>
            <div className="auth-field">
              <label>Hasło</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Min. 6 znaków"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
              />
            </div>
            <div className="auth-field">
              <label>Powtórz hasło</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Powtórz hasło"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
              />
            </div>
            {error && <p className="blad">{error}</p>}
            <button className="btn-oblicz" onClick={handleRegister}>
              Utwórz konto
            </button>
          </div>
        ) : (
          <div className="auth-form">
            <p className="auth-subtitle">Zaloguj się do swojego konta</p>
            <div className="auth-field">
              <label>Login lub email</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Login lub email"
                value={loginInput}
                onChange={e => setLoginInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="auth-field">
              <label>Hasło</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Hasło"
                value={passwordLogin}
                onChange={e => setPasswordLogin(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            {error && <p className="blad">{error}</p>}
            <button className="btn-oblicz" onClick={handleLogin}>
              Zaloguj się
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
