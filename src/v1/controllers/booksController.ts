import { Response, Request } from "express";
import prisma from "../../db";
import sanitizeQuery from "../../../utils/sanitizeQuery";

const getAllBooks = async (req: Request, res: Response) => {
  const { title, author, authorId, limit, page } = req.query;
  const take = Number(limit) || 10;
  const skip = page && Number(page) > 1 ? (Number(page) - 1) * take : 0;
  const where = {
    where: {
      title: title ? sanitizeQuery(title as string) : {},
      authorId: authorId as string,
      author: {
        name: author ? sanitizeQuery(author as string) : {},
      },
    },
  };

  try {
    const books = await prisma.book.findMany({
      skip,
      take,
      ...where,
      select: {
        id: true,
        title: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const count = await prisma.book.count({
      skip,
      take,
      ...where,
    });

    const totalCount = await prisma.book.count({
      ...where,
    });

    if (books.length === 0) {
      throw new Error();
    }

    res.json({
      count,
      totalCount,
      page: page ? Number(page) : 1,
      books,
    });
  } catch (error) {
    res.status(400).json({
      status: "400 - Bad Request",
      message: "Please check query parameters",
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (book) {
      res.json(book);
    } else {
      throw new Error();
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: "400 - Bad Request", message: "Invalid ID" });
  }
};

export default {
  getAllBooks,
  getBookById,
};
