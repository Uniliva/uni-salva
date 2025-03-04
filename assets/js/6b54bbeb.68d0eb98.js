"use strict";(self.webpackChunkuni_docs=self.webpackChunkuni_docs||[]).push([[7449],{28453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>d});var r=n(96540);const i={},o=r.createContext(i);function a(e){const s=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(o.Provider,{value:s},e.children)}},44134:(e,s,n)=>{n.d(s,{A:()=>r});const r=n.p+"assets/images/7c7f3c71c42ef4d7043f61bfd5b6c9767f308b8c-2ae50b9e1dbe129646fb232eeecab63c.png"},70364:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>t,contentTitle:()=>d,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"devops-notes/prometheus/index","title":"\ud83d\udcc8 Prometheus","description":"Conceito iniciais","source":"@site/docs/devops-notes/05-prometheus/index.md","sourceDirName":"devops-notes/05-prometheus","slug":"/devops-notes/prometheus/","permalink":"/docs/devops-notes/prometheus/","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/devops-notes/05-prometheus/index.md","tags":[],"version":"current","frontMatter":{"title":"\ud83d\udcc8 Prometheus"},"sidebar":"devopsNotesSidebar","previous":{"title":"\ud83d\udcca Grafana","permalink":"/docs/devops-notes/grafana/"}}');var i=n(74848),o=n(28453);const a={title:"\ud83d\udcc8 Prometheus"},d=void 0,t={},c=[{value:"Conceito iniciais",id:"conceito-iniciais",level:3},{value:"Din\xe2mica de funcionamento",id:"din\xe2mica-de-funcionamento",level:3},{value:"Arquitetura do Prometheus",id:"arquitetura-do-prometheus",level:3},{value:"Trabalhando com dados",id:"trabalhando-com-dados",level:3},{value:"Tipos de m\xe9tricas",id:"tipos-de-m\xe9tricas",level:3},{value:"PromQL",id:"promql",level:3},{value:"Treinando",id:"treinando",level:3},{value:"Dashboards com Grafana",id:"dashboards-com-grafana",level:3}];function l(e){const s={a:"a",blockquote:"blockquote",code:"code",em:"em",h3:"h3",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h3,{id:"conceito-iniciais",children:"Conceito iniciais"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Trabalha com metricas e alertas para monitorar sistemas."}),"\n",(0,i.jsxs)(s.li,{children:["Toolkit de ",(0,i.jsx)(s.strong,{children:"monitoramento"})," e ",(0,i.jsx)(s.strong,{children:"alerta"})," de sistema ",(0,i.jsx)(s.strong,{children:"open sourc"}),"e."]}),"\n",(0,i.jsxs)(s.li,{children:["Criado pela ",(0,i.jsx)(s.strong,{children:"SoundCloud"}),", Agora faz parte da ",(0,i.jsx)(s.strong,{children:"Cloud Native Computer Foundation"}),"."]}),"\n",(0,i.jsx)(s.li,{children:"Captura e armazenamena dados em formatos dimensionais."}),"\n",(0,i.jsx)(s.li,{children:"Tem coletas poderosas com o PromQL."}),"\n",(0,i.jsxs)(s.li,{children:["Usado em conjunto com o ",(0,i.jsx)(s.strong,{children:"Grafana"}),"."]}),"\n",(0,i.jsx)(s.li,{children:"Tem diversas solu\xe7\xf5es para integra\xe7\xf5es."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"din\xe2mica-de-funcionamento",children:"Din\xe2mica de funcionamento"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{alt:"Como funciona",src:n(44134).A+"",width:"1050",height:"836"})}),"\n",(0,i.jsx)(s.p,{children:"h\xe1 duas forma de funcionamento:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Sistema baseado em Pull."}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Um agente do ",(0,i.jsx)(s.strong,{children:"servi\xe7o de monitoramento"})," recupera os dados da ",(0,i.jsx)(s.strong,{children:"aplica\xe7\xe3o"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Muito usado com a ",(0,i.jsx)(s.strong,{children:"Stack do ELK"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Sistema baseado em Push."}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["A ",(0,i.jsx)(s.strong,{children:"aplica\xe7\xe3o"})," envia os dados para um agente do ",(0,i.jsx)(s.strong,{children:"servi\xe7o de monitoramento"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Modelo usado pelo ",(0,i.jsx)(s.strong,{children:"Prometheus"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Recupera metricas via ",(0,i.jsx)(s.strong,{children:"http"}),". a aplica\xe7\xe3o deve disponibilizar uma endpoint ",(0,i.jsx)(s.strong,{children:"/metrics"})," no formato do Prometheus."]}),"\n",(0,i.jsxs)(s.li,{children:["Configura-se ",(0,i.jsx)(s.strong,{children:"targets"})," para recuperar de tempos em tempos."]}),"\n",(0,i.jsxs)(s.li,{children:["Consegue recuperar metricas de aplica\xe7\xe3o , banco de dados, sistemas operacionais. Para isso existe um conjunto de SDK e ",(0,i.jsx)(s.strong,{children:"exports"})," para isso."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Exports"})}),"\n",(0,i.jsx)("img",{src:"https://rtfm.co.ua/wp-content/uploads/2023/02/prom-exporter-2.png",alt:"Prometheus: Building a Custom Prometheus Exporter in Python"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Fornece um ",(0,i.jsx)(s.strong,{children:"endpoint"})," de coleta de ",(0,i.jsx)(s.strong,{children:"metricas"})," para ",(0,i.jsx)(s.strong,{children:"aplica\xe7\xf5es"}),", ",(0,i.jsx)(s.strong,{children:"sistemas operacionais"})," e ",(0,i.jsx)(s.strong,{children:"banco de dados"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Serve como ",(0,i.jsx)(s.strong,{children:"intermedi\xe1rio"})," para a coleta de metricas."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"arquitetura-do-prometheus",children:"Arquitetura do Prometheus"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{src:"https://prometheus.io/assets/architecture.png",alt:"Prometheus architecture"})}),"\n",(0,i.jsxs)(s.p,{children:["Na arquitetura do ",(0,i.jsx)(s.strong,{children:"Prometheus temos"}),":"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Prometheus server"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Retrival"})," - Componente que ",(0,i.jsx)(s.strong,{children:"orquesta"})," o processo de recebimento de metricas e o armazenamento na base de adados"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"TSDB"})," - Base de dados do tipo de serie de tempos (",(0,i.jsx)(s.strong,{children:"timeseries"})," database)."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Http Server"})," - Servidor de web, onde fica exporto ",(0,i.jsx)(s.strong,{children:"endpoints"})," para recuperar as metricas salvas e as metricas do proprio ",(0,i.jsx)(s.strong,{children:"Prometheus"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Service discovery"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Em arquiteturas de ",(0,i.jsx)(s.strong,{children:"microservi\xe7os"})," pode haver varias inst\xe2ncias para o ",(0,i.jsx)(s.strong,{children:"prometheus"})," monitorar, por isso o ",(0,i.jsx)(s.strong,{children:"Retrival"})," tem a capacidade de se conectar a services discoverys para descobrir quais instancias ele deve recuperar as ",(0,i.jsx)(s.strong,{children:"metricas"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"PushGateway"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Serve para agrupar as ",(0,i.jsx)(s.strong,{children:"metricas de varias"})," solu\xe7\xf5es em um s\xf3 lugar para se recuperado pelo ",(0,i.jsx)(s.strong,{children:"prometheus"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Usado em servi\xe7os que executam em ",(0,i.jsx)(s.strong,{children:"janelas de execu\xe7\xe3o variadas"})," e que encerram ap\xf3s isso, nesse caso ao executar esses servi\xe7os envias as ",(0,i.jsx)(s.strong,{children:"metricas"})," para esse ",(0,i.jsx)(s.strong,{children:"push gateway"})," que armazena ",(0,i.jsx)(s.strong,{children:"temporariamente"})," para o ",(0,i.jsx)(s.strong,{children:"prometheus"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Prometheus targets"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["S\xe3o os ",(0,i.jsx)(s.strong,{children:"endpoints"})," de metricas dos servi\xe7os que o ",(0,i.jsx)(s.strong,{children:"prometheus"})," vai realizar pull (scraping) de tempos em tempos atrav\xe9s ",(0,i.jsx)(s.strong,{children:"Retrival"})," ."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Alert manager"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Permite configurar ",(0,i.jsx)(s.strong,{children:"thresholds"})," e ",(0,i.jsx)(s.strong,{children:"a\xe7\xf5es"})," (alertas) para as metricas."]}),"\n",(0,i.jsxs)(s.li,{children:["Recebe atualiza\xe7\xe3o das metricas de ",(0,i.jsx)(s.strong,{children:"tempos em tempos"})," do prometheus."]}),"\n",(0,i.jsxs)(s.li,{children:["Pode executar ",(0,i.jsx)(s.strong,{children:"a\xe7\xf5es (alertas)"})," como enviar ",(0,i.jsx)(s.strong,{children:"e-mails"})," ou acionar outros ",(0,i.jsx)(s.strong,{children:"servi\xe7os de notifica\xe7\xe3o."})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"PromQL"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Permite executar ",(0,i.jsx)(s.strong,{children:"querys"})," com as metricas atrav\xe9s da ",(0,i.jsx)(s.strong,{children:"Prometheus Web UI"})," ou do ",(0,i.jsx)(s.strong,{children:"Grafana"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Usando o ",(0,i.jsx)(s.strong,{children:"Http Server"})," explicado anteriormente."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Grafana"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Sistema que permite montar ",(0,i.jsx)(s.strong,{children:"dashboards"})," com as m\xe9tricas coletadas pelo ",(0,i.jsx)(s.strong,{children:"prometheus"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Realiza queries usando o ",(0,i.jsx)(s.strong,{children:"PromQL"})," no ",(0,i.jsx)(s.strong,{children:"Http Server"})," do prometheus para recuperar as m\xe9tricas."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"trabalhando-com-dados",children:"Trabalhando com dados"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Armazenamento","\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"TSDB"})," (Time Series Database)."]}),"\n",(0,i.jsx)(s.li,{children:"Os dados mudam conforme o tempo."}),"\n",(0,i.jsxs)(s.li,{children:["Trabalha com ",(0,i.jsx)(s.strong,{children:"label"})," para adicionar propriedades a m\xe9tricas."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Otimizado"})," para esse caso, o que melhora a ",(0,i.jsx)(s.strong,{children:"performance"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Para dados mais ",(0,i.jsx)(s.strong,{children:"antigos"})," h\xe1 um ",(0,i.jsx)(s.strong,{children:"compress\xe3o"})," para liberar armazenamento, por isso talvez n\xe3o sejam t\xe3o precisos."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"tipos-de-m\xe9tricas",children:"Tipos de m\xe9tricas"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{alt:"Tipos metricas",src:n(88702).A+"",width:"596",height:"302"})}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Counter"})," - \xe9 um ",(0,i.jsx)(s.strong,{children:"contador"}),", tem o valor ",(0,i.jsx)(s.strong,{children:"incremental"}),", sempre aumenta.","\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Quantidade de visitas, erros, clique em um bot\xe3o."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Gauge"})," - \xe9 uma m\xe9trica que varia com o tempo. pode aumentar, diminuir ou estabilizar.","\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Uso de cpu, de memoria. Quantidade de usu\xe1rios ativos."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Histogram"})," - \xe9 uma m\xe9trica que permite a distribui\xe7\xe3o de frequ\xeancia.","\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Baseado em amostra, poss\xedvel agregar valores baseados nas propriedades."}),"\n",(0,i.jsx)(s.li,{children:"Quem gerar o histograma \xe9 o cliente."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Summary"})," - \xe9 uma m\xe9trica que permite a distribui\xe7\xe3o de frequ\xeancia.","\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Similar ao ",(0,i.jsx)(s.strong,{children:"histogram"}),", por\xe9m nessa quem calcula a distribui\xe7\xe3o \xe9 o ",(0,i.jsx)(s.strong,{children:"prometheus"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Retorna os dados mais brutos para o ",(0,i.jsx)(s.strong,{children:"prometheus"})," e ali se cria a distribui\xe7\xe3o de frequ\xeancia."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"promql",children:"PromQL"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Prometheus query language. (SQL do ",(0,i.jsx)(s.strong,{children:"prometheus"}),")."]}),"\n",(0,i.jsxs)(s.li,{children:["Usado para consultar dados no ",(0,i.jsx)(s.strong,{children:"prometheus"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"treinando",children:"Treinando"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Acesse a pasta ",(0,i.jsx)(s.em,{children:"treinando"})]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"De os comando abaixo para subir o prometheus."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"# Para subir os container\ndocker-compose up -d\n\n# Para ver os logs do prometheus\ndocker-compose logs -f prometheus\n\n# Para ver os logs do node export\ndocker-compose logs -f node-exporter\n \n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["continuar -> ",(0,i.jsx)(s.a,{href:"https://prometheus.io/docs/concepts/metric_types/",children:"https://prometheus.io/docs/concepts/metric_types/"})]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"dashboards-com-grafana",children:"Dashboards com Grafana"})]})}function h(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},88702:(e,s,n)=>{n.d(s,{A:()=>r});const r="data:image/png;base64,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"}}]);