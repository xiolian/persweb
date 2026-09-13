import { useEffect, useState } from 'react'
import './App.css'
import homeButton from './assets/notesUI/homeButton.png'
import backgroundImage from './assets/notesUI/background.png'
import clock from './assets/notesUI/clock.png'
import ghLogo from './assets/notesUI/ghLogo.png'
import linLogo from './assets/notesUI/linLogo.png'
import discLogo from './assets/notesUI/disLogo.png'

// Top navigation. These are future page links, so they use hash routes.
const navItems = [
  { label: 'Home', href: '#/' },
  { label: 'About Me', href: '#/about' },
  { label: 'Projects', href: '#/projects' },
  { label: 'Drawings', href: '#/drawings' },
]

// Sidebar text. Edit these arrays when you want different note lines.
const blogEntries = ['Today', 'Yesterday', 'Other']
const classNotes = ['CECS524', 'CECS528', 'CECS543']

// Diary entries
const diaryEntries = [
  {
    title: 'Dear Diary,',
    date: 'Sep 13, 2026',
    time: 'Afternoon',
    body: 'Today I worked on my tiny web corner. It is starting to feel like mine.',
  },
  {
    title: 'Dear Diary,',
    date: 'Sep 12, 2026',
    time: 'Evening',
    body: 'I made the homepage feel more like a sketchbook. The little panels are behaving now.',
  },
  {
    title: 'Dear Diary,',
    date: 'Sep 11, 2026',
    time: 'Late',
    body: 'First draft energy. Not perfect, but very alive.',
  },
]

// Connections
const friendLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: ghLogo, fallback: 'GH'  },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: linLogo, fallback: 'IN'  },
  { label: 'Discord', href: '#', icon: discLogo, fallback: 'DC'  },
]

function App() {
  const [diaryIndex, setDiaryIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState('')
  const activeDiaryEntry = diaryEntries[diaryIndex]

  useEffect(() => {
    function updateCurrentTime() {
      setCurrentTime(
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
      )
    }

    updateCurrentTime()
    const timerId = window.setInterval(updateCurrentTime, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  function showPreviousDiaryEntry() {
    setDiaryIndex((currentIndex) =>
      currentIndex === 0 ? diaryEntries.length - 1 : currentIndex - 1,
    )
  }

  function showNextDiaryEntry() {
    setDiaryIndex((currentIndex) =>
      currentIndex === diaryEntries.length - 1 ? 0 : currentIndex + 1,
    )
  }

  return (
    <div className="app-shell" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header / navigation area */}
      <nav className="site-nav">
        <a className="home-button" href="#/">
          <img src={homeButton} alt="Home" />
        </a>

        <div className="nav-clock">
          <img src={clock} alt="" />
          <span className="clock-time">{currentTime}</span>
        </div>

        <div className="nav-links">
          {navItems
            .filter((item) => item.label !== 'Home')
            .map((item) => (
              <a className="nav-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
        </div>
      </nav>

      {/* Main home-page sketch layout */}
      <main className="home-layout">
        <section className="diary-panel" id="home">
          <h1>{activeDiaryEntry.title}</h1>
          <p className="diary-entry-text">{activeDiaryEntry.body}</p>

          <div className='diary-controls'>
            <div className='diary-buttons'>
              <button type='button' onClick={showPreviousDiaryEntry}>&lt; Prev</button>
              <button type='button' onClick={showNextDiaryEntry}>Next &gt;</button>
            </div>
            
            <p>{activeDiaryEntry.date} | {activeDiaryEntry.time}</p>
          </div>
        </section>

        <section className="friends-panel" id="about">
          <h2>Wanna B Friends?</h2>

          <div className='friend-links'>
            {friendLinks.map((link) => (
              <a className='friend-link' href={link.href} key={link.label}>
                <span className="friend-icon">
                  {link.icon ? <img src={link.icon} alt="" /> : link.fallback}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </section>

        <aside className="side-notes">
          <section className="note-panel blog-note" id="blog">
            <h2>Blog Entry</h2>
            {blogEntries.map((entry) => (
              <p key={entry}>&gt; {entry}</p>
            ))}
          </section>

          <section className="note-panel class-note" id="notes">
            <h2>Xiolian's Notes</h2>
            {classNotes.map((note) => (
              <p key={note}>&gt; {note}</p>
            ))}
          </section>
        </aside>
      </main>
    </div>

  )
}

export default App
