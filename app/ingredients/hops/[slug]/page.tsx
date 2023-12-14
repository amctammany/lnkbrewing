import { HopDisplay } from "@/app/ingredients/hops/_components/HopDisplay/HopDisplay";
import { getHop } from "../queries";
type HopDisplayPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: HopDisplayPageProps) {
  return {
    title: `LNK Hop: ${params.slug}`,
  };
}

export default async function HopDisplayPage({
  params: { slug },
}: HopDisplayPageProps) {
  const hop = await getHop(slug);
  return <HopDisplay hop={hop} />;
}
