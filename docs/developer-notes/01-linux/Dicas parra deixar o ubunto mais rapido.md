---
title: Dicas para deixar o Ubuntu mais rápido
---
---

Este documento reúne dicas práticas para melhorar a responsividade e o tempo de inicialização do Ubuntu (ou distribuições baseadas em Debian). Algumas operações podem alterar o comportamento do sistema: faça backup, teste em uma VM ou leia as notas antes de aplicar em um servidor/PC de produção.

## 1 — Limpeza básica de pacotes e cache

```shell
sudo apt update
sudo apt upgrade -y
sudo apt autoremove --purge -y
sudo apt autoclean
```

Remover pacotes não usados e limpar cache libera espaço e pode reduzir I/O em discos lentos.

## 2 — Analisar tempo de boot e serviços pesados

```shell
systemd-analyze blame        # lista serviços por tempo de inicialização
systemd-analyze critical-chain
```

Desative serviços desnecessários:

```shell
sudo systemctl disable --now nome-do-servico.service
```

Verifique unidades habilitadas:

```shell
systemctl list-unit-files --state=enabled
```

## 3 — Otimizações de swap / memórias (swappiness & zram)

Reduzir `swappiness` evita que o kernel troque tão cedo:

```shell
sudo sysctl vm.swappiness=10
# persistente
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
```

`zram` cria swap comprimido em RAM — útil em máquinas com pouca memória:

```shell
sudo apt install zram-tools -y
# em algumas distros o serviço ativa automaticamente; verifique a documentação da sua distro
```

## 4 — TRIM (SSD) e tuning de disco

Ative TRIM periódico para SSDs:

```shell
sudo systemctl enable --now fstrim.timer
# executar manualmente
sudo fstrim -v /
```

## 5 — Limpar logs do journal

```shell
sudo journalctl --vacuum-size=200M
sudo journalctl --vacuum-time=2weeks
```

Isto reduz uso de disco por logs antigos.

## 6 — Preload / preload-like

O `preload` tenta acelerar o carregamento de aplicações mais usadas:

```shell
sudo apt install preload -y
sudo systemctl enable --now preload
```

Nem sempre traz ganhos perceptíveis; teste se funciona no seu fluxo.

## 7 — rsync / backup incremental (melhora I/O em sincronizações)

Use `rsync -avP --delete` para espelhar diretórios de forma eficiente e retomável.

```shell
rsync -avP --delete /origem/ usuario@host:/destino/
```

## 8 — Desativar efeitos visuais (desktop) e apps de inicialização

- Em GNOME: desative animações via `gsettings`:

```shell
gsettings set org.gnome.desktop.interface enable-animations false
```

- Remova aplicativos de inicialização desnecessários: `gnome-session-properties` ou remover arquivos em `~/.config/autostart/`.

## 9 — Power / CPU tuning (laptops)

Instale `tlp` e `powertop` para gerenciamento de energia:

```shell
sudo apt install tlp powertop -y
sudo systemctl enable --now tlp
sudo powertop --auto-tune   # recomenda alterações temporárias
```

## 10 — Limpar espaço e arquivos grandes

```shell
ncdu /                # precisa instalar ncdu
sudo apt install ncdu -y
```

## 11 — Outras recomendações úteis

- Atualize drivers gráficos (NVIDIA/AMD) se necessário; drivers corretos melhoram desempenho de GPU.
- Use desktops mais leves (XFCE, LXQt) em máquinas antigas.
- Desabilite `tracker` / indexing se não usar busca de arquivos.
- Evite remover `snap`/`flatpak` se depender de pacotes instalados por eles; remova com cautela.

## 12 — Exemplo rápido: checklist para acelerar uma máquina

```shell
sudo apt update && sudo apt upgrade -y
sudo apt autoremove --purge -y && sudo apt autoclean
sudo systemctl disable --now bluetooth.service   # exemplo, se não usar bluetooth
sudo systemctl enable --now fstrim.timer
sudo sysctl vm.swappiness=10
sudo journalctl --vacuum-time=2weeks
```

## Avisos e boas práticas

- Faça backup antes de mudanças significativas.
- Teste alterações em VM antes de aplicar em produção.
- Alguns pacotes/serviços dependem de outros; verifique dependências antes de desabilitar serviços.
