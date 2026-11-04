const fs=require('fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');const root=path.join(__dirname,'../dist/');const ctx={URLSearchParams,location:{hash:''},localStorage:{getItem:()=>null,setItem(){}}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(root+'security.js','utf8'),ctx);const source=fs.readFileSync(root+'discoveries.js','utf8').split('const quizBox=')[0];vm.runInContext(source,ctx);const ids=vm.runInContext('[...PLACE_IDS]',ctx),quizzes=vm.runInContext('storyQuizzes',ctx);assert.equal(Object.keys(quizzes).length,20);for(const id of ids){const q=quizzes[id];assert.equal(q.choices.length,3);assert.ok(q.correct>=0&&q.correct<3);for(const choice of q.choices){assert.equal(choice.length,2);assert.ok(choice.every(x=>typeof x==='string'&&x.length>0))}}const correctAnswers=Object.fromEntries(ids.map(id=>[id,quizzes[id].correct]));
assert.equal(ctx.isPassportComplete(Object.fromEntries(Object.entries(correctAnswers).slice(0,7))),false);
assert.equal(ctx.isPassportComplete(Object.fromEntries(Object.entries(correctAnswers).slice(0,8))),true);
assert.equal(ctx.isPassportComplete(correctAnswers),true);
assert.equal(ctx.isPassportComplete(ids),false); // Opening stories alone does not unlock the reward.
const seven=Object.fromEntries(Object.entries(correctAnswers).slice(0,7));
assert.equal(ctx.isPassportComplete({...seven,[ids[7]]:(quizzes[ids[7]].correct+1)%3}),false);
assert.equal(ctx.isPassportComplete({...seven,evil:0}),false);
assert.equal(ctx.isPassportComplete({[ids[0]]:quizzes[ids[0]].correct}),false);
for(const value of [null,{},[],42,'abc'])assert.equal(ctx.isPassportComplete(value),false);
vm.runInContext('quizAnswers='+JSON.stringify(Object.fromEntries(Object.entries(correctAnswers).slice(0,8))),ctx);
assert.equal(vm.runInContext('isPassportComplete(quizAnswers)',ctx),true);
vm.runInContext('quizAnswers={}',ctx);
assert.equal(vm.runInContext('isPassportComplete(quizAnswers)',ctx),false);
for(const input of [null,[],42,'abc'])assert.equal(Object.keys(ctx.validatedQuizAnswers(input)).length,0);const answers=ctx.validatedQuizAnswers(JSON.parse('{"liberdade":1,"beco":3,"masp":"1","copan":-1,"evil":0,"__proto__":{"polluted":true}}'));assert.equal(JSON.stringify(answers),'{"liberdade":1}');console.log('Discovery checks passed: 20 bilingual questions, answer validation, 8 correct quizzes unlock the reward; 7, incorrect answers and reset stay locked.');
