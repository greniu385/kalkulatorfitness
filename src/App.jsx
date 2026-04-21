import { useState } from 'react'

function App() {
  const [wiek, setWiek] = useState('')
  const [plec, setPlec] = useState('m')
  const [wzrost, setWzrost] = useState('')
  const [waga, setWaga] = useState('')
  const [aktywnosc, setAktywnosc] = useState('2')
  const [cel, setCel] = useState('utrzymanie')

  function obliczBMI(waga, wzrost) {
    const h = wzrost / 100
    return waga / (h * h)
  }

  function kategoriaBMI(bmi) {
    if (bmi < 18.5) return 'niedowaga'
    if (bmi < 25) return 'waga prawidłowa'
    if (bmi < 30) return 'nadwaga'
    return 'otyłość'
  }

  return (
    <>
      <h1>Kalkulator fitness</h1>

      <form>
        <fieldset>
          <legend>Dane</legend>
          <p>
            <label>
              Wiek (lata){' '}
              <input type="number" min="1" max="120" value={wiek} onChange={e => setWiek(e.target.value)} />
            </label>
          </p>
          <p>
            <label>
              Płeć{' '}
              <select value={plec} onChange={e => setPlec(e.target.value)}>
                <option value="m">mężczyzna</option>
                <option value="k">kobieta</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Wzrost (cm){' '}
              <input type="number" min="50" max="250" value={wzrost} onChange={e => setWzrost(e.target.value)} />
            </label>
          </p>
          <p>
            <label>
              Waga (kg){' '}
              <input type="number" min="20" max="300" step="0.1" value={waga} onChange={e => setWaga(e.target.value)} />
            </label>
          </p>
        </fieldset>

        <fieldset>
          <legend>Aktywność</legend>
          <p>
            <label>
              Poziom{' '}
              <select value={aktywnosc} onChange={e => setAktywnosc(e.target.value)}>
                <option value="1">mało ruchu</option>
                <option value="2">lekka aktywność</option>
                <option value="3">umiarkowana aktywność</option>
                <option value="4">duża aktywność</option>
                <option value="5">bardzo duża aktywność</option>
              </select>
            </label>
          </p>
        </fieldset>

        <fieldset>
          <legend>Cel</legend>
          <p><label><input type="radio" value="schudnac" checked={cel === 'schudnac'} onChange={() => setCel('schudnac')} /> chcę schudnąć</label></p>
          <p><label><input type="radio" value="utrzymanie" checked={cel === 'utrzymanie'} onChange={() => setCel('utrzymanie')} /> chcę utrzymać wagę</label></p>
          <p><label><input type="radio" value="przytyc" checked={cel === 'przytyc'} onChange={() => setCel('przytyc')} /> chcę przytyć</label></p>
        </fieldset>

        <p>
          <button type="button">Oblicz</button>
        </p>
      </form>
    </>
  )
}

export default App
