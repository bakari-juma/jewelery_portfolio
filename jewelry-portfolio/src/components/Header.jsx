import { useEffect, useRef, useState } from 'react'
import { content } from '../data/content'
import '../styles/header.css'

export function Header({ activeSection, theme, onThemeToggle }) {
  const links = content.nav
  return <HeaderNavigation activeSection={activeSection} theme={theme} onThemeToggle={onThemeToggle} links={links} />
}

function HeaderNavigation({ activeSection, theme, onThemeToggle, links }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const closeOnOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutside)
    return () => document.removeEventListener('pointerdown', closeOnOutside)
  }, [])

  return (
    <header className="site-header">
      <div className="header-inner" ref={navRef}>
        <a className="wordmark" href="#top" onClick={() => setOpen(false)} aria-label={`${content.hero.name}, home`}>
          <span className="wordmark-mark" aria-hidden="true">M</span>
          <span>{content.hero.name}</span>
        </a>
        <button className="menu-toggle" type="button" aria-label={open ? content.ui.menuClose : content.ui.menuOpen} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span /><span /><span />
        </button>
        <nav className={`primary-nav${open ? ' is-open' : ''}`} aria-label={content.ui.navLabel}>
          {links.map((item) => <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'is-active' : ''} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
          <button className="theme-toggle" type="button" onClick={onThemeToggle} aria-label={theme === 'dark' ? content.ui.themeToLight : content.ui.themeToDark} title={theme === 'dark' ? content.ui.themeToLight : content.ui.themeToDark}>
            <span className="theme-glyph" aria-hidden="true">{theme === 'dark' ? '☼' : '◐'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
