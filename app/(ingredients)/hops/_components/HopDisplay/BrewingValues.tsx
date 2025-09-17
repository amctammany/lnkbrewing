import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hop } from "@prisma/client";
import React from "react";

export default function BrewingValues({ src }: { src: Hop }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brewing Values</CardTitle>
      </CardHeader>
      <CardContent>
        <Prop label="Alpha" value={src.alpha} />
        <Prop label="Beta" value={src.beta} />
      </CardContent>
    </Card>
  );
}
