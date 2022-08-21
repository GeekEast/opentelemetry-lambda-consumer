import { TraceInfo } from "../interfaces/traceInfo.interface"

// ! the data format is up to the developer
export const extractTraceInfoFromPayload = (payload: { detail: { otel: TraceInfo } }): TraceInfo => {
  return payload.detail.otel
}
