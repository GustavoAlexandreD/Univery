## Coisas pra baixar

---

## Rodar interface

1) Criar 2 Git Bashs
2) Git Bash Front End
```
cd front-end
npm i
npx expo start
```

3) Git Bash Back End
```
cd back-end
npm i
```

Claro! Aqui está um exemplo simples de seção `README.md` focada nos comandos básicos do `git branch`:

---

## 📚 Git Branch - Comandos Básicos

Esta seção cobre os comandos essenciais para trabalhar com branches no Git.

### 🔍 Ver Branches

```bash
git branch
```

Lista todas as branches locais. A branch atual estará destacada com um asterisco (`*`).

### 🔄 Mudar para Outra Branch

```bash
git checkout nome-da-branch
```

Alterna para uma branch existente.

### ➕ Criar e Mudar de Branch

```bash
git checkout -b nome-da-branch
```

### 🚀 Realizando o Merge

Para **mesclar** uma branch (ex: `feature-xyz`) na branch atual (ex: `main`), use o seguinte comando:

```bash
git merge feature-xyz # estando na main
```

Isso vai unir as mudanças da branch `feature-xyz` à branch ``main``.

---