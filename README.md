# Template Sito Web Matrimonio - Riutilizzabile

Sito web per matrimoni realizzato come **template riutilizzabile** per uso interno, pensato per essere adattato e rivenduto a diversi clienti modificando solo i dati di configurazione.

## 📋 Descrizione

Questo è un sito web moderno e responsive sviluppato con React, TypeScript e Vite, progettato per fornire agli invitati tutte le informazioni necessarie sul matrimonio.  
È pensato come **base generica riutilizzabile**: il contenuto specifico del matrimonio (nomi, date, location, menu, ecc.) è gestito tramite configurazione.

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

## ⚙️ Configurazione (multi-matrimonio)

L'intero sito è guidato dal file di configurazione principale `src/config/wedding_data.json`.  
Modificando **solo questo file** puoi adattare il sito a matrimoni diversi, senza toccare i componenti React.

- **`metadata`**: informazioni generali sul cliente/progetto
- **`design`**: colori, font, effetti (es. hero scroll)
- **`content`**: tutti i testi e i dati del matrimonio (navbar, nomi, date, location, menu, ospitalità, dress code, lista nozze, FAQ, RSVP, contatti, footer)

In pratica, questo repository funge da **template vendibile**: per ogni nuovo matrimonio si crea una nuova configurazione in `wedding_data.json` (o una sua variante gestita a livello di build/deploy).

## 📝 Note

**Questo è un repository privato per uso interno.**  
Il codice è pensato come base riutilizzabile per progetti di siti matrimonio destinati alla vendita/realizzazione per terzi.

## 📅 Esempio di Configurazione

L'esempio attuale in `wedding_data.json` è basato sul matrimonio di *William Costa & Martina Soldavini* (5 settembre 2026 - Agriturismo Camanin, Crezzo - LC) ed è pensato solo come demo di configurazione.

---

*Creato con ❤️ da William Costa*
