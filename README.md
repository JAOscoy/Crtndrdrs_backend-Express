# Backend Proyecto Crtndrdrs (Cartones de hidalgo) (API URL)

La API se encuentra en el siguiente [enlace](https://crtndrdrs.herokuapp.com/).


## Objetos JSON generados por la API (API JSON Objects returned)

### Usuarios para autentificación (Authenticated users)

```
{
  "user": {
    "email": "address@domain.com",
    "role": "ADMIN",
    "token": "eyJhbY295bWxAZ21haWwuY29tIiwicm9sZSI6IkFETUlOdefgrNjk5fQ.T51v67oo7YiWhHXn66iX05pwsmmkXgyGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphLm9zPydP5piZPpT8"
  }
}
```

### Productos relacionados con el diseño de corrugado (Design products structure)

```
{
  "suaje": false,
  "_id": "60503cbdd531ee34def85d07",
  "idLocal": "dfedefg47",
  "descripcion": "Cajas de 24Kg",
  "idUsuario": "address@domain.com",
  "createdAt": "2021-03-16T05:06:05.179Z",
  "updatedAt": "2021-03-16T05:06:05.179Z",
  "__v": 0
}
```

### Productos relacionados con la venta de corrugado (Sales product structure)

```
{
    "suaje": false,
    "_id": "5fc3d5a130024fb085af64ab",
    "idLocal": "CJ246",
    "estructura": "caja regular",
    "descripcion": "Corrugado 12 SH 1 LT",
    "tipo": "regular",
    "calibreECT": 32,
    "caraExterior": "kraft",
    "largo": 32.3,
    "ancho": 24.5,
    "alto": 30.3,
    "tipoUnion": "CIG"
}
```

### Pedidos con uno o varios productos (Service Order structure)

```
{
    "productosOrden": [],
    "disenosOrden": [],
    "_id": "5fc2c00363a03f8681500704",
    "idUsuario": "5fbb61187757f4349a0027bd",
    "tipo": "ordenProduccion",
    "estado": "abierta",
    "foliointerno": "0000000031",
    "Servicios": [
    {
        "idServicio": "5fbb61187757f4349a0027bd",
        "idLocal": "idService",
        "descripcion": "piezas",
        "importe": 30375.01
    }
    ],
    "fechaEmision": "2020-09-09T00:00:00.000Z",
    "fechaCierre": "2020-09-10T00:00:00.000Z"
}
```

## Endpoints

### Autentificación (Login)

POST /users/login

Ejemplo request.body (Example request body):

```
{
	"email": "mail@domain.com",
	"password": "S3crett1234"
}
```

No requiere autentificación. Regresa usuario y TOKEN. (No authentication required, returns JWT and main user data)

### Obtener información de usuario actual. (Get logged user data)

GET /users/me

Requiere autentificación, por medio del token regresa los datos guardados en req.user (Requires authentication, data is obtained from JWT req.user ).

### Crear nuevo usuario (Create new users)

POST /users

Ejemplo request.body (Example request body):

```
{    
	"apellidoContacto": "lastName",
    "nombreContacto": "firstName",
    "email": "mail@domain.com",
    "calle": "Street",
    "numero": "number",
    "alcaldia_municipio": "neighborhood",
    "ciudad": "city",
    "cp": 55991, 
    "rfc": "taxId",
    "razonSocial": "company name CO",
    "password": "Secre3tpassw0rd"
}
```

No requiere autentificación. Regresa usuario nuevo con nivel de acceso "USER". (No authentication required, returns new user data "USER" level access).

Requeridos (Required): `email`, `password`, `lastName`, `ciudad`, `apellidoContacto`, `nombreContacto`


### Get all users on the DBMS

GET /users

Requiere autentificación y nivel de acceso "ADMIN". (Requires authentication, and role validation "ADMIN" ).

### Modify current user

PUT /me/users

Ejemplo request.body (Example request body):

```
{
    "calle": "Street",
    "numero": "number",
    "alcaldia_municipio": "neighborhood",
    "ciudad": "city",
    "cp": 55991, 
}
```

Requiere autentificación, y los campos email, password, nivel de acceso y las fechas no pueden ser modificados. En el body puede tener uno o más campos. (Requires authentication. Email, password, role and dates cannot be modified, body can contains one or more fields).

### Delete current user

DELETE /me/users

Requiere autentificación. (Requires authentication).

### Get all sales products

GET /salesProduct

Requiere autentificación y nivel de acceso "ADMIN". (Requires authentication, and role validation "ADMIN" ).

### Post and push a new sales product on the cart

POST /salesProduct/me

Ejemplo request.body (Example request body):

```
{
	"idLocal": "dfedefg47",
	"descripcion": "Cajas de 24Kg",
    "pesoKg": 36
}
```

Requiere autentificación, regresa producto creado y el objeto es incluido en el carrito de compra del usuario autentificado. Puede añadir tantos campos como esten disponibles (Requires authentication and the created product is pushed into the logged user cart, they can add as many fields as needed). 

Requeridos (Required): `idLocal`

### Modify sales products by local id

PUT /salesProduct/:idLocal

Ejemplo request.body (Example request body):

```
{
	"idLocal": "drd4w3",
	"suaje": true
}
```

Requiere autentificación, y los campos idUsuario, idLocal y las fechas no pueden ser modificados. En el body puede tener uno o más campos. (Requires authentication. idUsuario, idLocal and dates cannot be modified, body can contains one or more fields).

Requeridos (Required): `idLocal`

### Delete sales product by local id

DELETE /salesProduct/:idLocal

Ejemplo request.body (Example request body):

```
{
	"idLocal": "drd4w3",
}
```

Requiere autentificación. (Requires authentication).










