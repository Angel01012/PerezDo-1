# Principios de REST en el Contexto de una API

Los principios de REST (Transferencia de Estado Representacional) en el contexto de una API (Interfaz de Programación de Aplicaciones) se refieren a un conjunto de guías utilizadas para la creación de servicios web eficientes. Desarrollados por Roy Fielding en su disertación doctoral en el año 2000, estos principios aprovechan las tecnologías y protocolos estándar de la web para que las aplicaciones se comuniquen de manera predecible y escalable. A continuación, se describen los principales principios y restricciones que definen una API RESTful:

## 1. Interfaz Uniforme (Uniform Interface)

Este es el principio central de REST y significa que la API debe ser consistente en la forma en que se accede a los recursos. Esto implica, por ejemplo, el uso de URIs estandarizadas y métodos HTTP consistentes (GET para obtener recursos, POST para crear nuevos, PUT para actualizar y DELETE para eliminar).

## 2. Sin Estado (Stateless)

Cada solicitud del cliente al servidor debe contener toda la información necesaria para comprender y completar la solicitud. El servidor no almacena ningún estado de sesión del cliente entre peticiones, lo que hace que la comunicación no dependa del contexto almacenado en el servidor.

## 3. Cacheable (Cacheabilidad)

Las respuestas a las peticiones deben ser definidas como cacheables o no. Si los datos son cacheables, el cliente puede reutilizar la respuesta para peticiones similares en el futuro, lo que mejora la eficiencia y escalabilidad del sistema.

## 4. Cliente-Servidor (Client-Server)

Al separar la interfaz de usuario (cliente) de la lógica de almacenamiento de datos (servidor), se mejora la portabilidad de la interfaz de usuario a través de múltiples plataformas y se simplifica la escalabilidad del servidor.

## 5. Sistema en Capas (Layered System)

Un cliente no puede, en general, distinguir si está conectado directamente a un servidor final o a un intermediario a lo largo del camino. Esto permite a los desarrolladores estructurar sistemas complejos de manera más eficiente a través de capas que encapsulan la lógica y facilitan la escalabilidad.

## 6. Código bajo demanda (Code on Demand, opcional)

REST permite que la funcionalidad del cliente se extienda descargando y ejecutando código en forma de applets o scripts, proporcionando así una forma de extender los clientes en servidores.

## 7. Sistema Basado en Recursos (Resource-Based)

En lugar de acciones o comandos, REST trabaja manipulando representaciones de recursos a través de una serie de pasos predefinidos.

Una API REST se adhiere a estos principios para proporcionar sinergia entre componentes de sistemas distribuidos, promoviendo el rendimiento, la confiabilidad y la escalabilidad. Además, las representaciones de los recursos en una API REST suelen ser en formatos como JSON (JavaScript Object Notation) o XML (Extensible Markup Language), que son cómodos de leer y manipular tanto para humanos como para máquinas.
