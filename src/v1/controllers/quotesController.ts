import sanitizeQuery from "../../../utils/sanitizeQuery";
import prisma from "../../db";
import { Response, Request } from "express";
import { URL } from "./../../types.d";

const getAllQuotes = async (req: Request, res: Response): Promise<void> => {
  const { title, author, authorId, limit, page }: URL.Query = req.query;
  const take = Number(limit) || 10;
  const skip = page && Number(page) > 1 ? (Number(page) - 1) * take : 0;
  const where = {
    where: {
      book: {
        title: title ? sanitizeQuery(title) : {},
        authorId: authorId || {},
        author: {
          name: author ? sanitizeQuery(author) : {},
        },
      },
    },
  };

  try {
    const quotes = await prisma.quote.findMany({
      skip,
      take,
      ...where,
      select: {
        id: true,
        text: true,
        book: {
          select: {
            title: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const count = await prisma.quote.count({
      skip,
      take,
      ...where,
    });

    const totalCount = await prisma.quote.count({
      ...where,
    });

    res.json({
      count,
      totalCount,
      page: page ? Number(page) : 1,
      quotes,
    });
  } catch (error) {
    res.status(400).json({
      status: "400 - Bad Request",
      message: "Please check query parameters",
    });
  }
};

const getQuoteById = async (req: Request, res: Response): Promise<void> => {
  const { id }: URL.Parameters = req.params;
  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
      select: {
        id: true,
        text: true,
        book: {
          select: {
            title: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(quote);
  } catch (error) {
    res
      .status(400)
      .json({ status: "400 - Bad Request", message: "Invalid ID" });
  }
};

export default {
  getAllQuotes,
  getQuoteById,
};
