import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import './index.css'

const WORD = 'DIRECT'
// Direzioni dello schizzo: ↑ ← ↓ →
const FROM = [{ yPercent: 110 }, { xPercent: 110 }, { yPercent: -110 }, { xPercent: -110 }]

const EMAIL = 'flaviodonnini07@gmail.com'
const WHATSAPP = '393516988910'
const PROJECT_PRICE = 300 // € una tantum
const emailLink = (subject) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`
const whatsappLink = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`

const eur = (n) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

function PerugiaMap() {
  return (
    <svg className="perugia-art" viewBox="0 120 640 400" preserveAspectRatio="xMidYMax meet" role="img" aria-labelledby="perugia-title perugia-description">
      <title id="perugia-title">Perugia, Umbria</title>
      <desc id="perugia-description">Illustrazione stilizzata delle strade e del centro storico di Perugia.</desc>
      <defs>
        <clipPath id="centro-label-clip" clipPathUnits="userSpaceOnUse">
          <rect className="map-label-clip" x="371" y="247" width="180" height="22" />
        </clipPath>
      </defs>
      <g className="map-boundary">
        <path d="M98 321C115 268 154 221 204 193c41-23 70-55 122-55 53 0 87 28 131 31 42 3 78 24 89 61 12 38-8 67-29 96-24 32-41 67-83 80-51 17-94 2-143 21-47 19-98 14-137-12-38-26-72-50-56-94Z" />
        <path d="M170 359c42-10 70-31 108-42 49-14 95 2 142-11 34-9 65-27 95-48" />
      </g>
      <g className="map-roads map-roads--fine">
        <path d="m109 296 66 17 47-22 34 10 31-39 51 11 28-38 46 7 37-34" />
        <path d="m125 337 55-24 36 25 40-37 34 23 26-37 43 26 31-32 43 17 53-31" />
        <path d="m157 382 23-69 20-49 53 27 45-28 5-52" />
        <path d="m180 313 55 25 21 39 48-30 42 23 32-37 38 16 41-35" />
        <path d="m231 291 4 47 21 39-17 50m21-136 43 17 34-27 9-39m-9 66 18 59 41 24" />
        <path d="m295 245 35 22 18 44 48 8 28 33m-119-62-20 42 9 51 34 25" />
        <path d="m349 220 6 47 41 16 19-42 37-19m-56 61 36-3 33 35 35 5" />
        <path d="m407 281 18 40-8 44m-89-50 34-3 16 38-19 36m-83-59 34 10 19 38" />
        <path d="m193 246 42 7 27-30 33 22m-139 88-33 26 22 33m244-157 31 16 38-12 28 20" />
        <path d="m202 399 37 28 37-12 27 24m-3-194 18-43 38-16m50 195 29 15 29-23 28 3" />
        <path d="m130 278 29-26 31 3m-55 113 27 29 30-3m212-178 34-4 22 22" />
      </g>
      <g className="map-roads map-roads--major">
        <path d="M105 346c48-13 70-54 118-54 44 0 57 34 101 34 48 0 61-53 104-53 41 0 53 24 105 2" />
        <path d="M177 402c35-41 31-82 71-111 42-31 80-9 107-46 19-26 16-57 44-83" />
        <path d="M197 219c24 28 56 34 76 63 22 33 14 70 44 91 30 22 64 15 96 43" />
        <path d="M299 160c5 34 38 49 38 83 0 31-28 50-23 82 5 34 42 45 48 81" />
      </g>
      <g className="map-center">
        <circle cx="340" cy="280" r="18" />
        <circle cx="340" cy="280" r="5" />
      </g>
      <path className="map-center-leader" d="M353 267 362 258h5" />
      <g className="map-labels" aria-hidden="true">
        <text className="map-labels__center" x="371" y="263" clipPath="url(#centro-label-clip)">CENTRO STORICO</text>
        <text className="map-labels__city" x="82" y="500">PERUGIA</text>
        <path d="M89 437h42" />
      </g>
    </svg>
  )
}

function Calculator() {
  const [price, setPrice] = useState(90)
  const [nights, setNights] = useState(12)
  const [fee, setFee] = useState(15)

  const perNight = price * (fee / 100)
  const perYear = perNight * nights * 12
  const breakEven = perNight > 0 ? Math.ceil(PROJECT_PRICE / perNight) : null

  return (
    <div className="calc">
      <label>
        Prezzo a notte (€)
        <input type="number" inputMode="numeric" min="0" value={price}
          onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))} />
      </label>
      <label>
        Notti prenotate al mese
        <input type="number" inputMode="numeric" min="0" max="31" value={nights}
          onChange={(e) => setNights(Math.min(31, Math.max(0, Number(e.target.value) || 0)))} />
      </label>
      <label>
        Commissione della piattaforma: <strong>{fee}%</strong>
        <input type="range" min="10" max="25" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
      </label>

      <div className="calc-result" aria-live="polite">
        <p>Ogni anno lasci alle piattaforme circa</p>
        <strong>{eur(perYear)}</strong>
        {breakEven && (
          <p className="calc-note">
            Ogni notte prenotata in diretta ti lascia {eur(perNight)} in più. Con {breakEven} notti dirette il sito
            si è già ripagato.
          </p>
        )}
      </div>
        <a className="btn calc-cta" href={whatsappLink('Ciao Flavio, ho fatto il calcolo delle commissioni. Vorrei capire come funziona DIRECT per il mio appartamento.')} target="_blank" rel="noopener noreferrer">
        Inizia a risparmiare ora
      </a>
      <p className="fine">Calcolo indicativo: cambia i valori con i tuoi. Vale per le notti che passano dal canale diretto.</p>
    </div>
  )
}

export default function App() {
  const root = useRef(null)
  const calculatorRef = useRef(null)
  const lenisRef = useRef(null)

  const scrollToCalculator = (event) => {
    event.preventDefault()
    const calculator = calculatorRef.current
    const lenis = lenisRef.current

    if (!calculator) return

    if (lenis) {
      lenis.scrollTo(calculator, { offset: -20, duration: 1.2, lerp: 0.55 })
    } else {
      calculator.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToAbout = (event) => {
    event.preventDefault()
    const about = document.getElementById('chi-sono')
    const lenis = lenisRef.current

    if (!about) return

    if (lenis) {
      lenis.scrollTo(about, { offset: -20, duration: 1.2, lerp: 0.55 })
    } else {
      about.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useLayoutEffect(() => {
    if (window.location.hash === '#chi-sono') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({ anchors: true })
    lenisRef.current = lenis
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.letter > span').forEach((el, i) => {
        gsap.from(el, { ...FROM[i % FROM.length], duration: 1.1, ease: 'expo.out', delay: 0.15 + i * 0.08 })
      })

      const roads = gsap.utils.toArray('.perugia-art .map-roads path')
      const marker = gsap.utils.toArray('.perugia-art .map-center')[0]
      const leader = gsap.utils.toArray('.perugia-art .map-center-leader')[0]
      const labelClip = gsap.utils.toArray('.perugia-art .map-label-clip')[0]
      roads.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: `${length} ${length}`, strokeDashoffset: length })
      })
      const leaderLength = leader.getTotalLength()
      gsap.set(leader, { strokeDasharray: `${leaderLength} ${leaderLength}`, strokeDashoffset: leaderLength })
      gsap.set(labelClip, { attr: { width: 0 } })
      gsap.set(marker, { autoAlpha: 0, scale: 0.6, transformOrigin: 'center center' })

      gsap.timeline()
        .to(roads, {
          strokeDashoffset: 0,
          duration: 0.58,
          ease: 'power3.out',
          stagger: { amount: 0.14, from: 'start' },
        })
        .to(marker, { autoAlpha: 1, scale: 1, duration: 0.12, ease: 'power3.out' })
        .to(leader, { strokeDashoffset: 0, duration: 0.1, ease: 'power3.out' })
        .to(labelClip, { attr: { width: 180 }, duration: 0.14, ease: 'power3.out' }, '<')
    }, root)

    return () => {
      ctx.revert()
      gsap.ticker.remove(tick)
      lenisRef.current = null
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={root}>
      <header className="site-header">
        <div className="shell site-header__inner">
          <a className="site-brand" href="#inizio" aria-label="Direct, torna all'inizio">DIRECT</a>
          <a className="site-header__contact" href={whatsappLink('Ciao Flavio, ho visto il sito. Vorrei capire come funziona il sistema per azzerare le commissioni di Booking per la mia struttura.')} target="_blank" rel="noopener noreferrer">Scrivimi <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <main id="inizio">
        <section className="shell hero">
          <div className="hero-copy">
            <p className="kicker">Prenotazioni dirette per chi affitta appartamenti a Perugia</p>
            <h1 className="wordmark" aria-label="Direct">
              {WORD.split('').map((l) => (
                <span className="letter" aria-hidden="true" key={l}><span>{l}</span></span>
              ))}
            </h1>
            <p className="lead">
              Tieni la commissione che oggi lasci alle piattaforme.
            </p>
            <a className="btn" href="#calcolo" onClick={scrollToCalculator}>Calcola quanto lasci alle piattaforme</a>
          </div>

          <div className="hero-side">
            <figure className="map-figure">
              <PerugiaMap />
              <figcaption className="map-caption">UMBRIA, ITALIA </figcaption>
            </figure>
          </div>
        </section>

        <section className="shell sec" id="calcolo" ref={calculatorRef}>
          <h2>Quanto lasci alle piattaforme in un anno?</h2>
          <Calculator />
        </section>

        <section className="shell sec" id="come-funziona">
          <h2>Come funziona</h2>
          <ol className="steps">
            <li><div><strong>Ci sentiamo.</strong> Mi racconti il tuo appartamento e come ricevi le prenotazioni oggi.</div></li>
            <li><div><strong>Costruisco il tuo sito.</strong> Una interfaccia chiara, veloce da usare da telefono, con richiesta di prenotazione diretta.</div></li>
            <li><div><strong>È tuo.</strong> Gli ospiti ti scrivono e prenotano direttamente da te, senza commissioni sul soggiorno.</div></li>
          </ol>
        </section>

        <section className="shell sec about" id="chi-sono">
          <div>
            <h2>Dietro Direct c'è una persona sola.</h2>
            {/* PERSONALIZZA: 2-3 frasi vere su di te, niente di inventato */}
            <p>
              Mi chiamo Flavio e costruisco siti web in Umbria. Lavoro da solo: parli sempre con me, dal primo messaggio alla consegna.
            </p>
          </div>
        </section>

        <section className="shell sec contact" id="contatti">
          <h2>Parliamone, senza impegno.</h2>
          <div className="actions">
            <a className="btn" href={whatsappLink('Ciao Flavio, ho visto il sito. Vorrei capire come funziona il sistema per azzerare le commissioni di Booking per la mia struttura.')} target="_blank" rel="noopener noreferrer">Scrivimi su WhatsApp</a>
            <a className="btn btn-ghost" href={emailLink('Informazioni su Direct')}>Scrivimi un'email</a>
          </div>
        </section>
      </main>

      <footer className="shell site-footer">
        <details className="privacy">
          <summary>Privacy policy</summary>
          <p>Questo sito non usa cookie di profilazione e non raccoglie dati tramite moduli. Se mi scrivi, uso il tuo indirizzo solo per risponderti.</p>
        </details>
        <a href="#chi-sono" onClick={scrollToAbout}>About me</a>
      </footer>
    </div>
  )
}
