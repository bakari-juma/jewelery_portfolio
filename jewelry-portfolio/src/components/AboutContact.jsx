import { useState } from 'react'
import { content } from '../data/content'
import '../styles/about-contact.css'

export function DtcAbout() {
  return <>
    <section className="content-section dtc-section page-width reveal" id="dtc" aria-labelledby="dtc-title">
      <div className="dtc-marker"><span>SHOPIFY</span><span>01 / 01</span></div><div className="dtc-copy"><p className="eyebrow"><span className="eyebrow-rule" />{content.dtc.eyebrow}</p><h2 id="dtc-title">{content.dtc.title}</h2><span className="learning-label">{content.dtc.label}</span><p className="section-intro">{content.dtc.copy}</p><ul>{content.dtc.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
    </section>
    <section className="content-section about-section page-width reveal" id="about" aria-labelledby="about-title">
      <div className="about-copy"><p className="eyebrow"><span className="eyebrow-rule" />{content.about.eyebrow}</p><h2 id="about-title">{content.about.title}</h2><p className="about-bio">{content.about.bio}</p><a className="button button-quiet cv-link" href={content.cvUrl} download>{content.cvLabel}<span aria-hidden="true">↓</span></a></div>
      <aside className="weekly-update" aria-labelledby="weekly-update-title"><p className="update-kicker">ASYNC / WEEKLY</p><h3 id="weekly-update-title">{content.about.updateTitle}</h3><dl>{content.about.update.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></aside>
    </section>
  </>
}

export function ContactFooter() {
  const [formState, setFormState] = useState('idle')
  const contact = content.contact
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    if (!contact.emailHref || contact.emailHref.includes('[')) { setFormState('unconfigured'); return }
    const formData = new FormData(form)
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get('name')}`)
    const body = encodeURIComponent(`${formData.get('message')}\n\n${formData.get('name')} (${formData.get('email')})`)
    window.location.href = `mailto:${contact.emailHref}?subject=${subject}&body=${body}`
    setFormState('ready')
  }
  return <>
    <section className="contact-section reveal" id="contact" aria-labelledby="contact-title"><div className="contact-inner page-width">
      <div className="contact-copy"><p className="eyebrow"><span className="eyebrow-rule" />{contact.eyebrow}</p><h2 id="contact-title">{contact.title}</h2><p>{contact.intro}</p><span className="reply-badge"><span className="reply-dot" />{contact.responseTime}</span>
        <div className="contact-links"><a href={contact.emailHref || '#contact-form'}>{contact.email}<span aria-hidden="true">↗</span></a><a href={contact.whatsappHref || '#contact-form'}>{contact.whatsapp}<span aria-hidden="true">↗</span></a><a href={contact.linkedinHref || '#contact-form'}>{contact.linkedin}<span aria-hidden="true">↗</span></a></div>
      </div>
      <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
        <label>{contact.form.name}<input name="name" type="text" autoComplete="name" required /></label>
        <label>{contact.form.email}<input name="email" type="email" autoComplete="email" required /></label>
        <label>{contact.form.message}<textarea name="message" rows="4" required /></label>
        <button className="button button-light" type="submit">{contact.form.submit}<span aria-hidden="true">↗</span></button>
        {formState !== 'idle' && <p className="form-feedback" role="status">{formState === 'ready' ? contact.form.ready : contact.form.configured}</p>}
      </form>
    </div></section>
    <footer className="site-footer"><div className="footer-inner page-width"><span className="trial-badge"><span aria-hidden="true">✳</span>{content.footer.trial}</span><span className="footer-name">{content.hero.name} <span>·</span> {content.hero.eyebrow}</span><a href="#top" className="back-top">{content.footer.backToTop}<span aria-hidden="true">↑</span></a></div></footer>
  </>
}
