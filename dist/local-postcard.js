'use strict';
let generating=false,readyPostcard=null;
const postcardCache=new Map();
function downloadBlob(blob,filename='sao-paulo-em-camadas.png'){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),15000)}
function postcardKey(){return JSON.stringify([[...chosen],cleanMessage($('#message').value),currentLanguage])}
function loadPreparedImage(id){return new Promise((resolve,reject)=>{const image=new Image();const timeout=setTimeout(()=>reject(new Error('Image timeout')),10000);image.onload=()=>{clearTimeout(timeout);resolve(image)};image.onerror=()=>{clearTimeout(timeout);reject(new Error('Image unavailable'))};image.src=asset({id})})}
function drawCover(ctx,image,x,y,width,height){const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight),sw=width/scale,sh=height/scale;ctx.drawImage(image,(image.naturalWidth-sw)/2,(image.naturalHeight-sh)/2,sw,sh,x,y,width,height)}
async function composeLocalPostcard(ids,message,language){
 const selection=safeIds(ids);if(selection.length!==3)throw new Error('Invalid selection');
 const en=language==='en',canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1500;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
 const images=await Promise.all(selection.map(loadPreparedImage));
 ctx.fillStyle='#f6f3eb';ctx.fillRect(0,0,1200,1500);ctx.fillStyle='#254d3b';ctx.font='64px Georgia';ctx.fillText(translate('SÃO PAULO EM CAMADAS',language),80,130,1040);ctx.font='26px Arial';ctx.fillText(translate('Três lugares. Um pedacinho de casa.',language),80,210,1040);
 for(let i=0;i<3;i++){const p=places.find(p=>p.id===selection[i]),y=300+i*300;drawCover(ctx,images[i],80,y,1040,260);const gradient=ctx.createLinearGradient(0,y+130,0,y+260);gradient.addColorStop(0,'#10251a00');gradient.addColorStop(1,'#10251ad9');ctx.fillStyle=gradient;ctx.fillRect(80,y,1040,260);ctx.fillStyle='#fff';ctx.font='28px Arial';ctx.fillText(t(p.title),100,y+225,1000)}
 ctx.fillStyle='#254d3b';ctx.font='30px Georgia';wrap(ctx,cleanMessage(message)||(translate('Um pedacinho de casa.',language)),80,1250,1040,39);
 ctx.font='12px Arial';selection.forEach((id,i)=>{const c=photoCredits[id];ctx.fillText(`${c.author} | ${c.license} | ${c.source}`,80,1340+i*35,1040)});
 ctx.font='16px Arial';ctx.fillText(translate('Fontes e licenças: consulte Créditos das fotografias no app.',language),80,1465,1040);
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('Image unavailable');return blob;
}
document.addEventListener('tripchange',()=>{readyPostcard=null});document.addEventListener('messagechange',()=>{readyPostcard=null});
$('#download').onclick=async()=>{
 if(chosen.size!==3)return;if(generating){$('#status').textContent=t('Já estamos preparando seu cartão.');return}
 const key=postcardKey();if(postcardCache.has(key)){readyPostcard={key,blob:postcardCache.get(key)};downloadBlob(readyPostcard.blob);$('#status').textContent=t('Cartão criado no seu dispositivo. Nenhum pedido foi enviado ao Cloudinary.');return}
 generating=true;$('#download').disabled=true;$('#language').disabled=true;$('#status').textContent=t('Preparando seu cartão…');
 try{const blob=await composeLocalPostcard([...chosen],$('#message').value,currentLanguage);if(postcardCache.size>=6)postcardCache.delete(postcardCache.keys().next().value);postcardCache.set(key,blob);readyPostcard={key,blob};downloadBlob(blob);$('#status').textContent=t('Cartão criado no seu dispositivo. Nenhum pedido foi enviado ao Cloudinary.')}catch{readyPostcard=null;$('#status').textContent=t('Não foi possível criar o cartão. Confira as imagens e tente novamente.')}finally{generating=false;$('#download').disabled=chosen.size!==3;$('#language').disabled=false}
};
document.addEventListener('click',async e=>{
 if(!e.target.closest('#share-image'))return;if(!readyPostcard||readyPostcard.key!==postcardKey()){$('#status').textContent=t('Gere seu cartão primeiro para compartilhar a imagem.');return}
 const file=new File([readyPostcard.blob],'sao-paulo-em-camadas.png',{type:'image/png'});
 if(!navigator.canShare?.({files:[file]})){downloadBlob(readyPostcard.blob);$('#status').textContent=t('O navegador não oferece compartilhamento de arquivos. Baixei o cartão para você enviar.');return}
 try{await navigator.share({files:[file],title:t('Seu cartão de São Paulo')})}catch(error){$('#status').textContent=t(error.name==='AbortError'?'Compartilhamento cancelado. Seu cartão continua disponível.':'Não foi possível compartilhar. Você pode baixar o cartão.')}
});
