# Template Sito Web Matrimonio - White-Label

Sito web per matrimoni realizzato come **template White-Label** altamente riutilizzabile per uso interno. La logica e il design sono completamente separati dai dati, permettendo di creare nuovi siti semplicemente configurando il backend.

> [!IMPORTANT]
> Questo progetto è destinato esclusivamente ad uso interno e riutilizzo. Non è prevista la rivendita del codice sorgente a terzi.

## 📋 Descrizione

Questo è un sito web moderno e responsive sviluppato con **React 19**, **TypeScript** e **Vite**, progettato come una Single Page Application (SPA).  
L'architettura è **Data-Driven**: ogni contenuto (testi, nomi, date, colori, immagini) viene recuperato dinamicamente da **Sanity CMS**.

- **Hero Section**: Introduzione immersiva con countdown e gestione dinamica dei media.
- **Chi Siamo**: Sezione narrativa per la storia della coppia.
- **Timeline**: Programma dettagliato con icone e orari personalizzabili.
- **Location**: Integrazione con mappe interattive (MapLibre), dettagli del luogo e gestione menu.
- **Ospitalità**: Suggerimenti per alloggi con card descrittive.
- **Dress Code**: Indicazioni sull'abbigliamento e palette colori suggerita.
- **Lista Nozze**: Dettagli per i regali (IBAN, messaggi personalizzati).
- **RSVP**: Modulo avanzato per conferme, allergie e preferenze alimentari.
- **FAQ**: Lista dinamica di domande frequenti.
- **Gallery**: Galleria fotografica integrata direttamente da Sanity.


## 🛠️ Tecnologie Utilizzate

- **React 19** - Libreria UI di ultima generazione.
- **TypeScript** - Tipizzazione statica per un codice robusto.
- **Vite** - Build tool ultra-veloce.
- **Tailwind CSS v4** - Styling moderno con variabili CSS native e sintassi V4.
- **Sanity CMS** - Backend headless per la gestione dei contenuti in tempo reale.
- **React Query** - Gestione efficiente del data fetching e caching.
- **Framer Motion** - Animazioni fluide e interattive.
- **MapLibre GL** - Mappe interattive personalizzate.
- **Lucide React** - Set di icone moderno e leggero.
- **Radix UI** - Componenti UI accessibili e unstyled.


## 🚀 Setup e Installazione

Il progetto è diviso in due parti: il **Frontend (Vite)** e il **Backend (Sanity Studio)**.

### Frontend
```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo (Vite)
npm run dev
```

### Backend (Sanity Studio)
```bash
# Entra nella cartella dello studio
cd studio-wedding

# Installa le dipendenze
npm install

# Avvia Sanity Studio localmente
npm run dev
```

## 📁 Struttura del Progetto

```
wedding/
├── studio-wedding/      # Configurazione Sanity CMS (Schemas, Studio)
├── src/
│   ├── components/      # Componenti React (Section-based)
│   ├── hooks/           # Custom hooks per fetching (useWeddingData)
│   ├── lib/             # Client Sanity e utilities
│   ├── types/           # Definizioni TypeScript (UnifiedWeddingData)
│   ├── App.tsx          # Gestore principale dei dati e layout
│   └── main.tsx         # Entry point
├── tailwind.config.ts   # (O vars CSS in index.css per v4)
└── package.json
```


## ⚙️ Configurazione (Multi-Matrimonio con Sanity)

L'intero sito è guidato da **Sanity CMS**, che funge da Unica Fonte di Verità (SSOT). Non vengono più utilizzati file JSON locali per la configurazione dei contenuti.

Per adattare il sito a un nuovo matrimonio:
1. Accedi al **Sanity Studio** (`studio-wedding`).
2. Configura i vari documenti disponibili:
   - **Site Settings**: Nomi, date, colori (primary/background), font, social link.
   - **Chi Siamo**: Biografia e immagini della coppia.
   - **Timeline**: Lista eventi della giornata.
   - **Location**: Indirizzo, coordinate, menu e galleria.
   - **Ospitalità**: Opzioni di alloggio per gli ospiti.
   - **Dress Code**: Palette colori e regole di abbigliamento.
   - **RSVP & Contact**: Testi di conferma e configurazione notifiche.

I cambiamenti effettuati nel CMS saranno riflessi istantaneamente sul frontend grazie all'integrazione con React Query.

## 📄 Note sulla Licenza

Questo repository è un prodotto professionale per **uso interno**. È pensato come base riutilizzabile per progetti destinati ai propri amici.

---

*Creato con ❤️ da [William Costa](https://github.com/WillyWilliam00)*

