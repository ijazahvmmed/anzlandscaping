type Shoot={x:number;height:number;born:number;seed:number};
export function initFooterGarden(){
 const field=document.querySelector<HTMLElement>('.footer-garden-field');const canvas=field?.querySelector<HTMLCanvasElement>('canvas');const ctx=canvas?.getContext('2d');if(!field||!canvas||!ctx)return;
 const root=field.closest<HTMLElement>('.footer-playground')!;const actions=root.querySelector<HTMLElement>('.garden-actions')!;const status=root.querySelector<HTMLElement>('.garden-status')!;
 actions.hidden=false;
 root.classList.add('garden-ready');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');let width=1,height=1,visible=false,raf=0,lastInput=0,pointer=.5,wind=0,seed=0;
 let shoots:Shoot[]=[];
 const initial=()=>{shoots=[.07,.16,.29,.7,.83,.94].map((x,n)=>({x,height:.38+(n%3)*.09,born:performance.now()+n*65,seed:++seed}));};initial();
 const leaf=(x:number,y:number,size:number,angle:number,color:string,growth:number)=>{
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(growth,growth);ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(size*.15,-size*.55,size*.75,-size*.62,size,0);ctx.bezierCurveTo(size*.7,size*.38,size*.2,size*.3,0,0);ctx.fillStyle=color;ctx.fill();ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(size*.84,0);ctx.strokeStyle='#e1edce66';ctx.lineWidth=.7;ctx.stroke();ctx.restore();
 };
 const draw=(now:number)=>{
  ctx.clearRect(0,0,width,height);const reduced=preference.matches;wind+=(reduced?0:(pointer-.5)*20-wind)*.12;let growing=false;
  shoots.forEach(s=>{
   const t=reduced?1:Math.max(0,Math.min(1,(now-s.born)/1300));if(t<1)growing=true;const g=1-Math.pow(1-t,3);const x=s.x*width,base=height-14-Math.sin(s.x*Math.PI)*8,h=Math.min(height*s.height,width<450?105:190)*g;const bend=Math.sin(s.seed*1.9)*16+wind*Math.exp(-Math.abs(pointer-s.x)*3);const tipX=x+bend*g;
   ctx.beginPath();ctx.moveTo(x,base);ctx.bezierCurveTo(x,base-h*.3,tipX,base-h*.6,tipX,base-h);ctx.strokeStyle='#315c3d';ctx.lineWidth=1.5;ctx.stroke();
   for(let n=1;n<=5;n++){
    const f=n/6,side=n%2?1:-1;const color=['#335e3e','#66864a','#9bb66e'][(n+s.seed)%3];const size=Math.min(width<450?23:37,h*.23)*(1-f*.3);const local=Math.min(1,Math.max(0,(g-f*.55)*2));
    leaf(x+bend*f*g,base-h*f,size,side>0?-.55:-2.6,color,local);
   }
   leaf(tipX,base-h,Math.min(20,h*.2),-1.4,'#6b8a4a',g);
   if(t<.6){ctx.beginPath();ctx.arc(x,base,3+t*24,0,Math.PI*2);ctx.strokeStyle=`rgba(77,112,54,${(1-t/.6)*.4})`;ctx.lineWidth=1;ctx.stroke();}
  });
  raf=0;if(visible&&!reduced&&(growing||now-lastInput<1000))raf=requestAnimationFrame(draw);
 };
 const wake=()=>{if(!raf&&visible)raf=requestAnimationFrame(draw);};
 const add=(x:number)=>{if(shoots.length>=18)shoots.shift();shoots.push({x:Math.max(.04,Math.min(.96,x)),height:.35+(seed%4)*.08,born:performance.now(),seed:++seed});lastInput=performance.now();status.textContent='A new shoot, just for you.';root.dataset.plants=String(shoots.length);wake();};
 root.querySelector('.garden-plant')?.addEventListener('click',()=>add(.1+((seed*.618)%1)*.8));
 root.querySelector('.garden-reset')?.addEventListener('click',()=>{initial();root.dataset.plants=String(shoots.length);status.textContent='A fresh start for your garden.';wake();});
 field.addEventListener('pointerdown',e=>{const r=field.getBoundingClientRect();add((e.clientX-r.left)/r.width);});
 field.addEventListener('pointermove',e=>{if(preference.matches||e.pointerType==='touch')return;const r=field.getBoundingClientRect();pointer=(e.clientX-r.left)/r.width;lastInput=performance.now();field.style.setProperty('--garden-light',`${pointer*100}%`);field.style.setProperty('--word-x',`${(pointer-.5)*9}px`);field.style.setProperty('--word-y',`${((e.clientY-r.top)/r.height-.5)*5}px`);wake();});
 field.addEventListener('pointerleave',()=>{pointer=.5;lastInput=performance.now();field.style.setProperty('--word-x','0px');field.style.setProperty('--word-y','0px');wake();});
 let resizeTick=0;const resize=new ResizeObserver(()=>{cancelAnimationFrame(resizeTick);resizeTick=requestAnimationFrame(()=>{cancelAnimationFrame(raf);raf=0;const r=field.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);const w=Math.round(width*dpr),h=Math.round(height*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}ctx.setTransform(dpr,0,0,dpr,0,0);draw(performance.now());});});resize.observe(field);
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){if(!root.dataset.grown){root.dataset.grown='true';initial();}wake();}else{cancelAnimationFrame(raf);raf=0;}},{threshold:.1});observer.observe(field);
 const change=()=>{cancelAnimationFrame(raf);raf=0;draw(performance.now());};preference.addEventListener('change',change);
 window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);cancelAnimationFrame(resizeTick);raf=0;});
 window.addEventListener('pageshow',event=>{if(event.persisted){const r=field.getBoundingClientRect();visible=r.bottom>0&&r.top<innerHeight;wake();}});
}
