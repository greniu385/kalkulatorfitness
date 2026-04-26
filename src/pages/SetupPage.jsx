import { useState, useEffect } from 'react'

export default function SetupPage({ currentUser, onComplete }) {
  const [wiek, setWiek] = useState('')
  const [plec, setPlec] = useState('m')
  const [wzrost, setWzrost] = useState('')
  const [waga, setWaga] = useState('')
  const [aktywnosc, setAktywnosc] = useState('2')
  const [cel, setCel] = useState('utrzymanie')
  const [wagaDocelowa, setWagaDocelowa] = useState('')
  const [tygodnie, setTygodnie] = useState('')
  const [blad, setBlad] = useState('')

  useEffect(() => {
    const profiles = JSON.parse(localStorage.getItem('fit_profiles') || '{}')
    const p = profiles[currentUser]
    if (p) {
      setWiek(p.wiek || '')
      setPlec(p.plec || 'm')
      setWzrost(p.wzrost || '')
      setWaga(p.waga || '')
      setAktywnosc(p.aktywnosc || '2')
      setCel(p.cel || 'utrzymanie')
      setWagaDocelowa(p.wagaDocelowa || '')
      setTygodnie(p.tygodnie || '')
    }
  }, [currentUser])

  function handleSubmit() {
    if (!wiek || !wzrost || !waga) { setBlad('Uzupełnij wiek, wzrost i wagę.'); return }
    if (cel !== 'utrzymanie' && (!wagaDocelowa || !tygodnie)) {
      setBlad('Podaj docelową wagę i liczbę tygodni.')
      return
    }
    if (cel !== 'utrzymanie') {
      const roznica = parseFloat(wagaDocelowa) - parseFloat(waga)
      if (cel === 'schudnac' && roznica >= 0) { setBlad('Docelowa waga musi być mniejsza niż obecna.'); return }
      if (cel === 'przytyc' && roznica <= 0) { setBlad('Docelowa waga musi być większa niż obecna.'); return }
    }
    setBlad('')
    const profile = { wiek, plec, wzrost, waga, aktywnosc, cel, wagaDocelowa, tygodnie }
    const profiles = JSON.parse(localStorage.getItem('fit_profiles') || '{}')
    profiles[currentUser] = profile
    localStorage.setItem('fit_profiles', JSON.stringify(profiles))
    onComplete()
  }

  return (
    <div className="setup-container">
      <div className="setup-header">
        <h2>Cześć, {currentUser}! 👋</h2>
        <p>Uzupełnij swój profil, aby otrzymać spersonalizowany plan</p>
      </div>

      <form>
        <fieldset>
          <legend>Twoje dane</legend>
          <p>
            <label>
              Wiek (lata)
              <input
                type="number"
                min="1"
                max="120"
                value={wiek}
                onChange={e => setWiek(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Płeć
              <select value={plec} onChange={e => setPlec(e.target.value)}>
                <option value="m">mężczyzna</option>
                <option value="k">kobieta</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Wzrost (cm)
              <input
                type="number"
                min="50"
                max="250"
                value={wzrost}
                onChange={e => setWzrost(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Waga (kg)
              <input
                type="number"
                min="20"
                max="300"
                step="0.1"
                value={waga}
                onChange={e => setWaga(e.target.value)}
              />
            </label>
          </p>
        </fieldset>

        <fieldset>
          <legend>Aktywność fizyczna</legend>
          <div className="field-stack">
            <label className="field-stack-label">Poziom aktywności</label>
            <select
              className="select-full"
              value={aktywnosc}
              onChange={e => setAktywnosc(e.target.value)}
            >
              <option value="1">Brak – siedząca praca, bez sportu</option>
              <option value="2">Lekka – 1–3 treningi w tygodniu</option>
              <option value="3">Umiarkowana – 3–5 treningów w tygodniu</option>
              <option value="4">Duża – intensywne treningi 6–7× w tygodniu</option>
              <option value="5">Bardzo duża – praca fizyczna + sport</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Twój cel</legend>
          <div className="cel-przyciski">
            <button
              type="button"
              className={`cel-btn ${cel === 'schudnac' ? 'aktywny' : ''}`}
              onClick={() => setCel('schudnac')}
            >
              🔥 Schudnąć
            </button>
            <button
              type="button"
              className={`cel-btn ${cel === 'utrzymanie' ? 'aktywny' : ''}`}
              onClick={() => setCel('utrzymanie')}
            >
              ⚖️ Utrzymać
            </button>
            <button
              type="button"
              className={`cel-btn ${cel === 'przytyc' ? 'aktywny' : ''}`}
              onClick={() => setCel('przytyc')}
            >
              💪 Przytyć
            </button>
          </div>

          {cel !== 'utrzymanie' && (
            <>
              <p>
                <label>
                  Docelowa waga (kg)
                  <input
                    type="number"
                    min="20"
                    max="300"
                    step="0.1"
                    value={wagaDocelowa}
                    onChange={e => setWagaDocelowa(e.target.value)}
                  />
                </label>
              </p>
              <p>
                <label>
                  W ciągu ilu tygodni?
                  <input
                    type="number"
                    min="1"
                    max="104"
                    value={tygodnie}
                    onChange={e => setTygodnie(e.target.value)}
                  />
                </label>
              </p>
            </>
          )}
        </fieldset>

        {blad && <p className="blad">{blad}</p>}
        <button type="button" className="btn-oblicz" onClick={handleSubmit}>
          Oblicz mój plan 🚀
        </button>
      </form>
    </div>
  )
}
