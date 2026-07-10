---

title: GIT - Excluir do git um arquivo/diretório do histórico.
updated: 2020-03-24 10:57:47Z
created: 2020-03-24 10:53:07Z
---

<!-- TODO: revisar -->



[[toc]]


### Exclusão de arquivo localmente
 

```
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch caminho/do/arquivo/arquivo.extensao" --prune-empty --tag-name-filter cat -- --all
```

- Detalhamento das opções utilizadas:

**filter-branch:** permite reescrever histórico das branches do git

**--force:** força o filter-branch a ser executado

**--index-filter:** opção de filtro para reescrita do índice. Normalmente é utilizado em conjunto com "git rm --cached --ignore-unmatch ...". Serve para apagar o histórico de um arquivo, independente de quando ele surgiu

**--prune-empty:** o filtro pode acabar gerando commits sem alteração, caso somente esse arquivo tenha sido alterado. Essa opção faz com esses commits sejam apagado também

**--tag-name-filter cat:** atualiza também as tags

**-- --all:** repo de branches a serem reescritas. No caso de --all, todas as branches serão consideradas e necessita do -- antes como separação dos parâmetros do filter-branch

**caminho/do/arquivo/arquivo.extensao:** caminho completo até o arquivo que deseja excluir (inclusive o nome e extensão). Caso queira excluir completamente o arquivo, é necessário executar o mesmo comando para qualquer outro caminho onde ele tenha existido (rename, mudança de diretório, etc).

---

### Exclusão de diretório localmente
 

```
git filter-branch --force --index-filter "git rm -r --cached --ignore-unmatch caminho/do/diretorio" --prune-empty --tag-name-filter cat -- --all
```

- Detalhamento das opções utilizadas:

**-r:** exclui recursivamente

**caminho/do/diretorio:** caminho completo até o diretório que deseja excluir. Caso queira excluir completamente o diretório, é necessário executar o mesmo comando para qualquer outro caminho onde ele tenha existido (rename, mudança de diretório, etc).
 
---

### Envio das alterações para todas as branches

```
git push origin --force –all
```

- Detalhamento das opções utilizadas:

**--force:** força o push
**--all:** realizado em todas as branches
 

---

### Envio das alterações para todas as tags

```
git push origin --force –tags
```

- Detalhamento das opções utilizadas:

**--force:** força o push
**--all:** realizado em todas as branches
 

---

### Atualização do repositório após a remoção

```
git pull –rebase
```

- Detalhamento das opções utilizadas:

**--rebase:** realiza o rebase ao invés do merge. Necessário para não apresentar os arquivos como untracked novamente    
 
