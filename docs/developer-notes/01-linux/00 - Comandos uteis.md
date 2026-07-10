---
title: 00 - Comandos uteis
---


- [Tamanho do disco](#tamanho-do-disco)
- [Informações do CPU](#informações-do-cpu)
- [Desabilitar firewall (temporariamente)](#desabilitar-firewall-temporariamente)
- [Criando links no Linux](#criando-links-no-linux)
- [Transferir arquivo via SCP](#transferir-arquivo-via-scp)
- [Listar processos pela porta](#listar-processos-pela-porta)
- [Procurar texto: `grep`, `ag`, `rg`](#procurar-texto-grep-ag-rg)
- [Terminais, multiplexadores e shells](#terminais-multiplexadores-e-shells)
- [Ver placa de vídeo / GPU em uso](#ver-placa-de-vídeo--gpu-em-uso)




---

### **Tamanho do disco**

Comandos rápidos:

```shell
df -h                # espaço usado/ disponível por filesystem
du -sh *             # tamanho (resumido) de cada item no diretório atual
du -h --max-depth=1  # tamanho por subdiretório (1 nível)
du -h -c             # lista com total no final
ncdu /path            # interface ncurses para navegar por uso de disco (instalar ncdu)
```

Exemplo para ordenar por tamanho:

```shell
du -sh * | sort -h
```

---

### **Informações do CPU**

```shell
lscpu               # visão legível da CPU
cat /proc/cpuinfo   # informação detalhada por CPU/core
top / htop          # monitor em tempo real (instale htop para melhor experiência)
```

---

### **Desabilitar firewall (temporariamente)**

Dependendo da distro/serviço, prefira gerenciar via `ufw` ou `firewalld`.

Usando `ufw`:

```shell
sudo ufw status
sudo ufw disable        # desabilita temporariamente
sudo ufw enable         # reabilita
```

Usando systemd (ex.: firewalld):

```shell
sudo systemctl stop firewalld
sudo systemctl start firewalld
```

Comandos iptables diretos (use com cuidado):

```shell
sudo iptables-save > ~/iptables.backup
sudo iptables -F
sudo iptables -X
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
```

Observação: não remova regras permanentemente sem entender o impacto em produção.

---

### Criando links no Linux

Hard link vs symbolic (soft) link:

```shell
# link simbólico (mais comum)
ln -s /caminho/para/original /caminho/para/link

# hard link (mesmo inode; funciona apenas no mesmo filesystem)
ln /caminho/para/original /caminho/para/hardlink
```

Exemplo:

```shell
ln -s /usr/local/bin/minha-app ~/bin/minha-app
```

---

### Transferir arquivo via SCP

```shell
# do local para remoto
scp /tmp/arquivo.zip usuario@host:/caminho/de/destino/

# do remoto para local
scp usuario@host:/caminho/arquivo.zip /tmp/

# especificar porta diferente
scp -P 2222 arquivo.zip usuario@host:/destino/
```

Para transferências mais robustas e retomáveis, use `rsync -avP` sobre SSH.

---

### Listar processos pela porta

```shell
sudo lsof -i:<porta>
# ou usando ss (mais moderno)
sudo ss -ltnp | grep :<porta>
# outra opção
sudo fuser -n tcp <porta>
```

Exemplo:

```shell
sudo lsof -i:4200
sudo ss -ltnp | grep :4200
```

---

### Procurar texto: `grep`, `ag`, `rg`

Comandos básicos:

```shell
ps aux | grep termo
grep -R "termo" ./diretorio
```

Alternativas mais rápidas:

- `ag` (The Silver Searcher): muito rápido para código (`apt install silversearcher-ag`)
- `rg` (ripgrep): ainda mais rápido e moderno (`apt install ripgrep`)

Exemplos:

```shell
ag "minhaFuncao" src/
rg "minhaFuncao" src/
```

### Terminais, multiplexadores e shells

- Terminais gráficos: `tilix`, `gnome-terminal`, `konsole`.
- Multiplexadores: `tmux`, `screen` (úteis para sessões remotas persistentes).
- Shells: `bash`, `zsh` (com `oh-my-zsh` para produtividade).

Instalação rápida:

```shell
sudo apt install tilix tmux zsh htop
chsh -s $(which zsh)   # mudar shell para zsh (logout/login necessário)
```

Exemplo básico `tmux`:

```shell
tmux new -s minha-sessao
tmux split-window -h
tmux attach -t minha-sessao
tmux kill-session -t minha-sessao
```

---

### Ver placa de vídeo / GPU em uso

```shell
lspci | grep -i vga
lspci | grep -i nvidia
glxinfo | grep -i opengl   # requer mesa-utils
# ou, para GPUs NVIDIA
nvidia-smi
```

Instale utilitários se necessário:

```shell
sudo apt install mesa-utils pciutils
```

---

## Rsync e SSH com chaves

Gerar par de chaves (recomendo `ed25519`):

```shell
ssh-keygen -t ed25519 -C "seu@email.com" -f ~/.ssh/id_ed25519
```

Copiar a chave pública para o servidor:

```shell
ssh-copy-id -i ~/.ssh/id_ed25519.pub usuario@host

# ou manualmente
cat ~/.ssh/id_ed25519.pub | ssh usuario@host 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys'
```

Conectar usando a chave:

```shell
ssh -i ~/.ssh/id_ed25519 usuario@host
```

Rsync sobre SSH (exemplos):

```shell
# do local para remoto (show progress, resume)
rsync -avP -e "ssh -i ~/.ssh/id_ed25519" /caminho/origem/ usuario@host:/caminho/destino/

# do remoto para local
rsync -avP -e "ssh -i ~/.ssh/id_ed25519" usuario@host:/caminho/remoto/ /caminho/local/

# excluir arquivos e apagar no destino para espelhar
rsync -avP --delete -e "ssh -i ~/.ssh/id_ed25519" /origem/ usuario@host:/destino/

# especificar porta SSH
rsync -avP -e "ssh -i ~/.ssh/id_ed25519 -p 2222" /origem/ usuario@host:/destino/
```

Observações:
- Use `-z` para comprimir durante a transferência em links lentos.
- `-P` combina `--progress` e `--partial` para retomar transferências interrompidas.

---

## Atalhos úteis — `tmux`

Prefixo padrão: <kbd>Ctrl</kbd>+<kbd>b</kbd>

| Atalho | Ação |
|---|---|
| Prefixo (Ctrl-b), c | Nova janela |
| Prefixo, % | Split vertical (new pane) |
| Prefixo, " | Split horizontal |
| Prefixo, o | Alterna entre panes |
| Prefixo, ; | Voltar para último painel ativo |
| Prefixo, n / p | Próxima / anterior janela |
| Prefixo, w | Lista janelas |
| Prefixo, d | Detach (desanexar sessão) |
| Prefixo, [ | Entrar no modo de rolagem (copy-mode) |
| Prefixo, x | Fechar pane atual |
| Prefixo, & | Fechar janela atual |
| Prefixo, : | Entrar em prompt de comando tmux |

Comandos rápidos:

```shell
tmux new -s sessao
tmux attach -t sessao
tmux list-sessions
tmux kill-session -t sessao
```

---

## Atalhos úteis — `htop`

| Tecla | Ação |
|---|---|
| F2 | Menu de configuração (Setup) |
| F3 | Buscar processo (Search) |
| F4 | Filtrar (Filter) |
| F5 | Modo árvore (Tree) |
| F6 | Ordenar por coluna (SortBy) |
| F7 / F8 | Diminuir / Aumentar 'nice' |
| F9 | Matar processo (Kill) |
| F10 | Sair (Quit) |
| SPACE | Marcar/desmarcar processo |
| U | Mostrar apenas processos do usuário atual |

Use `F2` para personalizar colunas e cores.

