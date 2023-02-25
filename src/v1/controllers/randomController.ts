import prisma from "../../db";
import sanitizeQuery from "../../../utils/sanitizeQuery";

const getRandomQuote = async (req, res) => {
  const { title, author, authorId } = req.query;
  try {
    const quotes = await prisma.quote.findMany({
      where: {
        book: {
          title: sanitizeQuery(title as string),
          authorId: authorId as string,
          author: {
            name: sanitizeQuery(author as string),
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

    if (quotes.length === 0) {
      throw new Error();
    }

    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(quote);
  } catch (error) {
    res.status(400).json({
      status: "400 - Bad Request",
      message: "Invalid query parameters",
    });
  }
};

// function getRandomQuotes
// requires take

export default {
  getRandomQuote,
};
