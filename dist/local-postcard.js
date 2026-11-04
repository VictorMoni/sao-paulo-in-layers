'use strict';
let generating=false,readyPostcard=null;
const postcardCache=new Map();
function downloadBlob(blob,filename='sao-paulo-em-camadas.png'){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),15000)}
function postcardKey(){return JSON.stringify([[...chosen],cleanMessage($('#message').value),currentLanguage])}
function loadPreparedImage(id){return new Promise((resolve,reject)=>{const image=new Image();const timeout=setTimeout(()=>reject(new Error('Image timeout')),10000);image.onload=()=>{clearTimeout(timeout);resolve(image)};image.onerror=()=>{clearTimeout(timeout);reject(new Error('Image unavailable'))};image.src=asset({id})})}
function drawCover(ctx,image,x,y,width,height){const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight),sw=width/scale,sh=height/scale;ctx.drawImage(image,(image.naturalWidth-sw)/2,(image.naturalHeight-sh)/2,sw,sh,x,y,width,height)}
function postcardBackground(ctx,width,height){ctx.fillStyle='#f6f3eb';ctx.fillRect(0,0,width,height);ctx.strokeStyle='#c9cbb9';ctx.lineWidth=1;ctx.strokeRect(32,32,width-64,height-64)}
function postcardPhoto(ctx,image,p,index,x,y,w,h,language){drawCover(ctx,image,x,y,w,h);const shade=ctx.createLinearGradient(0,y+h*.55,0,y+h);shade.addColorStop(0,'#10251a00');shade.addColorStop(1,'#10251acc');ctx.fillStyle=shade;ctx.fillRect(x,y,w,h);ctx.fillStyle='#fff';ctx.font='14px Arial';ctx.fillText(String(index+1).padStart(2,'0'),x+20,y+h-52);ctx.font='24px Georgia';ctx.fillText(translate(p.title,language),x+20,y+h-22,w-40)}
function postcardCredits(ctx,ids,x,y,width,columns,language){const colWidth=width/columns;ctx.fillStyle='#626b5e';ids.forEach((id,i)=>{const c=photoCredits[id],col=i%columns,row=Math.floor(i/columns);ctx.font='14px Arial';ctx.fillText(String(i+1).padStart(2,'0')+' / '+c.author,x+col*colWidth,y+row*44,colWidth-24);ctx.font='12px Arial';ctx.fillText(c.license+' · '+translate('Adaptações',language),x+col*colWidth,y+row*44+18,colWidth-24)});const bottom=y+Math.ceil(ids.length/columns)*44;ctx.font='14px Arial';ctx.fillText(translate('Fontes e licenças: consulte Créditos das fotografias no app.',language),x,bottom+12,width);ctx.font='15px Arial';ctx.fillText('sp-layers.vercel.app/#photo-credits',x,bottom+38,width)}
async function composeLocalPostcard(ids,message,language){
 const selection=safeIds(ids);if(selection.length!==3)throw new Error('Invalid selection');
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1600;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');const images=await Promise.all(selection.map(loadPreparedImage));
 postcardBackground(ctx,1200,1600);ctx.fillStyle='#254d3b';ctx.font='17px Arial';ctx.fillText('SP LAYERS / 23°33′ S · 46°38′ O',72,86);ctx.font='76px Georgia';ctx.fillText('São Paulo',72,180);ctx.font='italic 35px Georgia';ctx.fillText(translate('em camadas',language),74,229);ctx.font='17px Arial';ctx.textAlign='right';ctx.fillText('BRASIL / BR',1128,87);ctx.textAlign='left';
 const selectedPlaces=selection.map(id=>places.find(p=>p.id===id));
 postcardPhoto(ctx,images[0],selectedPlaces[0],0,72,274,1056,500,language);postcardPhoto(ctx,images[1],selectedPlaces[1],1,72,792,519,330,language);postcardPhoto(ctx,images[2],selectedPlaces[2],2,609,792,519,330,language);
 ctx.fillStyle='#254d3b';ctx.font='italic 34px Georgia';wrap(ctx,cleanMessage(message)||translate('Um pedacinho de casa.',language),72,1200,1056,44);ctx.strokeStyle='#c9cbb9';ctx.beginPath();ctx.moveTo(72,1304);ctx.lineTo(1128,1304);ctx.stroke();
 postcardCredits(ctx,selection,72,1346,1056,3,language);ctx.fillStyle='#254d3b';ctx.font='15px Arial';ctx.fillText('SÃO PAULO / '+translate('Três lugares. Um pedacinho de casa.',language),72,1510,1056);
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('Image unavailable');return blob;
}

document.addEventListener('tripchange',()=>{readyPostcard=null});document.addEventListener('messagechange',()=>{readyPostcard=null;$('#share-image').disabled=true;$('#postcard-next-step').textContent=t(chosen.size===3?'Tudo pronto! Baixe seu cartão para habilitar o compartilhamento.':'Escolha 3 lugares usando o + nas fotos.')});
$('#download').onclick=async()=>{
 if(chosen.size!==3)return;if(generating){$('#status').textContent=t('Já estamos preparando seu cartão.');return}
 const key=postcardKey();if(postcardCache.has(key)){readyPostcard={key,blob:postcardCache.get(key)};downloadBlob(readyPostcard.blob);$('#share-image').disabled=false;$('#postcard-next-step').textContent='';$('#status').textContent=t('Cartão criado no seu dispositivo. Nenhum pedido foi enviado ao Cloudinary.');return}
 generating=true;$('#download').disabled=true;$('#language').disabled=true;$('#status').textContent=t('Preparando seu cartão…');
 try{const blob=await composeLocalPostcard([...chosen],$('#message').value,currentLanguage);if(postcardCache.size>=6)postcardCache.delete(postcardCache.keys().next().value);postcardCache.set(key,blob);readyPostcard={key,blob};downloadBlob(blob);$('#share-image').disabled=false;$('#postcard-next-step').textContent='';$('#status').textContent=t('Cartão criado no seu dispositivo. Nenhum pedido foi enviado ao Cloudinary.')}catch{readyPostcard=null;$('#status').textContent=t('Não foi possível criar o cartão. Confira as imagens e tente novamente.')}finally{generating=false;$('#download').disabled=chosen.size!==3;$('#language').disabled=false}
};
document.addEventListener('click',async e=>{
 if(!e.target.closest('#share-image'))return;if(!readyPostcard||readyPostcard.key!==postcardKey()){$('#status').textContent=t('Gere seu cartão primeiro para compartilhar a imagem.');return}
 const file=new File([readyPostcard.blob],'sao-paulo-em-camadas.png',{type:'image/png'});
 if(!navigator.canShare?.({files:[file]})){downloadBlob(readyPostcard.blob);$('#share-image').disabled=false;$('#postcard-next-step').textContent='';$('#status').textContent=t('O navegador não oferece compartilhamento de arquivos. Baixei o cartão para você enviar.');return}
 try{await navigator.share({files:[file],title:t('Seu cartão de São Paulo')})}catch(error){$('#status').textContent=t(error.name==='AbortError'?'Compartilhamento cancelado. Seu cartão continua disponível.':'Não foi possível compartilhar. Você pode baixar o cartão.')}
});
