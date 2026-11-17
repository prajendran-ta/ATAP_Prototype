import type { CodegenConfig } from '@graphql-codegen/cli'

// Sourced from the mediahub-graphql-schemas git submodule (see /mediahub-graphql-schemas)
export const schemasPath = '../../mediahub-graphql-schemas/oba/**/*.graphql'
const moduleName = 'oba'
const gqlTypesPrefix = 'ObaQL'

const config: CodegenConfig = {
  schema: schemasPath,
  ignoreNoDocuments: true,
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
  generates: {
    [`./graphql/generated/${moduleName}-gql.d.ts`]: {
      plugins: [
        {
          add: {
            content: ['// OBA GraphQL Typescript Definitions', `declare namespace ${gqlTypesPrefix} {`],
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
  },
}

export default config
