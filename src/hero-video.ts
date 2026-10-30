export function initHeroVideo(){
 const video=document.querySelector<HTMLVideoElement>('[data-hero-video]');
 const button=document.querySelector<HTMLButtonElement>('.hero-video-toggle');
 if(!video||!button)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const saveData=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;
 let userPaused=false,visible=false,failed=false;
 const sync=()=>{
  const automatic=!reduce.matches&&!saveData;
  button.hidden=failed||!automatic;
  if(!visible||document.hidden||!automatic||userPaused){video.pause();return;}
  if(!video.getAttribute('src'))video.src=video.dataset.heroVideo!;
  video.muted=true;
  if(!video.paused)return;
  void video.play().catch((error:DOMException)=>{
   if(error.name==='AbortError'||!visible||document.hidden||reduce.matches)return;
   userPaused=true;button.hidden=false;button.setAttribute('aria-label','Play hero video');button.classList.add('is-paused');
  });
 };
 const update=()=>{button.setAttribute('aria-label',video.paused?'Play hero video':'Pause hero video');button.classList.toggle('is-paused',video.paused);};
 button.addEventListener('click',()=>{userPaused=!video.paused;sync();});
 video.addEventListener('play',update);video.addEventListener('pause',update);
 // Some WebKit media backends pause while seeking back to the loop start.
 video.addEventListener('seeked',sync);
 video.addEventListener('error',()=>{failed=true;button.hidden=true;video.removeAttribute('src');video.load();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(video);
 document.addEventListener('visibilitychange',sync);
 reduce.addEventListener('change',sync);
 addEventListener('pagehide',()=>video.pause());addEventListener('pageshow',sync);
}
