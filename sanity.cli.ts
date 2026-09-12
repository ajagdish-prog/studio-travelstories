import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9qg09rze',
    dataset: 'production'
  },
  studioHost: 'travelstories',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'y2qaggdcstqiaj1f92pfdgxr',
  },
  typegen: {
    enabled: true,
    path: '../travelstories/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../travelstories/sanity.types.ts',
    overloadClientMethods: true,
  },
})
