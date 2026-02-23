import { useState, useRef, useEffect } from 'react'
import DOMPurify from 'dompurify'
import styles from './Chatbot.module.css'

const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://genri.app.n8n.cloud/webhook-test/MHLashroom';

export default function Chatbot({ isOpen, onOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [quickReplies, setQuickReplies] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  // Генерируем уникальный ID сессии для каждого посетителя (чтобы N8N помнил контекст переписки)
  const [sessionId] = useState(() => 'session-' + Math.random().toString(36).substring(2, 10))
  const msgsRef = useRef(null)

  const scrollBottom = () => {
    setTimeout(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, 50)
  }

  const addMsg = (text, type = 'bot') => {
    if (!text) return;
    setMessages(prev => [...prev, { type, text }])
    scrollBottom()
  }

  /* ── Отправка и получение ответа от N8N (чистый посредник) ── */
  const sendToN8n = async (userText, isInit = false) => {
    setTyping(true)
    setQuickReplies([])

    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          sessionId,
          action: isInit ? 'init' : 'message' // Даем N8N понять, это просто открытие чата или сообщение
        }),
      })

      if (res.ok) {
        const data = await res.json()

        // Читаем текст ответа от webhook
        const botText = data?.reply || data?.text || data?.output || data?.message || (typeof data === 'string' ? data : null)

        if (botText) {
          addMsg(botText, 'bot')
        }

        // Читаем быстрые ответы от webhook (если N8N их прислал как массив строк)
        if (data?.quickReplies && Array.isArray(data.quickReplies)) {
          setQuickReplies(data.quickReplies)
        }
      }
    } catch (err) {
      console.error('N8N Fetch Error:', err)
      // Показываем ошибку связи только если это был реальный запрос от пользователя
      if (!isInit) {
        addMsg('Сервер временно недоступен / Connection error.', 'bot')
      }
    } finally {
      setTyping(false)
    }
  }

  /* ── Инициализация: запрашиваем приветствие от N8N при открытии окна ── */
  useEffect(() => {
    if (isOpen && messages.length === 0 && !typing) {
      sendToN8n('', true)
    }
  }, [isOpen])

  const handleSend = () => {
    const t = input.trim()
    if (!t) return
    addMsg(t, 'user')
    setInput('')
    sendToN8n(t)
  }

  const handleQR = (val) => {
    addMsg(val, 'user')
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
                <div className={styles.agentName}>Lumi — AI Chat</div>
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
