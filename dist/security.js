'use strict';
const PLACE_IDS=Object.freeze(['liberdade','feira','beco','minhocao','ibirapuera','cantareira',"mercado","paulista","copan","masp","botanico","luz","pizzapaulista","pizzadoce","becocores","kobra","parqueaugusta","burlemarx","pinacoteca","estacaoluz"]);
function cleanMessage(value){return Array.from(String(value??'').normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g,'')).slice(0,72).join('')}
function safeIds(value,max=3){return [...new Set(Array.isArray(value)?value:[])].filter(id=>typeof id==='string'&&PLACE_IDS.includes(id)).slice(0,max)}
function readLocal(key,fallback){try{const raw=localStorage.getItem(key);if(!raw||raw.length>2048)return fallback;return JSON.parse(raw)}catch{return fallback}}
function writeLocal(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
function readSharedTrip(hash){if(typeof hash!=='string'||hash.length>300)return null;const params=new URLSearchParams(hash.replace(/^#/,''));if(!params.has('trip'))return null;const raw=params.get('trip').split(',');const ids=safeIds(raw);if(ids.length!==3||raw.length!==3||ids.length!==new Set(raw).size)return null;return {ids,lang:['pt-BR','en','es'].includes(params.get('lang'))?params.get('lang'):'pt-BR'}}
const initialSharedTrip=readSharedTrip(location.hash);
