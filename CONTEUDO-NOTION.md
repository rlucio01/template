# Guia CI/CD para WebApps

> **Documento de conteúdo para edição no Notion.** Edite títulos, textos, listas, links e blocos de código livremente. Ao terminar, exporte ou envie este Markdown atualizado para que as alterações sejam aplicadas à página.

![Selo aprovado com caricatura alegre](assets/selo-aprovado.webp)

Objetivo


## Construir um WebApp real com processo profissional


O template não trata só de deploy. Ele organiza a jornada inteira: máquina, contas, escopo,
        banco, branches, homologação e produção.







### Resultado esperado




- Ambientes isolados para **HML** e **PROD**

- Versionamento correto com **main** e **develop**

- Deploy profissional e rastreável







### Regra principal




- Cada projeto é independente

- Cada ambiente é seguro e separado

- Produção é consequência do processo










---





Etapa 1


## Pré-requisitos no Windows do zero


A preparação do ambiente vem antes do código para evitar falhas de permissão, certificados
        e ferramentas incompletas.







### Atualizar o Windows




- Executar Windows Update

- Reiniciar o computador






          Isso ajuda a reduzir risco de erros de permissão e certificados.





### Instalar navegador moderno


Escolha um navegador principal para usar nas plataformas do projeto.




- Instalar um navegador moderno




            [Chrome](https://www.google.com/chrome)
            [Edge](https://www.microsoft.com/edge)
            [Firefox](https://www.mozilla.org/firefox/new/)
            [Opera](https://www.opera.com/download)







### Criar contas do projeto


Crie uma conta de serviço no [Proton Mail](https://proton.me/mail) para o projeto. Essa conta deve ser usada no [Supabase](https://supabase.com). Os demais serviços podem usar contas particulares, se fizer sentido na sua
            operação.



            [Proton Mail](https://proton.me/mail)
            [GitHub](https://github.com)
            [Supabase](https://supabase.com)
            [Vercel](https://vercel.com)
            [Claude](https://claude.ai)
            [Google AI Studio](https://aistudio.google.com)












### Ferramentas base




- [Git](https://git-scm.com/download/win) com
              instalação padrão

- [GitHub CLI](https://cli.github.com/) para
              autenticação e ações no GitHub via terminal

- [Node.js LTS](https://nodejs.org/), não a
              versão Current (Na instalação não marcar opção do chocolately)
- [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) recomendado







### Ferramentas de trabalho




- [Antigravity IDE](https://antigravity.google/)
              como ambiente principal

- [Docker Desktop](https://www.docker.com/products/docker-desktop) com WSL 2

- Reiniciar a máquina após o Docker








        Anote suas credenciais em um lugar de fácil acesso para dar celeridade ao projeto. Pode ser um Notepad ou um
        Notion, em qualquer lugar que preferir.


      ```
git --version
gh --version          
node -v
npm -v
docker --version
```






Etapa 2


## Isolamento total do projeto


Antes de telas e código, o template pede isolamento completo de identidade e
        infraestrutura.







### E-mail exclusivo do projeto


Ferramenta sugerida: [Proton Mail](https://proton.me/mail).



            `todoapp.dev@proton.me`





- Separação total entre projetos

- Facilidade de acesso futuro

- Mais segurança operacional







### Projetos no Supabase


[Criar dois projetos separados](https://supabase.com/dashboard/projects).




- **Supabase Homologação**

- **Supabase Produção**

- Nunca reutilizar o mesmo projeto Supabase









        Homologação e Produção não devem compartilhar a mesma instância de banco.








Etapa 3


## Prototipação visual e design system


O template manda buscar inspiração, extrair padrões visuais e validar UX antes do backend.






- Usar o [Dribbble](https://dribbble.com), Pinterest, Awwwards, [21st.dev](https://21st.dev) para buscar referências
            visuais

- Identificar paleta, tipografia, espaçamento e componentes

- Criar o protótipo no [Google AI Studio](https://aistudio.google.com) (Opcional)

- Validar fluxo das telas sem backend e sem deploy





        Primeiro a UX, depois o código. Essa ordem reduz retrabalho.








Etapa 4


## Ideação com IA sem escrever código


Essa etapa define escopo funcional, estrutura de telas, regras de negócio e base de
        infraestrutura.



Ferramenta sugerida: [Claude](https://claude.ai).




        Dica: se quiser comparar qual IA faz mais sentido para o momento, consulte o
        [LM Arena Leaderboard](https://arena.ai/leaderboard)
        e o
        [Artificial Analysis](https://artificialanalysis.ai).



      ```
Crie a especificação de um webapp simples de To Do List.
Inclua:
- Funcionalidades principais
- Estrutura de telas
- Regras de negócio
- Estrutura inicial de banco de dados
Infraestrutura:
- Supabase: Banco de Dados, Storage e Autenticação
- Vercel: Deploy
Crie um PRD.md com todo o prompt
```



        Aqui nasce o escopo funcional, não a implementação.




        Bonus opcional: se quiser acelerar a escrita por voz durante essa etapa, instale o
        [Wispr Flow](https://wisprflow.ai/r?RAFAEL760), [Amical](https://amical.ai) ou 
        [Handy](https://handy.computer)
        para transcricao de voz.






### Proximo passo no Windows Explorer


Agora crie uma pasta com o nome do projeto no Windows Explorer e salve dentro dela o arquivo
          `PRD.md` criado nesta etapa.




![Icone de pasta amarela do Windows Explorer](assets/icons/windows-folder.svg)


Exemplo visual da pasta onde voce pode salvar o projeto.











Especificação


## O exemplo completo de WebApp presente no template


O Markdown original usa um To-Do App como exemplo completo de produto e detalha
        funcionalidades, telas, regras, banco e segurança.







### Funcionalidades




- Login, cadastro, logout e recuperação de senha

- CRUD de tarefas com prioridade, vencimento e anexos

- Filtros por status, prioridade e categoria

- Busca por título e descrição







### Telas




- Tela de autenticação

- Dashboard principal

- Modal de nova tarefa e edição

- Fluxos de categorias e anexos












### Regras de negócio




- Título obrigatório com limites de tamanho

- Senha mínima de 6 caracteres

- Validação de datas e duplicidade

- Categorias padrão no primeiro login







### Segurança




- RLS em `profiles`, `categories` e `tasks`

- Bucket privado para anexos

- Policies por usuário em banco e storage

- Autenticação gerenciada pelo Supabase Auth












Etapa 5


## Desenvolvimento no Antigravity e uso do MCP


O Antigravity é o ambiente principal de trabalho, e o MCP do Supabase conecta a rotina ao
        ambiente de homologação.







### Antigravity




- Abrir o projeto no [Antigravity](https://antigravity.google/)
            

- Usar esse ambiente como centro do desenvolvimento diário







### MCP do Supabase




- Conectar ao Supabase de homologação

- Alinhar MCP Global para o mesmo ambiente









        **Atenção ao Supabase Free:** se o MCP estiver apontando para um projeto no plano gratuito,
        considere estas limitações oficiais do Supabase:



- **Banco de dados:** até 500 MB por projeto

- **Auth:** até 50.000 usuários ativos por mês (MAU) no Supabase Auth

- **Storage:** até 1 GB

- **Inatividade:** projetos Free com atividade extremamente baixa em um período de 7 dias podem
            ser pausados automaticamente


        Se o projeto de homologação entrar em pausa, o MCP pode deixar de responder até a reativação manual no
        dashboard.





        [MCP Supabase](https://supabase.com/docs/guides/ai/mcp)
        [Supabase Auth](https://supabase.com/docs/guides/auth)








Etapa 6


## Código base e versionamento correto


Com o escopo e o visual definidos, o projeto entra em Git com uma estrutura de branches
        profissional.


      ```
git init
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git add .
git commit -m "chore: initial project structure"
git push -u origin main
```

      ```
git checkout -b develop
git push -u origin develop

git config user.name "Seu Nome"
git config user.email "seu-email-da-conta-atual@exemplo.com"
```




- **main** representa produção

- **develop** representa homologação








Etapa 7


## Configuração correta do Supabase CLI


O template enfatiza que o Supabase CLI não é global. Ele deve ser inicializado dentro de
        cada projeto.


      ```
npx supabase init
npx supabase login
npx supabase link --project-ref PROJECT_REF_HML
```



        Se começa com `npx`, pertence ao projeto, não à máquina.








Etapa 8


## Banco de dados, migrations e configuração inicial


Além do CLI, o template traz a lógica de configuração inicial do Supabase, variáveis de
        ambiente e fluxos de autenticação e CRUD.


      ```
npx supabase db diff -f create_tasks_table
git add supabase/migrations
git commit -m "chore(db): create tasks table"
npx supabase db push
```






### Supabase Setup




- Criar projeto no Supabase

- Executar migrations SQL

- Configurar Storage bucket

- Habilitar Email Auth

- Copiar URL e Anon Key







### Fluxos principais




- Usuário acessa login ou signup

- Supabase Auth gerencia credenciais

- RLS protege dados por `user_id`

- Storage recebe anexos por usuário e tarefa







      ```
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```






Arquitetura


## Stack tecnológica e estrutura sugerida


O template também deixa claro qual stack faz sentido para um WebApp cloud-native com
        Supabase e Vercel.







### Frontend




- Next.js 14+ com App Router

- TypeScript

- Tailwind CSS

- shadcn/ui ou Radix UI

- React Hook Form + Zod







### Backend e deploy




- Supabase com PostgreSQL, Auth e Storage

- `@supabase/supabase-js`

- Vercel com CI/CD automático via Git

- Variáveis de ambiente seguras







      ```
todo-app/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── store/
├── public/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── .env.local
├── next.config.js
├── tailwind.config.js
└── package.json
```

      ```
import { createClientComponentClient } from '@supabase/ssr'
import type { Database } from '@/lib/types'

export const supabase = createClientComponentClient<Database>()
```






Etapas 9 e 10


## Homologação com CI/CD e Pull Request


Depois do desenvolvimento, a validação acontece via preview na Vercel e revisão do PR.


      ```
git add .
git commit -m "feat: todo list funcional"
git push origin develop
```



        O push em **develop** faz a Vercel criar um preview, um ambiente isolado e a build de homologação.





        [Preview Deployments na Vercel](https://vercel.com/docs/deployments/preview-deployments)



      ```
develop → main
```






Etapas 11 e 12


## Produção e pós-deploy


A produção só entra depois da validação em homologação e do merge controlado para a branch
        principal.


      ```
git checkout main
git merge develop
git push origin main

npx supabase link --project-ref PROJECT_REF_PROD
npx supabase db push
```



        O template recomenda aplicar as migrations em produção sempre após o deploy.






- Testar login

- Criar item

- Editar item

- Excluir item

- Logout








Etapas 13 e 14


## Rollback e monitoramento opcional


O template também cobre resposta a incidentes e monitoração contínua com Uptime Kuma.







### Rollback




- Frontend: rollback pela [Vercel](https://vercel.com/docs/deployments/rollback-a-deployment)

- Banco: correção por nova migration







### Monitoração




- Monitorar frontend em produção

- Monitorar endpoint do Supabase

- Receber alertas por Telegram, Slack, E-mail ou Discord







      ```
docker run -d --restart=always -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma:1
```



        [GitHub do Uptime Kuma](https://github.com/louislam/uptime-kuma)
        [Wiki do Uptime Kuma](https://github.com/louislam/uptime-kuma/wiki)








Regras fixas


## Os princípios que não podem ser quebrados


Essas regras aparecem diretamente no template como pilares do processo.







### Nunca




- Desenvolver direto na **main**

- Usar Supabase PROD no Antigravity







### Sempre




- MCP sempre em **HML**

- Produção como consequência do processo








> 
        Produção não é o lugar para experimentar. O lugar certo para errar barato é o fluxo de ideação, desenvolvimento
        e homologação.








Referências


## Canais para continuar estudando


Lista de canais no YouTube com conteúdo útil sobre IA, automação, desenvolvimento e
        crescimento digital.




        [Jack Roberts](https://www.youtube.com/@Itssssss_Jack)
        [Jay E | RoboNuggets](https://www.youtube.com/@RoboNuggets)
        [Eli Rigobeli - IA](https://www.youtube.com/@EliRigobeliAI)
        [Matheus Battisti - Hora de Codar](https://www.youtube.com/@MatheusBattisti)
        [Promovaweb Automação e IA](https://www.youtube.com/@promovaweb)
        [Nate Herk | AI Automation](https://www.youtube.com/@nateherk)
        [Deborah Folloni](https://www.youtube.com/@deborahfolloni)
        [Julian Goldie SEO](https://www.youtube.com/@JulianGoldieSEO)
        [Stephen G Pope](https://www.youtube.com/@StephenGPope)
