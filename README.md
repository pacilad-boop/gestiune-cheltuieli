# 💸 FinFlow - Gestiune Cheltuieli

FinFlow este o aplicație web dezvoltată în React care permite utilizatorilor să gestioneze tranzacții financiare: cheltuieli, facturi și depozite. Aplicația oferă funcționalități complete de tip CRUD, filtrare, sortare și persistarea datelor în localStorage.

---

## 🌐 Live Demo

👉 https://gestiune-cheltuieli-77ek.vercel.app/

---

## 🚀 Funcționalități

- ➕ Adăugare tranzacții
- ✏️ Editare tranzacții
- 🗑️ Ștergere tranzacții
- 💾 Salvare automată în localStorage
- 🔍 Căutare după descriere
- 🎯 Filtrare după tip (cheltuieli, facturi, depozite)
- 🔃 Sortare după:
  - dată
  - sumă
- ⚠️ Validări formular:
  - descriere obligatorie
  - sumă > 0
- 🔔 Notificări toast pentru succes și eroare
- 📱 Design responsive (mobil, tabletă, desktop)

---

## 🛠️ Tehnologii folosite

- React (Hooks: useState, useEffect, useMemo)
- JavaScript (map, filter)
- Tailwind CSS
- Vite
- react-hot-toast
- lucide-react

---

## 📦 Instalare

Clonează repository-ul:

```bash
git clone https://github.com/pacilad-boop/gestiune-cheltuieli.git
```

Intră în folderul proiectului:

```bash
cd REPO-NAME
```

Instalează dependențele:

```bash
npm install package_name --legacy-peer-deps

```

Pornește serverul de dezvoltare:

```bash
npm run dev
```

🏗️ Build pentru producție

```bash
npm run build
```
🧠 Structura proiectului
```bash
src/
 ├ components/
 ├ hooks/
 ├ utils/
 ├ App.jsx
 ├ main.jsx
 └ index.css
```

📌 Note

Datele sunt salvate în localStorage folosind cheia finance_data

Sortarea tranzacțiilor ține cont de tip (venituri vs cheltuieli)

Validările sunt implementate atât vizual (lângă câmpuri), cât și prin toast-uri

Aplicația este optimizată pentru toate dimensiunile de ecran

👨‍💻 Autor

Proiect realizat pentru curs React.