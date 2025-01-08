import { useEffect, useState } from "react";

import PageTitle from "@/components/PageTitle";

import { useAuth } from "@/lib/SessionWrapper";

import useArena from "@/hooks/useArena.jsx";

export default function Home() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { arenas } = useArena(userId);

  return (
    <>
      <PageTitle title={"Home"} icon="House" />

      {arenas?.map((a) => a.title)}
      <h2>
        homepage show next game, with incoming wheater, time to leave before
        game and gas cost.
      </h2>
      <br />
      <h2>
        Statspage show stats like: play time Track, goals, assists and second
        assist, points, penalty minutes. show last 5 games final score. strava
        tracking?
      </h2>
      <br />

      <h2>
        Expensespage show stats like: gas cost, game cost, beer cost, sticks
        cost, equipment cost.
      </h2>
      <br />

      <h2>
        teampage show: team i play in, color white/black or home/away, add a
        team, usuall play time 22h35,
      </h2>
      <br />
      <h2>
        Settingspage show: global settings for the user like: home address,
        recurring playing day
      </h2>
      <br />
      <h2>
        Arenapage show: arena where i play, km away from home, cost to go there
      </h2>
    </>
  );
}
