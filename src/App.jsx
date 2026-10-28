import { useState } from 'react'
import './App.css'

// Change these details to the real ones
const HOTEL = {
  name: 'Ayalke International Hotel',
  phone: '+251960388707',
  phoneText: '+251 960 388 707',
  whatsapp: '251960388707',
  email: 'ayalkbettigstu5@gmail.com',
  address: 'Addis Ababa, Bole, in front of the airport',
}

const ROOMS = [
  { name: 'Standard Room', price: 1500, beds: '1 double bed', size: '20 m²', note: 'Quiet, bright, good for one or two guests.' },
  { name: 'Deluxe Room', price: 2200, beds: '1 king bed', size: '28 m²', note: 'More space, a work desk and a seating corner.' },
  { name: 'Family Suite', price: 3200, beds: '2 double beds', size: '40 m²', note: 'Two rooms in one, for families or small groups.' },
  { name: 'Special Room', price: 4500, beds: '1 double bed', size: '40 m²', note: 'Quiet, bright and spacious, comfortable for couples.' },
]

const SERVICES = [
  'Free WiFi in every room',
  'Restaurant and breakfast',
  'Hot water 24 hours',
  'Secure parking',
  'Conference hall',
  'Airport and city transfers',
  '24-hour reception',
  'Laundry service',
  'Swimming pool',
]

const MENU = [
  { id: 1, name: 'Doro wat with injera', price: 450 },
  { id: 2, name: 'Tibs with bread', price: 400 },
  { id: 3, name: 'Shiro with injera', price: 250 },
  { id: 4, name: 'Pasta with sauce', price: 300 },
  { id: 5, name: 'Club sandwich', price: 280 },
  { id: 6, name: 'Fresh juice', price: 100 },
  { id: 7, name: 'Coffee or tea', price: 50 },
]
const DELIVERY_FEE = 50

const REVIEWS = [
  { text: 'Clean room, friendly staff, and a very good breakfast.', who: 'Business guest' },
  { text: 'We stayed with our children and everything was easy.', who: 'Family guest' },
  { text: 'Fast WiFi and a quiet room. I will stay again.', who: 'Returning guest' },
  { text: 'Comfortable desk and a nice view.', who: 'Couple' },
]

export default function App() {
  const [cart, setCart] = useState({})
  const [cust, setCust] = useState({ name: '', phone: '', address: '' })
  const change = (id, d) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + d) }))
  const items = MENU.filter((m) => cart[m.id] > 0)
  const subtotal = items.reduce((t, m) => t + m.price * cart[m.id], 0)
  const total = subtotal + (items.length ? DELIVERY_FEE : 0)
  const ready = items.length > 0 && cust.name.trim() && cust.phone.trim() && cust.address.trim()
  const orderText =
    `New delivery order - ${HOTEL.name}\n` +
    items.map((m) => `${cart[m.id]} x ${m.name} = ${m.price * cart[m.id]} ETB`).join('\n') +
    `\nDelivery fee: ${DELIVERY_FEE} ETB\nTotal: ${total} ETB\n` +
    `Name: ${cust.name}\nPhone: ${cust.phone}\nAddress: ${cust.address}`

  const orderLink = `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(orderText)}`
  const wa = `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent('Hello, I would like to book a room at ' + HOTEL.name)}`

  return (
    <>
      <header className="top">
        <a href="#home" className="brand">Ayalke <span>International Hotel</span></a>
        <nav>
          <a href="#rooms">Rooms</a>
          <a href="#services">Services</a>
          <a href="#delivery">Delivery</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn small" href={wa}>Book now</a>
      </header>

      <section id="home" className="hero">
        <div className="hero-text">
          <h1>A calm, clean place to stay.</h1>
          <p>Comfortable rooms, a warm welcome and good food at {HOTEL.name}.</p>
          <div className="actions">
            <a className="btn" href={wa}>Book on WhatsApp</a>
            <a className="btn ghost" href={`tel:${HOTEL.phone}`}>Call {HOTEL.phoneText}</a>
          </div>
        </div>
        <div className="hero-photo" role="img" aria-label="Photo of the hotel (add your own)">
          <span>Hotel photo</span>
        </div>
      </section>

      <section id="rooms" className="section">
        <h2>Our rooms</h2>
        <p className="lead">Prices are per night. Ask us about longer stays.</p>
        <div className="rooms">
          {ROOMS.map((r) => (
            <article key={r.name} className="room">
              <div className="room-photo" role="img" aria-label={r.name + ' photo (add your own)'} />
              <div className="room-body">
                <h3>{r.name}</h3>
                <p>{r.note}</p>
                <p className="meta">{r.beds}, {r.size}</p>
                <div className="room-foot">
                  <strong>{r.price.toLocaleString()} ETB</strong>
                  <a className="btn small" href={wa}>Ask about this room</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="section alt">
        <h2>What is included</h2>
        <ul className="services">
          {SERVICES.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      <section id="delivery" className="section">
        <h2>Food delivery</h2>
        <p className="lead">Order from our restaurant and we bring it to your door or room. Pay on delivery.</p>
        <div className="delivery">
          <ul className="menu">
            {MENU.map((m) => (
              <li key={m.id}>
                <span>{m.name}<small>{m.price} ETB</small></span>
                <div className="qty">
                  <button type="button" aria-label={'Remove one ' + m.name} onClick={() => change(m.id, -1)}>−</button>
                  <b>{cart[m.id] || 0}</b>
                  <button type="button" aria-label={'Add one ' + m.name} onClick={() => change(m.id, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="order">
            <h3>Your order</h3>
            {items.length === 0 ? <p className="meta">Add a dish from the menu to start.</p> : (
              <>
                {items.map((m) => <p key={m.id} className="line"><span>{cart[m.id]} × {m.name}</span><span>{m.price * cart[m.id]} ETB</span></p>)}
                <p className="line"><span>Delivery fee</span><span>{DELIVERY_FEE} ETB</span></p>
                <p className="line total"><span>Total</span><span>{total} ETB</span></p>
              </>
            )}
            <input placeholder="Your name" value={cust.name} onChange={(e) => setCust({ ...cust, name: e.target.value })} />
            <input placeholder="Phone number" inputMode="tel" value={cust.phone} onChange={(e) => setCust({ ...cust, phone: e.target.value })} />
            <input placeholder="Delivery address or room number" value={cust.address} onChange={(e) => setCust({ ...cust, address: e.target.value })} />
            <a className={'btn' + (ready ? '' : ' disabled')} href={ready ? orderLink : undefined} aria-disabled={!ready}>Send order on WhatsApp</a>
            {!ready && <p className="meta">Add a dish and fill in your name, phone and address.</p>}
          </div>
        </div>
      </section>

      <section id="reviews" className="section">
        <h2>What guests say</h2>
        <div className="reviews">
          {REVIEWS.map((r) => (
            <blockquote key={r.text}>
              <p>{r.text}</p>
              <footer>{r.who}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="contact" className="section alt">
        <h2>Contact and booking</h2>
        <div className="contact">
          <div>
            <p><strong>Phone:</strong> <a href={`tel:${HOTEL.phone}`}>{HOTEL.phoneText}</a></p>
            <p><strong>Email:</strong> <a href={`mailto:${HOTEL.email}`}>{HOTEL.email}</a></p>
            <p><strong>Address:</strong> {HOTEL.address}</p>
            <p><strong>Check-in:</strong> from 12:00 PM. <strong>Check-out:</strong> until 12:00 PM.</p>
            <a className="btn" href={wa}>Message us on WhatsApp</a>
          </div>
          <div className="map" role="img" aria-label="Map (add Google Maps embed)">
            <span>Google Maps</span>
          </div>
        </div>
      </section>

      <footer className="foot">© {new Date().getFullYear()} {HOTEL.name}. All rights reserved.</footer>
    </>
  )
}