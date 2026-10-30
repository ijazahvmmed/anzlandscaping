import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
gsap.registerPlugin(ScrollTrigger);
let initialized=false;
function words(element:HTMLElement){
 if(element.dataset.split)return Array.from(element.querySelectorAll<HTMLElement>('.blur-word'));
 element.dataset.split='true';const isHeading=/^H[1-6]$/.test(element.tagName);if(isHeading){element.setAttribute('aria-label',element.textContent??'');element.querySelectorAll('a').forEach(link=>link.setAttribute('aria-label',link.textContent?.trim()??''));}
 const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const nodes:Text[]=[];while(walker.nextNode())nodes.push(walker.currentNode as Text);
 nodes.forEach(node=>{
  const fragment=document.createDocumentFragment();node.textContent?.split(/(\s+)/).forEach(word=>{if(!word.trim())fragment.append(document.createTextNode(word));else{const span=document.createElement('span');span.className='blur-word';span.textContent=word;if(isHeading)span.setAttribute('aria-hidden','true');fragment.append(span);}});node.replaceWith(fragment);
 });
 return Array.from(element.querySelectorAll<HTMLElement>('.blur-word'));
}
export function initSiteMotion(){
 if(initialized)return;initialized=true;
 const cleanups:(()=>void)[]=[];const mm=gsap.matchMedia();let lenis:Lenis|undefined;
 const touch=matchMedia('(pointer:coarse)').matches;
 ScrollTrigger.config({ignoreMobileResize:true});
 const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 const context=gsap.context(()=>{
  // Keep touch gestures direct, then apply a short, controlled inertia tail.
  mm.add('(prefers-reduced-motion:no-preference)',()=>{
   lenis=new Lenis({lerp:.07,smoothWheel:true,wheelMultiplier:.9,syncTouch:true,syncTouchLerp:.12,touchInertiaExponent:1.35,touchMultiplier:1,autoRaf:false,anchors:{offset:-108},prevent:node=>Boolean(node.closest('dialog,[data-native-scroll]'))});
   lenis.on('scroll',ScrollTrigger.update);
   const raf=(time:number)=>lenis?.raf(time*1000);gsap.ticker.add(raf);gsap.ticker.lagSmoothing(0);
   const observe=new MutationObserver(()=>{document.body.classList.contains('modal-open')?lenis?.stop():lenis?.start();});observe.observe(document.body,{attributes:true,attributeFilter:['class']});
   return()=>{observe.disconnect();gsap.ticker.remove(raf);lenis?.destroy();lenis=undefined;};
  });
  gsap.to(progress,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.1}});
  const entrance=gsap.timeline({defaults:{ease:'power3.out'}});
  entrance.fromTo('.text-reveal>span',{yPercent:touch?24:65,filter:touch?'none':'blur(14px)',opacity:.12},{yPercent:0,filter:touch?'none':'blur(0px)',opacity:1,duration:touch?.8:1.25,stagger:.12,clearProps:'filter'},0);
  if(document.querySelector('.aperture-photo'))entrance.fromTo('.aperture-photo',{scale:.985,rotation:0,opacity:.4},{scale:1,rotation:0,opacity:1,duration:1.15},0);
  entrance.fromTo('.hero-description,.hero-business,.hero-copy>.button,.hero-actions,.hero-topline',{y:12,opacity:.1},{y:0,opacity:1,duration:.85,stagger:.08},.35);
  document.querySelectorAll<HTMLElement>('.blur-reveal,.pillar-hero h1,.service-hero h1,.portfolio-intro h1,.project-intro h1').forEach(heading=>{
   const spans=words(heading);
   gsap.fromTo(spans,{yPercent:touch?18:35,filter:touch?'none':'blur(9px)',opacity:.8},{yPercent:0,filter:touch?'none':'blur(0px)',opacity:1,stagger:touch?.02:.045,duration:touch?.6:.9,ease:'power3.out',clearProps:'filter',scrollTrigger:{trigger:heading,start:'top 92%',once:true}});
  });
  document.querySelectorAll<HTMLElement>('.scrub-text').forEach(heading=>{
   const spans=words(heading);
   if(touch)gsap.fromTo(spans,{y:8,opacity:.7},{y:0,opacity:1,duration:.6,stagger:.02,clearProps:'transform,opacity',scrollTrigger:{trigger:heading,start:'top 92%',once:true}});
   else gsap.fromTo(spans,{opacity:.65,filter:'blur(3px)'},{opacity:1,filter:'blur(0px)',stagger:.15,ease:'none',scrollTrigger:{trigger:heading,start:'top 80%',end:'bottom 30%',scrub:.7}});
  });
  document.querySelectorAll<HTMLElement>('.reveal-image,.service-hero figure,.service-detail figure,.pillar-hero figure,.project-cover,.project-gallery figure,.project-tile .photo-frame').forEach(frame=>{
   if(touch)gsap.fromTo(frame,{y:12,opacity:.85},{y:0,opacity:1,duration:.65,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:frame,start:'top 92%',once:true}});
   else gsap.fromTo(frame,{clipPath:'inset(10% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.2,ease:'power3.out',scrollTrigger:{trigger:frame,start:'top 92%',once:true}});
   const img=frame.querySelector('img');if(img&&!touch)gsap.fromTo(img,{scale:1.025},{scale:1,duration:1.2,ease:'power3.out',clearProps:'transform',onStart:()=>frame.classList.add('reveal-entering'),onComplete:()=>frame.classList.remove('reveal-entering'),scrollTrigger:{trigger:frame,start:'top 92%',once:true}});
  });
  document.querySelectorAll<HTMLElement>('.insight-list article,.project-tile,.service-rows>a,.footer-grid>div,.contact-details').forEach(block=>{
   const targets=block.matches('.service-rows>a,.footer-grid>div,.contact-details')?Array.from(block.children):Array.from(block.querySelectorAll('.tile-caption,.insight-list article>div>time,.insight-list article>div>p,.insight-list article>div>.text-link'));
   if(targets.length)gsap.fromTo(targets,{y:16,opacity:.8,filter:touch?'none':'blur(2px)'},{y:0,opacity:1,filter:touch?'none':'blur(0px)',duration:.75,stagger:.06,ease:'power3.out',clearProps:'transform,filter,opacity',scrollTrigger:{trigger:block,start:'top 90%',once:true}});
  });
  const footer=document.querySelector('.landscape-footer');if(footer){
   gsap.fromTo('.rooted-invitation,.rooted-grid>*',{y:20,opacity:.8},{y:0,opacity:1,duration:.9,stagger:.07,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:footer,start:'top 85%',once:true}});

  }
  document.querySelectorAll('.home-service-card,.home-approach-steps details').forEach((el,n)=>gsap.fromTo(el,{y:18,opacity:.85},{y:0,opacity:1,duration:.8,delay:(n%3)*.07,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
  document.querySelectorAll('.original-benefits article,.original-service-card,.original-client-grid li,.original-award-grid figure,.original-metrics>div').forEach((el,n)=>gsap.fromTo(el,{y:14,opacity:.9},{y:0,opacity:1,duration:.75,delay:(n%3)*.05,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
  if(document.querySelector<HTMLElement>('.scroll-orbit')?.offsetParent)gsap.to('.scroll-orbit>svg',{rotation:360,duration:35,repeat:-1,ease:'none'});
  const swap=(event:Event)=>{const root=event.target as Element;const image=root.querySelector('figure img');if(image)gsap.fromTo(image,{scale:1.035,filter:'blur(5px)'},{scale:1,filter:'blur(0px)',duration:.6,ease:'power2.out',clearProps:'filter'});};document.addEventListener('anz:image-change',swap);cleanups.push(()=>document.removeEventListener('anz:image-change',swap));
  const ribbon=document.querySelector('.type-ribbon>div');if(ribbon)gsap.fromTo(ribbon,{xPercent:3},{xPercent:-32,ease:'none',scrollTrigger:{trigger:'.type-ribbon',start:'top bottom',end:'bottom top',scrub:1.5}});
  mm.add('(min-width:1024px) and (hover:hover) and (prefers-reduced-motion:no-preference)',()=>{
   const hero=document.querySelector('.experimental-hero');if(hero)gsap.to('.experimental-hero .hero-copy',{y:-16,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom 10%',scrub:1.2}});
   const magnetCleanup:(()=>void)[]=[];
   document.querySelectorAll<HTMLElement>('.magnetic,.header-cta').forEach(button=>{const move=(e:MouseEvent)=>{const r=button.getBoundingClientRect();gsap.to(button,{x:(e.clientX-r.left-r.width/2)*.08,y:(e.clientY-r.top-r.height/2)*.12,duration:.35,ease:'power3.out'});};const leave=()=>gsap.to(button,{x:0,y:0,duration:.6,ease:'elastic.out(1,.5)'});button.addEventListener('mousemove',move);button.addEventListener('mouseleave',leave);magnetCleanup.push(()=>{button.removeEventListener('mousemove',move);button.removeEventListener('mouseleave',leave);gsap.set(button,{clearProps:'transform'});});});
   return()=>{magnetCleanup.forEach(f=>f());};
  });
  document.querySelectorAll<HTMLElement>('.scene-frame').forEach((frame,n)=>gsap.fromTo(frame,{y:22,opacity:.8},{y:0,opacity:1,duration:.85,delay:n*.09,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:frame,start:'top 92%',once:true}}));
 });
 let refreshTimer=0;
 const refresh=()=>{clearTimeout(refreshTimer);refreshTimer=window.setTimeout(()=>ScrollTrigger.refresh(),180);};cleanups.push(()=>clearTimeout(refreshTimer));document.fonts.ready.then(refresh);
 document.querySelectorAll('img').forEach(img=>{if(!img.complete)img.addEventListener('load',refresh,{once:true});});
 const onHide=()=>{mm.revert();context.revert();progress.remove();cleanups.forEach(f=>f());initialized=false;};
 window.addEventListener('pagehide',onHide,{once:true});
 window.addEventListener('pageshow',e=>{if(e.persisted&&!initialized)initSiteMotion();},{once:true});
}
