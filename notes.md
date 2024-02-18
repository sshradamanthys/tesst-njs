# Rest API

## Arquitectura de Software

- 2000, Roy Fielding

## Características Principales

- Simplicidad
- Escalabilidad
- Portabilidad
- Visibilidad
- Fiabilidad
- Fácil de Modificar
- Recursos (Entidades)
- Cada recurso se identifica con una URL
- Verbos Http
- Representaciones (JSON, XML)
- Stateless (servidor -> no debe tener estado, el cliente envía toda la información)
- Interfaz uniformes
- Separación de Conceptos (Cliente - Servidor)

## Idempotencia

Propiedad de realizar una acción determinada varias veces y aún así conseguir siempre el mismo resultado que se obtendría al hacerlo una vez

## Post

Crear un nuevo elemento/recurso en el servidor

## Put

Actualiza totalmente un elemento ya existente o creqarlo si no existe (idempotente)

## Patch

Actualizar parcialmente un elemento o recurso (updateAt)
