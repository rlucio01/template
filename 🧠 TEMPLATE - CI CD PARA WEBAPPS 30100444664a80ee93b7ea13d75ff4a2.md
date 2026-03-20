# 🧠 TEMPLATE - CI/CD PARA WEBAPPS

**Do Windows zerado ao deploy em produção (IA + Antigravity + Supabase MCP)**

> **Objetivo:** construir um WebApp real, com ambientes isolados, versionamento correto e deploy profissional.
> 
> 
> **Regra principal:** cada projeto é independente, rastreável e seguro.
> 

---

# 🖥️ ETAPA -1 — PRÉ-REQUISITOS (WINDOWS DO ZERO)

> Premissa: você está começando com um Windows limpo.
> 

---

- [ ]  Atualizar o Windows
- Executar Windows Update
- Reiniciar o computador

Evita problemas de permissão e certificados.

---

- [ ]  Instalar um navegador moderno

Escolha um:

- Chrome → [https://www.google.com/chrome](https://www.google.com/chrome)
- Edge → [https://www.microsoft.com/edge](https://www.microsoft.com/edge)

Será usado para todas as plataformas do projeto.

---

- [ ]  Criar as contas do projeto (usar e-mail do projeto)
- Proton Mail → [https://proton.me/mail](https://proton.me/mail)
- GitHub → [https://github.com](https://github.com/)
- Supabase → [https://supabase.com](https://supabase.com/)
- Vercel → [https://vercel.com](https://vercel.com/)
- Claude → [https://claude.ai](https://claude.ai/)
- Google AI Studio → [https://aistudio.google.com](https://aistudio.google.com/)

📌 Sempre que possível, use o **e-mail exclusivo do projeto**.

---

- [ ]  Instalar Git

🔗 [https://git-scm.com/download/win](https://git-scm.com/download/win)

Durante a instalação:

- Pode clicar *Next* em tudo

Verificação:

```bash
git --version
```

📚 [https://git-scm.com/book/en/v2](https://git-scm.com/book/en/v2)

---

- [ ]  Instalar Node.js (LTS)

🔗 [https://nodejs.org](https://nodejs.org/)

⚠️ Escolher **LTS**, não “Current”.

Verificação:

```bash
node -v
npm -v
```

---

- [ ]  Instalar Windows Terminal (recomendado)

🔗 [https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701)

---

- [ ]  Instalar Antigravity

🔗 [https://antigravity.google/](https://antigravity.google/)

Antigravity será o ambiente principal de desenvolvimento e onde o MCP será usado.

---

- [ ]  Instalar Docker Desktop

🔗 [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

Durante a instalação:

- Habilitar integração com WSL 2 (recomendado)
- Reiniciar o computador após a instalação

Verificação:

```bash
docker --version
```

Usado pelo Supabase CLI para rodar o ambiente local de banco de dados.

---

- [ ]  Checklist final de ambiente

```bash
git --version
node -v
npm -v
docker --version
```

Se todos responderem → ambiente pronto ✅

---

## 🔐 ETAPA 0 — ISOLAMENTO TOTAL DO PROJETO

> Antes de pensar em telas ou código, isole o projeto.
> 

---

- [ ]  Criar e-mail exclusivo do projeto

Ferramenta: Proton Mail

🔗 [https://proton.me/mail](https://proton.me/mail)

Exemplo:

```
todoapp.dev@proton.me
```

Motivo:

- Separação total de projetos
- Facilidade para acesso futuro
- Mais segurança

---

- [ ]  Criar projetos no Supabase

🔗 [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects)

Criar **dois projetos separados**:

- [ ]  Supabase — Homologação
- [ ]  Supabase — Produção

📚 [https://supabase.com/docs/guides/platform/overview](https://supabase.com/docs/guides/platform/overview)

⚠️ Nunca reutilizar o mesmo projeto Supabase.

---

## 🧩 ETAPA 1 — IDEAÇÃO COM IA (SEM CÓDIGO)

Ferramenta: Claude

🔗 [https://claude.ai](https://claude.ai/)

---

- [ ]  Criar a especificação do WebApp

Exemplo (To-Do App):

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
```

- Aqui nasce o **escopo funcional**, não o código.
    
    ```markdown
    # Especificação - WebApp To Do List
    ## Arquitetura Cloud-Native (Supabase + Vercel)
    
    ## 1. Funcionalidades Principais
    
    ### 1.1 Autenticação
    - Login com email/senha
    - Cadastro de novos usuários
    - Logout
    - Recuperação de senha
    - Proteção de rotas (apenas usuários autenticados)
    
    ### 1.2 Gerenciamento de Tarefas
    - Criar novas tarefas com título e descrição
    - Editar tarefas existentes
    - Excluir tarefas
    - Marcar tarefas como concluídas/pendentes
    - Definir prioridade (Alta, Média, Baixa)
    - Definir data de vencimento
    - Upload de anexos (imagens, PDFs)
    
    ### 1.3 Organização
    - Filtrar tarefas por status (Todas, Pendentes, Concluídas)
    - Filtrar por prioridade
    - Ordenar por data de criação, vencimento ou prioridade
    - Buscar tarefas por título ou descrição
    
    ### 1.4 Categorias
    - Criar categorias personalizadas
    - Atribuir tarefas a categorias
    - Filtrar tarefas por categoria
    
    ## 2. Estrutura de Telas
    
    ### 2.1 Tela de Login/Cadastro
    ```
    
    ┌─────────────────────────────────────┐
    │         To Do List App              │
    ├─────────────────────────────────────┤
    │                                     │
    │  ┌───────────────────────────────┐ │
    │  │ Login                         │ │
    │  │                               │ │
    │  │ Email: [***]    │ │
    │  │ Senha: [***]    │ │
    │  │                               │ │
    │  │ [Esqueci minha senha]         │ │
    │  │                               │ │
    │  │        [Entrar]               │ │
    │  │                               │ │
    │  │ Não tem conta? [Cadastre-se]  │ │
    │  └───────────────────────────────┘ │
    │                                     │
    └─────────────────────────────────────┘
    
    ```
    
    ### 2.2 Tela Principal (Dashboard)
    ```
    
    ┌─────────────────────────────────────────────────┐
    │ To Do List    usuario@email.com    [Sair]      │
    │               [+ Nova Tarefa] [Categorias]      │
    ├─────────────────────────────────────────────────┤
    │                                                  │
    │ Filtros: [Todas][Pendentes][Concluídas]        │
    │ Categorias: [Todas][Trabalho][Pessoal]...      │
    │ Buscar: [_______________] 🔍                    │
    │                                                  │
    │ ┌─────────────────────────────────────────┐    │
    │ │ □ Título da Tarefa            [Editar]  │    │
    │ │   Descrição breve...          [Excluir] │    │
    │ │   Categoria: Trabalho | Prioridade: Alta│    │
    │ │   Vencimento: 15/02/2026                │    │
    │ │   📎 arquivo.pdf                        │    │
    │ └─────────────────────────────────────────┘    │
    │                                                  │
    │ ┌─────────────────────────────────────────┐    │
    │ │ ✓ Tarefa Concluída                      │    │
    │ │   Finalizada em 08/02/2026              │    │
    │ └─────────────────────────────────────────┘    │
    │                                                  │
    └─────────────────────────────────────────────────┘
    
    ```
    
    ### 2.3 Modal - Nova/Editar Tarefa
    ```
    
    ┌──────────────────────────────────┐
    │ Nova Tarefa               [X]    │
    ├──────────────────────────────────┤
    │                                  │
    │ Título*: [___________________]   │
    │                                  │
    │ Descrição:                       │
    │ [***]  │
    │ [***]  │
    │                                  │
    │ Categoria: [Selecione ▼]         │
    │                                  │
    │ Prioridade: ○ Alta ● Média ○ Baixa│
    │                                  │
    │ Data Vencimento: [DD/MM/AAAA]    │
    │                                  │
    │ Anexo: [Escolher arquivo]        │
    │        arquivo.pdf [X remover]   │
    │                                  │
    │        [Cancelar]  [Salvar]      │
    │                                  │
    └──────────────────────────────────┘
    
    ```
    
    ## 3. Regras de Negócio
    
    ### 3.1 Autenticação
    - Email deve ser válido e único
    - Senha mínima de 6 caracteres
    - Sessão expira em 7 dias
    - Cada usuário vê apenas suas próprias tarefas
    - Token JWT gerenciado automaticamente pelo Supabase
    
    ### 3.2 Tarefas
    - O título é obrigatório (mínimo 3 caracteres, máximo 100)
    - A descrição é opcional (máximo 500 caracteres)
    - Prioridade padrão é "Média"
    - Data de vencimento é opcional
    - Tarefas vencidas devem ser destacadas visualmente
    - Ao marcar como concluída, registrar data/hora de conclusão
    - Não permitir edição do título de tarefas concluídas
    - Tarefas excluídas são removidas permanentemente (soft delete opcional)
    - Usuário vinculado por user_id (segurança Row Level Security)
    
    ### 3.3 Anexos
    - Formatos permitidos: PDF, PNG, JPG, JPEG
    - Tamanho máximo: 5MB por arquivo
    - Um anexo por tarefa
    - Anexos armazenados no Supabase Storage
    - Ao excluir tarefa, excluir anexo automaticamente
    
    ### 3.4 Categorias
    - Nome obrigatório (mínimo 2 caracteres, máximo 30)
    - Não permitir nomes duplicados por usuário
    - Criar categorias padrão no primeiro login: "Trabalho", "Pessoal", "Estudos"
    - Ao excluir categoria, tarefas vinculadas ficam sem categoria
    - Usuário pode criar no máximo 20 categorias
    
    ### 3.5 Validações
    - Não permitir datas de vencimento no passado
    - Validar formato de data
    - Prevenir duplicação de tarefas (mesmo título e categoria)
    
    ## 4. Estrutura de Banco de Dados (Supabase/PostgreSQL)
    
    ### 4.1 Tabela: profiles (extensão do auth.users)
    ```sql
    CREATE TABLE profiles (
        id UUID REFERENCES auth.users(id) PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Trigger para criar profile automaticamente
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO public.profiles (id, email, full_name)
        VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    ```
    
    ### 4.2 Tabela: categories
    
    ```sql
    CREATE TABLE categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
        name VARCHAR(30) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, name)
    );
    
    -- Índices
    CREATE INDEX idx_categories_user_id ON categories(user_id);
    ```
    
    ### 4.3 Tabela: tasks
    
    ```sql
    CREATE TABLE tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        priority VARCHAR(10) NOT NULL DEFAULT 'media',
        due_date DATE,
        is_completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP WITH TIME ZONE,
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        attachment_url TEXT,
        attachment_name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        CHECK (priority IN ('alta', 'media', 'baixa'))
    );
    
    -- Índices
    CREATE INDEX idx_tasks_user_id ON tasks(user_id);
    CREATE INDEX idx_tasks_completed ON tasks(is_completed);
    CREATE INDEX idx_tasks_category ON tasks(category_id);
    CREATE INDEX idx_tasks_due_date ON tasks(due_date);
    CREATE INDEX idx_tasks_priority ON tasks(priority);
    
    -- Trigger para atualizar updated_at
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    
    CREATE TRIGGER update_tasks_updated_at
        BEFORE UPDATE ON tasks
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    ```
    
    ### 4.4 Row Level Security (RLS) - CRÍTICO
    
    ```sql
    -- Habilitar RLS
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
    
    -- Policies para profiles
    CREATE POLICY "Users can view own profile"
        ON profiles FOR SELECT
        USING (auth.uid() = id);
    
    CREATE POLICY "Users can update own profile"
        ON profiles FOR UPDATE
        USING (auth.uid() = id);
    
    -- Policies para categories
    CREATE POLICY "Users can view own categories"
        ON categories FOR SELECT
        USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert own categories"
        ON categories FOR INSERT
        WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update own categories"
        ON categories FOR UPDATE
        USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can delete own categories"
        ON categories FOR DELETE
        USING (auth.uid() = user_id);
    
    -- Policies para tasks
    CREATE POLICY "Users can view own tasks"
        ON tasks FOR SELECT
        USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert own tasks"
        ON tasks FOR INSERT
        WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update own tasks"
        ON tasks FOR UPDATE
        USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can delete own tasks"
        ON tasks FOR DELETE
        USING (auth.uid() = user_id);
    ```
    
    ### 4.5 Storage Bucket Configuration
    
    ```sql
    -- Criar bucket para anexos (via Dashboard ou SQL)
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('task-attachments', 'task-attachments', false);
    
    -- Policies para Storage
    CREATE POLICY "Users can upload own attachments"
        ON storage.objects FOR INSERT
        WITH CHECK (
            bucket_id = 'task-attachments' AND
            auth.uid()::text = (storage.foldername(name))[1]
        );
    
    CREATE POLICY "Users can view own attachments"
        ON storage.objects FOR SELECT
        USING (
            bucket_id = 'task-attachments' AND
            auth.uid()::text = (storage.foldername(name))[1]
        );
    
    CREATE POLICY "Users can delete own attachments"
        ON storage.objects FOR DELETE
        USING (
            bucket_id = 'task-attachments' AND
            auth.uid()::text = (storage.foldername(name))[1]
        );
    ```
    
    ### 4.6 Função para inicializar categorias padrão
    
    ```sql
    CREATE OR REPLACE FUNCTION initialize_default_categories()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO categories (user_id, name)
        VALUES
            (NEW.id, 'Trabalho'),
            (NEW.id, 'Pessoal'),
            (NEW.id, 'Estudos');
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    
    CREATE TRIGGER on_user_created_default_categories
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION initialize_default_categories();
    ```
    
    ## 5. Stack Tecnológica
    
    ### 5.1 Frontend (Vercel)
    
    ```json
    {
      "framework": "Next.js 14+ (App Router)",
      "linguagem": "TypeScript",
      "styling": "Tailwind CSS",
      "componentes": "shadcn/ui ou Radix UI",
      "forms": "React Hook Form + Zod",
      "state": "Zustand ou Context API",
      "dates": "date-fns"
    }
    ```
    
    ### 5.2 Backend/BaaS (Supabase)
    
    ```json
    {
      "database": "PostgreSQL (gerenciado)",
      "auth": "Supabase Auth (JWT)",
      "storage": "Supabase Storage",
      "realtime": "Supabase Realtime (opcional)",
      "client": "@supabase/supabase-js"
    }
    ```
    
    ### 5.3 Deploy (Vercel)
    
    ```json
    {
      "plataforma": "Vercel",
      "ci-cd": "Automático via Git",
      "dominio": "Custom domain support",
      "env": "Variáveis de ambiente seguras"
    }
    ```
    
    ## 6. Estrutura de Projeto
    
    ```
    todo-app/
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/
    │   │   │   ├── login/
    │   │   │   │   └── page.tsx
    │   │   │   └── signup/
    │   │   │       └── page.tsx
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   ├── TaskCard.tsx
    │   │   ├── TaskForm.tsx
    │   │   ├── CategoryManager.tsx
    │   │   ├── Filters.tsx
    │   │   └── ui/
    │   ├── lib/
    │   │   ├── supabase/
    │   │   │   ├── client.ts
    │   │   │   ├── server.ts
    │   │   │   └── middleware.ts
    │   │   ├── types.ts
    │   │   └── utils.ts
    │   ├── hooks/
    │   │   ├── useTasks.ts
    │   │   ├── useCategories.ts
    │   │   └── useAuth.ts
    │   └── store/
    │       └── authStore.ts
    ├── public/
    ├── supabase/
    │   ├── migrations/
    │   └── seed.sql
    ├── .env.local
    ├── next.config.js
    ├── tailwind.config.js
    └── package.json
    ```
    
    ## 7. Variáveis de Ambiente (.env.local)
    
    ```bash
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    
    # Opcional
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
    ```
    
    ## 8. Configuração Inicial
    
    ### 8.1 Supabase Setup
    
    1. Criar projeto no Supabase
    2. Executar migrations SQL (tabelas + RLS + triggers)
    3. Configurar Storage bucket
    4. Habilitar Email Auth nas configurações
    5. Copiar credenciais (URL + Anon Key)
    
    ### 8.2 Vercel Setup
    
    1. Conectar repositório GitHub
    2. Configurar variáveis de ambiente
    3. Deploy automático a cada push
    
    ### 8.3 Client Supabase (lib/supabase/client.ts)
    
    ```tsx
    import { createClientComponentClient } from '@supabase/ssr'
    import type { Database } from '@/lib/types'
    
    export const supabase = createClientComponentClient<Database>()
    ```
    
    ## 9. Fluxos Principais
    
    ### 9.1 Autenticação
    
    1. Usuário acessa /login ou /signup
    2. Supabase Auth gerencia credenciais
    3. JWT armazenado em cookie httpOnly
    4. Middleware protege rotas privadas
    5. Redirect para /dashboard após login
    
    ### 9.2 CRUD de Tarefas
    
    1. Cliente faz requisição via Supabase Client
    2. RLS valida user_id automaticamente
    3. Realtime subscription atualiza UI (opcional)
    4. Storage gerencia uploads de anexos
    
    ### 9.3 Upload de Anexo
    
    1. Usuário seleciona arquivo
    2. Validação client-side (tipo, tamanho)
    3. Upload para Storage: `{user_id}/{task_id}/filename`
    4. Salvar URL pública na coluna `attachment_url`
    
    ---
    
    Esta especificação está otimizada para Supabase (PostgreSQL + Auth + Storage) e Vercel (Next.js), garantindo segurança via RLS, escalabilidade e deploy simplificado.
    
    ```
    
    ```
    

---

## 🎨 ETAPA 2 — PROTOTIPAÇÃO VISUAL

Ferramenta: Google AI Studio

🔗 [https://aistudio.google.com](https://aistudio.google.com/)

---

- [ ]  Buscar inspiração de layout e extrair design system

Ferramenta: Dribbble

🔗 [https://dribbble.com](https://dribbble.com/)

Use o Dribbble para:

- Buscar referências visuais de interfaces similares ao seu WebApp
- Identificar paleta de cores, tipografia e espaçamentos
- Extrair padrões de componentes (botões, cards, formulários, navegação)
- Montar o design system antes de começar a prototipação

📌 Pesquise termos como `dashboard`, `login screen`, `to do app`, `SaaS UI` para encontrar referências relevantes.

---

- [ ]  Criar protótipo visual

Objetivo:

- Validar UX
- Ajustar fluxo de telas
- Evitar retrabalho no código

📌 Sem backend

📌 Sem deploy

---

## 📦 ETAPA 3 — CÓDIGO BASE E VERSIONAMENTO

---

- [ ]  Criar repositório no GitHub

🔗 [https://github.com](https://github.com/)

```bash
git init
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git add .
git commit -m "chore: initial project structure"
git push -u origin main
```

---

- [ ]  Criar branch de homologação

```bash
git checkout -b develop
git push -u origin develop
```

- [ ]  Criar identificação

```markdown
git config user.name "Seu Nome"
git config user.email "seu-email-da-conta-atual@exemplo.com"
```

Conceito:

- `main` → produção
- `develop` → homologação

---

## 🧠 ETAPA 4 — DESENVOLVIMENTO NO ANTIGRAVITY

---

- [ ]  Abrir o projeto no Antigravity

🔗 [https://antigravity.google/](https://antigravity.google/)

Aqui acontece o desenvolvimento diário.

---

- [ ]  Usar MCP do Supabase (HOMOLOGAÇÃO)

O Antigravity se conecta diretamente ao Supabase via MCP.

📚

- MCP Supabase → [https://supabase.com/docs/guides/ai/mcp](https://supabase.com/docs/guides/ai/mcp)
- Auth → [https://supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)

---

## 🧬 ETAPA 5 — CONFIGURAÇÃO DO SUPABASE CLI (CORRETA)

> O Supabase CLI **não é global**.
> 
> 
> Ele é configurado **dentro de cada projeto**.
> 

---

- [ ]  Inicializar Supabase no projeto

Dentro da pasta do projeto:

```bash
npx supabase init
```

📚 [https://supabase.com/docs/reference/cli/init](https://supabase.com/docs/reference/cli/init)

---

- [ ]  Login no Supabase

```bash
npx supabase login
```

---

- [ ]  Conectar ao Supabase de Homologação

```bash
npx supabase link --project-ref PROJECT_REF_HML
```

📌 MCP + CLI agora apontam para o mesmo ambiente.

---

- [ ]  Regra importante

> **Se começa com `npx`, pertence ao projeto, não à máquina.**
> 

---

## 🧬 ETAPA 6 — BANCO DE DADOS (MIGRATIONS)

---

### ⬜ Gerar migration

```bash
npx supabase db diff -f create_tasks_table
```

---

### ⬜ Versionar migration

```bash
git add supabase/migrations
git commit -m "chore(db): create tasks table"
```

---

### ⬜ Aplicar em homologação

```bash
npx supabase db push
```

📚 [https://supabase.com/docs/guides/database/migrations](https://supabase.com/docs/guides/database/migrations)

---

## 🔁 ETAPA 7 — HOMOLOGAÇÃO (CI/CD)

---

### ⬜ Commit das funcionalidades

```bash
git add .
git commit -m "feat: todo list funcional"
```

---

### ⬜ Push para develop

```bash
git push origin develop
```

Vercel cria automaticamente:

- Preview
- Ambiente isolado
- Build de homologação

📚 [https://vercel.com/docs/deployments/preview-deployments](https://vercel.com/docs/deployments/preview-deployments)

---

## 🔀 ETAPA 8 — PULL REQUEST

---

### ⬜ Abrir PR

```
develop → main
```

Usar o Preview do PR para validação final.

---

## 🚀 ETAPA 9 — PRODUÇÃO

---

### ⬜ Merge na main

```bash
git checkout main
git merge develop
git push origin main
```

Deploy automático via Vercel.

---

### ⬜ Aplicar migrations em produção

```bash
npx supabase link --project-ref PROJECT_REF_PROD
npx supabase db push
```

⚠ Sempre após o deploy.

---

## 🔍 ETAPA 10 — PÓS-DEPLOY

- ⬜ Login
- ⬜ Criar item
- ⬜ Editar
- ⬜ Excluir
- ⬜ Logout

---

## ⏪ ETAPA 11 — ROLLBACK (CONCEITO)

📚 [https://vercel.com/docs/deployments/rollback-a-deployment](https://vercel.com/docs/deployments/rollback-a-deployment)

- Frontend: rollback pela Vercel
- Banco: corrigir via nova migration

---

## 🧠 REGRAS FIXAS

- ❌ Nunca desenvolver direto na `main`
- ❌ Nunca usar Supabase PROD no Antigravity
- ✅ MCP sempre em HML
- ✅ Produção é consequência do processo

---

## 📡 ETAPA 12 — MONITORAÇÃO COM UPTIME KUMA *(opcional)*

> Monitore a disponibilidade do seu WebApp em produção com alertas em tempo real.
> 

🔗 [https://github.com/louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)

---

- [ ]  Subir o Uptime Kuma via Docker

```bash
docker run -d --restart=always -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma:1
```

Acesse em: [http://localhost:3001](http://localhost:3001/)

---

- [ ]  Criar monitor para o frontend (Vercel)
- Tipo: **HTTP(s)**
- URL: `https://seu-app.vercel.app`
- Intervalo: 60 segundos

---

- [ ]  Criar monitor para o backend (Supabase)
- Tipo: **HTTP(s)**
- URL: `https://seu-projeto.supabase.co/rest/v1/`
- Intervalo: 60 segundos

---

- [ ]  Configurar notificações

Canais suportados:

- Telegram
- Slack
- E-mail
- Discord
- Entre outros

📌 Configure ao menos um canal para receber alertas de queda.

---

📚 [https://github.com/louislam/uptime-kuma/wiki](https://github.com/louislam/uptime-kuma/wiki)

---