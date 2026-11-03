// Explicit maintenance command only. Never imported or run by the website.
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const manifestPath=path.join(root,'media/provenance.json');
const manifest=JSON.parse((await readFile(manifestPath,'utf8')).replace(/^\uFEFF/,''));
const items=Object.entries(manifest).flatMap(([id,value])=>id==='hero'?[value]:Object.values(value).filter(item=>item.engine!=='local'));
if(items.length!==61)throw new Error('Unexpected rendition count');
const stage=path.join(root,'media/.prepare-stage');await mkdir(stage,{recursive:true});
for(const item of items){
 const source=new URL(item.source);
 if(source.protocol!=='https:'||source.hostname!=='res.cloudinary.com'||!source.pathname.startsWith('/umn5t3ix/image/upload/')||!/^media\/[a-z-]+\.(jpg|webp|png)$/.test(item.file))throw new Error('Unexpected source or destination');
 const response=await fetch(source,{headers:{Accept:item.mime},redirect:'error',signal:AbortSignal.timeout(30000)});
 if(!response.ok||response.headers.get('content-type')?.split(';')[0]!==item.mime)throw new Error('Rendition format changed; preserve existing files and review the format before updating.');
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length>5*1024*1024||bytes.length===0)throw new Error('Invalid rendition size');
 await writeFile(path.join(stage,path.basename(item.file)),bytes);item.bytes=bytes.length;item.sha256=createHash('sha256').update(bytes).digest('hex');
}
// Commit only after every upstream response has passed validation.
for(const item of items)await rename(path.join(stage,path.basename(item.file)),path.join(root,item.file));
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log('61 prepared renditions updated. Run tests and publish explicitly.');
