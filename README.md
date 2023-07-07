<p align="center">
  <a href="https://github.com/jessicsw/dune-quotes">
    <img src="./assets/dune.png" alt="Logo" width="120" height="120">
  </a>

  <p align="center">A free RESTful API serving Dune Quotes</p>
  <h3 align="center">Dune Quotes API</h3>
</p>

<br><br>

# About

After finishing the original series, I wanted a way to access all the memorable quotes I came across but couldn't find an API that served Dune quotes so I made one.

# Usage

Dune Quotes is a free, easy to use RESTful API that returns JSON and uses standard HTTP features.

API endpoints are relative to the following base URL: `https://api.duniverse.space/v1/`

# Rate Limit

The default rate limit is __100 requests per hour__, per IP address. If the rate limit is exceeded, the API will respond with a `429` status code. 

# Using the REST API
Dive into the specifics of each API endpoint by checking out the complete documentation below.


## Get random quote

Returns a single random quote.

```js
GET /random
```

### Query Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `title`     | `String`    | (Optional) Get a random quote from a specific book title
| `author`    | `String`    | (Optional) Get a random quote by one author
| `authorId`  | `String`    | (Optional) Same as `author` parameter, except it uses `authorId`

### Response

```ts
{
  id: string,

  text: string,

  book: {
    title: string,

    author: {
      name: string
    }
  }
}
```


## Get list of quotes

Returns a list of quotes matching a given query. By default, this will return a paginated list of all quotes.

```js
GET /quotes
```

### Query Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `title`     | `String`    | (Optional) Get a list of quotes from a specific book title
| `author`    | `String`    | (Optional) Get a list of quotes by one author
| `authorId`  | `String`    | (Optional) Same as `author` parameter, except it uses `authorId`
| `limit`     | `Number`    | `Min: 1` &nbsp; `Max: 100` &nbsp; `Default: 10` <br><br> (Optional) Sets the number of quotes to return per page
| `page`      | `Number`    | `Min: 1` &nbsp; `Default: 1` <br><br> (Optional) The page of results to return. If the value is greater than the total number of pages, the request will not return any results

### Response

```ts
{
  count: number, // The number of quotes returned in the response

  totalCount: number, // The total number of quotes matching the query

  page: number, // The current page number

  quotes: Array<{
    id: string,

    text: string,

    book: {
      title: string,
      
      author: {
        name: string
      }
    }
  }>
}
```

## Get quote by ID

Returns a quote by its ID

```js
GET /quotes/:id
```

### Response

```ts
{
  id: string,

  text: string,

  book: {
    title: string,

    author: {
      name: string
    }
  }
}
```

## Get list of books

Returns a list of books matching a given query. By default, this will return a paginated list of all books.

```js
GET /books
```

### Query Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `title`     | `String`    | (Optional) Get a specific book title
| `bookId`     | `String`    | (Optional) Same as `title`, except it uses `bookId`
| `author`    | `String`    | (Optional) Get a list of books by one author
| `authorId`  | `String`    | (Optional) Same as `author` parameter, except it uses `authorId`
| `limit`     | `Number`    | `Min: 1` &nbsp; `Max: 100` &nbsp; `Default: 10` <br><br> (Optional) Sets the number of books to return per page
| `page`      | `Number`    | `Min: 1` &nbsp; `Default: 1` <br><br> (Optional) The page of results to return. If the value is greater than the total number of pages, the request will not return any results

### Response

```ts
{
  count: number, // The number of books returned in the response

  totalCount: number // The total number of books matching the query

  page: number, // The current page number

  books: Array<{
    id: string,

    title: string,

    published: integer

    author: {
      name: string
    }
  }>
}
```

## Get book by ID

Returns a book by its ID.

```js
GET /books/:id
```

### Response

```ts
{
  id: string,

  title: string,

  published: integer

   author: {
    name: string
  }
}
```

## License

[MIT License](./LICENSE) © 2023 Jessica Wong