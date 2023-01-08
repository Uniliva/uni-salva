### Redirecionaemnto

> Caso queria redirecionar o que recebe em uma url crie um arquivo  xml junto as aplicações



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" "http://www.eclipse.org/jetty/configure_9_0.dtd">

<Configure class="org.eclipse.jetty.webapp.WebAppContext">
        <Set name="contextPath">/</Set>
        <Set name="war">/opt/jetty/webapps/<app>.war</Set>
</Configure>
```


