import { Box } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { InviteItem } from "../../../components/invites/InviteItem";
import { Layout } from "../../../components/layouts/Layout";
import { InviteLoading } from "../../../components/layouts/loading/InviteLoading";
import {
  Categories_Enum,
  useGetInvitesByCategoryQuery,
} from "../../../generated/graphql";
import { useQueryInvitesByCategory } from "../../../hooks/invites/useQueryInviteByCategory";
import { categoryProcessing } from "../../../hooks/utils/useCategoryToJa";

const Index: NextPage = () => {
  const router = useRouter();
  const { isLoading, data } = useQueryInvitesByCategory(
    Categories_Enum[router.query.category as keyof typeof Categories_Enum]
  );

  if (isLoading) {
    return (
      <Layout>
        <InviteLoading />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        component="ul"
        bg={`${
          categoryProcessing(
            Categories_Enum[
              router.query.category as keyof typeof Categories_Enum
            ]
          ).color
        }.0`}
        className="relative min-h-full space-y-4 p-4 py-4 md:p-6"
      >
        {data?.invites?.map((invite) => (
          <InviteItem key={invite.id} invite={invite} />
        ))}
      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(Categories_Enum).map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();
  const queryKey = useGetInvitesByCategoryQuery.getKey({
    category:
      Categories_Enum[context.params?.category as keyof typeof Categories_Enum],
  });
  const request = new GraphQLClient(process.env.NEXT_PUBLIC_ENDPOINT as string);

  await queryClient.prefetchQuery(
    queryKey,
    useGetInvitesByCategoryQuery.fetcher(request, {
      category:
        Categories_Enum[
          context.params?.category as keyof typeof Categories_Enum
        ],
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 5,
  };
};

export default Index;
