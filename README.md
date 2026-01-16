# AI-First Monorepo Template (Nx + NestJS + FastAPI + Angular)

Este projeto é um monorepo escalável que utiliza **Clean Architecture** e **SOLID** para integrar múltiplos frameworks de backend com um frontend moderno.

## 🛠️ Stack Tecnológica

* **Monorepo:** [Nx](https://nx.dev)
* **Frontend:** Angular + PrimeNG + Tailwind CSS 3
* **Backend Principal (Gateway):** NestJS
* **Backend de IA/Data:** FastAPI (Python)
* **Banco de Dados:** PostgreSQL via Docker
* **ORM:** Prisma

---

## 🏗️ Arquitetura do Sistema

O projeto segue os princípios da  **Clean Architecture** , separando as regras de negócio dos detalhes de implementação.

* **Domain:** Entidades e interfaces (Contratos).
* **Application:** Casos de uso (Lógica de negócio).
* **Infrastructure:** Implementações técnicas (Prisma, JWT, Bcrypt).
* **Shared:** Código compartilhado, como o cliente Prisma.

---

## 📋 Comandos de Configuração Inicial

### 1. Iniciar o Workspace Nx

**Bash**

```
npx create-nx-workspace@latest ai-template --preset=apps --packageManager=npm
```

### 2. Adicionar Plugins e Gerar Apps

**Bash**

```

# Adicionar suporte aos frameworks
npm install -D @nx/nestjs @nx/angular @nteraction/nx-python

# Gerar aplicações
npx nx g @nx/nestjs:app apps/api-nestjs

npx nx g @nx/angular:app apps/web-angular --style=scss --routing
```

### 3. Criar Camadas de Libraries (Clean Architecture)

**Bash**

```
npx nx g @nx/js:library core/domain
npx nx g @nx/js:library core/application
npx nx g @nx/js:library core/infrastructure
npx nx g @nx/js:library shared/prisma
npx nx g @nx/nest:library auth
```

---

## 🗄️ Gerenciamento de Banco de Dados (Prisma & Docker)

### 1. Subir Infraestrutura

**Bash**

```
docker-compose up -d
```

### 2. Comandos Prisma

**Bash**

```
# Iniciar o Prisma
npx prisma init

# Gerar o cliente Prisma
npx prisma generate

# Criar e aplicar migrações (Cria a tabela User)
npx prisma migrate dev --name init
```

---

## 🔐 Autenticação e Segurança

Dependências necessárias para o funcionamento do módulo de Auth:

**Bash**

```
npm install bcrypt @nestjs/jwt passport @types/bcrypt class-validator class-transformer
```

---

## 🏃 Execução do Projeto

Para rodar todos os serviços em paralelo:

**Bash**

```
npx nx run-many --target=serve --all --parallel
```
