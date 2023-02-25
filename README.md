# Dune Quotes API



## Considerations

### Architecture


### Pagination

Using offset pagination for limited result set instead of cursor-based pagination because of limited result set.

## Get random quote

Returns a single random quote from the database.

### Query Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `title`     | `String`    | (Optional) Get a random quote from a specific book title
| `author`    | `String`    | (Optional) Get a random quote by one author
| `authorId`  | `String`    | (Optional) Same as `author` param, except it uses the author's id

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
| `title`     | `String`    | Get a list of quotes from a specific book title
| `author`    | `String`    | Get a list of quotes by one author
| `authorId`  | `String`    | Same as `author` parameter, except it uses `authorId`
| `limit`     | `Number`    | `Min: 1` &nbsp; `Max: 100` &nbsp; `Default: 10` <br><br> Sets the number of quotes to return per page
| `page`      | `Number`    | `Min: 1` &nbsp; `Default: 1` <br><br> The page of results to return. If the value is greater than the total number of pages, the request will not return any results

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

## Get list of books

Returns a list of books matching a given query. By default, this will return a paginated list of all books.

### Query Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `title`     | `String`    | Get a list of books from a specific book title
| `author`    | `String`    | Get a list of books by one author
| `authorId`  | `String`    | Same as `author` parameter, except it uses `authorId`
| `limit`     | `Number`    | `Min: 1` &nbsp; `Max: 100` &nbsp; `Default: 10` <br><br> Sets the number of books to return per page
| `page`      | `Number`    | `Min: 1` &nbsp; `Default: 1` <br><br> The page of results to return. If the value is greater than the total number of pages, the request will not return any results

### Response

```
{
  count: number, // The number of books returned in the response

  totalCount: number // The total number of books matching the query

  page: number, // The current page number

  books: Array<{
    id: string,
    title: string,
    author: {
      name: string
    }
  }>
}
```