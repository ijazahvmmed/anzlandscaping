const easing='cubic-bezier(.22,1,.36,1)';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initServiceAccordion(selector='.mobile-menu details',prefix='anz-service-list'){
 document.querySelectorAll<HTMLDetailsElement>(selector).forEach((details,index)=>{
  const summary=details.querySelector('summary');if(!summary)return;
  details.classList.add('service-accordion');
  const panel=document.createElement('div');panel.className='service-accordion-panel';panel.id=`${prefix}-${index}`;
  Array.from(details.children).filter(el=>el!==summary).forEach(el=>panel.append(el));details.append(panel);
  const indicator=document.createElement('span');indicator.className='service-accordion-icon';indicator.setAttribute('aria-hidden','true');indicator.innerHTML='<svg viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';summary.append(indicator);
  summary.setAttribute('aria-controls',panel.id);
  let expanded=details.open;let generation=0;let heightAnimation:Animation|undefined;let itemAnimations:Animation[]=[];
  const sync=()=>{summary.setAttribute('aria-expanded',String(expanded));details.classList.toggle('is-expanded',expanded);panel.inert=!expanded;};sync();
  const cancel=()=>{heightAnimation?.cancel();heightAnimation=undefined;itemAnimations.forEach(a=>a.cancel());itemAnimations=[];};
  const set=async(open:boolean)=>{
   const token=++generation;const from=details.open?panel.getBoundingClientRect().height:0;
   cancel();expanded=open;sync();
   // Keep the native disclosure open until its closing animation has completed.
   details.open=true;panel.style.height=`${from}px`;
   if(!open&&panel.contains(document.activeElement))summary.focus();
   if(!reduced()){
    heightAnimation=panel.animate([{height:`${from}px`},{height:`${open?panel.scrollHeight:0}px`}],{duration:open?560:380,easing,fill:'both'});
    panel.querySelectorAll('a').forEach((link,n)=>itemAnimations.push(link.animate(open?[{opacity:0,transform:'translateY(12px)',filter:'blur(3px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0px)'}]:[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-5px)'}],{duration:open?420:150,delay:open?70+n*16:0,easing,fill:'both'})));
    await Promise.all([heightAnimation.finished.catch(()=>{}),...itemAnimations.map(a=>a.finished.catch(()=>{}))]);
   }
   if(token!==generation)return;
   cancel();details.open=open;panel.style.removeProperty('height');
  };
  summary.addEventListener('click',event=>{event.preventDefault();void set(!expanded);});
  const reset=()=>{++generation;cancel();expanded=false;details.open=false;panel.style.removeProperty('height');sync();};
  details.closest('dialog')?.addEventListener('close',reset);window.addEventListener('pagehide',reset);
 });
}

export function initHeaderMarquee(){
 const nav=document.querySelector<HTMLElement>('.desktop-nav');const button=nav?.querySelector<HTMLButtonElement>('.header-marquee-toggle');if(!nav||!button)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>{button.hidden=preference.matches;};sync();preference.addEventListener('change',sync);
 button.addEventListener('click',()=>{const paused=nav.classList.toggle('header-marquee-paused');button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Resume header marquee':'Pause header marquee');button.innerHTML=`<span aria-hidden="true">${paused?'▶':'Ⅱ'}</span>`;});
}

export function initNavigationMotion(){
 // Derive the scroll lock from actual dialogs, including history restoration
 // and interrupted close animations, rather than leaving a stale body class.
 const syncDialogLock=()=>document.body.classList.toggle('modal-open',Boolean(document.querySelector('dialog[open]')));
 const dialogObserver=new MutationObserver(syncDialogLock);
 dialogObserver.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
 window.addEventListener('pageshow',syncDialogLock);syncDialogLock();
 const menu=document.querySelector<HTMLDialogElement>('.mobile-menu');
 const toggle=document.querySelector<HTMLButtonElement>('.menu-toggle');
 let closing=false;let generation=0;let animations:Animation[]=[];
 const stop=()=>{animations.forEach(a=>a.cancel());animations=[];};
 const animate=(el:Element,frames:Keyframe[],options:KeyframeAnimationOptions)=>{
  const animation=el.animate(frames,{fill:'both',easing,...options});animations.push(animation);return animation.finished.catch(()=>{});
 };
 const closeMenu=async()=>{
  if(!menu?.open||closing)return;
  closing=true;const token=++generation;
  const transform=getComputedStyle(menu).transform;stop();
  if(!reduced()){
   menu.querySelectorAll('nav>a,.menu-top,nav>details,dialog>a').forEach(el=>void animate(el,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}],{duration:160}));
   await animate(menu,[{transform:transform==='none'?'translateX(0)':transform,opacity:1},{transform:'translateX(102%)',opacity:.7}],{duration:380});
  }
  if(token!==generation)return;
  stop();menu.close();closing=false;
 };
 toggle?.addEventListener('click',()=>{
  if(!menu)return;const from=menu.open?getComputedStyle(menu).transform:'translateX(102%)';
  ++generation;closing=false;stop();
  if(!menu.open)menu.showModal();toggle.setAttribute('aria-expanded','true');document.body.classList.add('modal-open');
  if(reduced())return;
  void animate(menu,[{transform:from,opacity:.85},{transform:'translateX(0)',opacity:1}],{duration:620});
  menu.querySelectorAll('nav>a').forEach((link,n)=>void animate(link,[{transform:'translateY(24px)',opacity:0,filter:'blur(5px)'},{transform:'translateY(0)',opacity:1,filter:'blur(0px)'}],{duration:520,delay:100+n*35}));
 });
 document.querySelector('.menu-close')?.addEventListener('click',()=>void closeMenu());
 menu?.addEventListener('cancel',event=>{event.preventDefault();void closeMenu();});
 menu?.addEventListener('close',()=>{++generation;closing=false;stop();toggle?.setAttribute('aria-expanded','false');document.body.classList.remove('modal-open');toggle?.focus();});
 // Native navigation should not wait for an exit animation or cache an open dialog.
 menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{++generation;closing=false;stop();menu.close();toggle?.setAttribute('aria-expanded','false');document.body.classList.remove('modal-open');}));
 window.addEventListener('pagehide',()=>{++generation;stop();document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach(dialog=>dialog.close());document.body.classList.remove('modal-open');});

 const groups=Array.from(document.querySelectorAll<HTMLElement>('.nav-group'));
 const set=(group:HTMLElement,open:boolean)=>{
  if(group.classList.contains('is-open')===open)return;
  group.classList.toggle('is-open',open);group.querySelector('button')?.setAttribute('aria-expanded',String(open));
  const panel=group.querySelector<HTMLElement>('.mega-menu')!;
  panel.inert=!open;
  if(open&&!reduced()){
   panel.getAnimations({subtree:true}).forEach(a=>a.cancel());
   panel.animate([{opacity:0,transform:'translateY(-8px)',clipPath:'inset(0 0 12% 0)'},{opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0% 0)'}],{duration:420,easing});
   panel.querySelectorAll('a').forEach((a,n)=>a.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,delay:40+n*18,easing,fill:'backwards'}));
  }
 };
 groups.forEach((group,index)=>{
  const button=group.querySelector<HTMLButtonElement>('.nav-expand')!;const panel=group.querySelector<HTMLElement>('.mega-menu')!;panel.id=`anz-mega-${index}`;panel.inert=true;button.setAttribute('aria-controls',panel.id);
  let leave:ReturnType<typeof setTimeout>;
  group.addEventListener('mouseenter',()=>{clearTimeout(leave);set(group,true);});
  group.addEventListener('mouseleave',()=>{leave=setTimeout(()=>{if(!group.contains(document.activeElement))set(group,false);},100);});
  group.addEventListener('focusin',e=>{clearTimeout(leave);if(e.target!==button)set(group,true);});
  group.addEventListener('focusout',e=>{if(!group.contains(e.relatedTarget as Node))set(group,false);});
  button.addEventListener('click',()=>{const open=!group.classList.contains('is-open');groups.forEach(g=>set(g,false));set(group,open);});
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape')groups.forEach(group=>{if(group.classList.contains('is-open')){set(group,false);group.querySelector<HTMLButtonElement>('button')?.focus();}});});
 document.addEventListener('click',e=>{if(!(e.target as Element).closest('.nav-group'))groups.forEach(g=>set(g,false));});
}

export function initMarquees(){
 document.querySelectorAll<HTMLElement>('.living-marquee').forEach(section=>{
  const control=section.querySelector<HTMLButtonElement>('.marquee-toggle')!;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{control.hidden=preference.matches;section.classList.toggle('motion-enabled',!preference.matches);};sync();preference.addEventListener('change',sync);
  control.addEventListener('click',()=>{const paused=section.classList.toggle('is-paused');control.setAttribute('aria-pressed',String(paused));control.innerHTML=paused?'<span aria-hidden="true">▶</span> Resume motion':'<span aria-hidden="true">Ⅱ</span> Pause motion';});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>section.classList.toggle('in-view',entry.isIntersecting)),{rootMargin:'100px'});observer.observe(section);
 });
}

export function initGlassInteractions(){
 const nav=document.querySelector<HTMLElement>('.desktop-nav');
 if(!nav)return;
 const lens=nav.querySelector<HTMLElement>('.nav-lens');
 const targets=Array.from(nav.querySelectorAll<HTMLElement>(':scope>a,:scope>.nav-group'));
 nav.querySelectorAll<HTMLAnchorElement>(':scope>a,.nav-group>a').forEach(link=>{
  const label=link.textContent?.trim()??'';
  const roll=document.createElement('span');roll.className='nav-roll';roll.dataset.label=label;
  const text=document.createElement('span');text.textContent=label;roll.append(text);link.replaceChildren(roll);
  // The visual duplicate is generated by CSS, so provide one stable accessible name.
  link.setAttribute('aria-label',label);roll.setAttribute('aria-hidden','true');
  if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page');
 });
 const move=(target:HTMLElement)=>{
  if(!lens)return;const r=target.getBoundingClientRect(),parent=nav.getBoundingClientRect();
  lens.style.width=`${r.width}px`;lens.style.translate=`${r.left-parent.left}px 0`;
  nav.classList.add('has-lens');
 };
 const reset=()=>{const active=nav.querySelector<HTMLElement>('[aria-current="page"]');if(active)move(active);else nav.classList.remove('has-lens');};
 targets.forEach(target=>{target.addEventListener('pointerenter',()=>move(target));target.addEventListener('focusin',()=>move(target));});
 nav.addEventListener('pointerleave',()=>{if(!nav.contains(document.activeElement))reset();});
 nav.addEventListener('focusout',e=>{if(!nav.contains(e.relatedTarget as Node))reset();});
 nav.addEventListener('pointermove',e=>{if(reduced())return;const r=nav.getBoundingClientRect();nav.style.setProperty('--light-x',`${(e.clientX-r.left)/r.width*100}%`);});
 let resizeTick=0;new ResizeObserver(()=>{cancelAnimationFrame(resizeTick);resizeTick=requestAnimationFrame(reset);}).observe(nav);reset();
}
