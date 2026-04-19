function App() {
  return (
    <>
      <h1>Kalkulator fitness</h1>

      <form>
        <fieldset>
          <legend>Dane</legend>
          <p>
            <label>
              Wiek (lata){' '}
              <input type="number" name="wiek" min="1" max="120" />
            </label>
          </p>
          <p>
            <label>
              Płeć{' '}
              <select name="plec">
                <option value="k">kobieta</option>
                <option value="m">mężczyzna</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Wzrost (cm){' '}
              <input type="number" name="wzrost" min="50" max="250" />
            </label>
          </p>
          <p>
            <label>
              Waga (kg){' '}
              <input type="number" name="waga" min="20" max="300" step="0.1" />
            </label>
          </p>
        </fieldset>

        <fieldset>
          <legend>Aktywność</legend>
          <p>
            <label>
              Poziom{' '}
              <select name="aktywnosc">
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
          <p>
            <label>
              <input type="radio" name="cel" value="redukcja" /> redukcja
            </label>
          </p>
          <p>
            <label>
              <input type="radio" name="cel" value="utrzymanie" /> utrzymanie
            </label>
          </p>
          <p>
            <label>
              <input type="radio" name="cel" value="masa" /> nabór masy
            </label>
          </p>
        </fieldset>

        <fieldset>
          <legend>Makro (opcjonalnie)</legend>
          <p>
            <label>
              Białko (g na kg masy ciała){' '}
              <input type="number" name="bialko_na_kg" min="0.5" max="3" step="0.1" />
            </label>
          </p>
          <p>
            <label>
              Tłuszcz (% kalorii){' '}
              <input type="number" name="tluszcz_procent" min="10" max="60" />
            </label>
          </p>
        </fieldset>

        <p>
          <button type="button">Oblicz</button>
        </p>
      </form>
    </>
  )
}

export default App
