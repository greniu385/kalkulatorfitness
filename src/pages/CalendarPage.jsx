import { useState, useEffect } from 'react'

const MUSCLE_GROUPS = [
  { id: 'klatka', label: 'Klatka piersiowa' },
  { id: 'plecy', label: 'Plecy' },
  { id: 'barki', label: 'Barki' },
  { id: 'biceps', label: 'Biceps' },
  { id: 'triceps', label: 'Triceps' },
  { id: 'nogi', label: 'Nogi' },
  { id: 'brzuch', label: 'Brzuch' },
  { id: 'lydki', label: 'Łydki' },
]

const ACTIVITY = { '1': 1.2, '2': 1.375, '3': 1.55, '4': 1.725, '5': 1.9 }

function calcTargetKcal(p) {
  const w = parseFloat(p.waga)
  const h = parseFloat(p.wzrost)
  const a = parseInt(p.wiek)
  const bmr = p.plec === 'm'
    ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
    : 447.593 + 9.247 * w + 3.098 * h - 4.330 * a
  const tdee = bmr * ACTIVITY[p.aktywnosc]
  if (p.cel !== 'utrzymanie' && p.wagaDocelowa && p.tygodnie) {
    const deficyt = ((parseFloat(p.wagaDocelowa) - w) * 7700) / (parseInt(p.tygodnie) * 7)
    return Math.max(1200, Math.round(tdee + deficyt))
  }
  return Math.round(tdee)
}

function getWeekDates(date) {
  const d = new Date(date + 'T12:00:00')
  const day = d.getDay()
  const monday = new Date(d)
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(monday)
    dd.setDate(monday.getDate() + i)
    return dd.toISOString().split('T')[0]
  })
}

function storageKey(user, date) {
  return `fit_diary_${user}_${date}`
}

function loadDay(user, date) {
  const raw = localStorage.getItem(storageKey(user, date))
  return raw ? JSON.parse(raw) : { meals: [], muscleGroups: [], workoutDone: false }
}

function saveDay(user, date, data) {
  localStorage.setItem(storageKey(user, date), JSON.stringify(data))
}

export default function CalendarPage({ currentUser }) {
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [dayData, setDayData] = useState(() => loadDay(currentUser, today))
  const [mealName, setMealName] = useState('')
  const [mealKcal, setMealKcal] = useState('')
  const [mealError, setMealError] = useState('')

  const profiles = JSON.parse(localStorage.getItem('fit_profiles') || '{}')
  const profile = profiles[currentUser]
  const targetKcal = profile ? calcTargetKcal(profile) : 2000

  useEffect(() => {
    setDayData(loadDay(currentUser, selectedDate))
    setMealError('')
  }, [selectedDate, currentUser])

  function changeDate(delta) {
    const d = new Date(selectedDate + 'T12:00:00')
    d.setDate(d.getDate() + delta)
    setSelectedDate(d.toISOString().split('T')[0])
  }

  function update(patch) {
    const merged = { ...dayData, ...patch }
    setDayData(merged)
    saveDay(currentUser, selectedDate, merged)
  }

  function addMeal() {
    if (!mealName.trim()) { setMealError('Podaj nazwę posiłku'); return }
    const k = parseInt(mealKcal)
    if (!k || k <= 0) { setMealError('Podaj prawidłową ilość kcal'); return }
    setMealError('')
    update({ meals: [...dayData.meals, { name: mealName.trim(), kcal: k, id: Date.now() }] })
    setMealName('')
    setMealKcal('')
  }

  function removeMeal(id) {
    update({ meals: dayData.meals.filter(m => m.id !== id) })
  }

  function toggleWorkout() {
    const workoutDone = !dayData.workoutDone
    update({ workoutDone, muscleGroups: workoutDone ? dayData.muscleGroups : [] })
  }

  function toggleMuscle(id) {
    const groups = dayData.muscleGroups.includes(id)
      ? dayData.muscleGroups.filter(g => g !== id)
      : [...dayData.muscleGroups, id]
    update({ muscleGroups: groups })
  }

  const weekDates = getWeekDates(selectedDate)
  const muscleCount = Object.fromEntries(MUSCLE_GROUPS.map(mg => [mg.id, 0]))
  weekDates.forEach(d => {
    const wd = loadDay(currentUser, d)
    if (wd.workoutDone) {
      wd.muscleGroups.forEach(g => { muscleCount[g] = (muscleCount[g] || 0) + 1 })
    }
  })

  const consumed = dayData.meals.reduce((s, m) => s + m.kcal, 0)
  const progress = Math.min(100, (consumed / targetKcal) * 100)
  const remaining = targetKcal - consumed

  const dateLabel = new Date(selectedDate + 'T12:00:00').toLocaleDateString('pl-PL', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
  const weekStart = new Date(weekDates[0] + 'T12:00:00').toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })
  const weekEnd = new Date(weekDates[6] + 'T12:00:00').toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })

  return (
    <div className="calendar-container">
      <div className="cal-date-nav">
        <button className="cal-nav-btn" onClick={() => changeDate(-1)}>←</button>
        <div className="cal-date-info">
          <input
            type="date"
            className="cal-date-input"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
          <span className="cal-date-label">{dateLabel}</span>
        </div>
        <button className="cal-nav-btn" onClick={() => changeDate(1)}>→</button>
      </div>

      <section className="dash-section">
        <h3>🍽️ Dziennik kalorii</h3>
        <div className="kcal-progress-wrap">
          <div className="kcal-progress-labels">
            <span className="kcal-consumed">{consumed} kcal spożyte</span>
            <span className="kcal-target">Cel: {targetKcal} kcal</span>
          </div>
          <div className="kcal-bar-bg">
            <div
              className={`kcal-bar-fill${consumed > targetKcal ? ' kcal-over' : ''}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={`kcal-remaining${remaining < 0 ? ' kcal-over-text' : ''}`}>
            {remaining >= 0
              ? `Pozostało: ${remaining} kcal`
              : `Przekroczono o ${Math.abs(remaining)} kcal`}
          </p>
        </div>

        {dayData.meals.length > 0 && (
          <div className="meal-log-list">
            {dayData.meals.map(m => (
              <div key={m.id} className="meal-log-item">
                <span className="meal-log-name">{m.name}</span>
                <div className="meal-log-right">
                  <span className="meal-log-kcal">{m.kcal} kcal</span>
                  <button className="meal-log-remove" onClick={() => removeMeal(m.id)} aria-label="Usuń">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="add-meal-form">
          <input
            className="add-meal-input"
            placeholder="Nazwa posiłku"
            value={mealName}
            onChange={e => setMealName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addMeal()}
          />
          <input
            className="add-meal-kcal"
            type="number"
            placeholder="kcal"
            value={mealKcal}
            min="1"
            onChange={e => setMealKcal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addMeal()}
          />
          <button className="btn-add-meal" onClick={addMeal}>Dodaj</button>
        </div>
        {mealError && <p className="blad" style={{ marginTop: '8px' }}>{mealError}</p>}
      </section>

      <section className="dash-section">
        <h3>🏋️ Trening dnia</h3>
        <button
          className={`workout-toggle-btn${dayData.workoutDone ? ' active' : ''}`}
          onClick={toggleWorkout}
        >
          {dayData.workoutDone ? '✓ Trening zaliczony!' : 'Zaznacz trening jako wykonany'}
        </button>

        {dayData.workoutDone && (
          <div className="muscle-groups">
            <p className="muscle-groups-label">Które partie ćwiczyłeś?</p>
            <div className="muscle-grid">
              {MUSCLE_GROUPS.map(mg => (
                <button
                  key={mg.id}
                  className={`muscle-btn${dayData.muscleGroups.includes(mg.id) ? ' active' : ''}`}
                  onClick={() => toggleMuscle(mg.id)}
                >
                  {mg.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="dash-section">
        <h3>📅 Postęp tygodniowy</h3>
        <p className="section-desc">{weekStart} – {weekEnd} · cel: każda partia 2× w tygodniu</p>
        <div className="weekly-grid">
          {MUSCLE_GROUPS.map(mg => {
            const count = muscleCount[mg.id] || 0
            const status = count >= 2 ? 'done' : count === 1 ? 'half' : 'none'
            return (
              <div key={mg.id} className={`weekly-card weekly-${status}`}>
                <span className="weekly-name">{mg.label}</span>
                <div className="weekly-dots">
                  <span className={`dot${count >= 1 ? ' filled' : ''}`} />
                  <span className={`dot${count >= 2 ? ' filled' : ''}`} />
                </div>
                <span className="weekly-count">{count}/2</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
