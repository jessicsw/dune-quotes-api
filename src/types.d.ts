export interface Book {
  id: string;
  title: string;
  published: number;
  author: {
    name: string;
  };
}

export interface Books {
  count: number;
  totalCount: number;
  page: number;
  books: Book[];
}

export namespace Error {
  export interface BadRequest {
    status: string;
    message: string;
  }
}

export namespace URL {
  export interface Query {
    title?: string;
    author?: string;
    authorId?: string;
    limit?: string;
    page?: string;
  }

  export interface Parameters {
    id?: string;
  }
}
