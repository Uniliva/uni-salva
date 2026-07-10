---

title: 02 - Ferramentas conectar a um container
updated: 2020-01-27 09:47:34Z
created: 2020-01-27 09:36:57Z
---

<!-- TODO: revisar -->




[[toc]]

---

### NSENTER 

Permite que executes comando linux que talvez não tenha ma imagem reduzida do docker.

```shell
nsenter -m -u -n -i -t <PID> /bin/bash
```

Vc pode usar em alternativa ao item acima o comando:

```shell
docker exec <container-id> /bin/bash
```

Para ambos executar o comando exit ele não encerra o container.