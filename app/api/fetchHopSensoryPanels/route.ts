import { NextResponse } from "next/server";

/**
import * as cheerio from "cheerio";
import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";
import axios from "axios";
const categories = [
  "sweetAromatic",
  "berry",
  "stoneFruit",
  "pomme",
  "melon",
  "tropical",
  "citrus",
  "floral",
  "herbal",
  "vegetal",
  "grassy",
  "earthy",
  "woody",
  "spicy",
] as const;
type CategoryName = keyof typeof categories;
type Point = [number, number];
const origin: Point = [310, 310];
const dist = (p1: Point, p2: Point) =>
  Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);

const fetchSensoryData = async (path: string, hopId: number) =>
  new Promise((resolve, reject) => {
    axios(path)
      .then((res) => {
        if (!res) return reject();
        if (res.status == 404) return reject();
        const $ = cheerio.load(res.data);
        const pointStr = $(
          ".sensory-analysis-chart > polygon.polygon-chart"
        ).attr("points");
        if (!pointStr) return resolve(null);
        //if (!pointStr) return reject(new Error("invalid?"));
        const points = pointStr
          .split(" ")
          .map((s) => s.split(",").map((n) => parseFloat(n)));
        const dists = (points as Point[]).map((p: Point) =>
          (dist(p, origin) / 226.3).toPrecision(2)
        );

        const flavorMap = dists.reduce(
          (acc, d, i) => {
            acc[categories[i]] = parseFloat(d);
            return acc;
          },
          { hopId } as Record<any, number>
        );

        return resolve(flavorMap);
      })
      .catch((err) => reject(null));
  });

function getHopUrl(slug: String) {
  return `https://www.yakimachief.com/${slug}.html`;
}
export async function GET() {
  const hops = await prisma.hop.findMany({
    select: { slug: true, id: true },
  });
  await prisma.hopSensoryPanel.deleteMany();
  const res = await Promise.allSettled(
    hops.map(async ({ slug, id }) => {
      return fetchSensoryData(getHopUrl(slug), id);
    })
  );
  const data = res
    .filter((r) => r.status == "fulfilled")
    .map((f: any) => f.value)
    .filter((f) => f !== null);
  await prisma.hopSensoryPanel.createMany({ data });
  return NextResponse.json(data);
}
*/
export function GET() {
  return NextResponse.json({ body: "body" });
}
