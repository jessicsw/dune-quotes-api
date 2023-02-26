<p align="center">
  <a href="https://github.com/jessicsw/dune-quotes">
    <img src="./assets/dune.jpeg" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Dune Quotes API</h3>
</p>

<br><br>

## About

Dune Quotes is a side project I started in 2023 because I couldn't find an API that provided quotes from Frank Herbert's Dune series.

Current books:

- Dune (1965)
- Dune Messiah (1969)
- Children of Dune (1976)
- God Emperor of Dune (1981)
- Heretics of Dune (1984)
- Chapterhouse: Dune (1985)


## Get random quote

Returns a single random quote.

### Query Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `title`     | `String`    | (Optional) Get a random quote from a specific book title
| `author`    | `String`    | (Optional) Get a random quote by one author
| `authorId`  | `String`    | (Optional) Same as `author` parameter, except it uses `authorId`

### Response

```
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

Example:
```
/api/v1/random?title=heretics-of-dune&author=frank-herbert
```

## Get list of quotes

Returns a list of quotes matching a given query. By default, this will return a paginated list of all quotes.

### Query Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `title`     | `String`    | (Optional) Get a list of quotes from a specific book title
| `author`    | `String`    | (Optional) Get a list of quotes by one author
| `authorId`  | `String`    | (Optional) Same as `author` parameter, except it uses `authorId`
| `limit`     | `Number`    | `Min: 1` &nbsp; `Max: 100` &nbsp; `Default: 10` <br><br> (Optional) Sets the number of quotes to return per page
| `page`      | `Number`    | `Min: 1` &nbsp; `Default: 1` <br><br> (Optional) The page of results to return. If the value is greater than the total number of pages, the request will not return any results

### Response

```
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


### Response

```
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

```
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


### Response

```
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