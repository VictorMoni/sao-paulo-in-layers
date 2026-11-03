# Proteção de segurança e quota

## Modo sem consumo do Cloudinary nas visitas

O Cloudinary prepara as imagens durante uma atualização controlada. São 61 arquivos copiados em dist/media: 20 referências otimizadas, 20 recortes para a galeria, 20 tratamentos de comparação e uma imagem de abertura. O app entrega esses arquivos pela hospedagem Sites. O cartão PNG é montado com Canvas no navegador e não envia a mensagem a um serviço de composição.

A CSP permite imagens somente da própria origem e blobs e conexões somente da própria origem. Não há fetch para o Cloudinary nem URLs de entrega nos scripts carregados. Não existe fallback para buscar mídia no Cloudinary. Arquivos faltantes resultam em erro local, sem consumo na conta. Scripts recebem versão nova na URL para evitar uso de código antigo após recarregar a página.

## Escopo e limites

- As visitas, a comparação visual, o download e o compartilhamento do cartão não fazem requisições ao Cloudinary.
- A preparação ou atualização futura das imagens ainda usa a conta uma quantidade limitada de vezes. Essa manutenção não acontece automaticamente no app.
- A hospedagem Sites continua servindo os arquivos e pode ter limites próprios.
- As URLs antigas já publicadas no Cloudinary e outros projetos da mesma conta ficam fora deste isolamento. Restringir essas mídias na conta é uma etapa separada; nenhuma configuração global da conta foi alterada.
- O app não afirma que a quota total da conta está imune a tráfego de outras origens.

## Demais proteções

CSP sem scripts/estilos inline ou eval; bloqueio de objetos e formulários; frames restritos ao caminho de incorporação do Google Maps; Referrer Policy no-referrer; links externos com noopener/noreferrer. Textos limitados a 72 caracteres Unicode, sem controles bidirecionais, exibidos como texto. Seleções compartilhadas aceitam apenas três IDs conhecidos e distintos. Mensagens pessoais não entram no link nem no armazenamento persistente. Dados locais são validados e recuperáveis em caso de corrupção. Não há API Secret no cliente ou no repositório.

O cache de seis cartões existe somente na memória da aba e evita refazer a composição local. O compartilhamento de arquivo depende da ação do visitante e do suporte do dispositivo. Cancelar não envia automaticamente.

## Testes

`node tests/security.cjs` valida entradas malformadas, CSP, ausência de chamadas upstream nos scripts ativos, caminhos locais e integridade SHA-256 dos 61 arquivos preparados.

No navegador, as nove imagens visíveis/inicializadas (abertura, seis cards e duas comparações) carregaram da própria origem; o cartão com acentos, barra e símbolos foi baixado; logs consultados não exibiram erros. Um teste temporário isolado, com a mesma CSP do app, tentou carregar imagem e executar fetch para um endereço de teste do Cloudinary: ambos foram bloqueados por img-src e connect-src. O teste foi removido do pacote de produção.

A CSP via meta não equivale a cabeçalhos HTTP como frame-ancestors ou HSTS. O controle de acesso privado do Sites permanece preservado. Esta é uma revisão dirigida, não uma auditoria independente.

Proveniência de cada imagem, URL usada na preparação, tamanho e hash: dist/media/provenance.json. Créditos e licenças: dist/images/CREDITS.md.

## Google Maps

A CSP permite frame-src somente https://www.google.com/maps/embed. A mídia Cloudinary continua bloqueada durante visitas. Não há iframe carregado inicialmente: o visitante aciona o carregamento do mapa de São Paulo. O seletor aceita somente a cidade e IDs do catálogo; buscas e destinos são codificados em URLs fixas do Google. Sem coleta de geolocalização no app, chave de API ou mensagens pessoais transmitidas. Ao carregar o mapa, o Google recebe a requisição.

## Curiosidades e cartão especial

As respostas são limitadas aos 20 IDs do catálogo e a índices inteiros de zero a dois. São armazenadas somente no navegador. O cartão exige as 20 histórias distintas no progresso local; isso é uma mecânica visual de descoberta e não uma autenticação. O PNG usa as imagens locais e inclui atribuição. Não há chamada Cloudinary, coleta de dados pessoais ou publicação automática. Perguntas podem ser reiniciadas; limpar descobertas bloqueia novamente o cartão.

