# 04-argoCD

#### ArgoCD

> Aplicação de continuos deploy, usada para realizar o deploy de aplicações no kubernetes.
>
> Estamos acostumado com o formato padrão de pipeline do jenkins onde temos um fluxo único para o CI e CD. No caso do argoCD temos uma pipeline especifica para cada itens, sendo uma especifica para o processo de Continuos Delivery que é usada pelo argo.

![Introducing Argo CD — Declarative Continuous Delivery for Kubernetes | by  Mukulika Kapas | Argo Project](<../03 - DevSecOps notes/04-argoCD/.imagens/10MpcMgFb4hkcqXtflGSYNQ.png>)

***

#### Instalação

> Diferentemente de outras ferramentas de Continuos delivery o ArgoCD tem uma particularidade que é o fato dele ser implantado no cluster do kubernets. Na verdade ele é uma extensão do kubernetes, pois usa a maioria da ferramentas dele.
>
> * Isso tem diversas vantagens tais como:
>   * Visibilidade do processo, coisa que o Jenkins não tem por ser um processo externo.
>   * Tem um interface gráfica que mostra o processo em tempo real.

1. Para instalar o ARGOCD devemos criar um yamlfile

> Neste informamos qual:
>
> * vai ser no repo onde vão estar os deployments.
> * vai ser o cluster kubernets, onde serão aplicados os deployments.

![image-20220814214048656](<../03 - DevSecOps notes/04-argoCD/.imagens/image-20220814214048656.png>)

***

#### Tutoriais

* [ArgoCD Tutorial for Beginners](https://www.youtube.com/watch?v=MeU5\_k9ssrs)
