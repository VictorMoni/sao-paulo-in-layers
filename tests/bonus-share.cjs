const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../dist/discoveries.js'),'utf8');
const handler=source.slice(source.indexOf("$('#bonus-share').onclick="),source.indexOf('const featuresBeforeDiscoveries='));
async function run(){
 const nodes={},downloads=[],shares=[];let compositions=0,unlocked=false;
 const ctx={currentLanguage:'pt-BR',quizAnswers:{},bonusBusy:false,readyBonus:null,File:class{constructor(parts,name,options){this.parts=parts;this.name=name;this.type=options.type}},
 $:id=>nodes[id]??=( {} ),t:s=>s,renderReward(){},isPassportComplete:()=>unlocked,
 composePassportBonus:async()=>{compositions++;return 'png-blob'},downloadBlob:(...args)=>downloads.push(args),navigator:{canShare:()=>true,share:async data=>shares.push(data)}};
 vm.createContext(ctx);vm.runInContext(handler,ctx);const click=nodes['#bonus-share'].onclick;
 await click();assert.equal(compositions,0);assert.equal(shares.length,0);
 unlocked=true;await click();assert.equal(compositions,1);assert.equal(shares.length,0);assert.match(nodes['#bonus-status'].textContent,/Cartão pronto/);
 await click();assert.equal(shares.length,1);assert.equal(shares[0].files[0].type,'image/png');assert.equal(shares[0].files[0].parts[0],'png-blob');assert.equal(ctx.bonusBusy,false);
 ctx.navigator.share=async()=>{throw Object.assign(new Error(),{name:'AbortError'})};await click();assert.match(nodes['#bonus-status'].textContent,/cancelado/);assert.equal(downloads.length,0);assert.equal(ctx.bonusBusy,false);
 ctx.navigator.share=async()=>{throw new Error('failure')};await click();assert.match(nodes['#bonus-status'].textContent,/Não foi possível compartilhar/);
 ctx.navigator.canShare=()=>false;await click();assert.equal(downloads.length,1);assert.equal(downloads[0][0],'png-blob');
 ctx.currentLanguage='es';await click();assert.equal(compositions,2);assert.equal(ctx.readyBonus.language,'es');
 ctx.currentLanguage='en';ctx.composePassportBonus=async()=>{throw new Error('image failure')};await click();assert.match(nodes['#bonus-status'].textContent,/Não foi possível criar/);assert.equal(ctx.bonusBusy,false);assert.equal(nodes['#language'].disabled,false);
 console.log('Bonus sharing passed: locked reward, preparation, PNG sharing, cancellation, failure, download fallback and language changes.');
}
run().catch(error=>{console.error(error);process.exitCode=1});
