import { useState } from 'react'
import { content } from '../data/content'
import '../styles/product-lab.css'

export function SpecShowcase() {
  const [selected, setSelected] = useState(0)
  const spec = content.specSheet
  const dimensions = spec.dimensions
  const imageSource = spec.image && !spec.image.includes('[ADD') ? spec.image : ''
  return <section className="content-section spec-section page-width reveal" id="spec-sheet" aria-labelledby="spec-title">
    <div className="spec-copy"><p className="eyebrow"><span className="eyebrow-rule" />{spec.eyebrow}</p><h2 id="spec-title">{spec.title}</h2><p className="section-intro">{spec.intro}</p>
      <div className="spec-active-detail" aria-live="polite"><span>{dimensions[selected].name}</span><strong>{dimensions[selected].value}</strong></div>
      <a className="button button-dark spec-download" href={spec.downloadUrl} download>{spec.downloadLabel}<span aria-hidden="true">↓</span></a><p className="spec-note">{spec.note}</p>
    </div>
    <div className="spec-visual" aria-label={spec.productName}>
      <div className="spec-product-art" role={imageSource ? undefined : 'img'} aria-label={imageSource ? undefined : `${spec.productName} ${content.ui.imagePlaceholder}`}>{imageSource && <img className="spec-photo" src={imageSource} alt={spec.imageAlt} loading="lazy" />}<span className="spec-chain" aria-hidden="true"/><span className="spec-pendant-loop" aria-hidden="true"/><span className="spec-pendant" aria-hidden="true"/><span className="spec-gem" aria-hidden="true"/></div>
      {dimensions.map((item, index) => <button key={item.name} type="button" className={`hotspot hotspot-${index + 1}${selected === index ? ' is-selected' : ''}`} aria-label={`${item.name}: ${item.value}`} aria-pressed={selected === index} onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}><span>{index + 1}</span></button>)}
      <span className="spec-label spec-label-name">{spec.productName}</span>{imageSource ? null : <span className="image-placeholder-tag">{content.ui.imagePlaceholder}</span>}
    </div>
  </section>
}

export function MockupLab() {
  const [progress, setProgress] = useState(50)
  const aiProgress = Math.min(progress * 2, 100)
  const stageImage = (source) => source && !source.includes('[ADD') ? source : ''
  const finalProgress = Math.max(Math.min((progress - 50) * 2, 100), 0)
  const activeStage = progress < 25 ? 0 : progress < 75 ? 1 : 2
  return <section className="content-section mockup-section page-width reveal" id="mockup-lab" aria-labelledby="mockup-title">
    <div className="mockup-heading"><p className="eyebrow"><span className="eyebrow-rule" />{content.mockup.eyebrow}</p><h2 id="mockup-title">{content.mockup.title}</h2></div>
    <div className="mockup-layout">
      <div className="mockup-workbench" style={{ '--ai-progress': `${aiProgress}%`, '--final-progress': `${finalProgress}%` }}>
        <div className="mockup-stage mockup-sketch" role={stageImage(content.mockup.sketchImage) ? undefined : 'img'} aria-label={stageImage(content.mockup.sketchImage) ? undefined : content.mockup.sketchAlt}>{stageImage(content.mockup.sketchImage) && <img className="mockup-photo" src={content.mockup.sketchImage} alt={content.mockup.sketchAlt} loading="lazy" />}<span className="sketch-orbit" aria-hidden="true"/><span className="sketch-pendant" aria-hidden="true"/><span className="stage-mark">01</span></div>
        <div className="mockup-stage mockup-ai" role={stageImage(content.mockup.aiImage) ? undefined : 'img'} aria-label={stageImage(content.mockup.aiImage) ? undefined : `${content.mockup.stages[1]}, ${content.ui.conceptRender}`}>{stageImage(content.mockup.aiImage) && <img className="mockup-photo" src={content.mockup.aiImage} alt={content.mockup.aiAlt} loading="lazy" />}<span className="ai-pendant" aria-hidden="true"/><span className="concept-badge">{content.ui.conceptRender}</span><span className="stage-mark">02</span></div>
        <div className="mockup-stage mockup-final" role={stageImage(content.mockup.finalImage) ? undefined : 'img'} aria-label={stageImage(content.mockup.finalImage) ? undefined : content.mockup.finalAlt}>{stageImage(content.mockup.finalImage) && <img className="mockup-photo" src={content.mockup.finalImage} alt={content.mockup.finalAlt} loading="lazy" />}<span className="final-pendant" aria-hidden="true"/><span className="stage-mark">03</span></div>
        <div className="mockup-caption"><span>{content.mockup.stages[activeStage]}</span><span>0{activeStage + 1} / 03</span></div>
      </div>
      <div className="mockup-details"><p className="section-intro">{content.mockup.intro}</p><label className="range-label" htmlFor="mockup-range">{content.mockup.sliderLabel}</label><input id="mockup-range" className="mockup-range" type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} aria-valuetext={content.mockup.stages[activeStage]} /><div className="stage-labels"><span>{content.mockup.stages[0]}</span><span>{content.mockup.stages[1]}</span><span>{content.mockup.stages[2]}</span></div><div className="tools-note"><span>{content.mockup.toolsLabel}</span><strong>{content.mockup.tools}</strong></div></div>
    </div>
  </section>
}

export function ProductionLog() {
  const [selected, setSelected] = useState(0)
  const revisions = content.production.revisions
  const revision = revisions[selected]
  return <section className="content-section production-section page-width reveal" id="production" aria-labelledby="production-title">
    <div className="section-heading"><p className="eyebrow"><span className="eyebrow-rule" />{content.production.eyebrow}</p><h2 id="production-title">{content.production.title}</h2><p className="section-intro">{content.production.intro}</p></div>
    <div className="revision-layout"><div className="revision-timeline" role="tablist" aria-label={content.production.title}>{revisions.map((item, index) => <button key={item.version} className={`revision-step${index === selected ? ' is-selected' : ''}`} type="button" role="tab" id={`revision-tab-${index}`} aria-selected={index === selected} aria-controls="revision-panel" onClick={() => setSelected(index)}><span>{item.version}</span><strong>{item.title}</strong></button>)}</div>
      <article className="revision-detail" id="revision-panel" role="tabpanel" aria-labelledby={`revision-tab-${selected}`}><span className="revision-version">{revision.version}</span><h3>{revision.title}</h3><p>{revision.change}</p><div className="revision-note"><span>BLOCKER CLEARING</span><p>{content.production.intro}</p></div></article>
    </div>
  </section>
}
