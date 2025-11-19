declare module '@vercel/analytics/next' {
  import * as React from 'react'

  export type BeforeSendEvent = Record<string, unknown> | null

  export type BeforeSend = (event: BeforeSendEvent) => BeforeSendEvent | null

  export interface AnalyticsProps {
    debug?: boolean
    beforeSend?: BeforeSend
    // fallback for any other props the library may accept
    [key: string]: unknown
  }

  export const Analytics: React.FC<AnalyticsProps>
  export default Analytics
}
