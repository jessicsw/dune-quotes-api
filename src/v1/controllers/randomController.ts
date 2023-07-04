import prisma from "../../db";
import sanitizeQuery from "../../../utils/sanitizeQuery";
import { Response, Request } from "express";
import { URL } from "./../../types.d";

const getRandomQuote = async (req: Request, res: Response): Promise<void> => {
  const { title, author, authorId }: URL.Query = req.query;

  try {
    const quotes = await prisma.quote.findMany({
      where: {
        book: {
          title: title ? sanitizeQuery(title) : {},
          authorId: authorId || {},
          author: {
            name: author ? sanitizeQuery(author) : {},
          },
        },
      },
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

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    res.json(quote);
  } catch (error) {
    res.status(400).json({
      status: "400 - Bad Request",
      message: "Check query parameters",
    });
  }
};

// Future TODO: function getRandomQuotes

export default {
  getRandomQuote,
};
