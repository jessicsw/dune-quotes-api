import { PrismaClient } from "@prisma/client";
import { chapterhouseQuotes } from "../data/quotes/chapterhouse";
import { childrenQuotes } from "../data/quotes/children";
import { duneQuotes } from "../data/quotes/dune";
import { godEmperorQuotes } from "../data/quotes/godEmperor";
import { hereticsQuotes } from "../data/quotes/heretics";
import { messiahQuotes } from "../data/quotes/messiah";
import { titles } from "../data/titles";

const prisma = new PrismaClient();

const main = async () => {
  // await prisma.author.upsert({
  //   where: { name: "Frank Herbert" },
  //   update: {},
  //   create: {
  //     name: "Frank Herbert",
  //   },
  // });

  // const author = await prisma.author.findUnique({
  //   where: { name: "Frank Herbert" },
  // });

  // await Promise.all(
  //   titles.map(async (title) => {
  //     return await prisma.book.upsert({
  //       where: { title },
  //       update: {},
  //       create: {
  //         title,
  //         authorId: author.id,
  //       },
  //     });
  //   })
  // );

  await Promise.all(
    messiahQuotes.map(async (quote) => {
      return prisma.quote.create({
        data: {
          text: quote.text,
          book: {
            connect: { title: quote.title },
          },
        },
      });
    })
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
