import { useEffect, useState } from "react";

import PageTitle from "@/components/PageTitle";

import { useAuth } from "@/lib/SessionWrapper";

export default function Stats() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  return (
    <>
      <PageTitle title={"Stats"} icon="BarChart" />
    </>
  );
}
