import { prisma } from "../lib/client";
import styles from "../data/styles.json";
import { StyleCategory } from "../generated/prisma";
async function main() {
  await prisma.style.deleteMany();

  await prisma.style.createMany({
    data: styles.map(({ category, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    //eslint-disable-next-line
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
