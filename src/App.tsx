import { useEffect, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import './App.css'
import bgContent from './assets/bg-cg-upscaled.webp'
import bottomBackground from './assets/bottom-background.webp'
import desktopBackground from './assets/desktop-background.webp'
import dressColorOne from './assets/dress-color-1.png'
import dressColorTwo from './assets/dress-color-2.png'
import dressColorThree from './assets/dress-color-3.png'
import dressColorFour from './assets/dress-color-4.png'
import eventIconDinner from './assets/event-icon-dinner-round.png'
import eventIconGlasses from './assets/event-icon-glasses-round.png'
import eventIconRings from './assets/event-icon-rings-round.png'
import heroDesktop from './assets/hero-with-cg.webp'
import importantBasket from './assets/important-basket.png'
import importantGift from './assets/important-gift.png'
import importantMartini from './assets/important-martini.png'
import importantTexture from './assets/important-texture.webp'
import introPhotoOne from './assets/photocard-1.png'
import introPhotoTwo from './assets/photocard-2.png'
import heartFilledSageIcon from './assets/heart-filled-sage.svg'
import heartIcon from './assets/heart.svg'
import mapPlaceholder from './assets/map-placeholder.png'
import mobileHero375 from './assets/mobile-hero-375.png'
import mobileHero390 from './assets/mobile-hero-390.png'
import mobileHero402 from './assets/mobile-hero-402.png'
import mobileHero430 from './assets/mobile-hero-430.png'
import olivePlate from './assets/olive-plate.png'
import oliveShadowOne from './assets/olive-shadow-1.webp'
import oliveShadowTwo from './assets/olive-shadow-2.webp'
import oliveShadowThree from './assets/olive-shadow-3.webp'
import oliveShadowFour from './assets/olive-shadow-4.webp'
import phoneIcon from './assets/phone-vintage.png'
import surprisesBackground from './assets/surprises-background.webp'
import surprisesMobileBackground from './assets/surprises-bg-mobile.webp'
import timerBackground from './assets/timer-background.webp'

const SECOND_MS = 1000
const MINUTE_MS = 60 * SECOND_MS
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS

const scheduleItems = [
  {
    time: '16:00',
    title: 'Сбор гостей',
    description: 'и приветственный коктейль',
    icon: eventIconGlasses,
  },
  {
    time: '16:30',
    title: 'Торжественная',
    description: 'выездная регистрация',
    icon: eventIconRings,
  },
  {
    time: '17:00',
    title: 'Начало',
    description: 'праздничного ужина',
    icon: eventIconDinner,
  },
] as const

const dressColors = [
  { src: dressColorOne, alt: 'Тёмный зелёный оттенок' },
  { src: dressColorTwo, alt: 'Серо-зелёный оттенок' },
  { src: dressColorThree, alt: 'Песочный оттенок' },
  { src: dressColorFour, alt: 'Светлый молочный оттенок' },
] as const

const rsvpOptions = [
  'Обязательно приду',
  'Буду со второй половинкой',
  'Не смогу присутствовать',
] as const

const yandexMapEmbedUrl =
  'https://yandex.com/map-widget/v1/?ll=44.058481%2C56.322916&mode=poi&poi%5Bpoint%5D=44.058176%2C56.322930&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D147439346278&z=17.3'

const yandexRouteUrl =
  'https://yandex.com/maps/47/nizhny-novgorod/?rtext=~56.322930%2C44.058176&rtt=auto&z=17'

const weddingDate = new Date('2026-07-25T16:00:00+03:00')
const rsvpEndpoint = ''
const assetLoadTimeoutMs = 10000
const minimumLoaderMs = 900

const commonImageAssets = [
  dressColorOne,
  dressColorTwo,
  dressColorThree,
  dressColorFour,
  eventIconDinner,
  eventIconGlasses,
  eventIconRings,
  importantBasket,
  importantGift,
  importantMartini,
  importantTexture,
  introPhotoOne,
  introPhotoTwo,
  heartFilledSageIcon,
  heartIcon,
  mapPlaceholder,
  olivePlate,
  oliveShadowOne,
  oliveShadowTwo,
  oliveShadowThree,
  oliveShadowFour,
  phoneIcon,
  timerBackground,
] as const

const desktopImageAssets = [
  bgContent,
  bottomBackground,
  desktopBackground,
  heroDesktop,
  surprisesBackground,
] as const

const mobileImageAssets = [
  desktopBackground,
  mobileHero375,
  mobileHero390,
  mobileHero402,
  mobileHero430,
  surprisesMobileBackground,
] as const

function getPageImageAssets() {
  const responsiveAssets = window.matchMedia('(max-width: 760px)').matches ? mobileImageAssets : desktopImageAssets

  return [...commonImageAssets, ...responsiveAssets]
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image()
    const finish = () => resolve()
    const timeout = window.setTimeout(finish, assetLoadTimeoutMs)

    image.onload = () => {
      window.clearTimeout(timeout)

      if ('decode' in image) {
        image.decode().then(finish, finish)
      } else {
        finish()
      }
    }

    image.onerror = () => {
      window.clearTimeout(timeout)
      finish()
    }

    image.src = src
  })
}

function waitForFonts() {
  if ('fonts' in document) {
    return document.fonts.ready.then(() => undefined, () => undefined)
  }

  return Promise.resolve()
}

function getSafeAreaInsetTop() {
  const probe = document.createElement('div')
  probe.style.position = 'fixed'
  probe.style.top = '0'
  probe.style.paddingTop = 'env(safe-area-inset-top)'
  probe.style.visibility = 'hidden'
  document.body.append(probe)

  const safeAreaTop = Number.parseFloat(window.getComputedStyle(probe).paddingTop) || 0

  probe.remove()

  return safeAreaTop
}

function getCountdownParts() {
  const remaining = Math.max(weddingDate.getTime() - Date.now(), 0)

  return {
    days: Math.floor(remaining / DAY_MS),
    hours: Math.floor((remaining % DAY_MS) / HOUR_MS),
    minutes: Math.floor((remaining % HOUR_MS) / MINUTE_MS),
    seconds: Math.floor((remaining % MINUTE_MS) / SECOND_MS),
  }
}

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100

  if (mod10 === 1 && mod100 !== 11) {
    return one
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few
  }

  return many
}

type DecorativeDividerProps = {
  className: string
  icon: string
}

function DecorativeDivider({ className, icon }: DecorativeDividerProps) {
  return (
    <div className={className} aria-hidden="true">
      <span />
      <img src={icon} alt="" />
      <span />
    </div>
  )
}

function CountdownTimer() {
  const [countdown, setCountdown] = useState(getCountdownParts)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const units = [
    { value: countdown.days, label: plural(countdown.days, 'день', 'дня', 'дней') },
    { value: countdown.hours, label: plural(countdown.hours, 'час', 'часа', 'часов') },
    { value: countdown.minutes, label: plural(countdown.minutes, 'минута', 'минуты', 'минут') },
    { value: countdown.seconds, label: plural(countdown.seconds, 'секунда', 'секунды', 'секунд') },
  ]

  return (
    <div className="timer-grid" aria-label="Обратный отсчёт до свадьбы">
      {units.map((unit) => (
        <div className="timer-unit" key={unit.label}>
          <strong>{unit.value}</strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [isPageReady, setIsPageReady] = useState(false)
  const [isMapReady, setIsMapReady] = useState(false)
  const [mapIframeSrc, setMapIframeSrc] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'success'>('idle')
  const [hasSubmittedRsvp, setHasSubmittedRsvp] = useState(() => window.sessionStorage.getItem('weddingRsvpSubmitted') === 'true')

  useEffect(() => {
    let isActive = true
    const imageAssets = getPageImageAssets()

    Promise.all([
      Promise.all(imageAssets.map(preloadImage)),
      waitForFonts(),
      wait(minimumLoaderMs),
    ]).then(() => {
      if (isActive) {
        setIsPageReady(true)
      }
    })

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    const mapSrcTimer = window.setTimeout(() => setMapIframeSrc(yandexMapEmbedUrl), 0)

    return () => window.clearTimeout(mapSrcTimer)
  }, [])

  useEffect(() => {
    if (!mapIframeSrc || isMapReady) {
      return undefined
    }

    const mapRevealFallback = window.setTimeout(() => setIsMapReady(true), 7600)

    return () => window.clearTimeout(mapRevealFallback)
  }, [isMapReady, mapIframeSrc])

  const handleHeroClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    if (!target.closest('.hero-scroll')) {
      return
    }

    event.preventDefault()

    const heroBottom = window.scrollY + event.currentTarget.getBoundingClientRect().bottom
    const safeAreaTop = getSafeAreaInsetTop()
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight

    window.scrollTo({
      top: Math.min(heroBottom + safeAreaTop, maxScrollTop),
      behavior: 'smooth',
    })
  }

  const handleRsvpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (hasSubmittedRsvp) {
      setRsvpStatus('success')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      guestName: String(formData.get('guestName') ?? '').trim(),
      attendance: String(formData.get('attendance') ?? ''),
      submittedAt: new Date().toISOString(),
    }

    if (rsvpEndpoint) {
      await fetch(rsvpEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
    } else {
      console.info('RSVP payload ready for endpoint:', payload)
    }

    setRsvpStatus('success')
    setHasSubmittedRsvp(true)
    window.sessionStorage.setItem('weddingRsvpSubmitted', 'true')
    form.reset()
  }

  return (
    <>
      <div className={`app-loader${isPageReady ? ' is-hidden' : ''}`} aria-hidden={isPageReady}>
        <div className="app-loader-mark" aria-hidden="true">И&amp;А</div>
        <div className="app-loader-line" aria-hidden="true" />
      </div>

    <main className={`page${isPageReady ? ' is-page-ready' : ' is-page-loading'}`} aria-hidden={!isPageReady}>
      <div className="layout-frame">
        <section className="hero" aria-labelledby="hero-title" onClick={handleHeroClick}>
          <div className="hero-stage">
            <p className="hero-save-date" aria-hidden="true">Save the date</p>

            <div className="hero-invitation">
              <h1 id="hero-title" className="hero-title">
                <span>Приглашение</span>
                <span>на свадьбу</span>
              </h1>

              <div className="hero-bottom">
                <p className="hero-names">Иван&nbsp;&amp;&nbsp;Анастасия</p>
                <DecorativeDivider className="hero-divider" icon={heartIcon} />
                <p className="hero-date">25.07.2026</p>
              </div>
            </div>

            <a className="hero-scroll" href="#intro-title" aria-label="Перейти к приглашению" />
          </div>
          <a className="hero-scroll hero-scroll-screen" href="#intro-title" aria-label="Перейти к приглашению" />
        </section>

        <div className="content-background">
          <section className="intro" aria-labelledby="intro-title">
            <div className="intro-copy">
              <h2 id="intro-title">Дорогие гости!</h2>
              <p>
                Мы верим, что этот день станет красивым началом нашей счастливой
                совместной жизни, и очень хотим разделить этот радостный момент с вами!
              </p>
            </div>

            <div className="intro-photos" aria-label="Фотографии Ивана и Анастасии">
              <img src={introPhotoOne} alt="Иван и Анастасия смотрят друг на друга" />
              <img src={introPhotoTwo} alt="Иван и Анастасия улыбаются" />
            </div>
          </section>

          <section className="event-location" aria-label="План мероприятия и место проведения">
            <article className="event-card schedule-card">
              <h2>План мероприятия</h2>
              <div className="schedule-list">
                {scheduleItems.map((item) => (
                  <div className="schedule-item" key={item.time}>
                    <div className="schedule-icon">
                      <img src={item.icon} alt="" aria-hidden="true" />
                    </div>
                    <p>
                      <time>{item.time}</time> — {item.title}
                      <span>{item.description}</span>
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="event-card map-card">
              <div className={`map-window${isMapReady ? ' is-map-ready' : ''}`}>
                <img
                  className="map-placeholder"
                  src={mapPlaceholder}
                  alt="Карта ресторана NOVO"
                  aria-hidden={isMapReady}
                />
                <iframe
                  src={mapIframeSrc}
                  title="Интерактивная карта места проведения свадьбы"
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => mapIframeSrc && window.setTimeout(() => setIsMapReady(true), 1300)}
                />
            </div>
            <div className="map-details">
              <h2 className="venue-title">Место проведения</h2>
              <div className="venue-script">торжества</div>
              <DecorativeDivider className="venue-divider" icon={heartFilledSageIcon} />
              <div className="venue-name">Ресторан NOVO</div>
              <div className="venue-address">Нижний&nbsp;Новгород, Печёрская слобода, 110А</div>
              <a href={yandexRouteUrl} target="_blank" rel="noreferrer">
                Как проехать
              </a>
              </div>
            </article>
            <img className="olive-plate" src={olivePlate} alt="" aria-hidden="true" />
          </section>

          <section className="important-section" aria-labelledby="important-title">
            <article className="important-card">
              <img className="important-basket" src={importantBasket} alt="" aria-hidden="true" />
              <div className="important-heading">
                <h2 id="important-title">О важном</h2>
                <DecorativeDivider className="important-divider" icon={heartIcon} />
              </div>

              <div className="important-columns">
                <div className="important-item">
                  <img src={importantGift} alt="" aria-hidden="true" />
                  <p>
                    Ваше присутствие и улыбки — главное для нас! Но если вы захотите
                    сделать подарок, мы будем рады вложению в бюджет нашей семьи.
                    Это поможет нам осуществить наши общие мечты.
                  </p>
                </div>

                <div className="important-item">
                  <img src={importantMartini} alt="" aria-hidden="true" />
                  <p>
                    Дорогие родители! Наш праздник — для взрослых. Очень надеемся,
                    что у вас будет возможность оставить детей на этот вечер под
                    присмотром и полностью погрузиться в атмосферу праздника вместе с нами.
                  </p>
                </div>
              </div>
            </article>
          </section>

          <section className="dress-code" aria-labelledby="dress-code-title">
            <h2 id="dress-code-title">Дресс-код</h2>
            <DecorativeDivider className="dress-divider" icon={heartIcon} />
            <p className="dress-lead">
              Будем признательны, если при выборе нарядов вы поддержите палитру
              нашего праздника.
            </p>
            <div className="dress-palette" aria-label="Палитра дресс-кода">
              {dressColors.map((color) => (
                <img src={color.src} alt={color.alt} key={color.alt} />
              ))}
            </div>
            <p className="dress-note">
              Дорогие дамы, большая просьба: избегайте белого цвета в своих нарядах.
            </p>
          </section>

          <section className="surprises-section" aria-labelledby="surprises-title">
            <article className="surprises-card">
              <h2 id="surprises-title">Сюрпризы и поздравления</h2>
              <DecorativeDivider className="surprises-divider" icon={heartIcon} />
              <p className="surprises-text">
                Если вы хотите подготовить творческий подарок или уточнить детали
                программы, наш ведущий с радостью поможет вам в координации
              </p>
              <div className="coordinator-contact">
                <img src={phoneIcon} alt="" aria-hidden="true" />
                <a href="tel:+79202986661" aria-label="Позвонить Дмитрию">
                  8&nbsp;(920)&nbsp;298-66-61
                </a>
                <span>Дмитрий</span>
              </div>
            </article>
          </section>

          <section className="final-section" aria-label="Анкета гостя и обратный отсчёт">
            <article className="rsvp-card">
              <h2>Анкета гостя</h2>
              <DecorativeDivider className="final-divider" icon={heartIcon} />
              <form className="rsvp-form" onSubmit={handleRsvpSubmit}>
                <label className="guest-name">
                  <span>Представьтесь пожалуйста</span>
                  <input name="guestName" type="text" autoComplete="name" placeholder="Ваши имя и фамилия" required />
                </label>

                <fieldset>
                  <legend>Планируете ли присутствовать на свадьбе?</legend>
                  {rsvpOptions.map((option, index) => (
                    <label key={option}>
                      <input name="attendance" type="radio" value={option} required={index === 0} />
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>

                <button type="submit" disabled={hasSubmittedRsvp}>
                  {hasSubmittedRsvp ? 'Ответ принят' : 'Отправить'}
                </button>
                {(rsvpStatus === 'success' || hasSubmittedRsvp) && (
                  <p className="rsvp-status" role="status">
                    Спасибо! Ответ принят.
                  </p>
                )}
              </form>
            </article>

            <article className="timer-card">
              <h2>До свадьбы осталось</h2>
              <DecorativeDivider className="final-divider" icon={heartIcon} />
              <CountdownTimer />
            </article>

            <div className="farewell">
              <h2>
                <span>До встречи</span>{' '}
                <span>на нашей свадьбе</span>
              </h2>
              <DecorativeDivider className="final-divider" icon={heartIcon} />
            </div>
            <div className="bottom-background" aria-hidden="true" />
          </section>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
