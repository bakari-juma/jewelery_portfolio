import { useEffect, useMemo, useRef, useState } from 'react'
import { content } from '../data/content'
import '../styles/projects.css'

function ProductSilhouette({ variant = 'pendant', label, src }) {
  const imageSource = src && !src.includes('[ADD') ? src : ''
  return <div className={`product-silhouette silhouette-${variant}${imageSource ? ' has-image' : ''}`} role={imageSource ? undefined : 'img'} aria-label={imageSource ? undefined : label || content.ui.imagePlaceholder}>
    {imageSource && <img className="product-photo" src={imageSource} alt={label || content.ui.imagePlaceholder} loading="lazy" />}
    <span className="silhouette-chain" aria-hidden="true" /><span className="silhouette-body" aria-hidden="true" /><span className="silhouette-detail" aria-hidden="true" />
  </div>
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" ref={dialogRef}>
      <button className="modal-close" ref={closeRef} type="button" onClick={onClose}>{content.ui.close}<span aria-hidden="true">×</span></button>
      <div className="modal-visual"><ProductSilhouette variant={project.category.toLowerCase()} label={project.designAlt} src={project.design} />{project.aiGenerated ? <span className="concept-render-tag">{content.ui.conceptRender}</span> : project.design.includes('[ADD') && <span className="image-placeholder-tag">{content.ui.imagePlaceholder}</span>}</div>
      <div className="modal-content">
        <p className="eyebrow"><span className="eyebrow-rule" />{project.category}</p>
        {project.status && <span className="concept-status">{project.status}</span>}
        <h2 id="project-modal-title">{project.title}</h2>
        <p className="modal-teaser">{project.teaser}</p>
        <div className="modal-copy-grid"><section><h3>{content.projects.modalLabels.idea}</h3><p>{project.idea}</p></section><section><h3>{content.projects.modalLabels.source}</h3><p>{project.source}</p></section></div>
        <section className="spec-block"><h3>{content.projects.modalLabels.specs}</h3><dl className="spec-table">{Object.entries(project.specs).map(([key, value]) => <div key={key}><dt>{content.projects.specLabels[key]}</dt><dd>{value}</dd></div>)}</dl></section>
        <section className="modal-copy-grid"><div><h3>{content.projects.modalLabels.production}</h3><p>{project.production}</p></div><div><h3>{content.projects.modalLabels.outcome}</h3><p>{project.outcome}</p></div></section>
      </div>
    </article>
  </div>
}

export function CaseStudies() {
  const [category, setCategory] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const projects = useMemo(() => category === 'All' ? content.projects.items : content.projects.items.filter((item) => item.category === category), [category])
  return <section className="content-section work-section page-width reveal" id="work" aria-labelledby="work-title">
    <div className="section-heading section-heading-inline"><div><p className="eyebrow"><span className="eyebrow-rule" />{content.projects.eyebrow}</p><h2 id="work-title">{content.projects.title}</h2><p className="section-intro">{content.projects.intro}</p></div>
      <div className="filter-row" role="group" aria-label="Filter projects by category">{content.ui.projectFilters.map((item) => <button type="button" className={`filter-chip${category === item ? ' is-selected' : ''}`} aria-pressed={category === item} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    </div>
    <div className="project-grid">{projects.map((project, index) => <button className="project-card" type="button" key={project.id} aria-haspopup="dialog" aria-label={`${content.projects.openLabel}: ${project.title}`} onClick={() => setActiveProject(project)}>
      <span className="project-card-art"><ProductSilhouette variant={project.category.toLowerCase()} label={project.designAlt} src={project.design} />{project.aiGenerated ? <span className="concept-render-tag">{content.ui.conceptRender}</span> : project.design.includes('[ADD') && <span className="image-placeholder-tag">{content.ui.imagePlaceholder}</span>}<span className="project-card-index">0{index + 1}</span></span>
      <span className="project-card-info"><span className="project-category">{project.category}{project.status && <span className="project-status"> · {project.status}</span>}</span><span className="project-card-title">{project.title}</span><span className="project-teaser">{project.teaser}</span><span className="project-open" aria-hidden="true">↗</span></span>
    </button>)}</div>
    {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
  </section>
}
