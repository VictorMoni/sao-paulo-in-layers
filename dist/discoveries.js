'use strict';
const quizFacts=[
['liberdade',['Lanternas, vitrines e encontros','Lanterns, shop windows and encounters'],['Dunas no deserto','Desert dunes'],['Geleiras e neve','Glaciers and snow']],
['feira',['O pastel de feira','Street-market pastel'],['Um prato de neve','A plate of snow'],['Uma estação ferroviária','A railway station']],
['beco',['Paredes com cores e desenhos','Walls with colors and drawings'],['Um campo de gelo','An ice field'],['Uma praia deserta','A deserted beach']],
['minhocao',['Arte nas fachadas da cidade','Art on city facades'],['Barcos em alto-mar','Boats at sea'],['Um cânion vazio','An empty canyon']],
['ibirapuera',['Árvores e uma pausa no ritmo urbano','Trees and a pause in the urban rhythm'],['Uma pista de esqui','A ski slope'],['Um porto de navios','A shipping port']],
['cantareira',['Uma camada de natureza no horizonte','A layer of nature on the horizon'],['Uma mesa de sobremesas','A dessert table'],['Uma fachada vermelha','A red facade']],
['mercado',['Frascos, frutas secas e ingredientes','Jars, dried fruit and ingredients'],['Trilhos e plataformas','Tracks and platforms'],['Gelo e montanhas','Ice and mountains']],
['paulista',['Linhas de um edifício e a altura da fachada','Building lines and the height of a facade'],['Um banco entre árvores','A bench among trees'],['Uma pizza quadrada','A square pizza']],
['copan',['Curvas na arquitetura','Curves in architecture'],['Uma banca de frutas','A fruit stall'],['Uma trilha no gelo','An ice trail']],
['masp',['O vermelho e o espaço sob o edifício','Red and the space beneath the building'],['Uma pizza de chocolate','A chocolate pizza'],['Um porto pesqueiro','A fishing port']],
['botanico',['Bancos e um caminho coberto','Benches and a covered path'],['Trilhos na estação','Station tracks'],['Uma fachada de tijolos','A brick facade']],
['luz',['Árvores e música','Trees and music'],['Gelo e esqui','Ice and skiing'],['Uma fábrica de aviões','An aircraft factory']],
['pizzapaulista',['Sabores salgados e doces na mesma pizza','Savory and sweet flavors in one pizza'],['Somente frutas inteiras','Only whole fruit'],['Uma tigela de sopa','A bowl of soup']],
['pizzadoce',['Chocolate e amêndoas','Chocolate and almonds'],['Arroz e feijão','Rice and beans'],['Peixe e limão','Fish and lemon']],
['becocores',['Portões, muros e passagens coloridas','Colorful gates, walls and passages'],['Uma cobertura de estação','A station roof'],['Uma floresta nevada','A snowy forest']],
['kobra',['Um mural de Eduardo Kobra','An Eduardo Kobra mural'],['Uma obra de gelo','An ice sculpture'],['Uma mesa de café','A coffee table']],
['parqueaugusta',['Um registro histórico de 2017','A historical photograph from 2017'],['Uma previsão do futuro','A prediction of the future'],['Uma foto do fundo do mar','An underwater photograph']],
['burlemarx',['Copas das árvores e o rio ao fundo','Treetops and the river beyond'],['Uma fachada de museu','A museum facade'],['Uma pizza doce','A sweet pizza']],
['pinacoteca',['Tijolos, colunas e detalhes da fachada','Bricks, columns and facade details'],['Barcos no oceano','Boats in the ocean'],['Uma estrada no deserto','A desert highway']],
['estacaoluz',['Trilhos e estrutura em preto e branco','Tracks and structure in black and white'],['Uma banca de ingredientes','An ingredient stall'],['Uma sobremesa colorida','A colorful dessert']]
];
const storyQuizzes=Object.freeze(Object.fromEntries(quizFacts.map(([id,correct,...others],i)=>{const choices=[correct,...others];const offset=i%3;return[id,{choices:[...choices.slice(offset),...choices.slice(0,offset)],correct:(3-offset)%3}]})));
function validatedQuizAnswers(value){const out={};if(!value||typeof value!=='object'||Array.isArray(value))return out;for(const id of PLACE_IDS){const answer=value[id];if(Object.hasOwn(value,id)&&Number.isInteger(answer)&&answer>=0&&answer<3)out[id]=answer}return out}
const BONUS_QUIZ_TARGET=8;
function solvedQuizIds(answers){const valid=validatedQuizAnswers(answers);return PLACE_IDS.filter(id=>valid[id]===storyQuizzes[id].correct)}
function isPassportComplete(answers){return solvedQuizIds(answers).length>=BONUS_QUIZ_TARGET}
let quizAnswers=validatedQuizAnswers(readLocal('sp-quiz-v1',{})),activeQuizId=null,bonusBusy=false,readyBonus=null;
const quizBox=document.createElement('section');quizBox.id='story-quiz';quizBox.className='story-quiz';quizBox.innerHTML='<p class="eyebrow" id="quiz-eyebrow"></p><h3 id="quiz-question"></h3><div id="quiz-choices" role="group" aria-labelledby="quiz-question" class="quiz-choices"></div><p id="quiz-feedback" tabindex="-1" role="status" aria-live="polite"></p>';$('#story-text').after(quizBox);
const reward=document.createElement('div');reward.className='passport-reward';reward.id='passport-reward';reward.innerHTML='<div><p class="eyebrow" id="reward-eyebrow"></p><h3 id="reward-title"></h3><p id="reward-help"></p><div id="reward-stamps" class="reward-stamps" aria-hidden="true"></div><p id="reward-progress" role="status"></p><progress id="reward-meter" max="8" value="0"></progress><div class="postcard-actions"><a id="reward-explore" class="secondary-button" href="#explorar"></a><button id="bonus-download" class="button"></button><button id="bonus-share" class="button" type="button"></button></div><p id="bonus-share-help"></p><p id="bonus-status" role="status"></p></div><div class="quiz-summary"><strong id="quiz-score"></strong><p id="quiz-summary-help"></p><button id="quiz-reset" class="text-button"></button></div>';$('.passport').after(reward);
const quickStart=document.createElement('section');quickStart.className='quick-start';quickStart.setAttribute('aria-labelledby','quick-start-title');quickStart.innerHTML='<h2 id="quick-start-title"></h2><ol><li><a href="#explorar" id="guide-explore"></a><p id="guide-explore-help"></p></li><li><a href="#postal" id="guide-postcard"></a><p id="guide-postcard-help"></p></li><li><a href="#passport-reward" id="guide-bonus"></a><p id="guide-bonus-help"></p></li></ol>';$('#descobrir').before(quickStart);
Object.assign(english,{
'Comece por aqui':'Start here',
'Explore as histórias':'Explore the stories',
'Abra uma foto, leia a história e responda ao quiz.':'Open a photo, read its story and answer the quiz.',
'Crie seu cartão':'Create your postcard',
'Use o + nas fotos para escolher 3 lugares. Depois, escreva sua mensagem e baixe o cartão.':'Use + on the photos to pick 3 places. Then write your message and download your postcard.',
'Libere o cartão especial':'Unlock the special postcard',
'Acerte 8 quizzes. O cartão com as 20 fotos poderá ser baixado ou compartilhado.':'Answer 8 quizzes correctly. Download or share the postcard featuring all 20 photos.',
'Continuar explorando e responder quizzes ↗':'Keep exploring and answer quizzes ↗',
'Progresso para o cartão especial':'Progress toward the special postcard',
'Uma curiosidade para descobrir':'A little discovery','Nesta história, o que ganha destaque?':'What stands out in this story?',
'Você descobriu!':'You found it!','Repare:':'Notice:','Quase! Volte ao texto e tente outra opção.':'Almost! Look back at the story and try another option.',
'Uma pergunta em cada história':'One question in every story','Abra as histórias e teste seu olhar. Você pode tentar novamente. As respostas ficam neste navegador.':'Open the stories and test your eye. You can try again. Answers stay in this browser.',
'Recomeçar perguntas':'Restart questions','perguntas descobertas':'questions discovered','Surpresa do passaporte':'Passport surprise',
'20 camadas, um novo olhar':'20 layers, a fresh perspective','Acerte 8 quizzes para liberar um cartão especial com todas as fotos da coleção.':'Answer 8 quizzes correctly to unlock a special postcard with every photo in the collection.',
'Você liberou o cartão especial!':'You unlocked the special postcard!', 'quizzes para liberar':'quizzes left to unlock',
'Baixar meu cartão especial ↓':'Download my special postcard ↓','Acerte 8 quizzes para liberar':'Answer 8 quizzes correctly to unlock',
'Criando sua surpresa…':'Creating your surprise…','Cartão especial criado no seu dispositivo.':'Special postcard created on your device.',
'Não foi possível criar a surpresa. Tente novamente.':'Could not create the surprise. Please try again.',
'Um olhar para cada camada. Uma cidade inteira para descobrir.':'A view of every layer. A whole city to discover.',
'CARTÃO ESPECIAL · 20 HISTÓRIAS':'SPECIAL POSTCARD · 20 STORIES',
'Fotografias adaptadas. Autores, fontes e licenças:':'Adapted photographs. Authors, sources and licenses:',
'Compartilhar cartão especial ↗':'Share special postcard ↗',
'Preparar cartão para compartilhar':'Prepare postcard to share',
'Compartilhe pelo WhatsApp ou outro aplicativo disponível no seu dispositivo.':'Share via WhatsApp or another app available on your device.',
'Cartão pronto! Toque em compartilhar para escolher o aplicativo.':'Postcard ready! Tap share to choose an app.'
});
function bilingual(pair){return currentLanguage==='es'?t(pair[0]):pair[currentLanguage==='en'?1:0]}
function renderStoryQuiz(){if(!activeQuizId||!storyQuizzes[activeQuizId])return;const quiz=storyQuizzes[activeQuizId],answer=quizAnswers[activeQuizId],solved=answer===quiz.correct;$('#quiz-eyebrow').textContent=t('Uma curiosidade para descobrir');$('#quiz-question').textContent=t('Nesta história, o que ganha destaque?');$('#quiz-choices').replaceChildren(...quiz.choices.map((choice,index)=>{const b=document.createElement('button');b.type='button';b.textContent=bilingual(choice);b.setAttribute('aria-pressed',String(answer===index));b.disabled=solved;b.onclick=()=>{quizAnswers[activeQuizId]=index;writeLocal('sp-quiz-v1',quizAnswers);renderStoryQuiz();renderReward();$('#quiz-feedback').focus({preventScroll:true})};return b}));$('#quiz-feedback').textContent=answer===undefined?'':solved?t('Você descobriu!')+' '+t('Repare:')+' '+bilingual(quiz.choices[quiz.correct])+'.':t('Quase! Volte ao texto e tente outra opção.');}
function renderReward(){
 for(const [id,key] of Object.entries({'quick-start-title':'Comece por aqui','guide-explore':'Explore as histórias','guide-explore-help':'Abra uma foto, leia a história e responda ao quiz.','guide-postcard':'Crie seu cartão','guide-postcard-help':'Use o + nas fotos para escolher 3 lugares. Depois, escreva sua mensagem e baixe o cartão.','guide-bonus':'Libere o cartão especial','guide-bonus-help':'Acerte 8 quizzes. O cartão com as 20 fotos poderá ser baixado ou compartilhado.'}))$('#'+id).textContent=t(key);
 $('#reward-meter').value=Math.min(BONUS_QUIZ_TARGET,solvedQuizIds(quizAnswers).length);$('#reward-meter').setAttribute('aria-label',t('Progresso para o cartão especial'));$('#reward-explore').textContent=t('Continuar explorando e responder quizzes ↗');$('#reward-explore').hidden=isPassportComplete(quizAnswers);
const complete=isPassportComplete(quizAnswers),remaining=Math.max(0,BONUS_QUIZ_TARGET-solvedQuizIds(quizAnswers).length);$('#reward-eyebrow').textContent=t('Surpresa do passaporte');$('#reward-title').textContent=t('20 camadas, um novo olhar');$('#reward-help').textContent=t('Acerte 8 quizzes para liberar um cartão especial com todas as fotos da coleção.');$('#reward-progress').textContent=complete?t('Você liberou o cartão especial!'):remaining+' '+t('quizzes para liberar');$('#bonus-download').disabled=!complete||bonusBusy;$('#bonus-download').textContent=t(bonusBusy?'Criando sua surpresa…':complete?'Baixar meu cartão especial ↓':'Acerte 8 quizzes para liberar');$('#bonus-share').disabled=!complete||bonusBusy;$('#bonus-share').textContent=t(readyBonus?.language===currentLanguage?'Compartilhar cartão especial ↗':'Preparar cartão para compartilhar');$('#bonus-share-help').textContent=t('Compartilhe pelo WhatsApp ou outro aplicativo disponível no seu dispositivo.');$('#reward-stamps').replaceChildren(...places.map(p=>{const span=document.createElement('span');const solved=quizAnswers[p.id]===storyQuizzes[p.id].correct;span.textContent=solved?p.symbol:'·';span.className=solved?'discovered':'';return span}));const score=solvedQuizIds(quizAnswers).length;$('#quiz-score').textContent=score+'/'+PLACE_IDS.length+' '+t('perguntas descobertas');$('#quiz-summary-help').textContent=t('Abra as histórias e teste seu olhar. Você pode tentar novamente. As respostas ficam neste navegador.');$('#quiz-reset').textContent=t('Recomeçar perguntas');}
$('#cards').addEventListener('click',e=>{const id=e.target.closest('[data-story]')?.dataset.story;if(!PLACE_IDS.includes(id))return;activeQuizId=id;renderStoryQuiz()});
$('#quiz-reset').onclick=()=>{quizAnswers={};writeLocal('sp-quiz-v1',quizAnswers);renderStoryQuiz();renderReward()};
async function composePassportBonus(language){if(!isPassportComplete(quizAnswers))throw new Error('Passport incomplete');const en=language==='en',images=await Promise.all(places.map(p=>loadPreparedImage(p.id))),canvas=document.createElement('canvas');canvas.width=1600;canvas.height=2200;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');ctx.fillStyle='#f6f3eb';ctx.fillRect(0,0,1600,2200);ctx.fillStyle='#254d3b';ctx.font='24px Arial';ctx.fillText(translate('CARTÃO ESPECIAL · 20 HISTÓRIAS',language),80,75);ctx.font='62px Georgia';ctx.fillText('SÃO PAULO',80,160);ctx.font='42px Georgia';ctx.fillText(translate('20 camadas, um novo olhar',language),80,225,1440);
for(let i=0;i<places.length;i++){const p=places[i],x=80+(i%4)*363,y=280+Math.floor(i/4)*206;drawCover(ctx,images[i],x,y,351,194);const gradient=ctx.createLinearGradient(0,y+100,0,y+194);gradient.addColorStop(0,'#10251a00');gradient.addColorStop(1,'#10251ae6');ctx.fillStyle=gradient;ctx.fillRect(x,y,351,194);ctx.fillStyle='#fff';ctx.font='16px Arial';ctx.fillText(String(i+1).padStart(2,'0')+' / '+t(p.title),x+10,y+175,330)}
ctx.fillStyle='#254d3b';ctx.font='25px Georgia';ctx.fillText(translate('Um olhar para cada camada. Uma cidade inteira para descobrir.',language),80,1360,1440);ctx.font='18px Arial';ctx.fillText(translate('Fotografias adaptadas. Autores, fontes e licenças:',language),80,1430,1440);places.forEach((p,i)=>{const c=photoCredits[p.id];ctx.font='14px Arial';ctx.fillText(String(i+1).padStart(2,'0')+' · '+c.author+' · '+c.license+' · '+c.source,80,1470+i*28,1440)});ctx.font='22px Georgia';ctx.fillText(translate('São Paulo em Camadas',language)+' · Cloudinary Mini-Hack 2026',80,2110,1440);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('PNG unavailable');return blob;}
$('#bonus-download').onclick=async()=>{if(bonusBusy||!isPassportComplete(quizAnswers))return;bonusBusy=true;$('#language').disabled=true;$('#bonus-status').textContent=t('Criando sua surpresa…');renderReward();try{const blob=await composePassportBonus(currentLanguage);readyBonus={blob,language:currentLanguage};downloadBlob(blob,'sao-paulo-passaporte-completo.png');$('#bonus-status').textContent=t('Cartão especial criado no seu dispositivo.')}catch{$('#bonus-status').textContent=t('Não foi possível criar a surpresa. Tente novamente.')}finally{bonusBusy=false;$('#language').disabled=false;renderReward()}};
$('#bonus-share').onclick=async()=>{
 if(bonusBusy||!isPassportComplete(quizAnswers))return;
 // Prepare separately so the next click retains the user activation required by Web Share.
 if(readyBonus?.language!==currentLanguage){
  bonusBusy=true;$('#language').disabled=true;$('#bonus-status').textContent=t('Criando sua surpresa…');renderReward();
  try{readyBonus={blob:await composePassportBonus(currentLanguage),language:currentLanguage};$('#bonus-status').textContent=t('Cartão pronto! Toque em compartilhar para escolher o aplicativo.')}
  catch{$('#bonus-status').textContent=t('Não foi possível criar a surpresa. Tente novamente.')}
  finally{bonusBusy=false;$('#language').disabled=false;renderReward()}
  return;
 }
 bonusBusy=true;$('#language').disabled=true;renderReward();
 try{
  const file=new File([readyBonus.blob],'sao-paulo-cartao-especial.png',{type:'image/png'});
  if(!navigator.share||!navigator.canShare?.({files:[file]})){
   downloadBlob(readyBonus.blob,'sao-paulo-cartao-especial.png');$('#bonus-status').textContent=t('O navegador não oferece compartilhamento de arquivos. Baixei o cartão para você enviar.');return;
  }
  await navigator.share({files:[file],title:t('Seu cartão de São Paulo')});
  $('#bonus-status').textContent='';
 }catch(error){$('#bonus-status').textContent=t(error.name==='AbortError'?'Compartilhamento cancelado. Seu cartão continua disponível.':'Não foi possível compartilhar. Você pode baixar o cartão.')}
 finally{bonusBusy=false;$('#language').disabled=false;renderReward()}
};
const featuresBeforeDiscoveries=renderFeatures;renderFeatures=function(){featuresBeforeDiscoveries();renderReward()};renderReward();
