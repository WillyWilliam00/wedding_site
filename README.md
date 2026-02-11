# Sito Web Matrimonio - William & Martina

Sito web personalizzato per il matrimonio di William Costa e Martina Soldavini, previsto per il 5 settembre 2026.

## 📋 Descrizione

Questo è un sito web moderno e responsive sviluppato con React, TypeScript e Vite, progettato per fornire agli invitati tutte le informazioni necessarie sul matrimonio. Il sito include:

- **Hero Section**: Sezione introduttiva con i nomi degli sposi e la data del matrimonio
- **Chi Siamo**: La storia della coppia
- **Timeline**: Programma dettagliato della giornata
- **Location**: Informazioni sulla location (Agriturismo Camanin) con mappa interattiva e menu
- **Ospitalità**: Suggerimenti per hotel e B&B nelle vicinanze
- **Dress Code**: Indicazioni sull'abbigliamento richiesto
- **Lista Nozze**: Informazioni per i regali
- **RSVP**: Modulo per confermare la presenza e indicare allergie/preferenze alimentari
- **FAQ**: Domande frequenti

## 🛠️ Tecnologie Utilizzate

- **React 19** - Libreria UI
- **TypeScript** - Tipizzazione statica
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animazioni
- **MapLibre GL** - Mappe interattive
- **Lucide React** - Icone
- **Radix UI** - Componenti UI accessibili

## 🚀 Setup e Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview del build di produzione
npm run preview
```

## 📁 Struttura del Progetto

```
wedding/
├── public/              # File statici (immagini, assets)
├── src/
│   ├── components/      # Componenti React
│   │   ├── ui/         # Componenti UI riutilizzabili
│   │   └── ...         # Componenti specifici del sito
│   ├── config/         # File di configurazione
│   │   └── wedding_data.json  # Dati del matrimonio
│   ├── lib/            # Utilities e helper
│   ├── App.tsx         # Componente principale
│   └── main.tsx        # Entry point
├── index.html
└── package.json
```

## ⚙️ Configurazione

I dati del matrimonio (date, location, menu, ecc.) sono centralizzati nel file `src/config/wedding_data.json`. Modificando questo file è possibile aggiornare facilmente tutte le informazioni visualizzate sul sito.

## 📝 Note

**Questo è un repository privato per uso personale.** Il sito è stato sviluppato specificamente per il matrimonio di William e Martina e non è destinato a uso pubblico o commerciale.

## 📅 Data Matrimonio

5 settembre 2026 - Agriturismo Camanin, Crezzo (LC)

---

*Creato con ❤️ da William Costa & Martina Soldavini*
