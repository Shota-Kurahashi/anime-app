/* eslint-disable no-unused-expressions */
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { Text } from "@mantine/core";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { FC } from "react";
import { Skeleton } from "src/components/Layout/loading/Skeleton";
import { useTodayEpisodeList } from "src/features/episodes/hooks/useTodayEpisodeList";

const DynamicTodayEpisodeItem = dynamic(
  () => import("src/features/episodes/components/TodayEpisodeItem"),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

export const TodayEpisodeList: FC = () => {
  const { indexPage, deferredFilterEpisodes } = useTodayEpisodeList();

  return (
    <>
      <ul className="flex flex-wrap gap-2 md:gap-4">
        {deferredFilterEpisodes?.map((episode) => (
          <DynamicTodayEpisodeItem episode={episode} key={episode.id} />
        ))}
      </ul>
      {indexPage && (
        <Text
          align="center"
          component="p"
          className="mt-6 flex w-full items-center justify-center hover:underline"
        >
          <Link href="/lists/today" className="text-base md:text-lg">
            今日のエピソードをもっと見る
          </Link>
          <ArrowSmallRightIcon className="ml-1 h-6 w-6" />
        </Text>
      )}
    </>
  );
};
