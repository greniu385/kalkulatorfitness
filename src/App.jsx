import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import SetupPage from './pages/SetupPage'
import DashboardPage from './pages/DashboardPage'
import CalendarPage from './pages/CalendarPage'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('fit_dark') === 'true'
    if (saved) document.body.classList.add('dark')
    return saved
  })
  const [screen, setScreen] = useState('auth')
  const [view, setView] = useState('stats')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('fit_current_user')
    if (saved) {
      const profiles = JSON.parse(localStorage.getItem('fit_profiles') || '{}')
      setCurrentUser(saved)
      setScreen(profiles[saved] ? 'dashboard' : 'setup')
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('fit_dark', darkMode)
  }, [darkMode])

  function handleLogin(login) {
    localStorage.setItem('fit_current_user', login)
    setCurrentUser(login)
    const profiles = JSON.parse(localStorage.getItem('fit_profiles') || '{}')
    setScreen(profiles[login] ? 'dashboard' : 'setup')
    setView('stats')
  }

  function handleLogout() {
    localStorage.removeItem('fit_current_user')
    setCurrentUser(null)
    setScreen('auth')
    setView('stats')
  }

  return (
    <div className="app">
      <header className="top-bar">
        <div className="top-bar-brand">
          <span className="brand-icon">💪</span>
          <span className="brand-name">FitCalc</span>
        </div>
        <div className="top-bar-actions">
          {currentUser && (
            <button className="btn-logout" onClick={handleLogout}>
              Wyloguj
            </button>
          )}
          <button className="toggle-theme" onClick={() => setDarkMode(d => !d)}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {screen === 'dashboard' && (
        <nav className="dash-nav">
          <button
            className={`dash-nav-btn${view === 'stats' ? ' active' : ''}`}
            onClick={() => setView('stats')}
          >
            📊 Statystyki
          </button>
          <button
            className={`dash-nav-btn${view === 'calendar' ? ' active' : ''}`}
            onClick={() => setView('calendar')}
          >
            📅 Kalendarz
          </button>
        </nav>
      )}

      <main className="main-content">
        {screen === 'auth' && <AuthPage onLogin={handleLogin} />}
        {screen === 'setup' && (
          <SetupPage
            currentUser={currentUser}
            onComplete={() => setScreen('dashboard')}
          />
        )}
        {screen === 'dashboard' && view === 'stats' && (
          <DashboardPage
            currentUser={currentUser}
            onEditProfile={() => setScreen('setup')}
          />
        )}
        {screen === 'dashboard' && view === 'calendar' && (
          <CalendarPage currentUser={currentUser} />
        )}
      </main>
    </div>
  )
}

export default App
