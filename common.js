// ===== Ganak — Shared Behavior =====

function toggleTheme(){
  document.body.classList.toggle('dark');
  const btn = document.getElementById('theme-btn');
  const isDark = document.body.classList.contains('dark');
  if(btn) btn.textContent = isDark ? '☀ Light' : '🌙 Dark';
  const giscusFrame = document.querySelector('iframe.giscus-frame');
  if(giscusFrame){
    giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } } }, 'https://giscus.app');
  }
}

const translations = {
  en: {
    nav_home: "Home", nav_about: "About Us", nav_contact: "Contact Us",
    nav_terms: "Terms", nav_privacy: "Privacy Policy",
    footer_company: "Company", footer_legal: "Legal", footer_tools: "Tools",
    footer_tagline: "Free calculators for finance, construction, age and math — built for everyone, everywhere."
  },
  hi: {
    nav_home: "होम", nav_about: "हमारे बारे में", nav_contact: "संपर्क करें",
    nav_terms: "नियम व शर्तें", nav_privacy: "गोपनीयता नीति",
    footer_company: "कंपनी", footer_legal: "कानूनी", footer_tools: "टूल्स",
    footer_tagline: "फाइनेंस, निर्माण, उम्र और गणित के लिए मुफ़्त कैलकुलेटर — सभी के लिए, हर जगह।"
  },
  mr: {
    nav_home: "मुख्यपृष्ठ", nav_about: "आमच्याबद्दल", nav_contact: "संपर्क करा",
    nav_terms: "अटी व शर्ती", nav_privacy: "गोपनीयता धोरण",
    footer_company: "कंपनी", footer_legal: "कायदेशीर", footer_tools: "टूल्स",
    footer_tagline: "वित्त, बांधकाम, वय आणि गणितासाठी मोफत कॅल्क्युलेटर — सर्वांसाठी, सर्वत्र."
  }
};

function applyLanguage(lang){
  const dict = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
}

function onLangChange(){
  const sel = document.getElementById('lang-select');
  applyLanguage(sel.value);
}

document.addEventListener('DOMContentLoaded', function(){
  applyLanguage('en');

  document.querySelectorAll('.calc-card, .content-card, .toc').forEach(el=>{
    el.classList.add('glossy','fade-up');
  });
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el=> observer.observe(el));

  injectShareButton();
});

function injectShareButton(){
  const shareText = "🧮 Ganak — Free EMI, SIP, Age, BMI and 13+ calculators. No sign-up needed!";
  const shareUrl = "https://pavankumar-madavi-dev.github.io/ganak/";

  const fab = document.createElement('div');
  fab.className = 'share-fab';
  fab.innerHTML = '📤';
  fab.onclick = onShareFabClick;

  const menu = document.createElement('div');
  menu.className = 'share-menu';
  menu.id = 'share-menu';
  menu.innerHTML = `
    <a href="https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}" target="_blank"><span class="ic">🟢</span> WhatsApp</a>
    <a href="https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}" target="_blank"><span class="ic">🔵</span> Telegram</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank"><span class="ic">🔷</span> Facebook</a>
    <button onclick="copyShareLink()"><span class="ic">🔗</span> Copy Link</button>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(menu);
}

function onShareFabClick(){
  const shareText = "🧮 Ganak — Free EMI, SIP, Age, BMI and 13+ calculators. No sign-up needed!";
  const shareUrl = "https://pavankumar-madavi-dev.github.io/ganak/";
  if(navigator.share){
    navigator.share({ title: 'Ganak Calculators', text: shareText, url: shareUrl }).catch(()=>{});
  }else{
    document.getElementById('share-menu').classList.toggle('open');
  }
}

function copyShareLink(){
  const shareUrl = "https://pavankumar-madavi-dev.github.io/ganak/";
  navigator.clipboard.writeText(shareUrl).then(()=>{
    alert('Link copied!');
    document.getElementById('share-menu').classList.remove('open');
  });
}
