import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import dressColorOne from './assets/dress-color-1.png'
import dressColorTwo from './assets/dress-color-2.png'
import dressColorThree from './assets/dress-color-3.png'
import dressColorFour from './assets/dress-color-4.png'
import eventIconDinner from './assets/event-icon-dinner-round.png'
import eventIconGlasses from './assets/event-icon-glasses-round.png'
import eventIconRings from './assets/event-icon-rings-round.png'
import importantBasket from './assets/important-basket.png'
import importantGift from './assets/important-gift.png'
import importantMartini from './assets/important-martini.png'
import introPhotoOne from './assets/intro-photo-1.jpg'
import introPhotoTwo from './assets/intro-photo-2.jpg'
import olivePlate from './assets/olive-plate.png'
import timerBackground from './assets/timer-background.png'

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
]

const dressColors = [
  { src: dressColorOne, alt: 'Тёмный зелёный оттенок' },
  { src: dressColorTwo, alt: 'Серо-зелёный оттенок' },
  { src: dressColorThree, alt: 'Песочный оттенок' },
  { src: dressColorFour, alt: 'Светлый молочный оттенок' },
]

const yandexMapEmbedUrl =
  'https://yandex.com/map-widget/v1/?ll=44.058481%2C56.322916&mode=poi&poi%5Bpoint%5D=44.058176%2C56.322930&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D147439346278&z=17.3'

const yandexRouteUrl =
  'https://yandex.com/maps/47/nizhny-novgorod/?rtext=~56.322930%2C44.058176&rtt=auto&z=17'

const weddingDate = new Date('2026-07-25T16:00:00+03:00')

function getCountdownParts() {
  const remaining = Math.max(weddingDate.getTime() - Date.now(), 0)

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining % 86_400_000) / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1000),
  }
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
    { value: countdown.days, label: 'дней' },
    { value: countdown.hours, label: 'часов' },
    { value: countdown.minutes, label: 'минут' },
    { value: countdown.seconds, label: 'секунд' },
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
  const handleRsvpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="page">
      <div className="layout-frame">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-card">
            <h1 id="hero-title" className="hero-title">
              <span>Save</span>
              <span>the Date</span>
            </h1>
            <p className="hero-names">Иван & Анастасия</p>
            <div className="hero-divider" aria-hidden="true">
              <span />
              <small>♡</small>
              <span />
            </div>
            <p className="hero-date">25.07.2026</p>
          </div>
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
              <div className="map-window">
                <iframe
                  src={yandexMapEmbedUrl}
                  title="Интерактивная карта места проведения свадьбы"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="map-details">
              <h2 className="venue-title">Место проведения</h2>
              <div className="venue-script">торжества</div>
              <div className="venue-divider" aria-hidden="true">
                <span />
                <small>♥</small>
                <span />
              </div>
              <div className="venue-name">Ресторан NOVO</div>
              <div className="venue-address">Нижний Новгород, Печёрская слобода, 110А</div>
              <a href={yandexRouteUrl} target="_blank" rel="noreferrer">
                Как проехать
              </a>
              </div>
            </article>
            <img className="olive-plate" src={olivePlate} alt="" aria-hidden="true" />
          </section>

          <section className="important-section" aria-labelledby="important-title">
            <article className="important-card">
              <div className="important-heading">
                <h2 id="important-title">О важном</h2>
                <div className="important-divider" aria-hidden="true">
                  <span />
                  <small>♡</small>
                  <span />
                </div>
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
            <img className="important-basket" src={importantBasket} alt="" aria-hidden="true" />
          </section>

          <section className="dress-code" aria-labelledby="dress-code-title">
            <h2 id="dress-code-title">Дресс-код</h2>
            <div className="dress-divider" aria-hidden="true">
              <span />
              <small>♡</small>
              <span />
            </div>
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
              <div className="surprises-divider" aria-hidden="true">
                <span />
                <small>♡</small>
                <span />
              </div>
              <p className="surprises-text">
                Если вы хотите подготовить творческий подарок или уточнить детали
                программы, наш ведущий Дмитрий с радостью поможет вам в координации:
              </p>
              <div className="coordinator-contact">
                <a href="tel:+79202986661" aria-label="Позвонить Дмитрию">
                  8 (920) 298-66-61
                </a>
                <span>Дмитрий</span>
              </div>
            </article>
          </section>

          <section className="final-section" aria-label="Анкета гостя и обратный отсчёт">
            <article className="rsvp-card">
              <h2>Анкета гостя</h2>
              <div className="final-divider" aria-hidden="true">
                <span />
                <small>♡</small>
                <span />
              </div>
              <form className="rsvp-form" onSubmit={handleRsvpSubmit}>
                <label className="guest-name">
                  <span>Имя Фамилия</span>
                  <input name="guestName" type="text" autoComplete="name" />
                </label>

                <fieldset>
                  <legend>Планируете ли присутствовать на свадьбе?</legend>
                  <label>
                    <input name="attendance" type="radio" value="Обязательно приду" />
                    <span>Обязательно приду</span>
                  </label>
                  <label>
                    <input name="attendance" type="radio" value="Буду со второй половинкой" />
                    <span>Буду со второй половинкой</span>
                  </label>
                  <label>
                    <input name="attendance" type="radio" value="Не смогу присутствовать" />
                    <span>Не смогу присутствовать</span>
                  </label>
                </fieldset>

                <button type="submit">Отправить</button>
              </form>
            </article>

            <article
              className="timer-card"
              style={{ backgroundImage: `url(${timerBackground})` }}
            >
              <h2>До свадьбы осталось</h2>
              <div className="final-divider" aria-hidden="true">
                <span />
                <small>♡</small>
                <span />
              </div>
              <CountdownTimer />
            </article>

            <div className="farewell">
              <h2>До встречи на нашей свадьбе!</h2>
              <div className="final-divider" aria-hidden="true">
                <span />
                <small>♡</small>
                <span />
              </div>
            </div>
            <div className="bottom-background" aria-hidden="true" />
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
