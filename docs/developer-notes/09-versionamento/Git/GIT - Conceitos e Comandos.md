---

title: GIT - Conceitos e Comandos
updated: 2022-02-04 01:05:33Z
created: 2018-01-11 13:29:45Z
source: https://git-scm.com/book/pt-br/v1/Ferramentas-do-Git-Subm%C3%B3dulos
author: Uniliva Alves Pereira
---

<!-- TODO: revisar -->



[[toc]]

----

Git é um versionador de codigo

## Configurando

---

### Configurando o git

```shell
git config --global user.name "Uniliva Alves"
git config --global user.email "uniliva@hotmail.com"
```

---
###  Desconectar do git

```shell
git config --global --unset user.name
git config --global --unset user.email
ou
git config --global --unset-all
```

---
## Criando um repositório local

```shell
git init
```

- Verificando os arquivos dentro de .git

```
tree .git
```
Para isso e necessário que a ferramenta tree esteja instalada

----
### Ignorar arquivos, que não serão commitados

- Crie um arquivo com o nome .**gitignore**
- coloque os arquivos ou pasta, um por linha

---
### Conectando o github ao pc

1 - Criar um par de chave sshe com   **ssh-keygen** não prencha nada

2 - Entre na pasta onde a chave foi criada abra o arquivo   **id_rsa.pub** copie a chave

3 - va ate o github em ssh-key e insira a chave e um nome para ela

---

## Trabalhando com arquivos

---
### Adicionado na stage área

```shell
git add .  //adiciona tudo
git add *.txt //Adiciona todos os arquivos txt
git add <nome_do_arquivo> //adiciona apenas o arquivo
```

---
### Vendo o status dos arquivos

```shell
git status
```

---
### Commitando arquivos

```shell
git commit -m <Mensagem do commit>
```
---
### Ver Alterações e Histórico

#### Ver o que foi alterando antes de adicionar a stage area

```shell
git diff
```
----
#### Depois que esta na stage area

```shell
git diff --staged
```
---
#### Ver o histórico do commit

```shell
git log
git log --oneline //mostra commit em uma só linha, facilitando a visualização

git log --oneline  --decorate  //mostra commit em uma só linha, mostrando o branch e o head do checkout atual

git log --oneline  --decorate  --all //mostra commit em uma só linha, mostrando o branch e o head de todos

git log --oneline  --decorate  --all   --graph //mostra commit em uma só linha, mostrando as branchs estilo gráfico, mostrando a ramificação

git log -p  //ver histórico do commit com detalhes do que foi alterado
```

---
#### Ver histórico pela interface

```shell
gitk
```

---
## Reset de arquivo local

---

### Limpa arquivo modified para situação antes da alteração local:

```shell
git checkout <diretório ou arquivo>
```

### Retirar arquivo do staging:

```shell
git reset HEAD <diretório ou arquivo>
```

### Desfazer commit local, mantém alterações e arquivos ficam como staged:

```shell
git reset --soft <hash do commit anterior>
```

### Desfazer commit local, mantém alterações e arquivos ficam como modified:

```shell
git reset --mixed
```

### Desfaz o commit local e as alterações realizadas nos arquivos:

```shell
git reset --hard
```

---
---

## Criando Ramificaçôes

---

### Verificar as branchs

```shell
git branch
```

---
###  Criando nova branch

```shell
git branch <Nome_da_nova_branch>

git branch -b <nome_da_nova_branch>  //cria um branch a partir da branch que você esta
```

---
### Mudando da branch

```shell
git checkout <nome_da_branch>
```
---
### Deletando uma branch

```shell
git branch -d <nome_da_branch>
```

---
### Para apagar o branch remotamente:

```shell
git push <nome do origin> <nome do branch> --delete
ou
git branch -dr origin/nome-do-branch       -> -dr  : d- de delete r- de remote
```

---
### Pega um commit expecifico e aplica numa branch

```shell
git cherry-pick <id do commit>
```

----
---
## Merge

```shell
git merge <nome_da_branch_que_voce_deseja_os_dados>
```

No Merge, os commits do outro branch são aplicados por cima dos commits do branch atual.

Conflitos, caso esteja usando o ambiente da amil use:

```shell
git mergetool -t meld
```

---
## Rebase

```shell
git rebase <nome_da_branch_que_voce_deseja_os_dados>
```

No Rebase, os seus commits (acima da base) são temporariamente apagados, o branch atual fica exatamente igual ao outro branch e seus commits são aplicados um a um no branch atual.

---
---
## stash -> esconderijo

---
### Salvar arquivos no stash

```shell
git stash save "texto indentificador"
```

---
### Listar arquivos do stash

```shell
git stash list
```

---
### Recuperando arquivo stash

```shell
git stash apply stash@{<referencia_do_arquivo>}  //recupera a referencia do arquivo porem não a apaga do stash

git stash pop   //recupera e arquivo e apaga do stash
```

---
### Apagar do stash

o comando anterior recupera arquivos do stash porem não apaga eles, caso for necessário use

```shell
git stash drop stash@{<referencia_do _arquivo>}
```

---
### Criar uma branch a partir de um stash

```shell
git stash branch <nome_da_nova_branch>
```

---
---
## Repositório remotos

---
### Clonando repositório remoto

```shell
git clone <endereço_do_repositorio_remoto> [nome da pasta caso queira, e opcional]
```

---
### Adicionando um repositório remoto a um repositório local

```shell
git remote -v  //Lista os repositório remotos

git remote add <nome_do_repositorio_remoto><endereço_do_repositorio_remoto>  /Adiciona um novo repositório


ex:  git remote add origin https://github.com/Uniliva/typescript.git
```

---
### Salvando e atualizar projeto no repositório remoto

```shell
git push -u <nome_do_repositorio_remoto_salvo><Branch>

ex: git push -u origin master
```

- **Atualizar repositório local com as mudanças do repositório remoto (****realiza merge ****automático**** - ATENÇÂO****)**

```shell
git pull-u <nome_do_repositorio_remoto_salvo><Branch>
git pull  origin master
```

- **Atualizar dados alterado no remoto e atualizar o repositorio local num branch diferente (evitar o merge automatico) **

```shell
git fetch <nome_do_repositorio_remoto_salvo> branch <nome do branch>
git fetch origin branch <nome do branch>
```

o fetch apenas traz as atualização e necessário que você faça um merge para juntar os dados do local com o do remoto.

**Submodulos**

---

- **Criando Submobulos**

```shell
git submodule add <repositorio.git> <nome-da-pasta>
```

- **Atualizar submodulos**

```shell
git submodule update
```

**Remove arquivos do historico**

---

- **Exclusão de arquivo localmente**

```shell
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch caminho/do/arquivo/arquivo.extensao" --prune-empty --tag-name-filter cat -- --all
```

-

    - Detalhamento das opções utilizadas:

        - **filter-branch**: permite reescrever histórico das branches do git
        - **--force**: força o filter-branch a ser executado
        - **--index-filter**: opção de filtro para reescrita do índice. Normalmente é utilizado em conjunto com "git rm --cached --ignore-unmatch ...". Serve para apagar o histórico de um arquivo, independente de quando ele surgiu
        - **--prune-empty**: o filtro pode acabar gerando commits sem alteração, caso somente esse arquivo tenha sido alterado. Essa opção faz com esses commits sejam apagado também
        - **--tag-name-filter cat**: atualiza também as tags
        - **-- --all**: repo de branches a serem reescritas. No caso de --all, todas as branches serão consideradas e necessita do -- antes como separação dos parâmetros do filter-branch
        - **caminho/do/arquivo/arquivo.extensao**: caminho completo até o arquivo que deseja excluir (inclusive o nome e extensão). Caso queira excluir completamente o arquivo, é necessário executar o mesmo comando para qualquer outro caminho onde ele tenha existido (rename, mudança de diretório, etc).

- **Exclusão de diretório localmente**

```shell
git filter-branch --force --index-filter "git rm -r --cached --ignore-unmatch caminho/do/diretorio" --prune-empty --tag-name-filter cat -- --all

```

-

    - Detalhamento das opções utilizadas:

        - **-r**: exclui recursivamente
        - **caminho/do/diretorio**: caminho completo até o diretório que deseja excluir. Caso queira excluir completamente o diretório, é necessário executar o mesmo comando para qualquer outro caminho onde ele tenha existido (rename, mudança de diretório, etc).

- **Envio das alterações para todas as branches**

```shell
git push origin --force –all
```

-

    - Detalhamento das opções utilizadas:

        - **--force**: força o push
        - **--all**: realizado em todas as branches

- **Envio das alterações para todas as tags**

```shell
git push origin --force –tags
```

-

    - Detalhamento das opções utilizadas:

        - **--force**: força o push
        - **--all**: realizado em todas as branches

- **Atualização do repositório após a remoção**

```shell
git pull –rebase
```

-

    - Detalhamento das opções utilizadas:

        - **--rebase**: realiza o rebase ao invés do merge. Necessário para não apresentar os arquivos como untracked novamente
- List item

## Remover branch deletada da origim no repositorio local

```shell
git fetch --all -p; git branch -vv | grep ": gone]" | awk '{ print $1 }' | xargs -n 1 git branch -d
```