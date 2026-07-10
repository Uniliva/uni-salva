---

title: 09 -  Salvar imagem do docker
updated: 2020-02-16 21:37:07Z
created: 2020-01-29 09:16:17Z
---

<!-- TODO: revisar -->




### Crie um repositorio

- Vá ate o docker hub e crie um repositório para a imagem do projeto.

---
### Crie uma tag

Caso seu projeto não tenha, você pode criar uma tag usando:

```shellscript
docker tag local-image:tagname user-docker-hub/new-repo:tagname

#ex:
docker tag uni-helo-world:0.1 uniliva/uni-hello-world:1.0
```

---

### Faça login no docker hub

```shellscript
docker login
```

---

### Dê um push da sua imagem

```shellscript
docker push user-docker-hub/image

#ex:
docker push uniliva/uni-hello-world
```

---

## Faça o dowload de sua nova imagem

Acesso outro host e use:

```shellscript
docker pull uniliva/uni-hello-world:1.0

#execute com:

docker run uniliva/uni-hello-world:1.0
```

<br/>

:::danger
É necessario informar a versão da imagem
:::