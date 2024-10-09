#   /user

Esta es la documentación de todas las rutas relacionadas con los usuarios.


##  Crear usuario

Method: ```POST```

URL: ```http://localhost:3000/user/createUser```

Auth required: ```false```

Descripcion: Esta ruta crea un nuevo usuario en la base de datos. Tambien 
Crea la sesión así que el usuario no debe de loguearse.

Body: 
```js
{
    "identifier": "String",
    "nickName": "String",
    "password": "String", -> La contraseña debe ser de más de 8 caracteres
    "email": "String" -> Pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "profilePicture": "String",
    "address": "String",
    "phone": "String",
    "type": "String" -> 1 de 2 opciones, artesano - usuario

    No se admiten más parametros que estos
}
```


##  Actualizar usuario

Method: ```POST```

URL: ```http://localhost:3000/user/updateUser```

Auth required: ```true```

Descripcion: Esta ruta actualiza un campo del usuario logueado, recibe la llave del campo y el nuevo valor. No puede actualizar varios campos a la vez.

Body: 
```js
{
    "updateData": {
        "llave": "valor"
    }
}

Ejemplo de un caso de uso: 
{
    "updateData": {
        "nickName": "Peponazo"
    }
}
```

**Llaves disponibles:** nickName, password, profilePicture, address, phone, type, favorites, purchases, registeredWorkshops, coupons.




## Eliminar usuario

Method: ```GET```

URL: ```http://localhost:3000/user/deleteUser```

Auth required: ```true```

Descripcion: Esta ruta elimina el usuario que esta logueado en el momento. Al momento de eliminarlo se cierra la sesión.



## Log-in

Method: ```POST```

URL: ```http://localhost:3000/user/login```

Auth required: ```false```

Descripcion: Esta ruta verifica el usuario y contraseña de un usuario. Se puede usar email o numero de telefono en vez de nombre de usuario. Si es valido se loguea y se crea la sesión del usuario.

Body: 
```js
{
    "nickName": "String",
    "password": "String"
}
```


##  Log-out

Method: ```GET```

URL: ```http://localhost:3000/user/logout```

Auth required: ```true```

Descripcion: Esta ruta desloguea a un usuario.


##  Actualizar un campo Array de un usuario

Method: ```POST```

URL: ```http://localhost:3000/user/updateArray```

Auth required: ```true```

Descripcion: Esta ruta actualiza estos campos especificos de un usuario: purchases, favorites, coupons, registeredWorkshops

Body: 
```js
{
    llave: "String",
    array: ["ObjectId", "ObjectId"]
    action: "pull" // -» Este campo es opcional, solo si se desea eliminar de favoritos compras etc, se manda la llave action con el valor pull en string
}
```


##  Recoger los datos del usuario logueado

Method: ```GET```

URL: ```http://localhost:3000/user/userData```

Auth required: ```true```

Descripcion: Esta ruta retorna los datos de un usuario.

**RETURNS**:

```js
{
	_id: "66f5d2b90c3dbe12772396ac",
	nickName: "Pepazo",
	email: "usuario@ejemplo.com",
	profilePicture: "https://ejemplo.com/miPerfil.jpg",
	address: "Calle Falsa 123, Ciudad, País",
	phone: "+1234567890",
	type: "Artesano",
	favorites: [],
	purchases: [],
	registeredWorkshops: [],
	coupons: []
}
```


##  Autenticarse con Google

Method: ```GET```

URL: ```http://localhost:3000/user/auth/google```

Auth required: ```false```

Descripcion: Esta ruta es para que un usuario se loguee con google.



##  Autenticarse con Github

Method: ```GET```

URL: ```http://localhost:3000/user/auth/github```

Auth required: ```false```

Descripcion: Esta ruta es para que un usuario se loguee con github.



##  Autenticarse con Discord

Method: ```GET```

URL: ```http://localhost:3000/user/auth/discord```

Auth required: ```false```

Descripcion: Esta ruta es para que un usuario se loguee con github.

