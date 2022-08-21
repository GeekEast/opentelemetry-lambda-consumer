/* eslint-disable @typescript-eslint/no-explicit-any */
import opentelemetry, { context, trace } from "@opentelemetry/api"

import { Executable } from "../common/interfaces/executable.interface"
import { extractTraceInfoFromPayload } from "../common/utils/extractTraceInfoFromPayload.util"

export abstract class TaskBase implements Executable {
  // https://github.com/open-telemetry/opentelemetry-js-api/blob/main/docs/tracing.md
  // https://github.com/open-telemetry/opentelemetry-js/discussions/2470
  async trace(payload: any) {
    const traceInfo = extractTraceInfoFromPayload(payload)
    // get the library's tracer via library name
    const tracer = opentelemetry.trace.getTracer("@opentelemetry/instrumentation-http")
    // start a new span
    const span = tracer.startSpan((<any>this).constructor.name + " execution", {
      links: [{ context: traceInfo }]
    })
    // set the new span on current context
    const ctx = trace.setSpan(context.active(), span)

    // call the target function with new context
    // which will link later auto-instrumented trace to the new span
    await context.with(ctx, this.execute, undefined, payload)
    span.end()
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async execute(_payload: any): Promise<void> {}
}
