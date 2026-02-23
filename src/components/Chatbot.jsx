import { useState, useRef } from 'react'
import DOMPurify from 'dompurify'
import styles from './Chatbot.module.css'

const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://genri.app.n8n.cloud/webhook/0147fbaa-06f7-4219-a790-d942ec86faab'

const QUICK_REPLIES_INIT = ['Rzęsy', 'Laminowanie', 'Brwi', 'Włosy']

export default function Chatbot({ isOpen, onOpen, onClose }) {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Cześć! Pomogę Ci umówić wizytę 💫 Co Cię interesuje?' }
  ])
  const [quickReplies, setQuickReplies] = useState(QUICK_REPLIES_INIT)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const msgsRef = useRef(null)

  const scrollBottom = () => {
    setTimeout(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, 50)
  }

  const addMsg = (text, type = 'bot') => {
    setMessages(prev => [...prev, { type, text }])
    scrollBottom()
  }

  /* ── Send to n8n and get AI reply ── */
  const sendToN8n = async (userText) => {
    setTyping(true)
    setQuickReplies([])
    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, sessionId: 'lumi-web' }),
      })

      let botText = 'Дякую! Зв\'яжемося з вами незабаром 💛'

      if (res.ok) {
        const data = await res.json()
        // n8n can return: { reply }, { text }, { output }, { message } or plain string
        botText =
          data?.reply ||
          data?.text ||
          data?.output ||
          data?.message ||
          (typeof data === 'string' ? data : botText)
      }

      setTyping(false)
      addMsg(botText)
    } catch {
      setTyping(false)
      addMsg('Вибачте, сталася помилка. Спробуйте ще раз або зателефонуйте нам 📞')
    }
  }

  const handleSend = () => {
    const t = input.trim()
    if (!t) return
    addMsg(t, 'user')
    setInput('')
    sendToN8n(t)
  }

  const handleQR = (val) => {
    addMsg(val, 'user')
    setQuickReplies([])
    sendToN8n(val)
  }

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className={styles.win}>
          <div className={styles.hd}>
            <div className={styles.agent}>
              <div className={styles.av}>✨<div className={styles.online} /></div>
              <div>
                <div className={styles.agentName}>Lumi — rezerwacja online</div>
                <div className={styles.agentStatus}>● Online</div>
              </div>
            </div>
            <button className={styles.close} onClick={onClose}>✕</button>
          </div>

          <div className={styles.msgs} ref={msgsRef}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.type === 'user' ? styles.user : styles.bot}`}>
                {m.type === 'bot' && <div className={styles.mav}>✨</div>}
                <div className={styles.mb} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(m.text.replace(/\n/g, '<br/>')) }} />
              </div>
            ))}
            {typing && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <div className={styles.mav}>✨</div>
                <div className={styles.mb}><span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} /></div>
              </div>
            )}
          </div>

          {quickReplies.length > 0 && (
            <div className={styles.qr}>
              {quickReplies.map(q => (
                <button key={q} className={styles.qBtn} onClick={() => handleQR(q)}>{q}</button>
              ))}
            </div>
          )}

          <div className={styles.ia}>
            <input
              className={styles.inp}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Napisz wiadomość..."
            />
            <button className={styles.send} onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button className={styles.fab} onClick={isOpen ? onClose : onOpen}>
        <div className={styles.pulse} />
        💬
        {!isOpen && <div className={styles.badge}>1</div>}
      </button>
    </>
  )
}
