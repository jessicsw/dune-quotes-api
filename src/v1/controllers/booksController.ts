import prisma from "../../db";
import sanitizeQuery from "../../../utils/sanitizeQuery";

const getAllBooks = async (req, res) => {
  const { title, author, authorId, limit, page } = req.query;
  const take = Number(limit) || 10;
  const skip = page && Number(page) > 1 ? (Number(page) - 1) * take : 0;

  try {
    const books = await prisma.book.findMany({
      skip,
      take,
      where: {
        title: sanitizeQuery(title as string),
        authorId: authorId as string,
        author: sanitizeQuery(author as string),
      },
      select: {
        id: true,
        title: true,
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
      where: {
        title: sanitizeQuery(title as string),
        authorId: authorId as string,
        author: sanitizeQuery(author as string),
      },
    });

    const totalCount = await prisma.book.count({
      where: {
        title: sanitizeQuery(title as string),
        authorId: authorId as string,
        author: sanitizeQuery(author as string),
      },
    });

    if (books.length === 0) {
      throw new Error();
    } else {
      res.json({
        count,
        totalCount,
        page: page ? Number(page) : 1,
        books,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "400 - Bad Request",
      message: "Please check query parameters",
    });
  }
};

export default {
  getAllBooks,
};
