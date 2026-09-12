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

// Connections
const friendLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: ghLogo, fallback: 'GH'  },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: linLogo, fallback: 'IN'  },
  { label: 'Discord', href: '#', icon: discLogo, fallback: 'DC'  },
]

function App() {

  return (
    <div className="app-shell" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header / navigation area */}
      <nav className="site-nav">
        <a className="home-button" href="#/">
          <img src={homeButton} alt="Home" />
        </a>

        <div className="nav-clock">
          <img src={clock} alt="Xiolian's Time" />
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
          <h1>Dear Diary,</h1>

          <div className='diary-controls'>
            <div className='diary-buttons'>
              <button type='button'>&lt; Prev</button>
              <button type='button'>Next &gt;</button>
            </div>
            
            <p>Date | Time</p>
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
