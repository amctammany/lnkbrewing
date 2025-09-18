import { prisma } from "../lib/client";
import styles from "../data/styles.json";
import {
  HopUsage,
  StyleCategory,
  YeastFlocculation,
  YeastForm,
  YeastType,
} from "@prisma/client";
import hops from "../data/hops.json";
import grains from "../data/grains.json";
import yeasts from "../data/yeasts.json";
import yakima from "../data/yakima.json";
import slugify from "@/lib/slugify";
async function main() {
  await prisma.style.deleteMany();
  await prisma.waterProfile.deleteMany();
  await prisma.equipmentProfile.deleteMany();
  //  await prisma.hopNote.deleteMany();
  //  await prisma.hopSensoryPanel.deleteMany();
  //  await prisma.characteristicAroma.deleteMany();
  await prisma.hop.deleteMany();
  await prisma.fermentable.deleteMany();
  await prisma.otherIngredient.deleteMany();
  await prisma.yeast.deleteMany();
  await prisma.style.createMany({
    data: styles.map(({ category, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
    })),
  });
  await prisma.waterProfile.create({
    data: {
      name: "RO",
      slug: slugify("RO", { lower: true }),
      description: "Reverse Osmosis",
      calcium: 1,
      magnesium: 0,
      sulfate: 1,
      chloride: 4,
      bicarbonate: 16,
      sodium: 8,
    },
  });
  const jb = await prisma.waterProfile.create({
    data: {
      name: "Juicy Bits",
      slug: slugify("Juicy Bits", { lower: true }),
      description: "Juicy!",
      calcium: 140,
      magnesium: 0,
      sulfate: 90,
      chloride: 175,
      bicarbonate: 0,
      sodium: 0,
      forks: {
        create: {
          //forks: [],
          name: "amctammany Juicy Bits",
          slug: slugify("amctammamy Juicy Bits", { lower: true }),
          description: "Juicy!",
          calcium: 150,
          magnesium: 0,
          sulfate: 92,
          chloride: 165,
          bicarbonate: 0,
          sodium: 0,
        },
      },
    },
  });

  await prisma.waterProfile.create({
    data: {
      name: "Good",
      slug: slugify("Good", { lower: true }),
      description: "good",
      calcium: 10,
      magnesium: 20,
      sulfate: 50,
      chloride: 100,
      bicarbonate: 6,
      sodium: 15,
    },
  });

  await prisma.equipmentProfile.create({
    data: {
      name: "Anvil 10.5",
      slug: slugify("Anvil 10.5", { lower: true }),
      description: "Anvil Foundry",
      boilOffRate: 0.5,
      trubLoss: 0.55,
      mashLoss: 0,
      fermenterLoss: 0.5,
      batchVolume: 4.4,
      preboilVolume: 6.5,
      boilVolume: 6.5,
      brewEfficiency: 0.7,
      mashEfficiency: 0.6,
      boilTime: 60,
    },
  });

  await prisma.hop.createMany({
    //eslint-disable-next-line
    data: hops.map(({ aromas, usage, flavorMap, ...hop }: any) => ({
      flavor: aromas,
      ...hop,

      slug: slugify(hop.name),
      usage: HopUsage[usage?.toLowerCase() as HopUsage] || HopUsage.dual,
    })),
  });
  await prisma.fermentable.createMany({
    data: grains.map((grain) => ({
      ...grain,
      slug: slugify(grain.name, { lower: true }),
    })),
  });
  await prisma.otherIngredient.createMany({
    data: [
      {
        name: "Baking Soda (NaHCO3)",
        slug: slugify("Baking Soda (NaHCO3)", { lower: true }),
        type: "agent",
      },
      {
        name: "Gypsum (CaSO4)",
        slug: slugify("Gypsum (CaSO4)", { lower: true }),
        type: "agent",
      },
    ],
  });
  await prisma.yeast.createMany({
    data: yeasts.map(
      ({ type, form, flocculation, temp, attenuation, notes, ...yeast }) => ({
        ...yeast,
        type: YeastType[type as YeastType],
        flocculation:
          YeastFlocculation[
            flocculation?.replace(" ", "") as YeastFlocculation
          ],
        form: YeastForm[form as YeastForm],
        attenuation: attenuation / 100,
        tempLow: temp[0],
        tempHigh: temp[1],
        notes: notes[0],
        usage: notes[1],
      })
    ),
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
