import { useState, useRef, useEffect } from 'react'
import styles from './Chatbot.module.css'

const QUICK_REPLIES_INIT = ['Ресницы','Ламинирование','Брови','Волосы']
const TIME_OPTIONS = ['Сегодня','Завтра','На этой неделе','Выбрать дату']

export default function Chatbot({ isOpen, onOpen, onClose }) {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Привет! Помогу записаться на услугу 💫 Что вас интересует?' }
  ])
  const [quickReplies, setQuickReplies] = useState(QUICK_REPLIES_INIT)
  const [input, setInput] = useState('')
  const [state, setState] = useState('start')
  const [selectedSvc, setSelectedSvc] = useState('')
  const [typing, setTyping] = useState(false)
  const msgsRef = useRef(null)

  const scrollBottom = () => {
    setTimeout(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, 50)
  }

  const addMsg = (text, type = 'bot') => {
    setMessages(prev => [...prev, { type, text }])
    scrollBottom()
  }

  const botReply = (text, replies = []) => {
    setTyping(true)
    setQuickReplies([])
    setTimeout(() => {
      setTyping(false)
      addMsg(text)
      setQuickReplies(replies)
    }, 900)
  }

  const selectSvc = (svc) => {
    setSelectedSvc(svc)
    addMsg(svc, 'user')
    setQuickReplies([])
    botReply(`Отличный выбор! ${svc} 💕\nКогда вам удобно прийти?`, TIME_OPTIONS)
    setState('time')
  }

  const selectTime = (t) => {
    addMsg(t, 'user')
    setQuickReplies([])
    botReply('Напишите имя и телефон для подтверждения 📝', [])
    setState('contact')
  }

  const handleQR = (val) => {
    if (state === 'start') selectSvc(val)
    else if (state === 'time') selectTime(val)
  }

  const sendMsg = () => {
    const t = input.trim()
    if (!t) return
    addMsg(t, 'user')
    setInput('')
    if (state === 'contact') {
      botReply(`Спасибо! ✨ Заявка принята. Свяжемся для подтверждения записи на ${selectedSvc}. До встречи! 💛`)
      setState('done')
    } else {
      botReply('Выберите интересующую услугу:', QUICK_REPLIES_INIT)
    }
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
                <div className={styles.agentName}>Lumi — запись онлайн</div>
                <div className={styles.agentStatus}>● Онлайн</div>
              </div>
            </div>
            <button className={styles.close} onClick={onClose}>✕</button>
          </div>

          <div className={styles.msgs} ref={msgsRef}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.type === 'user' ? styles.user : styles.bot}`}>
                {m.type === 'bot' && <div className={styles.mav}>✨</div>}
                <div className={styles.mb} dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g,'<br/>') }} />
              </div>
            ))}
            {typing && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <div className={styles.mav}>✨</div>
                <div className={styles.mb}><span className={styles.dot}/><span className={styles.dot}/><span className={styles.dot}/></div>
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
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Напишите сообщение..."
            />
            <button className={styles.send} onClick={sendMsg}>➤</button>
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
