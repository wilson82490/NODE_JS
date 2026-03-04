

# Api Tienda


## Base url

http://localhost:3000


### Endpoints


#### GET / ping


Verifica que la API esta funcionando.



##### Response 200
````json
{
   "message" : "pong"
  }
````


##### GET / products

Devuelve la lista de productos


##### Response 200


```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200
}
```


##### GET /products/:id

Devuelve un producto por id.


##### Response 200

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200
}
```

##### Response 404

```json
{
  "error": "Producto no encontrado"
}
```

##### POST / products

Crea un nuevo producto



##### Body (JSON)


```json
{
  
  "name": "Keyboard",
  "price": 50
}
```


##### Response 201

```json
{
  "id": 3,
  "name": "Keyboard",
  "price": 50
}
```


##### Response 422

```json
{
  "error": "name is required"
}
```



##### GET / categories

Devuelve la lista de categorias


##### Response 200


```json
{
    "id": 1,
    "name": "Electro",
    "description": "Lorem ipsum",
}
```


##### GET /categories/:id

Devuelve una categoria  por id.

##### Response 200


```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200
}
```

##### Response 404

```json
{
  "error": "category not found"
}
```

##### POST / categories

Crea una nueva categoria