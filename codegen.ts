import type { CodegenConfig } from "@graphql-codegen/cli";

const GRAPHQL_URL = process.env.GRAPHQL_URL as string;
const GRAPHQ_ADMIN_KEY = process.env.GRAPHQ_ADMIN_KEY as string;

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [GRAPHQL_URL]: {
        headers: {
          "x-hasura-admin-secret": GRAPHQ_ADMIN_KEY,
        },
      },
    },
  ],
  documents: "src/app/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
