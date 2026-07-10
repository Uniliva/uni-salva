---

title: 02 - Instalando o docker
updated: 2019-12-09 10:59:28Z
created: 2019-12-09 09:56:33Z
---

<!-- TODO: revisar -->




## Instalação

Pra instalar o docker no linux entre como root e de o caomando

```shell
- debian
curl -fsSl https://get.docker.com// | sh
ou
apt-get install docker.io

-centos
yum instal -y docker
```

### Reqisitos de instalação

- Processador 64 bits
- kernel 3.8 ou superior

```shell
uname -r
```

### Comando para ver informações

```shell
docker version
docker info
```

### Dando permissão ao usuarios

Para dar permissão ao usuario comum ao docker use:

```shell
sudo usermod -aG docker $USER
```

É necessario fazer o log out