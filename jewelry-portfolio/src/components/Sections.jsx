import { useMemo, useState } from 'react'
import { content } from '../data/content'
import '../styles/sections.css'

export function HowIWork() {
  const [selected, setSelected] = useState(0)
  const steps = content.workflow.steps
  const current = steps[selected]
  return (
    <section className="content-section workflow-section page-width reveal" id="workflow" aria-labelledby="workflow-title">
      <div className="section-heading">
        <p className="eyebrow"><span className="eyebrow-rule" />{content.workflow.eyebrow}</p>
        <h2 id="workflow-title">{content.workflow.title}</h2>
        <p className="section-intro">{content.workflow.intro}</p>
      </div>
      <div className="workflow-layout">
        <div className="step-list" role="tablist" aria-label={content.workflow.title}>
          {steps.map((step, index) => <button key={step.title} className={`step-button${selected === index ? ' is-selected' : ''}`} type="button" role="tab" id={`step-tab-${index}`} aria-selected={selected === index} aria-controls="step-panel" onClick={() => setSelected(index)}>
            <span className="step-number">0{index + 1}</span><span>{step.title}</span><span className="step-arrow" aria-hidden="true">↗</span>
          </button>)}
        </div>
        <article className="step-detail" id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${selected}`}>
          <span className="detail-kicker">STEP 0{selected + 1}</span>
          <h3>{current.title}</h3>
          <p>{current.detail}</p>
          <div className="example-note"><span>REAL EXAMPLE</span><p>{current.example}</p></div>
        </article>
      </div>
    </section>
  )
}

export function TrendRadar() {
  const [source, setSource] = useState('All sources')
  const trends = useMemo(() => source === 'All sources' ? content.trends.items : content.trends.items.filter((item) => item.source === source), [source])
  return (
    <section className="content-section trend-section page-width reveal" id="trend-radar" aria-labelledby="trend-title">
      <div className="section-heading section-heading-inline">
        <div><p className="eyebrow"><span className="eyebrow-rule" />{content.trends.eyebrow}</p><h2 id="trend-title">{content.trends.title}</h2><p className="section-intro">{content.trends.intro}</p></div>
        <div className="filter-row" role="group" aria-label="Filter trends by source">
          {content.ui.sourceFilters.map((item) => <button key={item} type="button" className={`filter-chip${source === item ? ' is-selected' : ''}`} aria-pressed={source === item} onClick={() => setSource(item)}>{item}</button>)}
        </div>
      </div>
      <div className="trend-grid">
        {trends.map((trend, index) => <article className="trend-item" key={`${trend.source}-${index}`}>
          <div className="trend-topline"><span className="source-tag">{trend.source}</span><span className="trend-index">0{index + 1}</span></div>
          <h3>{trend.trend}</h3>
          <a className="trend-source" href="#contact">{trend.signal}<span aria-hidden="true">↗</span></a>
          <dl className="trend-fields"><div><dt>Why it's trending</dt><dd>{trend.why}</dd></div><div><dt>How I'd productize it</dt><dd>{trend.product}</dd></div></dl>
          <div className="heat-meter"><span>{content.trends.heatLabel}</span><div className="heat-track" role="img" aria-label={`${content.trends.heatLabel}: ${trend.heat} of 5`}>{Array.from({ length: 5 }, (_, step) => <i className={step < trend.heat ? 'is-hot' : ''} key={step} />)}</div></div>
        </article>)}
      </div>
    </section>
  )
}
