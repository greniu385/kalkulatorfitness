import { meals, workouts } from '../data/fitnessData'

const ACTIVITY = { '1': 1.2, '2': 1.375, '3': 1.55, '4': 1.725, '5': 1.9 }

function calcBMR(waga, wzrost, wiek, plec) {
  if (plec === 'm') return 88.362 + 13.397 * waga + 4.799 * wzrost - 5.677 * wiek
  return 447.593 + 9.247 * waga + 3.098 * wzrost - 4.330 * wiek
}

function calcBMI(waga, wzrost) {
  const h = wzrost / 100
  return waga / (h * h)
}

function bmiKategoria(bmi) {
  if (bmi < 18.5) return 'niedowaga'
  if (bmi < 25) return 'waga prawidłowa'
  if (bmi < 30) return 'nadwaga'
  return 'otyłość'
}

const CEL_LABELS = { schudnac: 'Schudnąć', utrzymanie: 'Utrzymać wagę', przytyc: 'Przytyć' }

export default function DashboardPage({ currentUser, onEditProfile }) {
  const profiles = JSON.parse(localStorage.getItem('fit_profiles') || '{}')
  const p = profiles[currentUser]
  if (!p) return null

  const w = parseFloat(p.waga)
  const h = parseFloat(p.wzrost)
  const a = parseInt(p.wiek)
  const bmr = calcBMR(w, h, a, p.plec)
  const tdee = bmr * ACTIVITY[p.aktywnosc]
  const bmi = calcBMI(w, h)
  const kategoria = bmiKategoria(bmi)

  let kcal = Math.round(tdee)
  if (p.cel !== 'utrzymanie' && p.wagaDocelowa && p.tygodnie) {
    const wD = parseFloat(p.wagaDocelowa)
    const t = parseInt(p.tygodnie)
    const deficyt = ((wD - w) * 7700) / (t * 7)
    kcal = Math.max(1200, Math.round(tdee + deficyt))
  }

  const workout = workouts[p.cel]
  const mealList = meals[p.cel]

  return (
    <div className="dashboard-container">
      <div className="dashboard-greeting">
        <div>
          <h2>Hej, {currentUser}! 👋</h2>
          <p className="greeting-sub">Cel: <strong>{CEL_LABELS[p.cel]}</strong></p>
        </div>
        <button className="btn-edit" onClick={onEditProfile}>Edytuj profil</button>
      </div>

      <div className="karty">
        <div className={`karta bmi-karta bmi-${kategoria.replace(' ', '-')}`}>
          <span className="karta-label">BMI</span>
          <span className="karta-wartosc">{bmi.toFixed(1)}</span>
          <span className="karta-opis">{kategoria}</span>
        </div>
        <div className="karta kcal-karta">
          <span className="karta-label">Dziennie</span>
          <span className="karta-wartosc">{kcal}</span>
          <span className="karta-opis">kcal / dzień</span>
        </div>
      </div>

      <section className="dash-section">
        <h3>🍽️ Co jeść?</h3>
        <p className="section-desc">Najlepsze posiłki dopasowane do Twojego celu:</p>
        <div className="meals-grid">
          {mealList.map((meal, i) => (
            <div key={i} className="meal-card">
              <span className="meal-name">{meal.name}</span>
              <span className="meal-kcal">{meal.kcal} kcal</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-section">
        <h3>🏋️ Twoje ćwiczenia</h3>
        <p className="section-desc">{workout.description}</p>
        <div className="exercise-list">
          {workout.exercises.map((ex, i) => (
            <div key={i} className="exercise-item">
              <div className="exercise-num">{i + 1}</div>
              <div className="exercise-info">
                <span className="exercise-name">{ex.name}</span>
                <span className="exercise-detail">{ex.sets} · {ex.rest}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-section">
        <h3>🎬 Najlepsze treningi dla Ciebie</h3>
        <p className="section-desc">Sprawdź polecane treningi na YouTube:</p>
        <div className="video-grid">
          {workout.videos.map((v, i) => (
            <a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card"
            >
              <span className="video-emoji">{v.emoji}</span>
              <div className="video-info">
                <span className="video-title">{v.title}</span>
                <span className="video-channel">{v.channel} · YouTube</span>
              </div>
              <span className="video-arrow">→</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
