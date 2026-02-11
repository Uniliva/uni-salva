---
title: "Machine Learning"
sidebar_position: 14
---

```mermaid
flowchart LR
    subgraph Vision["🖼️ Visão Computacional"]
        Rekognition["🔍 Rekognition<br/>Faces, Objetos, Moderação"]
        Textract["📝 Textract<br/>OCR, Tabelas, Formulários"]
    end

    subgraph NLP["🗣️ Processamento de Linguagem"]
        Comprehend["📖 Comprehend<br/>Sentimento, Entidades, NLP"]
        ComprehendMed["🏥 Comprehend Medical<br/>PHI, Dados Clínicos"]
        Transcribe["🎙️ Transcribe<br/>Áudio → Texto"]
        Polly["🔊 Polly<br/>Texto → Fala"]
        Translate["🌍 Translate<br/>Tradução em tempo real"]
    end

    subgraph Conversational["💬 Conversação"]
        Lex["🤖 Lex<br/>Chatbots / Alexa"]
        Connect["☎️ Connect<br/>Call Center Virtual"]
        Lex --> Connect
    end

    subgraph Analytics["📊 Análise & Previsão"]
        Forecast["📈 Forecast<br/>Séries Temporais"]
        Personalize["🧠 Personalize<br/>Recomendação"]
        Kendra["🔎 Kendra<br/>Busca Semântica"]
    end

    subgraph GenAI["🤖 IA Generativa"]
        Bedrock["🪨 Bedrock<br/>Foundation Models"]
        QBusiness["💼 Q Business<br/>Assistente Empresarial"]
        QDeveloper["👨‍💻 Q Developer<br/>Assistente de Código"]
    end

    subgraph Platform["⚙️ Plataforma ML"]
        SageMaker["🧪 SageMaker<br/>Build / Train / Deploy"]
    end

    SageMaker -.->|"Modelos customizados"| Vision
    SageMaker -.->|"Modelos customizados"| NLP
    SageMaker -.->|"Modelos customizados"| Analytics
    Bedrock -.->|"LLMs gerenciados"| Conversational
    Bedrock -.->|"LLMs gerenciados"| Analytics

    style Vision fill:#e3f2fd,color:#1565c0,stroke:#90caf9
    style NLP fill:#e8f5e9,color:#2e7d32,stroke:#a5d6a7
    style Conversational fill:#fff3e0,color:#e65100,stroke:#ffcc80
    style Analytics fill:#f3e5f5,color:#6a1b9a,stroke:#ce93d8
    style Platform fill:#fce4ec,color:#c62828,stroke:#ef9a9a
    style GenAI fill:#e0f7fa,color:#00695c,stroke:#80deea
    style SageMaker fill:#ef9a9a,color:#b71c1c
    style Rekognition fill:#90caf9,color:#0d47a1
    style Textract fill:#90caf9,color:#0d47a1
    style Comprehend fill:#a5d6a7,color:#1b5e20
    style ComprehendMed fill:#a5d6a7,color:#1b5e20
    style Transcribe fill:#a5d6a7,color:#1b5e20
    style Polly fill:#a5d6a7,color:#1b5e20
    style Translate fill:#a5d6a7,color:#1b5e20
    style Lex fill:#ffcc80,color:#bf360c
    style Connect fill:#ffcc80,color:#bf360c
    style Forecast fill:#ce93d8,color:#4a148c
    style Personalize fill:#ce93d8,color:#4a148c
    style Kendra fill:#ce93d8,color:#4a148c
    style Bedrock fill:#80deea,color:#004d40
    style QBusiness fill:#80deea,color:#004d40
    style QDeveloper fill:#80deea,color:#004d40
```

## 🤖 Machine Learning

![image-20230303060442789](assets/image-20230303060442789.png)

> A AWS oferece uma gama de serviços de Machine Learning gerenciados e pré-treinados. Muitos deles são voltados a NLP, visão computacional, previsão, recomendação e análise. 🌐

---

:::tip 🤖 Dica de Prova
Machine Learning na AWS é cobrado em **cenários práticos**! Foque nos serviços gerenciados, suas **integrações**, e **casos de uso reais**.  
:::

---

### 🖼️ Rekognition (reconhecimento)

![image-20230302070726050](assets/image-20230302070726050.png)

- Detecta **pessoas, objetos, textos e cenas** em imagens e vídeos.
- Reconhecimento facial para **verificação de identidade** e contagem de pessoas.
- Banco de faces **customizado ou celebridades**.
- Casos de uso:
  - **Moderação de conteúdo**
  - Detecção de texto
  - Análise de rostos (emoções, idade, gênero)
  - Reconhecimento de celebridades
  - Análise de movimentação em esportes
- Integra com **Augmented AI (A2I)** para validação humana dos resultados

:::tip Dica de Prova

📌 Qual serviço AWS permite identificar objetos e rostos em imagens e vídeos?  
✅ **Rekognition**

📌 Como validar automaticamente (ou com humanos) o resultado do ML?  
✅ **Augmented AI (A2I)**

📌 Qual serviço pode detectar expressões faciais como raiva ou felicidade?  
✅ **Rekognition**

:::

---

### 🗣️ Transcribe

- Converte **áudio em texto** com ASR (Automatic Speech Recognition).
- Detecta automaticamente idioma e suporta múltiplas línguas.
- Possui recurso de **Redaction** para ocultar **PIIs (dados sensíveis)**.
- Útil para criar legendas, transcrever chamadas, etc.

:::tip Dica de Prova

📌 Qual serviço converte chamadas de áudio em texto?  
✅ **Transcribe**

📌 Como proteger PII em transcrição automática?  
✅ Com a função **PII Redaction**

:::

---

### 🗨️ Polly

- Converte **texto em fala** (TTS - Text to Speech).
- Cria apps que "falam" com vozes realistas.
- Suporta **Lexicons** e **SSML**:
  - Lexicon: Define pronúncia customizada
  - SSML: Dá entonação, pausas, ênfases e sussurros

:::tip Dica de Prova

📌 Como personalizar a pronúncia de palavras faladas?  
✅ Usando **Lexicons**

📌 Como aplicar entonação, pausas e ênfases em texto para voz?  
✅ **SSML (Speech Synthesis Markup Language)**

:::

---

### 🌍 Translate

- Tradução automática de textos em tempo real.
- Escalável para **altos volumes**, com foco em **localização de conteúdo**.

:::tip Dica de Prova

📌 Como traduzir textos automaticamente em diferentes idiomas?  
✅ **Translate**

:::

---

### 💬 Lex + ☎️ Connect

![image-20230302074306978](assets/image-20230302074306978.png)

- **Lex**:
  - Criação de **chatbots** com ASR e NLU (Natural Language Understanding).
  - Mesma tecnologia da **Alexa**.
- **Connect**:
  - Solução de **central de atendimento virtual (Call Center)**.
  - Integra com **CRM e Lex**, permite URA e automação.

:::tip Dica de Prova

📌 Qual serviço cria um contact center com bots integrados?  
✅ **Amazon Connect**

📌 Qual serviço permite criar chatbots com linguagem natural?  
✅ **Lex**

:::

---

### 📖 Comprehend

- Serviço de **NLP (Natural Language Processing)** gerenciado.
- Entende **sentimento**, extrai **entidades (pessoas, locais, eventos)** e detecta idioma.
- Permite **agrupamento de temas** e análise de tópicos.

:::tip Dica de Prova

📌 Como identificar se um texto tem tom positivo ou negativo?  
✅ **Comprehend**

📌 Como identificar entidades (nomes, locais, marcas) em um texto?  
✅ **Comprehend**

:::

---

### 🏥 Comprehend Medical

- Foco em NLP para dados médicos.
- Extrai **PHI (Protected Health Information)** de documentos clínicos.
- Pode ler receitas e anotações médicas e **transformar em dados estruturados**.

:::tip Dica de Prova

📌 Qual serviço analisa documentos médicos e extrai PHI?  
✅ **Comprehend Medical**

:::

---

### 🧪 SageMaker

- Serviço completo para **criar, treinar, implantar e monitorar modelos de ML.**
- Inclui IDE (Studio), Notebooks, AutoML, Pipelines, MLOps.
- Suporte a modelos próprios ou pré-treinados.

:::tip Dica de Prova

📌 Qual serviço permite construir, treinar e implantar modelos ML customizados?  
✅ **SageMaker**

:::

---

### 📈 Forecast

![image-20230303055156926](assets/image-20230303055156926.png)

- Gera **previsões baseadas em séries temporais**.
- Ex: previsão de **vendas, demanda, finanças**.
- Usa mesmo mecanismo do Amazon.com.
- Reduz tempo de previsão de **meses para horas**.

:::tip Dica de Prova

📌 Qual serviço AWS realiza previsão de demanda com ML?  
✅ **Forecast**

:::

---

### 🔍 Kendra

![image-20230303055457981](assets/image-20230303055457981.png)

- Motor de **busca semântica** em documentos com ML.
- Suporte a PDF, Word, PowerPoint, HTML, FAQs, etc.
- Usa linguagem natural para busca.

:::tip Dica de Prova

📌 Qual serviço AWS permite busca inteligente em documentos?  
✅ **Kendra**

:::

---

### 🧠 Personalize

![image-20230303060020714](assets/image-20230303060020714.png)

- Criação de sistemas de **recomendação em tempo real.**
- Usa histórico de usuário para recomendar produtos, conteúdos, etc.
- Exemplo: Email marketing direcionado, re/ranking de produtos.

:::tip Dica de Prova

📌 Qual serviço AWS cria recomendações personalizadas?  
✅ **Personalize**

:::

---

### 📝 Textract

![image-20230303060223380](assets/image-20230303060223380.png)

- Extrai texto de **documentos escaneados, tabelas, PDFs** ou manuscritos.
- Gera **dados estruturados** a partir de documentos.

:::tip Dica de Prova

📌 Qual serviço extrai texto, tabelas e formulários de PDFs?  
✅ **Textract**

:::

---

### 🪨 Amazon Bedrock

- Serviço gerenciado para acesso a **Foundation Models (LLMs)** de diversos provedores (Anthropic, Meta, Mistral, Cohere, Amazon Nova, etc.).
- Permite usar modelos via API **sem gerenciar infraestrutura**.
- Suporta **fine-tuning**, **RAG (Retrieval Augmented Generation)** e **Agents** para automação de tarefas.
- **Guardrails**: define políticas de segurança e filtragem de conteúdo nos modelos.
- **Knowledge Bases**: conecta modelos a fontes de dados (S3, bancos de dados) para respostas contextuais.

:::tip Dica de Prova

📌 Qual serviço permite acessar LLMs de múltiplos provedores de forma gerenciada?
✅ **Bedrock**

📌 Como adicionar dados corporativos como contexto para um LLM?
✅ **Bedrock Knowledge Bases (RAG)**

:::

---

### 💼 Amazon Q Business

- Assistente de IA generativa voltado para **uso empresarial**.
- Conecta-se a fontes de dados corporativas (S3, SharePoint, Confluence, Slack, etc.).
- Responde perguntas, resume documentos e gera conteúdo com base nos **dados internos da empresa**.
- Possui controle de acesso via **IAM Identity Center**.

---

### 👨‍💻 Amazon Q Developer

- Assistente de IA para **desenvolvedores** integrado a IDEs e console AWS.
- Gera código, sugere correções, explica código e auxilia em **troubleshooting** de recursos AWS.
- Pode analisar e transformar código legado (ex: Java 8 → Java 17).

---

### 🌟 Amazon Nova

- Família de **modelos fundacionais da própria AWS**, disponíveis via Bedrock.
- Variantes: **Nova Micro** (texto, baixo custo), **Nova Lite** (multimodal rápido), **Nova Pro** (equilíbrio custo/performance), **Nova Premier** (tarefas complexas).
- Modelos de mídia: **Nova Canvas** (geração de imagens) e **Nova Reel** (geração de vídeos).

---

## Links e recursos adicionais 🔗

- [Documentação oficial AWS Machine Learning](https://aws.amazon.com/pt/machine-learning/)
- [AWS SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html)
- [AWS Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html)
- [AWS Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html)
- [AWS Textract](https://docs.aws.amazon.com/textract/latest/dg/what-is.html)
- [Amazon Bedrock](https://aws.amazon.com/bedrock/)
- [Amazon Q](https://aws.amazon.com/q/)
- [Guia de estudo para certificação AWS](https://aws.amazon.com/certification/certified-solutions-architect-professional/)
