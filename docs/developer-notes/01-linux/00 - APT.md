---
title: "00 - APT"
---

## Introdução

O APT (Advanced Package Tool) é a interface usada para gerenciar pacotes em sistemas Debian/Ubuntu. Esta nota resume comandos práticos, melhores práticas e soluções para problemas comuns.

## Onde estão a configuração e caches

- Arquivos de repositórios: `/etc/apt/sources.list` e `/etc/apt/sources.list.d/`
- Listas baixadas: `/var/lib/apt/lists/`
- Cache de pacotes: `/var/cache/apt/archives/`

Exemplo:

```shell
sudo ls -la /var/lib/apt/lists /var/cache/apt/archives /etc/apt/sources.list.d
```

## Apt vs apt-get vs apt-cache vs dpkg

- `apt` é a interface amigável para humanos (combina funcionalidades de `apt-get` e `apt-cache`).
- `apt-get` e `apt-cache` são comandos legados, ainda usados em scripts.
- `dpkg` opera no nível mais baixo (instala pacotes .deb localmente) e não resolve dependências automaticamente.

Use `apt` interativamente e `apt-get` em scripts se precisar de compatibilidade estrita.

## Comandos comuns (exemplos)

- Atualizar listas e sistema:

```shell
sudo apt update
sudo apt upgrade        # atualiza pacotes instalados
sudo apt full-upgrade   # permite alterações de dependências (recomenda para upgrades maiores)
```

- Instalar / remover:

```shell
sudo apt install pacote-name         # instala
sudo apt remove pacote-name          # remove, mantendo arquivos de config
sudo apt purge pacote-name           # remove e apaga configs
sudo apt autoremove                  # remove dependências não usadas
```

- Procurar / mostrar informações:

```shell
apt search termo
apt show pacote-name
apt policy pacote-name               # ver prioridades e versões disponíveis
apt-cache depends pacote-name        # dependências
apt-cache rdepends pacote-name       # quem depende
```

- Cache / limpeza:

```shell
sudo apt autoclean    # remove .deb antigos do cache
sudo apt clean        # remove todo o cache de pacotes
```

## Uso em scripts e automação

Para evitar prompts interativos em scripts:

```shell
DEBIAN_FRONTEND=noninteractive sudo apt-get -yq install pacote-name
```

Evite usar `apt` (interativo) em scripts; prefira `apt-get` quando precisar de opções previsíveis.

## Segurança: chaves e repositórios

- Os repositórios são declarados em `/etc/apt/sources.list` e arquivos em `/etc/apt/sources.list.d/`.
- `apt-key` está obsoleto; prefira armazenar chaves com `gpg --dearmor` em `/usr/share/keyrings/` e referenciar com `signed-by` na entrada do `sources.list`:

```shell
curl -fsSL https://repo.example.com/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/example-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/example-archive-keyring.gpg] http://repo.example.com/ubuntu stable main" | sudo tee /etc/apt/sources.list.d/example.list
sudo apt update
```

## Gerenciar versões e 'pinning'

- Segurar (hold) um pacote para não atualizar:

```shell
sudo apt-mark hold pacote-name
sudo apt-mark unhold pacote-name
```

- Pinning (forçar preferência de versão) via `/etc/apt/preferences.d/` (exemplo):

```
Package: pacote-name
Pin: version 1.2.3-1
Pin-Priority: 1001
```

## Resolução de problemas comuns

- Pacote quebrado / dependências faltando:

```shell
sudo apt --fix-broken install
sudo dpkg --configure -a
sudo apt-get -f install
```

- Trava de apt/dpkg (locks): não remova arquivos sem entender o processo. Primeiro verifique se há um processo em execução:

```shell
ps aux | egrep "apt|dpkg"
sudo lsof /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock /var/cache/apt/archives/lock
```

Se for um timer de atualização automática (`apt-daily.service`), espere ou desative temporariamente:

```shell
sudo systemctl stop apt-daily.service apt-daily.timer
sudo systemctl stop apt-daily-upgrade.timer apt-daily-upgrade.service
```

Como última opção, se tiver certeza, e nenhum processo estiver usando os locks, remova-os e reconfigure:

```shell
sudo rm /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock /var/cache/apt/archives/lock
sudo dpkg --configure -a
sudo apt update
```

-- Atenção: remover locks pode corromper a base de dados se um processo ainda estiver ativo.

## Atualizações automáticas (security)

Para habilitar atualizações de segurança automaticamente instale e configure `unattended-upgrades`:

```shell
sudo apt install unattended-upgrades apt-listchanges
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

## Boas práticas

- Sempre `sudo apt update` antes de instalar.
- Use `apt full-upgrade` com cuidado (pode remover pacotes para satisfazer dependências).
- Revise novas chaves/PPAs antes de adicioná-los.
- Em servidores, prefira atualizações de segurança automáticas para pacotes críticos.

## Resumo rápido de comandos

```
sudo apt update
sudo apt upgrade
sudo apt full-upgrade
sudo apt install pacote
sudo apt remove pacote
sudo apt purge pacote
sudo apt autoremove
sudo apt autoclean
sudo apt clean
sudo apt --fix-broken install
sudo dpkg --configure -a
sudo apt-mark hold pacote
```

## Referências

- Documentação oficial APT: https://wiki.debian.org/apt
- Man pages: `man apt`, `man apt-get`, `man sources.list`
