import { useState } from 'react'

function App() {
  const [wiek, setWiek] = useState('')
  const [plec, setPlec] = useState('m')
  const [wzrost, setWzrost] = useState('')
  const [waga, setWaga] = useState('')
  const [aktywnosc, setAktywnosc] = useState('2')
  const [cel, setCel] = useState('utrzymanie')
  const [wagaDocelowa, setWagaDocelowa] = useState('')
  const [tygodnie, setTygodnie] = useState('')
  const [wyniki, setWyniki] = useState(null)

  const mnoznikiAktywnosci = { '1': 1.2, '2': 1.375, '3': 1.55, '4': 1.725, '5': 1.9 }

  const jedzenie = {
    schudnac: [
      'Kurczak gotowany / pieczony',
      'Ryby (łosoś, dorsz, tuńczyk)',
      'Jajka na twardo',
      'Warzywa (brokuły, szpinak, ogórek, pomidor)',
      'Sałatka bez sosu',
      'Płatki owsiane',
      'Jogurt naturalny 0%',
      'Owoce (jabłko, grejpfrut, jagody)',
      'Kasza gryczana',
      'Soczewica / ciecierzyca',
    ],
    utrzymanie: [
      'Kurczak, indyk, ryby',
      'Ryż brązowy, kasza',
      'Jajka',
      'Owoce i warzywa sezonowe',
      'Nabiał (jogurt, twaróg)',
      'Orzechy (garść dziennie)',
      'Pełnoziarniste pieczywo',
      'Strączki (fasola, soczewica)',
      'Awokado',
      'Oliwa z oliwek',
    ],
    przytyc: [
      'Mięso czerwone (wołowina, wieprzowina)',
      'Masło orzechowe',
      'Orzechy (migdały, orzechy włoskie)',
      'Banany, winogrona, mango',
      'Makaron pełnoziarnisty',
      'Ryż biały',
      'Awokado',
      'Jajka (całe)',
      'Ser żółty, twaróg tłusty',
      'Owsianka z mlekiem i owocami',
    ],
  }

  function oblicz() {
    const w = parseFloat(waga)
    const h = parseFloat(wzrost)
    const a = parseInt(wiek)
    const bmr = obliczBMR(w, h, a, plec)
    const tdee = obliczTDEE(bmr, aktywnosc)
    const bmi = obliczBMI(w, h)

    let kcalDziennie = tdee
    if (cel !== 'utrzymanie') {
      const wD = parseFloat(wagaDocelowa)
      const t = parseInt(tygodnie)
      const roznicaKg = wD - w
      const deficytDziennie = (roznicaKg * 7700) / (t * 7)
      kcalDziennie = Math.round(tdee + deficytDziennie)
      kcalDziennie = Math.max(1200, kcalDziennie)
    }

    setWyniki({ bmi: bmi.toFixed(1), kategoria: kategoriaBMI(bmi), kcal: Math.round(kcalDziennie) })
  }

  function obliczTDEE(bmr, aktywnosc) {
    return bmr * mnoznikiAktywnosci[aktywnosc]
  }

  function obliczBMR(waga, wzrost, wiek, plec) {
    if (plec === 'm') return 88.362 + 13.397 * waga + 4.799 * wzrost - 5.677 * wiek
    return 447.593 + 9.247 * waga + 3.098 * wzrost - 4.330 * wiek
  }

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

          {cel !== 'utrzymanie' && (
            <>
              <p>
                <label>
                  Docelowa waga (kg){' '}
                  <input type="number" min="20" max="300" step="0.1" value={wagaDocelowa} onChange={e => setWagaDocelowa(e.target.value)} />
                </label>
              </p>
              <p>
                <label>
                  W ciągu ilu tygodni?{' '}
                  <input type="number" min="1" max="104" value={tygodnie} onChange={e => setTygodnie(e.target.value)} />
                </label>
              </p>
            </>
          )}
        </fieldset>

        <p>
          <button type="button" onClick={oblicz}>Oblicz</button>
        </p>
      </form>
      {wyniki && (
        <section>
          <h2>Twoje wyniki</h2>
          <p>
            <strong>BMI:</strong> {wyniki.bmi} — <em>{wyniki.kategoria}</em>
          </p>
          <p>
            <strong>Dzienne zapotrzebowanie kaloryczne:</strong> {wyniki.kcal} kcal
          </p>
        </section>
      )}
    </>
  )
}

export default App
