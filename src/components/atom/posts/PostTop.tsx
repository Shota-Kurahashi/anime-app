import { Avatar, Badge } from "@mantine/core";
import { useRouter } from "next/router";
import React, { FC, memo } from "react";
import { Categories_Enum } from "../../../generated/graphql";
import { useCategoryToJa } from "../../../hooks/utils/useCategoryToJa";
import { User } from "../../../types/userType";

type Props = {
  category: Categories_Enum;
  user: User | undefined;
};

export const PostTop: FC<Props> = memo(({ category, user }) => {
  const { categoryToJa } = useCategoryToJa();
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.push(`/users/${user?.userName}`)}
        className="cursor-pointer border-0 bg-white"
      >
        <Avatar radius="xl" src={user?.userPhotoURL} />
      </button>
      <Badge color={category === "Anime" ? "grape" : "green"}>
        {categoryToJa(category)}
      </Badge>
    </>
  );
});