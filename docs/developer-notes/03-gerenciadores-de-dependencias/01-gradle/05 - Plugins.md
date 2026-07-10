---

title: 05 - Plugins
---


# Principais plugins

-> https://docs.gradle.org/current/userguide/plugin_reference.html#plugin_reference

## Plugins

Link: https://docs.gradle.org/current/userguide/plugins.html#sec:plugins_block

Os plugins em Gradle adicionam comportamento (tarefas, convenções, configurações) aos builds. Existem duas abordagens principais para aplicar plugins:

- `plugins {}` block (recomendado, suporta resolução via Plugin Portal e declara versões)
- `buildscript {}` + `apply plugin:` (legado, usa classpath do build)

## Sintaxe básica (Groovy DSL)

```groovy
plugins {
        id 'java'                             // plugins incorporados ou do Plugin Portal
        id 'org.jetbrains.kotlin.jvm' version '1.9.0' // plugin de terceiros com versão
        id 'com.github.johnrengelman.shadow' version '8.1.1' apply false // não aplicar imediatamente
}
```

Kotlin DSL equivalente (build.gradle.kts):

```kotlin
plugins {
        java
        id("org.jetbrains.kotlin.jvm") version "1.9.0"
        id("com.github.johnrengelman.shadow") version "8.1.1" apply false
}
```

Quando usar `apply false`: declara o plugin (para que sua versão seja resolvida) sem aplicá-lo no projeto atual — útil em builds multi-projeto onde o plugin será aplicado apenas em subprojetos.

## `pluginManagement` (settings.gradle(.kts))

Use `pluginManagement` para controlar repositórios e versões em nível de build (bom para corporativo):

```groovy
// settings.gradle
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
        maven { url 'https://my.company.repo/repository/maven-public/' }
    }
}
```

No Kotlin DSL:

```kotlin
// settings.gradle.kts
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}
```

Define versões comuns em `settings.gradle` ou num arquivo compartilhado para evitar duplicação.

## Quando usar `buildscript` (legacy)

Algumas bibliotecas/plug-ins antigos exigem que você adicione a dependência ao classpath do build:

```groovy
buildscript {
        repositories { mavenCentral() }
        dependencies { classpath 'com.some:old-plugin:1.2.3' }
}

apply plugin: 'com.some.old-plugin'
```

Prefira `plugins {}` quando possível — é mais declarativo e dá suporte melhor a verificação de compatibilidade e resolução.

## Exemplos práticos

- Java simples:

```groovy
plugins {
    id 'java'
}

repositories { mavenCentral() }

dependencies {
    testImplementation 'junit:junit:4.13.2'
}
```

- Aplicação (application plugin):

```groovy
plugins { id 'application' }

application {
    mainClass = 'com.example.Main'
}
```

- Kotlin JVM (Kotlin plugin):

```groovy
plugins {
    id 'org.jetbrains.kotlin.jvm' version '1.9.0'
}
dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib"
}
```

- Shadow (criar fat jar):

```groovy
plugins {
    id 'com.github.johnrengelman.shadow' version '8.1.1'
}

// depois use: gradle shadowJar
```

## Como descobrir o plugin id / versões

- Plugin Portal: https://plugins.gradle.org/
- Documentação do plugin no GitHub (README normalmente mostra `id` e `version`)

## Boas práticas

- Declare versões explicitamente para reproduzibilidade.
- Prefira `plugins {}` para novos projetos.
- Use `apply false` no root quando quiser controlar aplicação em subprojetos.
- Centralize repositórios e políticas via `pluginManagement`.
- Evite misturar `plugins {}` e `buildscript {}` para o mesmo plugin.

## Debug e informações úteis

- Ver tarefas adicionadas por um plugin:

```shell
./gradlew tasks --all
```

- Ver a versão do plugin aplicável e informações de build:

```shell
./gradlew help --task compileJava
```

## Referências

- https://docs.gradle.org/current/userguide/plugins.html
- https://docs.gradle.org/current/userguide/plugin_management.html
