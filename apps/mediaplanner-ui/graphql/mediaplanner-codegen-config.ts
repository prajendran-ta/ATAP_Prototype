import type { CodegenConfig } from '@graphql-codegen/cli'

export const schemaUrl = `./graphql/generated/mediaplanner-schema.graphql`
const moduleName = 'mediaplanner'
const gqlTypesPrefix = 'MediaplannerQL'

const config: CodegenConfig = {
  schema: {
    [schemaUrl]: {
      // headers: {
      //   Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
      // },
    },
  },
  ignoreNoDocuments: true,
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
  generates: {
    [`./graphql/generated/${moduleName}-gql.d.ts`]: {
      plugins: [
        {
          add: {
            content: ['// Mediaplanner GraphQL Typescript Definitions', `declare namespace ${gqlTypesPrefix} {`],
          },
        },
        {
          add: {
            placement: 'append',
            content: ['}'],
          },
        },
        'typescript',
        'typescript-operations',
      ],
      config: {
        noExport: true,
        declarationKind: {
          type: 'interface',
          input: 'interface',
        },
        scalars: {
          ID: 'number',
          Int53: 'number',
        },
      },
    },
    [`./graphql/generated/${moduleName}-enums.ts`]: {
      plugins: ['typescript'],
      config: {
        onlyEnums: true,
        enumsAsTypes: false,
        constEnums: false,
        enumsAsConst: false,
        scalars: {
          ID: 'number',
          Int53: 'number',
        },
      },
    },
    [`./graphql/generated/${moduleName}-schema.graphql`]: {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
}

export default config
