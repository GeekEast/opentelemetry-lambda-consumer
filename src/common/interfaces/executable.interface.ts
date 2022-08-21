/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Executable {
  execute: (payload: any) => Promise<void>
  trace: (payload: any) => Promise<void>
}
