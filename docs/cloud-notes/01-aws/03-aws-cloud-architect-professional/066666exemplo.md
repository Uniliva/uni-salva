
Olá fiz alguma anotações sobre recursos AWS para a certificação architect progfessiona da AWS, porem tem alguns erros de português então corrija os erros de português.
Adicione explicações sobre o caso acho necessário para tornar os itens mais fáceis de entender e comece o primeiro nivel de cabeçarios do markdown a partir do nível 2 (##),NÃO REMOVAS AS IMAGENS
- Adicione notas E LINKS de temas que questões que podem cair na prova de certificação.
- estou usando o docusarus então use as admonitions para isso
Faça isso para a documentação abaixo:










------------------

De exemplos (5) de questoes/ dicas AWS para a certificação architect progfessional que pode cair
siga o modelo abaixo:


:::tip **Dica para a prova 🎯**  
Questões frequentemente abordam **diferentes classes de armazenamento do S3**, pedindo para identificar a mais adequada com base em custo, latência de recuperação e tempo mínimo de retenção.  

📌 **Exemplo de questão:** Uma empresa precisa armazenar backups de logs que raramente serão acessados, mas devem ser mantidos por pelo menos **180 dias**. Qual a classe de armazenamento do S3 mais adequada para reduzir custos?  
- ✅ **Resposta:** Amazon S3 Glacier Deep Archive  

---

> O **S3 Object Lock** pode ser exigido em conformidade com regulamentos como **HIPAA, FINRA e SEC 17a-4(f)**, garantindo que arquivos não possam ser modificados ou excluídos dentro de um período específico.  

📌 **Exemplo de questão:** Uma empresa do setor financeiro precisa armazenar documentos regulatórios que **não podem ser apagados ou modificados por 7 anos**. Qual funcionalidade do S3 deve ser utilizada?  
- ✅ **Resposta:** Amazon S3 Object Lock no modo Compliance  

:::


Considere o conteudo abaixo:

### Consultas e Analytics

> Select e Glacier Select

:::info O que é?
O **S3 Select** e o **Glacier Select** permitem recuperar partes de um objeto armazenado no Amazon S3 usando consultas SQL. Isso melhora a eficiência ao acessar grandes volumes de dados, pois evita o download completo do objeto.
:::

- Permite usar SQL para recuperar apenas os dados necessários de um objeto armazenado no S3 ou Glacier.
- Suporta filtros por linhas e colunas, realizando consultas SQL simples diretamente no armazenamento.
- **Economiza largura de banda**, pois as consultas são executadas no lado do S3, retornando apenas os resultados necessários.

![select-s3](assets/image-20210901073640794.png)

---

### Boas Práticas

> S3 Well-Architected

:::info
O **Well-Architected Framework** fornece diretrizes para construir aplicações eficientes, seguras e resilientes usando o S3.
:::

  ![S3 Well-Architected](assets/image-20210905114534983.png)


---
