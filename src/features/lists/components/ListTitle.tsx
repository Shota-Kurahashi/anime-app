import React, { FC } from "react";
import { Text } from "src/components/Elements/Text";

type Props = {
  title: string;
};

export const ListTitle: FC<Props> = ({ title }) => (
  <h2 className="mb-3 items-center ">
    <Text component="span" className="text-base font-bold  md:text-2xl">
      {title}
    </Text>
  </h2>
);
