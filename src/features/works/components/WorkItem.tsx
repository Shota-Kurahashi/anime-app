import { PlusIcon, ShareIcon } from "@heroicons/react/24/outline";
import { IconStack2 } from "@tabler/icons";
import Link from "next/link";
import React, { FC, memo } from "react";
import { Button } from "src/components/Elements/Button";
import { Text } from "src/components/Elements/Text";
import { WorkEpisodeItem } from "src/features/episodes/components/WorkEpisodeItem";
import { Work } from "src/features/works/types";

type Props = {
  work: Work;
};

export const WorkItem: FC<Props> = memo(({ work }) => (
  <li
    className="max-w-mds relative w-full flex-1 rounded-md border border-solid border-slate-200 bg-white p-3 drop-shadow-sm md:p-4"
    key={`works-${work.id}`}
  >
    <div className="mx-auto flex h-full min-h-full flex-col items-center justify-around">
      <Link
        href="/"
        color="dark"
        scroll={false}
        className="mb-2 font-hiragino-sans text-sm font-bold md:mb-3 md:text-base"
      >
        {work.series_title}
      </Link>
      <div className="flex h-full w-full flex-1 flex-col border-x-0 border-y-0 border-b border-solid border-slate-200 pb-2">
        <ul className="mb-2 grid h-full w-full flex-1  grid-cols-2 items-center justify-around text-base">
          {work.episodes.map((episode) => (
            <WorkEpisodeItem
              episode={episode}
              work_title={work.series_title}
              key={`work-${episode.id}`}
            />
          ))}
        </ul>
        <Button
          size="xs"
          leftIcon={<IconStack2 />}
          className="mx-auto flex w-full max-w-max items-center justify-center rounded-md border border-solid bg-gray-800 px-2 py-2 text-center text-xs font-bold text-white md:py-2 md:px-4 md:text-sm"
        >
          他のエピソードを見る
        </Button>
      </div>
      <div className="mt-2 flex w-full items-center justify-around md:justify-between">
        <div className="flex flex-col items-center justify-center">
          <Button className="mb-1 border-none">
            <PlusIcon className="h-5 w-5 stroke-2 md:h-6 md:w-6" />
          </Button>
          <Text component="span" className="text-xs">
            マイリスト
          </Text>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <Button className="mb-1 border-none">
            <ShareIcon className=" h-5 w-5 stroke-2 md:h-6 md:w-6" />
          </Button>
          <Text component="span" className="text-xs">
            シェア
          </Text>
        </div>
        <Button
          size="xs"
          className="flex flex-col items-center justify-center bg-indigo-500 px-1 py-2 font-bold text-white"
        >
          シリーズ一覧
        </Button>
      </div>
    </div>
  </li>
));
