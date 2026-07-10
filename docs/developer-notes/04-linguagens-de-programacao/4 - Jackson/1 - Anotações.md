---
title: 1 - Anotações
---

### Jackson Serialization Annotations

---

#### @JsonRawValue

A anotação @JsonRawValue pode instruir Jackson a serializar uma propriedade exatamente como está.

```java
public class RawBean {
    public String name;
 
    @JsonRawValue
    public String json;
}
```

A saída de serializar a entidade é:

```json
{
    "name":"My bean",
    "json":{
        "attr":false
    }
}
```
----

#### @JsonValue

@JsonValue indica um método único que a biblioteca usará para serializar toda a instância.

Por exemplo, em uma enumeração, anotamos o getName com @JsonValue para que qualquer uma dessas entidades seja serializada por meio de seu nome:

```java
public enum TypeEnumWithValue {
    TYPE1(1, "Type A"), TYPE2(2, "Type 2");
 
    private Integer id;
    private String name;
 
    // standard constructors
 
    @JsonValue
    public String getName() {
        return name;
    }
}
```


---

#### @JsonRootName

A anotação @JsonRootName é usada - se o agrupamento estiver ativado - para especificar o nome do wrapper raiz a ser usado.

- Serializar significa que, em vez de serializar um Usuário para algo como:

```json
{
    "id": 1,
    "name": "John"
}
```

- Vai ser serializado assim:

```json
{
    "User": {
        "id": 1,
        "name": "John"
    }
}
```

Então, vejamos um exemplo - vamos usar a anotação @JsonRootName para indicar o nome dessa entidade potencial do wrapper:

```java
@JsonRootName(value = "user")
public class UserWithRoot {
    public int id;
    public String name;
}
```


---

#### @JsonSerialize

@JsonSerialize indica um serializador personalizado para usar ao serealizar a entidade.

```java
public class EventWithSerializer {
    public String name;
 
    @JsonSerialize(using = CustomDateSerializer.class)
    public Date eventDate;
}
```

ver mais em: https://www.baeldung.com/jackson-annotations

----
----

### Jackson Deserialization Annotations

----

#### @JsonCreator

Podemos usar a anotação @JsonCreator para ajustar o construtor / fábrica usado na desserialização.

É muito útil quando precisamos desserializar algum JSON que não corresponde exatamente à entidade de destino que precisamos obter.

Vamos ver um exemplo; digamos que precisamos desserializar o seguinte JSON:

```json
{
    "id":1,
    "theName":"My bean"
}
```

No entanto, não existe o campo **theName** em nossa entidade de destino - há apenas um campo de **nome**.

Agora, não queremos alterar a própria entidade - precisamos apenas de um pouco mais de controle sobre o processo de desserialização - anotando o construtor com **@JsonCreator** e usando a anotação **@JsonProperty** também:

```java
public class BeanWithCreator {
    public int id;
    public String name;
 
    @JsonCreator
    public BeanWithCreator(
      @JsonProperty("id") int id, 
      @JsonProperty("theName") String name
      ) {
        this.id = id;
        this.name = name;
    }
}
```

----

#### @JacksonInject

@JacksonInject indica que uma propriedade obterá seu valor da injeção e não dos dados JSON.

```java
public class BeanWithInject {
    @JacksonInject
    public int id;
     
    public String name;
}
```

E aqui está como isso funciona:

```java
@Test
public void whenDeserializingUsingJsonInject_thenCorrect()
  throws IOException {
  
    String json = "{\"name\":\"My bean\"}";
     
    InjectableValues inject = new InjectableValues.Std()
      .addValue(int.class, 1);
    BeanWithInject bean = new ObjectMapper().reader(inject)
      .forType(BeanWithInject.class)
      .readValue(json);
     
    assertEquals("My bean", bean.name);
    assertEquals(1, bean.id);
}
```

----

#### @JsonDeserialize

@JsonDeserialize indica o uso de um desserializador personalizado.

```java
public class EventWithSerializer {
    public String name;
 
    @JsonDeserialize(using = CustomDateDeserializer.class)
    public Date eventDate;
}
```

----

#### @JsonAlias

O @JsonAlias ​​define um ou mais nomes alternativos para uma propriedade durante a desserialização.

```java
public class AliasBean {
    @JsonAlias({ "fName", "f_name" })
    private String firstName;   
    private String lastName;
}
```

---
---

###  Jackson Property Inclusion Annotations

---

#### @JsonIgnoreProperties

@JsonIgnoreProperties é uma anotação em nível de classe que marca uma propriedade ou uma lista de propriedades que Jackson ignorará

```java
@JsonIgnoreProperties({ "id" })
public class BeanWithIgnore {
    public int id;
    public String name;
}
```

---

#### @JsonIgnore

A anotação @JsonIgnore é usada para marcar uma propriedade a ser ignorada no nível do campo.

```java
public class BeanWithIgnore {
    @JsonIgnore
    public int id;
 
    public String name;
}
```

---

#### @JsonIgnoreType

@JsonIgnoreType marca todas as propriedades de um tipo anotado para serem ignoradas.

```java
public class User {
    public int id;
    public Name name;
 
    @JsonIgnoreType
    public static class Name {
        public String firstName;
        public String lastName;
    }
}
```

---

#### @JsonInclude

Podemos usar @JsonInclude para excluir propriedades com valores vazios / nulos / padrão.

```java
@JsonInclude(Include.NON_NULL)
public class MyBean {
    public int id;
    public String name;
}
```

----
----

### Jackson General Annotations


#### @JsonProperty

Podemos adicionar a anotação @JsonProperty para indicar o nome da propriedade em JSON.

Vamos usar @JsonProperty para serializar / desserializar o nome da propriedade quando estivermos lidando com getters e setters não padrão:

```java
public class MyBean {
    public int id;
    private String name;
 
    @JsonProperty("name")
    public void setTheName(String name) {
        this.name = name;
    }
 
    @JsonProperty("name")
    public String getTheName() {
        return name;
    }
}
```

---

#### @JsonFormat

A anotação @JsonFormat especifica um formato ao serializar valores de Data / Hora.

```java
public class EventWithFormat {
    public String name;
 
    @JsonFormat(
      shape = JsonFormat.Shape.STRING,
      pattern = "dd-MM-yyyy hh:mm:ss")
    public Date eventDate;
}
```

---

#### @JsonManagedReference, @JsonBackReference

As anotações @JsonManagedReference e @JsonBackReference podem lidar com relacionamentos pai / filho e contornar loops.

No exemplo a seguir - usamos @JsonManagedReference e @JsonBackReference para serializar nossa entidade ItemWithRef:

```java
public class ItemWithRef {
    public int id;
    public String itemName;
 
    @JsonManagedReference
    public UserWithRef owner;
}
```

Nossa entidade UserWithRef:

```java
public class UserWithRef {
    public int id;
    public String name;
 
    @JsonBackReference
    public List<ItemWithRef> userItems;
}
```

---
---

###  Custom Jackson Annotation

A seguir, vamos ver como criar uma anotação personalizada de Jackson. Podemos fazer uso da anotação @JacksonAnnotationsInside:

```java
@Retention(RetentionPolicy.RUNTIME)
    @JacksonAnnotationsInside
    @JsonInclude(Include.NON_NULL)
    @JsonPropertyOrder({ "name", "id", "dateCreated" })
    public @interface CustomAnnotation {}
```

Agora, se usarmos a nova anotação em uma entidade:

```java
@CustomAnnotation
public class BeanWithCustomAnnotation {
    public int id;
    public String name;
    public Date dateCreated;
}
```

Teste

```java
@Test
public void whenSerializingUsingCustomAnnotation_thenCorrect()
  throws JsonProcessingException {
    BeanWithCustomAnnotation bean 
      = new BeanWithCustomAnnotation(1, "My bean", null);
 
    String result = new ObjectMapper().writeValueAsString(bean);
 
    assertThat(result, containsString("My bean"));
    assertThat(result, containsString("1"));
    assertThat(result, not(containsString("dateCreated")));
}
```

saida

```java
{
    "name":"My bean",
    "id":1
}
```
