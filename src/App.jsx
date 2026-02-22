import { useState } from 'react'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Works from './components/Works'
import Reviews from './components/Reviews'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import MapSection from './components/MapSection'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)
  useReveal()

  const openChat = () => setChatOpen(true)
  const closeChat = () => setChatOpen(false)

  return (
    <>
      <Background />
      <Cursor />
      <Header onOpenChat={openChat} />
      <div className="page-wrap">
        <Hero onOpenChat={openChat} />
        <Marquee />
        <About onOpenChat={openChat} />
        <Services onOpenChat={openChat} />
        <Works />
        <Reviews />
        <Pricing onOpenChat={openChat} />
        <Contact />
      </div>
      <div style={{ position: 'relative', zIndex: 2, margin: '0 auto' }}>
        <MapSection />
        <Footer />
      </div>
      <Chatbot isOpen={chatOpen} onOpen={openChat} onClose={closeChat} />
    </>
  )
}
