
'use strict';
document.documentElement.classList.add('js');
const $=(s,ctx=document)=>ctx.querySelector(s);
const $$=(s,ctx=document)=>Array.from(ctx.querySelectorAll(s));
const phone=document.body.dataset.phone;
const contact=(msg)=>`https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`;
function openWhatsApp(msg){const a=document.createElement('a');a.href=contact(msg);a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove();}
let toastTimer;
function notify(text){const toast=$('#toast');if(!toast)return;toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3400)}
const menu=$('.menu-btn');const nav=$('.nav-list');
if(menu&&nav){menu.addEventListener('click',()=>{const opened=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'✕ Fechar':'☰ Menu'});$$('.nav-list a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.textContent='☰ Menu'}));}
$$('[data-contact]').forEach(el=>el.addEventListener('click',()=>{openWhatsApp(el.dataset.contact)}));
$$('[data-filter-group]').forEach(group=>{const target=group.dataset.filterGroup;const cards=$$(`[data-card-group="${target}"]`);$$('[data-filter]',group).forEach(btn=>btn.addEventListener('click',()=>{$$('[data-filter]',group).forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});const filter=btn.dataset.filter;cards.forEach(card=>{card.hidden=filter!=='Todos'&&card.dataset.category!==filter})}))});
$$('.faq-question').forEach(q=>q.addEventListener('click',()=>{const a=q.nextElementSibling;const opened=q.getAttribute('aria-expanded')==='true';q.setAttribute('aria-expanded',String(!opened));a.hidden=opened}));
const reveal=$$('.reveal');if('IntersectionObserver' in window){const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');obs.unobserve(entry.target)}})},{threshold:.05});reveal.forEach(el=>obs.observe(el))}else reveal.forEach(el=>el.classList.add('in'));
$$('img').forEach(img=>{img.addEventListener('error',()=>{img.classList.add('image-failed');const p=img.parentElement;if(p)p.classList.add('has-failed-image')})});


$$('[data-occasion]').forEach(btn=>btn.addEventListener('click',()=>{
 $$('[data-occasion]').forEach(el=>el.classList.toggle('active',el===btn));
 const selected=btn.dataset.occasion;$('#occasion-name').textContent=selected;
 $('#df-type').value=selected;$('#encomendar').scrollIntoView({behavior:'smooth',block:'start'});
}));
$('#dolce-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget; if(!form.reportValidity())return;
const f=new FormData(form);const detail=String(f.get('detalhes')||'').trim();
const lines=[`Olá, Dolce Fran! Meu nome é ${f.get('nome')}.`,`Gostaria de solicitar um orçamento para: ${f.get('ocasiao')}.`,`Interesse: ${f.get('produto')}.`,f.get('data')?`Data do evento: ${f.get('data')}.`:'',detail?`Detalhes: ${detail}`:'','Podem me informar opções, valores e disponibilidade?'];
openWhatsApp(lines.filter(Boolean).join('\n'));notify('Abrindo WhatsApp para revisar seu pedido.');
});
