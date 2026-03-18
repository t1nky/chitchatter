export type AlertSeverity = 'success' | 'error' | 'warning' | 'info'

export type AlertOptions = {
  severity?: AlertSeverity
}

export enum QueryParamKeys {
  GET_SDK_CONFIG = 'getSdkConfig',
  IS_EMBEDDED = 'embed',
  PARENT_DOMAIN = 'parentDomain',
}
