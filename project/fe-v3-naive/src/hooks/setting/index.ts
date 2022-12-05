import type { GlobConfig } from '/#/config'

import { warn } from '@/utils/log'
import { getAppEnvConfig } from '@/utils/env'

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_PROD_MOCK,
    VITE_GLOB_IMG_URL,
    VITE_GLOB_APP_CODE
  } = getAppEnvConfig()

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    )
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    project_title: VITE_GLOB_APP_TITLE,
    project_name: VITE_GLOB_APP_SHORT_NAME,
    project_code: VITE_GLOB_APP_CODE,
    apiUrl: VITE_GLOB_API_URL,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
    prodMock: VITE_GLOB_PROD_MOCK,
    imgUrl: VITE_GLOB_IMG_URL
  }
  return glob as Readonly<GlobConfig>
}
