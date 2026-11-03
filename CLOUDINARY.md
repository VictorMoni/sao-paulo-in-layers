# Cloudinary — preparação da coleção

As 20 fotografias do app foram enviadas à conta Cloudinary umn5t3ix. As seis novas foram confirmadas na biblioteca (76 assets, antes 70). As APIs de transformação por URL geraram recortes, compressão automática e tratamento de cor. Os resultados foram baixados durante a preparação e são publicados junto ao app. Visitas e exportação de cartões não chamam o Cloudinary.

## Transformações das seis novas fotos

| Uso | Transformação |
|---|---|
| Referência sem tratamento de cor | f_jpg,q_auto,w_1200 |
| Galeria | f_jpg,q_auto,c_fill,g_auto,w_720,h_518 |
| Comparação tratada | f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65 |

A referência também é redimensionada e comprimida. JPEG é fixado para permitir preparação determinística fora do navegador; q_auto ajusta a compressão. g_auto escolhe a região do recorte. O comparador mostra a referência e a versão retrato com saturação e tonalidade quente.

## Evidências reproduzíveis

O manifesto dist/media/provenance.json contém a URL exata de cada uma das 61 versões, MIME, bytes e SHA-256. O script scripts/prepare-media.mjs refaz somente essas URLs aprovadas e valida todos os downloads antes de substituir arquivos. Essa manutenção consome quota e exige ação explícita; não é executada nas visitas.

### masp

- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1796134688/masp.jpg) — SHA-256 `cc613c28c39e4ab18e0ee185ca0e578f36a29eb4e8ff04b3c38f6995188017ae`
- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1796134688/masp.jpg) — SHA-256 `df2d36d81cb12c8168d697ed6e5f5207aa18eba3f15b83d620d4825e8352132f`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1796134688/masp.jpg) — SHA-256 `12261d96d043c3c3c3c52c112ca1057a1899b4d207d41412fd3350860c1d7e0c`

### copan

- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1796134688/copan.jpg) — SHA-256 `6287d171201269d342889af6de0bc44d61869186c13f2d09cadf5f1245d3e7a1`
- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1796134688/copan.jpg) — SHA-256 `0b50ca86bd8d72cce17306d3474bed489361b55d4c3663ded99792cdb6919987`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1796134688/copan.jpg) — SHA-256 `e7913b42d311b4cb850567c410617e059a822530bbefd9569fbbb06b33f6eb41`

### luz

- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1796134688/luz.jpg) — SHA-256 `e3dd7190b5d0325d395a10dc918a2c3bbdf525b1008d66ea82f0268bb0acceb7`
- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1796134688/luz.jpg) — SHA-256 `aa7a4344479fd2844daaeba3de87f1aaff6a25e7f7f2307d98b0e7ed9555efcc`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1796134688/luz.jpg) — SHA-256 `f6ce023161e5fb2001e36b5fbcf5d9436cb23276d180f04a35c197aa2ef18a14`

### mercado

- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1796134688/mercado.jpg) — SHA-256 `ae0f084f105ee4d20f4c988cd6b9f530f6c053630c9312e14912bd53a745474d`
- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1796134688/mercado.jpg) — SHA-256 `9858db25d58bd07a1e8e9189dacfaabfa17c6a19729f29784e24b8c9c8e2c845`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1796134688/mercado.jpg) — SHA-256 `0c0cdb13e7633697fa85deb2258785331e57e5987c74b5d47b2acf8d08d34e90`

### paulista

- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1796134688/paulista.jpg) — SHA-256 `87f5842048ba4bf6b314dfcc31b2ca92f4e02531eb500d922265263d59ab196a`
- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1796134688/paulista.jpg) — SHA-256 `f11dbe2cd6112f873ef1f44b38efcefdad28a577e3bb36ae3a601304747df331`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1796134688/paulista.jpg) — SHA-256 `a064a9cb39a91a60cbcfed8f188052aab0ec81474d6a720f1ce02e203a20e915`

### botanico

- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1796134688/botanico.jpg) — SHA-256 `b8976717c5cca428218fd5eb3e351f6e90a79852a5198287261002172d8f1d72`
- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1796134688/botanico.jpg) — SHA-256 `93fafb908074074994fea333697d383f6c2f0532d975bea9d39fe290926368f4`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1796134688/botanico.jpg) — SHA-256 `3b3393222f0907f1e0811f6000e13261bb602ade013b4be38b6e09d9bcadd82f`

## Segurança e atribuição

Nenhuma chave de API ou segredo é necessário no cliente. A CSP limita mídia à hospedagem do app. Créditos, fontes e licenças permanecem em dist/images/CREDITS.md. Para avaliação, abra o comparador do app e selecione qualquer uma das 12 fotos.

## Expansão para 20 histórias

Oito novas fotografias confirmadas na biblioteca: 84 assets. Mais 24 versões Cloudinary foram preparadas para as quatro categorias.

### pizzadoce

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/pizzadoce.jpg) — SHA-256 `a29589d6c87737c191465c6136d3cea54698e58a4b2fc56318248a189102b5fb`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/pizzadoce.jpg) — SHA-256 `b5dea794199383e07b59f27c23d1375f3fdcb0c9359e1093ab8a1b7c6461f162`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/pizzadoce.jpg) — SHA-256 `cee7b59805c43f289cd07e1fcd477663ac3fd996c5e9860cc757ca1745422468`

### parqueaugusta

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/parqueaugusta.jpg) — SHA-256 `88bc19378a3c20cad193e9609dd45de34c2a309ab8b168ff2c6edbf4d469d5d7`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/parqueaugusta.jpg) — SHA-256 `71761a714847042c4f5de8faac945ca19aea23d9a08b55e6378bbb3ee1c86164`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/parqueaugusta.jpg) — SHA-256 `82ffe83da679e0c17f221fc5418a5780c9a93d8c54c58eefa53a1577a72aba4a`

### estacaoluz

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/estacaoluz.jpg) — SHA-256 `a37d76ca94e08ee62fdf155e9d827c261305ed74ba513ad4b35519311abdd073`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/estacaoluz.jpg) — SHA-256 `34ea674ba2f197cc0d434b05d2929ac6f0979d8b7da325d3b74cea387ffb2b56`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/estacaoluz.jpg) — SHA-256 `11a6a033bf63d742814bf9665ed73440b81f059964c4744324e5689b492e03b7`

### burlemarx

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/burlemarx.jpg) — SHA-256 `884cc159a263701e3b23b8d9b8cea1a08d6e358cdea20103c452470d54a46393`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/burlemarx.jpg) — SHA-256 `b414d23ad9c17d23a0b2514465d84fbdf37885d61778111e83f62b4f36866d03`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/burlemarx.jpg) — SHA-256 `62a1b9ee4c3035ea63d3aee45f30d695be8e85f790bebec5ae5b37898856d848`

### pinacoteca

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/pinacoteca.jpg) — SHA-256 `800306ab9c5ac0d1965a21f63555201e860ebf4fbe8c0264b04ea86bcded217b`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/pinacoteca.jpg) — SHA-256 `79420621bbec038219ba84e50572caaab9cb2293ac06e422f9b11bfe819a0041`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/pinacoteca.jpg) — SHA-256 `d8a0b683f709b3a71e3b07fa99ddb9403e5a316635b95574b0bc3f50de68427b`

### pizzapaulista

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/pizzapaulista.jpg) — SHA-256 `026fcabcee68494f529159229ffe0cd795edd479d7bf22f1530c4386795007c9`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/pizzapaulista.jpg) — SHA-256 `007ae81f1f7d42001fff73e476f6a8a0ed5b09d9e73a06452b0a21c11182d63d`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/pizzapaulista.jpg) — SHA-256 `88edd9168f5f598e1a9a33f089738a7164aa36434237ca0c4800bbdfbcbc8f5c`

### becocores

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/becocores.jpg) — SHA-256 `61026462658863755220f75bd193e1c616214323e5e1991de68fd8000718fb42`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/becocores.jpg) — SHA-256 `7274933988561fdbe1d799d40e9c6af369e5e8319550aea2763b00162a2779ee`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/becocores.jpg) — SHA-256 `0e28e26c0541148beb4ffe3918e53c9c89cd2605d404e99601f9ae402b9f3f81`

### kobra

- [treated](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65/v1793735151/kobra.jpg) — SHA-256 `bd759b45acf826e6ef0d0022fb8e2642736c862eae8e66e145fc3b63282e3e9f`
- [card](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,c_fill,g_auto,w_720,h_518/v1793735151/kobra.jpg) — SHA-256 `bdde6942dd2b99c5637239397f88e2c37667a551a31176593504a3bdac299bb6`
- [original](https://res.cloudinary.com/umn5t3ix/image/upload/f_jpg,q_auto,w_1200/v1793735151/kobra.jpg) — SHA-256 `963aef06263edcd2aed5e614c983a2609e34fdb07c831bb0748d5b19063a951a`

