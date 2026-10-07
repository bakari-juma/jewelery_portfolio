import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowIWork, TrendRadar } from './components/Sections'
import { CaseStudies } from './components/Projects'
import { MockupLab, ProductionLog, SpecShowcase } from './components/ProductLab'
import { ContactFooter, DtcAbout } from './components/AboutContact'
import { content } from './data/content'

function App() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem('portfolio-theme') || 'light')
  const [activeSection, setActiveSection] = useState('workflow')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

    const sectionIds = content.nav.map((item) => item.id).concat('contact')
    const activeObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.1, 0.3, 0.6] })
    sectionIds.map((id) => document.getElementById(id)).filter(Boolean).forEach((section) => activeObserver.observe(section))
    return () => { revealObserver.disconnect(); activeObserver.disconnect() }
  }, [])

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light')
  return <div className="site-frame"><Header activeSection={activeSection} theme={theme} onThemeToggle={toggleTheme} /><main><Hero /><HowIWork /><TrendRadar /><CaseStudies /><SpecShowcase /><MockupLab /><ProductionLog /><DtcAbout /></main><ContactFooter /></div>
}

export default App
