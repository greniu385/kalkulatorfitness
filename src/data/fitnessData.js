export const meals = {
  schudnac: [
    { name: 'Pierś z kurczaka z warzywami', kcal: 350 },
    { name: 'Sałatka z tuńczykiem i jajkiem', kcal: 280 },
    { name: 'Jajka na twardo z ogórkiem', kcal: 210 },
    { name: 'Płatki owsiane z jagodami', kcal: 290 },
    { name: 'Zupa jarzynowa z kurczakiem', kcal: 220 },
    { name: 'Jogurt naturalny 0% z owocami', kcal: 180 },
    { name: 'Kasza gryczana z brokułami', kcal: 310 },
    { name: 'Omlet warzywny ze szpinakiem', kcal: 260 },
    { name: 'Dorsz pieczony z cytryną', kcal: 240 },
    { name: 'Sałatka grecka', kcal: 200 },
  ],
  utrzymanie: [
    { name: 'Ryż brązowy z kurczakiem i warzywami', kcal: 480 },
    { name: 'Makaron razowy z łososiem', kcal: 520 },
    { name: 'Kanapki pełnoziarniste z jajkiem', kcal: 380 },
    { name: 'Kasza jaglana z indykiem', kcal: 450 },
    { name: 'Jajecznica z łososiem', kcal: 400 },
    { name: 'Bowl z quinoa i awokado', kcal: 460 },
    { name: 'Zupa krem z dyni', kcal: 280 },
    { name: 'Twarożek z warzywami', kcal: 340 },
    { name: 'Pieczony łosoś z ziemniakami', kcal: 490 },
    { name: 'Sałatka z kurczakiem i orzechami', kcal: 420 },
  ],
  przytyc: [
    { name: 'Makaron z mięsem i serem żółtym', kcal: 680 },
    { name: 'Ryż z wołowiną i awokado', kcal: 720 },
    { name: 'Owsianka z masłem orzechowym i bananem', kcal: 560 },
    { name: 'Kanapki z jajkiem, serem i awokado', kcal: 580 },
    { name: 'Kurczak z ziemniakami', kcal: 650 },
    { name: 'Shake z mlekiem, bananem i orzechami', kcal: 480 },
    { name: 'Omlet z serem i warzywami', kcal: 520 },
    { name: 'Zupa fasolowa z chlebem razowym', kcal: 600 },
    { name: 'Ryż z tuńczykiem i majonezem', kcal: 550 },
    { name: 'Pancakes z syropem klonowym', kcal: 640 },
  ],
}

export const workouts = {
  schudnac: {
    description: 'Skup się na cardio i HIIT – spalanie tłuszczu wymaga intensywnych sesji. Trenuj 4–5 razy w tygodniu.',
    exercises: [
      { name: 'HIIT – trening interwałowy', sets: '3 rundy × 4 min', rest: '1 min przerwy między rundami' },
      { name: 'Bieganie / marszobieg', sets: '30–45 min', rest: 'Stały, umiarkowany wysiłek' },
      { name: 'Skakanka', sets: '3 × 3 min', rest: '1 min przerwy' },
      { name: 'Burpees', sets: '4 × 10 powtórzeń', rest: '1 min przerwy' },
      { name: 'Deska (plank)', sets: '3 × 45–60 sek', rest: '30 sek przerwy' },
      { name: 'Przysiady ze skokiem', sets: '3 × 15 powtórzeń', rest: '1 min przerwy' },
    ],
  },
  utrzymanie: {
    description: 'Łącz cardio z siłą – utrzymasz wagę i poprawisz kondycję. Trenuj 3–4 razy w tygodniu.',
    exercises: [
      { name: 'Full body trening siłowy', sets: '3 × 12 pow. na ćwiczenie', rest: '90 sek przerwy' },
      { name: 'Jazda na rowerze / pływanie', sets: '30–40 min', rest: 'Umiarkowany wysiłek' },
      { name: 'Pompki', sets: '4 × 15 powtórzeń', rest: '1 min przerwy' },
      { name: 'Przysiady bułgarskie', sets: '3 × 12 pow./noga', rest: '90 sek przerwy' },
      { name: 'Wiosłowanie hantlem', sets: '3 × 12 pow./ręka', rest: '90 sek przerwy' },
      { name: 'Yoga / rozciąganie', sets: '15–20 min', rest: 'Na koniec sesji' },
    ],
  },
  przytyc: {
    description: 'Trening siłowy z progresywnym przeciążeniem to klucz do budowania masy. Trenuj 3–4 razy w tygodniu.',
    exercises: [
      { name: 'Wyciskanie sztangi (bench press)', sets: '4 × 8–10 powtórzeń', rest: '2 min przerwy' },
      { name: 'Przysiady ze sztangą', sets: '4 × 8–10 powtórzeń', rest: '2–3 min przerwy' },
      { name: 'Martwy ciąg', sets: '3 × 6–8 powtórzeń', rest: '2–3 min przerwy' },
      { name: 'Wiosłowanie sztangą', sets: '4 × 10 powtórzeń', rest: '2 min przerwy' },
      { name: 'Wyciskanie nad głową (OHP)', sets: '3 × 10 powtórzeń', rest: '2 min przerwy' },
      { name: 'Podciąganie na drążku', sets: '4 × max powtórzeń', rest: '2 min przerwy' },
    ],
  },
}
