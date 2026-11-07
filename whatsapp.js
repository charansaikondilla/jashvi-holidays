(() => {
  const whatsappNumber = '919030923838';
  const phoneNumber = '+919985635637';
  const emailAddress = 'info@jashviholidays.com';
  const businessAddress = '1st and 2nd Floor, House No. 6-3-200/A, Road No. 1, Prem Nagar, Banjara Hills, Hyderabad, Telangana 500034 (Lane next to Karachi Bakery)';
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(businessAddress)}`;
  const messageUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const openWhatsApp = (message) => {
    const opened = window.open(messageUrl(message), '_blank');
    if (opened) opened.opener = null;
    else window.location.assign(messageUrl(message));
  };
  const pageHeading = () => document.querySelector('main h1')?.textContent.trim() || document.title;
  const pageDestination = () => document.querySelector('.country-hero h1')?.textContent.trim() || '';

  const whatsappMark = `<svg viewBox="0 0 32 32" role="img" aria-label="WhatsApp">
    <path fill="currentColor" d="M16.03 3C9.4 3 4 8.37 4 14.99c0 2.12.56 4.2 1.62 6.04L4 27l6.13-1.6a12 12 0 0 0 5.89 1.54h.01c6.62 0 12-5.38 12-12S22.66 3 16.03 3zm0 21.87c-1.84 0-3.64-.5-5.2-1.46l-.37-.22-3.64.95.97-3.55-.24-.37a9.8 9.8 0 0 1-1.51-5.23c0-5.51 4.49-10 10-10 2.67 0 5.18 1.04 7.07 2.93a9.94 9.94 0 0 1 2.93 7.07c0 5.52-4.49 10-10 10zm5.49-7.49c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35z"/>
  </svg>`;
  const contactIcons = {
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    location: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  const chatButton = document.querySelector('#chat');
  if (chatButton) {
    chatButton.innerHTML = whatsappMark;
    chatButton.setAttribute('aria-label', 'Chat with Jashvi Holidays on WhatsApp');
    chatButton.title = 'Chat with Jashvi Holidays on WhatsApp';
  }

  const dialog = document.querySelector('#dialog');
  if (dialog) {
    dialog.setAttribute('aria-labelledby', 'wa-chat-title');
    dialog.innerHTML = `
      <div class="wa-chat">
        <header class="wa-chat-header">
          <div><span class="wa-status-dot"></span><h2 id="wa-chat-title">Jashvi WhatsApp assistant</h2><p>We’ll continue your enquiry in WhatsApp.</p></div>
          <button class="wa-close" type="button" aria-label="Close chat">×</button>
        </header>
        <div class="wa-chat-log" id="wa-chat-log" role="log" aria-live="polite">
          <p class="wa-bubble wa-bot">Hello! I can help you plan a holiday. Tell me what you have in mind, then continue in WhatsApp.</p>
        </div>
        <div class="wa-quick-replies" aria-label="Suggested messages">
          <button type="button" data-message="I would like help planning a holiday. Please share destination ideas.">Plan a trip</button>
          <button type="button" data-message="I would like to speak with a Jashvi Holidays travel expert.">Talk to an expert</button>
        </div>
        <form class="wa-chat-form" id="wa-chat-form">
          <label class="sr-only" for="wa-chat-message">Your message</label>
          <textarea id="wa-chat-message" name="message" rows="2" required maxlength="1500" placeholder="Type your travel message…"></textarea>
          <button type="submit">Continue in WhatsApp <span aria-hidden="true">↗</span></button>
        </form>
        <p class="wa-chat-note">WhatsApp opens with your message ready. Tap Send there to deliver it.</p>
      </div>`;

    const input = dialog.querySelector('#wa-chat-message');
    const log = dialog.querySelector('#wa-chat-log');
    const heading = pageHeading();
    const destination = pageDestination();
    input.value = destination
      ? `Hi, I’m viewing ${destination} on the Jashvi Holidays website and would like to plan a trip.`
      : `Hi, I’m viewing ${heading} on the Jashvi Holidays website and would like help planning a trip.`;

    dialog.querySelector('.wa-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.querySelectorAll('[data-message]').forEach((button) => {
      button.addEventListener('click', () => {
        input.value = `${button.dataset.message}\nPage: ${heading}${destination ? `\nDestination: ${destination}` : ''}`;
        input.focus();
      });
    });
    dialog.querySelector('#wa-chat-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = input.value.trim();
      if (!message) return;
      const bubble = document.createElement('p');
      bubble.className = 'wa-bubble wa-user';
      bubble.textContent = message;
      log.append(bubble);
      const confirmation = document.createElement('p');
      confirmation.className = 'wa-bubble wa-bot';
      confirmation.textContent = 'Opening WhatsApp with your message. Tap Send in WhatsApp to deliver it.';
      log.append(confirmation);
      log.scrollTop = log.scrollHeight;
      openWhatsApp(message);
    });
  }

  // Keep destination search forms on the site; send all trip and contact forms to WhatsApp.
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id === 'search' || form.classList.contains('search') || form.querySelector('#query, #mobile-query')) return;
    const values = new FormData(form);
    const fields = [...values.entries()]
      .filter(([key, value]) => key && String(value).trim())
      .map(([key, value]) => {
        const control = form.elements.namedItem(key);
        const label = control?.getAttribute?.('aria-label') || control?.getAttribute?.('placeholder') || key.replace(/[-_]/g, ' ');
        return `${label}: ${String(value).trim()}`;
      });
    if (!fields.length) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const destination = String(values.get('destination') || pageDestination() || '').trim();
    const context = [`Page: ${pageHeading()}`, `URL: ${location.origin}${location.pathname}`];
    if (destination) context.push(`Destination: ${destination}`);
    openWhatsApp(`Hello Jashvi Holidays, I would like to enquire about a trip.\n${context.join('\n')}\n${fields.join('\n')}`);

    const status = form.querySelector('.form-message, .modal-status');
    if (status) status.textContent = 'WhatsApp is opening with your page and trip details. Tap Send in WhatsApp to deliver the enquiry.';
  }, true);

  // Add the agency’s direct contact details and business address to every footer.
  document.querySelectorAll('footer .wrap').forEach((footer) => {
    if (footer.querySelector('.wa-contact-details')) return;
    const details = document.createElement('div');
    details.className = 'wa-contact-details';
    details.innerHTML = `
      <h3 class="wa-contact-title">Get in touch</h3>
      <a class="wa-contact-card" href="tel:${phoneNumber}"><span class="wa-contact-icon" aria-hidden="true">${contactIcons.phone}</span><span class="wa-contact-copy"><span>Phone</span><strong>+91 99856 35637</strong></span><span class="wa-contact-arrow" aria-hidden="true">${contactIcons.arrow}</span></a>
      <a class="wa-contact-card" href="mailto:${emailAddress}"><span class="wa-contact-icon" aria-hidden="true">${contactIcons.email}</span><span class="wa-contact-copy"><span>Email</span><strong>${emailAddress}</strong></span><span class="wa-contact-arrow" aria-hidden="true">${contactIcons.arrow}</span></a>
      <a class="wa-contact-card" href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener noreferrer"><span class="wa-contact-icon wa-contact-icon-chat" aria-hidden="true">${whatsappMark}</span><span class="wa-contact-copy"><span>WhatsApp Business</span><strong>+91 90309 23838</strong></span><span class="wa-contact-arrow" aria-hidden="true">${contactIcons.arrow}</span></a>
      <a class="wa-contact-card wa-contact-card-location" href="${mapUrl}" target="_blank" rel="noopener noreferrer"><span class="wa-contact-icon" aria-hidden="true">${contactIcons.location}</span><span class="wa-contact-copy"><span>Business location</span><strong>${businessAddress}</strong></span><span class="wa-contact-arrow" aria-hidden="true">${contactIcons.arrow}</span></a>`;
    footer.append(details);
  });
})();
