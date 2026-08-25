import { useEffect, useState } from 'react'
import {
  CalendarPlus,
  ChevronDown,
  Clock3,
  Flower2,
  Heart,
  MapPin,
  Navigation,
  PartyPopper,
  Sparkles,
} from 'lucide-react'
import './Wedding.css'

const MAP_LINK = 'https://share.google/puIGaGyidGKpuO5zC'
const WEDDING_DATE = new Date('2026-09-13T07:00:00+05:30')

const events = [
  {
    type: 'Reception',
    date: 'Saturday, 12 September 2026',
    time: '6:00 PM onwards',
    accent: 'An evening of music, laughter and celebration',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Arunkumar%20%26%20Jayashree%20-%20Wedding%20Reception&dates=20260912T123000Z%2F20260912T153000Z&details=Join%20us%20for%20an%20evening%20of%20celebration.&location=Mani%20%26%20Prabhu%20Thirumana%20Maaligai',
  },
  {
    type: 'Muhurtham',
    date: 'Sunday, 13 September 2026',
    time: '7:00 AM - 8:30 AM',
    accent: 'The moment two hearts begin their forever',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Arunkumar%20%26%20Jayashree%20-%20Muhurtham&dates=20260913T013000Z%2F20260913T030000Z&details=Join%20us%20and%20bless%20the%20couple%20as%20they%20begin%20their%20new%20chapter.&location=Mani%20%26%20Prabhu%20Thirumana%20Maaligai',
  },
]

const photos = [
  {
    src: '/images/city-pose.jpeg',
    alt: 'Arunkumar and Jayashree standing together in matching maroon',
    caption: 'Together looks good on us.',
  },
  {
    src: '/images/city-standing.jpeg',
    alt: 'Arunkumar and Jayashree walking together in matching maroon on a city street',
    caption: 'Side by side, always.',
  },
  {
    src: '/images/beach-lift.jpeg',
    alt: 'Arunkumar lifting Jayashree on the beach with the ocean behind them',
    caption: 'You lift me higher.',
  },
  {
    src: '/images/beach-spin.jpeg',
    alt: 'Arunkumar and Jayashree spinning together on the beach',
    caption: 'Dancing through life.',
  },
  {
    src: '/images/city-bollard.jpeg',
    alt: 'Arunkumar and Jayashree leaning on each other surrounded by red bollards',
    caption: 'A quiet kind of love.',
  },
  {
    src: '/images/beach-sand.jpeg',
    alt: 'Arunkumar and Jayashree together on the sand by the waves',
    caption: 'Written in the sand, sealed in the heart.',
  },
]

function getCountdown() {
  const remaining = Math.max(0, WEDDING_DATE.getTime() - Date.now())
  const totalSeconds = Math.floor(remaining / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function App() {
  const [invitationOpen, setInvitationOpen] = useState(false)
  const [countdown, setCountdown] = useState(getCountdown)
  const [petals, setPetals] = useState([])
  const [blessings, setBlessings] = useState(() => {
    const savedBlessings = Number(window.localStorage.getItem('aj-blessings'))
    return Number.isFinite(savedBlessings) ? savedBlessings : 0
  })

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  function openInvitation() {
    setInvitationOpen(true)
    window.setTimeout(() => {
      document.querySelector('#home')?.focus({ preventScroll: true })
    }, 700)
  }

  function sendBlessing() {
    const nextBlessings = blessings + 1
    const newPetals = Array.from({ length: 18 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: `${4 + ((index * 17) % 92)}%`,
      delay: `${(index % 6) * 0.08}s`,
      drift: `${-55 + ((index * 31) % 110)}px`,
    }))

    setBlessings(nextBlessings)
    setPetals(newPetals)
    window.localStorage.setItem('aj-blessings', String(nextBlessings))
    window.setTimeout(() => setPetals([]), 2800)
  }

  return (
    <div className={invitationOpen ? 'site is-open' : 'site'}>
      <div className="petal-layer" aria-hidden="true">
        {petals.map((petal) => (
          <span
            className="falling-petal"
            key={petal.id}
            style={{
              '--petal-left': petal.left,
              '--petal-delay': petal.delay,
              '--petal-drift': petal.drift,
            }}
          />
        ))}
      </div>

      <div className="invitation-gate" aria-hidden={invitationOpen}>
        <div className="gate-panel gate-panel-left" />
        <div className="gate-panel gate-panel-right" />
        <div className="gate-content">
          <span className="gate-kicker">A little joy is on its way</span>
          <div className="gate-monogram" aria-label="Arunkumar and Jayashree">
            <span>A</span>
            <Heart aria-hidden="true" fill="currentColor" />
            <span>J</span>
          </div>
          <p>13 . 09 . 2026</p>
          <button className="seal-button" type="button" onClick={openInvitation}>
            <Sparkles aria-hidden="true" size={18} />
            Open the invitation
          </button>
        </div>
      </div>

      <header className="site-header">
        <a className="monogram" href="#home" aria-label="Back to top">
          A <Heart aria-hidden="true" fill="currentColor" /> J
        </a>
        <nav aria-label="Main navigation">
          <a href="#celebrations">Events</a>
          <a href="#moments">Moments</a>
          <a href="#venue">Venue</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home" tabIndex="-1">
          <img
            className="hero-image"
            src="/images/hero-closeup.jpeg"
            alt="Arunkumar and Jayashree in a close intimate portrait"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="eyebrow">Together with our families</span>
            <h1>
              <span>Arunkumar</span>
              <Heart className="title-heart" aria-hidden="true" fill="currentColor" />
              <span>Jayashree</span>
            </h1>
            <p className="hero-date">September 13, 2026</p>
            <p className="hero-invite">invite you to celebrate the beginning of their forever</p>
          </div>
          <a className="scroll-cue" href="#countdown" aria-label="See wedding countdown">
            <ChevronDown aria-hidden="true" />
          </a>
        </section>

        <section className="countdown-section" id="countdown" aria-labelledby="countdown-title">
          <div className="countdown-bg" aria-hidden="true" />
          <div className="section-heading">
            <Flower2 aria-hidden="true" />
            <span className="eyebrow">The happy wait</span>
            <h2 id="countdown-title">Until we say “I do”</h2>
          </div>
          <div className="countdown" aria-live="polite">
            {Object.entries(countdown).map(([label, value]) => (
              <div className="countdown-unit" key={label}>
                <strong>{String(value).padStart(2, '0')}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="events-section" id="celebrations" aria-labelledby="events-title">
          <div className="section-heading light-heading">
            <PartyPopper aria-hidden="true" />
            <span className="eyebrow">Save the dates</span>
            <h2 id="events-title">Two celebrations, one beautiful beginning</h2>
          </div>
          <div className="events-grid">
            {events.map((event, index) => (
              <article className="event-card" key={event.type}>
                <span className="event-number">0{index + 1}</span>
                <p className="event-label">{event.type}</p>
                <h3>{event.date}</h3>
                <p className="event-time">
                  <Clock3 aria-hidden="true" size={18} />
                  {event.time}
                </p>
                <p className="event-note">{event.accent}</p>
                <div className="event-actions">
                  <a href={event.calendarUrl} target="_blank" rel="noreferrer">
                    <CalendarPlus aria-hidden="true" size={18} />
                    Add to calendar
                  </a>
                  <a href={MAP_LINK} target="_blank" rel="noreferrer">
                    <Navigation aria-hidden="true" size={18} />
                    Directions
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="moments-section" id="moments" aria-labelledby="moments-title">
          <div className="moments-intro">
            <span className="eyebrow">A story still unfolding</span>
            <h2 id="moments-title">Our favourite kind of ordinary</h2>
            <p>
              From city strolls in matching maroon to barefoot dances by the sea,
              here are our favourite pieces of this story.
            </p>
          </div>
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <figure className={`photo photo-${index + 1}`} key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading={index > 0 ? 'lazy' : 'eager'} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="venue-section" id="venue" aria-labelledby="venue-title">
          <div className="venue-photo" aria-hidden="true" />
          <div className="venue-copy">
            <MapPin aria-hidden="true" />
            <span className="eyebrow">Meet us here</span>
            <h2 id="venue-title">Mani &amp; Prabhu<br />Thirumana Maaligai</h2>
            <p>Both the reception and wedding will be celebrated at the same venue.</p>
            <a className="primary-button" href={MAP_LINK} target="_blank" rel="noreferrer">
              <Navigation aria-hidden="true" size={18} />
              Open in Google Maps
            </a>
          </div>
        </section>

        <section className="blessing-section" aria-labelledby="blessing-title">
          <Flower2 aria-hidden="true" />
          <span className="eyebrow">Your presence is our present</span>
          <h2 id="blessing-title">Send a little blessing our way</h2>
          <p>Tap once for love, laughter and a lifetime of shared adventures.</p>
          <button className="blessing-button" type="button" onClick={sendBlessing}>
            <Heart aria-hidden="true" fill="currentColor" size={18} />
            Shower them with love
          </button>
          {blessings > 0 && (
            <span className="blessing-count" role="status">
              {blessings === 1 ? 'One blessing sent with love' : `${blessings} blessings sent with love`}
            </span>
          )}
        </section>
      </main>

      <footer>
        <span>A</span>
        <Heart aria-hidden="true" fill="currentColor" />
        <span>J</span>
        <p>13 September 2026</p>
        <small>Made with love for Arunkumar &amp; Jayashree</small>
      </footer>
    </div>
  )
}

export default App
