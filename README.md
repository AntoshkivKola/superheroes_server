# Superheroes server

Проект создан для практики в фреймворке **Express js**,и ORM **Sequelize**. 

### Возможности:
 принимает http запросы для сохранения, получения супергероев, их фото и суперсил!

### Инсталяция: 

`$ git clone https://github.com/AntoshkivKola/superheroes_server.git `
`$ npm install`




### Использование:  
- Для запуска введите в консоль`$ ./start.sh `;
#### Сургерой: 
- Для создания супергероя отправьте запрос `POST http://localhost:3000/api/superheroes/ HTTP/1.1` с телом запроса:
   ```
   {
    "nickname": "имя супергероя",
    "realName": "настоящее имя",
    "originDescription": "описание",
    "catchPhrase": "“​крылатая фраза”",
    "superpowers": ["полёт","невидемость"] // масив суперсил
  }
   ```
- Для получения супергероя отправьте запрос  `GET http://localhost:3000/api/superheroes/1 HTTP/1` : получение героя с id 1.
- Для удаления супергероя отправьте запрос  `DELETE http://localhost:3000/api/superheroes/1 HTTP/1.1` : удаление героя с id 1.
- Для обновления данных героя отправьте запрос `PATCH http://localhost:3000/api/superheroes/1 HTTP/1.1` с телом запроса:
  ```
    {
      "nickname": "имя супергероя",
      "realName": "настоящее имя",
      "originDescription": "описание",
      "catchPhrase": "“​крылатая фраза”",
      "superpowers": ["полёт","невидемость"] // масив суперсил
    } 
  ```
  Вы можете обновить только некоторые параметры, тогда указывать остальные не обязательно.
#### Суперсила: 
+ Для создания суперсилы отправьте запрос `POST http://localhost:3000/api/superpowers HTTP/1.1` с телом запроса:
   ```
    {
      "superpower": "solar",
      "superheroId":6
    }
   ```
+ Для получения суперсилы отправьте запрос  `GET http://localhost:3000/api/superpowers/1 HTTP/1.1` : получение суперсилы с id 1.
+ Для удаления суперсилы отправьте запрос  `DELETE http://localhost:3000/api/superpowers/1 HTTP/1.1` : удаление суперсилы с id 1.
+ Для обновления суперсилы отправьте запрос `PATCH http://localhost:3000/api/superpowers/2 HTTP/1.1` с телом запроса:
  ```
  {
    "superpower": "abrakadabra"
  } 
  ```
----------------
Также в проекте описаны тесты, они находятся в папке *test* чтобы их использовать, вам понадобится расширение **REST Client**, зайдите в один из них и нажмите *Send Request*. 
