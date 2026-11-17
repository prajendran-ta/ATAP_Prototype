export type Environment = 'staging' | 'staging-1' | 'staging-2' | 'staging-3' | 'uat' | 'uat-1' | 'uat-2' | 'production'
export type ModuleName = 'oba' | 'mapping' | 'shared' | 'advertiser' | 'mediaplanner'
export type ModulesObject = Record<ModuleName, string>
