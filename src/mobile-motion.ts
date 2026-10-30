// Mobile reveals never measure or restore document scroll position. In
// particular, image loading must not invoke ScrollTrigger.refresh mid-fling.
export function initMobileMotion(){
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 const preference=matchMedia('(prefers-reduced-motion:reduce)');
 const animations=new Set<Animation>();
 const reveal=(el:Element,delay=0)=>{
  if(preference.matches)return;
  const animation=el.animate([{opacity:.7,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,delay,easing:'cubic-bezier(.22,1,.36,1)'});
  animations.add(animation);animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));
 };
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);reveal(entry.target);}
 },{rootMargin:'0px 0px -5% 0px',threshold:0});
 // Observe sections/cards, rather than words or nested photos, to keep the
 // number of layers and callbacks small. Content stays visible without JS.
 document.querySelectorAll('.home-chapter-head,.original-about-grid,.original-benefits article,.original-service-card,.project-tile,.home-approach-grid,.home-care,.original-award-grid figure,.original-publication,.service-hero,.pillar-hero,.service-detail,.insight-list article,.rooted-invitation').forEach(el=>observer.observe(el));
 document.querySelectorAll('.hero-copy h1,.hero-description,.hero-actions').forEach((el,n)=>reveal(el,n*65));
 const cancel=()=>{animations.forEach(animation=>animation.cancel());animations.clear();};
 preference.addEventListener('change',()=>{if(preference.matches){observer.disconnect();cancel();}});
 addEventListener('pagehide',cancel);
}
