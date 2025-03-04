"use strict";(self.webpackChunkuni_docs=self.webpackChunkuni_docs||[]).push([[2974],{21403:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"devops-notes/kubernetes/kind","title":"Kind","description":"---","source":"@site/docs/devops-notes/01-kubernetes/kind.md","sourceDirName":"devops-notes/01-kubernetes","slug":"/devops-notes/kubernetes/kind","permalink":"/uni-salva/docs/devops-notes/kubernetes/kind","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/devops-notes/01-kubernetes/kind.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Kind","sidebar_position":2},"sidebar":"devopsNotesSidebar","previous":{"title":"Documenta\xe7\xe3o","permalink":"/uni-salva/docs/devops-notes/kubernetes/conteudo"},"next":{"title":"Istio","permalink":"/uni-salva/docs/devops-notes/istio-service-mash/"}}');var s=t(74848),i=t(28453);const r={title:"Kind",sidebar_position:2},c=void 0,a={},d=[{value:"Instalando",id:"instalando",level:3},{value:"Criando cluster via arquivo",id:"criando-cluster-via-arquivo",level:3}];function l(n){const e={a:"a",code:"code",h3:"h3",hr:"hr",li:"li",pre:"pre",ul:"ul",...(0,i.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h3,{id:"instalando",children:"Instalando"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"#-----------------------------------------------------------------------------------------------\n## Kind\n## link: https://kind.sigs.k8s.io/docs/user/quick-start/#installation\n##  Usado para criar cluter kubernets\n\ncurl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.16.0/kind-linux-amd64\nchmod +x ./kind\nsudo mv ./kind /usr/local/bin/kind\n\n# Cria aum cluter\nkind create cluster\n\n# cria com nome\nkind create cluster --name uni-cluster\n\n# cria cluster via arquivo <ver abaixo arquivo cluster king>\nkind create cluster --config=config.yaml\n\n# Listar os cluster\nkind get clusters\n\n# Delete lcluster\nkind delete cluster -n <name>\n\n#-----------------------------------------------------------------------------------------------\n# Listando contextos possiveis\ncat ~/.kube/config \nkubcetl config get-cluster\n\n# setar um contexto\nkubectl cluster-info --context <contexto>\nkubcetl config use-context <contexto>\n\n# Setando o Kind como cluster padr\xe3o no kubctl\nkubectl cluster-info --context kind-kind\nkubcetl config use-context kind-kind\n\n# Setando o minikube como cluster padr\xe3o no kubctl\nkubectl cluster-info --context  minikube\n\n# Setar namespace padr\xe3o\nkubectl config set-context --current --namespace=<namespace>\n"})}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h3,{id:"criando-cluster-via-arquivo",children:"Criando cluster via arquivo"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Crie o arquivo config.yaml - ",(0,s.jsx)(e.a,{href:"https://kind.sigs.k8s.io/docs/user/configuration/",children:"kind \u2013 Configuration"}),")"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:'kind: Pod\napiVersion: v1\nmetadata:\n  name: foo\n  labels:\n    app: foo\nspec:\n  containers:\n  - name: foo\n    image: hashicorp/http-echo:0.2.3\n    args:\n    - "-text=foo"\n    ports:\n    - containerPort: 5678\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: foo\nspec:\n  type: NodePort\n  ports:\n  - name: http\n    nodePort: 30950\n    port: 5678\n  selector:\n    app: foo\n\n'})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Execute o comando"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"kind create cluster --config=config.yaml\n"})})]})}function u(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>c});var o=t(96540);const s={},i=o.createContext(s);function r(n){const e=o.useContext(i);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:r(n.components),o.createElement(i.Provider,{value:e},n.children)}}}]);