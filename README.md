# Finance Tracker App

This Finance Tracker App was developed as a part of a coding interview process challenge you can find the specific instructions in the instructions and requirements section.

## Table of contents

#### [Instrucciones](#instructions)

#### [Scripts e instrucciones para correr el proyecto](#scriptsAndRunInstructions)

#### [Notas de desarrollador y puntos a mejorar a futuro](#developerComments)

<a name="instructions"></a>

## Instrucciones

### Front-end (React o Next, Jest, Coverage)

Desarrolla una aplicación de interfaz de usuario que permita a los usuarios abrir una nueva cuenta bancaria y realizar transacciones bancarias como depósitos y retiros.

1. La aplicación debe permitir a los usuarios introducir los detalles de su cuenta, como el nombre, el número de cuenta y el saldo inicial.
2. Los usuarios deben poder realizar depósitos y retiros, introduciendo el monto de la transacción y seleccionando el tipo de transacción.
3. La aplicación debe mostrar el saldo actualizado de la cuenta después de cada transacción.
4. Implementa pruebas unitarias con Jest y asegúrate de que la cobertura de las pruebas sea completa.
5. Incluye un archivo README que explique cómo ejecutar el código y las pruebas

### Back-end  (Express o NestJS, Jest)

Desarrolla una API con los siguientes endpoints:

1. POST /accounts: Crea una nueva cuenta bancaria. Este endpoint debería aceptar detalles de la cuenta como el nombre y el número de cuenta, y devolver un ID de cuenta.
2. POST /transactions: Realiza una transacción bancaria. Este endpoint debería aceptar detalles de la transacción como el ID de la cuenta, el tipo de transacción (depósito o retiro) y el monto de la transacción.
Además, implementa un middleware que registre en la consola cada vez que se realiza un depósito de más de 10,000 US$.
Implementa pruebas unitarias con Jest y asegúrate de que la cobertura de las pruebas sea
completa. Incluye un archivo README que explique cómo ejecutar el código y las pruebas.

### Puntos Extra

Se darán puntos extra por:

1. Aplicar principios de DDD (Domain-Driven Design).
2. Implementar Event Sourcing.
3. Seguir las prácticas de Clean Code y Clean Architecture.
Por favor, ten en cuenta que el código que entregues puede estar incompleto en cuanto a
funcionalidad, pero siempre debe ser capaz de compilar y ejecutar las pruebas.
Aclaraciones: Para facilitar el ejercicio, no es requerido implementar una base de datos, puede
utilizar variables en memoria para el backend

<a name="scriptsAndRunInstructions"></a>

## Scripts e instrucciones para correr el proyecto

### Prerequisitos

Instalar NodeJs version 16.x or superior

### Frontend

Para instalar y testear el frontend se pueden utilizar los siguientes comandos:
    npm install
    
    npm start
    
    npm test

### Backend

Para instalar y testear el backend se pueden utilizar los siguientes comandos:

    npm install
    
    npm run build
    
    npm run seed - para crear el archivo de base de datos y las tablas
    
    npm run test
    
    npm run start - asegurate de haber ejecutado el comando build antes

Para probar los endpoints se puede utilizar el swagger el cual se encuentra en la url: <http://localhost:3001/api-docs/public/> o con el archivo de Postman BankAppAssignment.postman_collection.json

<a name="developerComments"></a>

## Notas de desarrollador y puntos a mejorar a futuro

Dado que poseo mas experiencia como desarrollador backend para este proyecto, he intentado centrarme mas en este aspecto del proyecto.
Para empezar cree la base de datos para el proyecto, decidi usar SQLite ya qye no requiere instalacion o montar un servidor especifico; despues, cree los controladores y servicios para el proyecto y por ultimo los tests en jest, libreria que tuve que aprender a utilizar ya que es estoy mas acostumbrado a utilizar otras librerias como Mocha Chai Sinon y NYC. Luego continue testeando y corrigiendo bugs del backend hasta que quede satisfecho.

Para una muestra de como implementaria algunas de las mejoras mencionadas como seguridad o checkeo de coverage  de tests pueden dirigirse a este repositorio (<https://github.com/ajvg94/finance-tracker-app>).

En cuanto a mejoras para el backend existen muchas, desde agregar mas endpoints para tanto para las transacciones como para las cuentas (me limite a solo los endpoints solicitados por el ejercicio), asi como tambien seguridad mediante el uso de librerias como JWT, Bcrypt y Passport por ejemplo, la implementacion de cache con redis en caso de ser necesario. Tambien quiero mencionar que se podria implmentar un checkeo del coverage de los tests mediante librerias como NYC o alguna otra que sea compatible con Jest.

Para el front end cree los componentes necesarios para poder mandar los datos al backend y sus respectivos tests.
Como mencione anteriormente todavia me encuentro aprendiendo y mejorando con React por lo cual no implemente mas funcionalidades aparte de las basicas solicitadas.
Como mejoras a futuro se puede mejorar el aspecto de los componentes asi como tambien crear nuevos componentes para el login, un dashboard, historial de transacciones, etc.

Quedo atento a cualquier duda o sugerencia.

Muchas gracias.