[FitHup Svendeprøve - Rapport.pdf](https://github.com/user-attachments/files/31829610/FitHup.Svendeprove.-.Rapport.pdf)
# Fithub

Basisk mobile-first fitness app with an Express/Prisma API and React frontend.

## Project structure

- `Frontend/` contains the Vite React application.
- `src/` contains the API server.

## API setup

Install dependencies and start the API:

```bash
npm install
npm run generate
npm run dev
```

The API runs at `http://localhost:3000`.

## Frontend setup

In a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend uses `http://localhost:3000/api` by default. Set `VITE_API_URL` when using a different API URL.

# Fithub Svendeprøve API

Dette API skal du bruge i din svendeprøve.
Det fungerer som datagrundlag for dit website, hvor brugere kan se hold, træningstider og kommentarer.

Du skal hente API’et fra det udleverede repository, installere det og køre det lokalt, så din frontend kan hente og sende data.

API’et understøtter funktioner som teams, bookings og kommentarer.

Du kan tilpasse API’et, hvis det er nødvendigt i din løsning.

---

## Kom i gang

### 1. Klon repo og installér afhængigheder

```bash
git clone [REPO-URL]
cd [MAPPE-NAVN]
```

### 2. Kopier eller omdøb _.env.example_ til _.env_

```bash
cp .env.example .env
```

### 3. Installer pakker

```bash
npm install
```

### 4. Generate client

```bash
npm run generate
```

### 5. Start serveren

```bash
npm run dev
```

### 6. Få overblik over data

```bash
npx prisma studio
```

Nu skulle du gerne kunne se en oversigt over dine modeller og data i din browser. Det er Prismas admin-panel til din database.

Klik på en af modellerne til venstre hvis du vil se og redigere data.

## Postman documentation

https://documenter.getpostman.com/view/6540576/2sB3BEoAUL
