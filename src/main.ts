import './styles/site.css';
import './styles/art-direction.css';
import './styles/refinements.css';
import './styles/typography.css';
import './styles/interactions.css';
import './styles/reference-layout.css';
import './styles/glass.css';
import './styles/footer.css';
import './styles/forms.css';
import './styles/brand.css';
import './styles/creative-footer.css';
import './styles/editorial-cleanup.css';
import './styles/homepage.css';
import './styles/original-content.css';
import './styles/hero-video.css';
import {initHeroVideo} from './hero-video';
import {initFooterGarden} from './footer-garden';
import {initNavigationMotion,initMarquees,initGlassInteractions,initServiceAccordion,initHeaderMarquee} from './interactions';
document.documentElement.classList.add('js-enabled');
const siteHeader=document.querySelector<HTMLElement>('.site-header');
const hero=document.querySelector<HTMLElement>('.experimental-hero');
if(hero&&siteHeader){const updateHeader=()=>siteHeader.classList.toggle('is-scrolled',scrollY>hero.offsetHeight-100);addEventListener('scroll',updateHeader,{passive:true});updateHeader();}

initNavigationMotion();
initMarquees();
initGlassInteractions();
initServiceAccordion();
initServiceAccordion('.home-approach details,.home-questions details','anz-home-disclosure');
initHeaderMarquee();
initFooterGarden();
initHeroVideo();

const filters=document.querySelector<HTMLElement>('.project-filters');
if(filters){
 filters.hidden=false;
 filters.querySelectorAll<HTMLButtonElement>('button').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter; let count=0;
  document.querySelectorAll<HTMLElement>('.portfolio .project-tile').forEach(tile=>{tile.hidden=filter!=='All' && tile.dataset.category!==filter;if(!tile.hidden)count++;});
  filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  const status=filters.querySelector('.filter-status');if(status)status.textContent=`${count} projects`;
 }));
}

const galleryLinks=Array.from(document.querySelectorAll<HTMLAnchorElement>('.gallery-open'));
document.querySelectorAll<HTMLElement>('.material-selector').forEach(section=>{
 section.querySelectorAll<HTMLButtonElement>('[data-material]').forEach(button=>button.addEventListener('click',()=>{
  const img=section.querySelector('figure img') as HTMLImageElement;img.src=button.dataset.material!;img.alt=button.dataset.alt??'';
  section.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  section.dispatchEvent(new CustomEvent('anz:image-change',{bubbles:true}));
 }));
});
document.querySelectorAll<HTMLElement>('.service-directory').forEach(section=>{
 const figure=section.querySelector<HTMLElement>('.directory-photo');let request=0;
 section.querySelectorAll<HTMLAnchorElement>('[data-preview]').forEach(link=>{
  const preview=async()=>{if(!figure)return;const token=++request;const img=new Image();img.src=link.dataset.preview!;img.alt=link.querySelector('h3')?.textContent??'';try{await img.decode();}catch{return;}if(token!==request)return;
   let next:Element=img;
   if(/\/(3835|3845)\.webp(?:\?|$)/.test(img.src)){const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');svg.classList.add('photo-framed');svg.setAttribute('viewBox','300 0 1000 1000');svg.setAttribute('preserveAspectRatio','xMidYMid slice');svg.setAttribute('role','img');svg.setAttribute('aria-label',img.alt);const source=document.createElementNS(ns,'image');source.setAttribute('href',img.src);source.setAttribute('width',String(img.naturalWidth));source.setAttribute('height',String(img.naturalHeight));svg.append(source);next=svg;}
   figure.querySelector('img,svg.photo-framed')?.replaceWith(next);section.dispatchEvent(new CustomEvent('anz:image-change',{bubbles:true}));
  };link.addEventListener('mouseenter',()=>void preview());link.addEventListener('focus',()=>void preview());
 });
});
if(galleryLinks.length){
 const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.setAttribute('aria-label','Project photographs');
 dialog.innerHTML='<div class="lightbox-bar"><button data-prev aria-label="Previous photograph">←</button><span aria-live="polite"></span><button data-next aria-label="Next photograph">→</button><button data-close aria-label="Close gallery">Close ×</button></div><img alt="">';dialog.querySelector('img')!.src=galleryLinks[0].href;document.body.append(dialog);
 let active=0;let trigger:HTMLElement|null=null;let touchX=0;
 const display=(index:number)=>{active=(index+galleryLinks.length)%galleryLinks.length;const link=galleryLinks[active];const img=dialog.querySelector('img')!;img.src=link.href;img.alt=link.querySelector('img')?.alt??'';dialog.querySelector('span')!.textContent=link.dataset.caption??'';};
 galleryLinks.forEach((link,index)=>link.addEventListener('click',e=>{e.preventDefault();trigger=link;display(index);dialog.showModal();document.body.classList.add('modal-open');}));
 dialog.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());
 dialog.querySelector('[data-prev]')?.addEventListener('click',()=>display(active-1));dialog.querySelector('[data-next]')?.addEventListener('click',()=>display(active+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight')display(active+1);if(e.key==='ArrowLeft')display(active-1);});
 dialog.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true});
 dialog.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>60)display(active+(dx<0?1:-1));},{passive:true});
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus();});
}

// Enhancement only: content remains visible before scripts, after errors and with reduced motion.
const constrained=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;
if(!matchMedia('(prefers-reduced-motion: reduce)').matches && !constrained){
 if(matchMedia('(min-width:951px) and (hover:hover) and (pointer:fine)').matches){
  import('./motion').then(({initSiteMotion})=>initSiteMotion()).catch(()=>{/* Native document flow remains usable. */});
 }else{
  import('./mobile-motion').then(({initMobileMotion})=>initMobileMotion()).catch(()=>{/* Native document flow remains usable. */});
 }
}
