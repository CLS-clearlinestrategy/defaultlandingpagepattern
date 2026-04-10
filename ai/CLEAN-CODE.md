# Apenas usar no final do projeto:

```markdown
Contexto:
Este projeto foi iniciado via Lovable e contém excesso de boilerplate e configurações redundantes. Preciso de uma limpeza profunda focada em performance, correção de avisos no console e remoção de dependências não utilizadas.

Instruções de Limpeza:

    React Router (Update v7 Prep):

        No arquivo src/App.tsx, atualize o componente <BrowserRouter> para incluir as "future flags" solicitadas pelos warnings do console: v7_startTransition: true e v7_relativeSplatPath: true.

    Correção de Iframe (VideoContentBlock):

        No arquivo src/components/VideoContentBlock.tsx, o atributo allow do iframe está causando erros de "Diretiva de recursos".

        Remova permissões que o navegador está desconsiderando ou formate a string de permissões para ser compatível com os padrões modernos de Security Policy.

        Certifique-se de que o iframe não está tentando carregar recursos cross-origin que violem o CORS, especialmente em relação ao googleads.

    Limpeza de Metadados (index.html):

        No index.html, remova todas as referências de placeholder da Lovable, como os links de og:image e twitter:image que apontam para lovable.dev.

        Substitua o título "Lovable App" por um marcador genérico ou o nome real do projeto.

    Auditoria de Dependências (package.json):

        Analise o package.json e identifique bibliotecas de "setup" da Lovable que não estão sendo efetivamente chamadas no código (ex: verifique se lovable-tagger ainda é necessário para o workflow atual).

        Remova scripts de build ou dependências que sejam puramente "lixo" de template inicial.

    Remoção de Componentes UI Não Utilizados:

        Verifique a pasta src/components/ui/. Se houver componentes do Shadcn/UI (como accordion, alert-dialog, breadcrumb, etc.) que não são importados em nenhum lugar do projeto, remova os arquivos para reduzir o tamanho do projeto e evitar warnings de código morto.

    Supressão de Erros de Terceiros:

        Muitos avisos de "unreachable code" e cookies rejeitados vêm de scripts externos (YouTube/Google Ads). Tente isolar esses carregamentos ou adicionar sandbox attributes mais restritos no componente de vídeo para mitigar o impacto no console de desenvolvimento.

Resultado Esperado:
Um projeto limpo, sem warnings de "Future Flag" no console, com metadados corrigidos e apenas os componentes e dependências estritamente necessários para o funcionamento da landing page.
```