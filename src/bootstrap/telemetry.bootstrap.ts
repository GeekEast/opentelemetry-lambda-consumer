import { JaegerExporter } from "@opentelemetry/exporter-jaeger"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"
import { Resource } from "@opentelemetry/resources"
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "orchestrator-lambda"
  })
})

// Configure span processor to send spans to the exporter
const exporter = new JaegerExporter({
  endpoint: "http://localhost:14268/api/traces"
})
provider.addSpanProcessor(new SimpleSpanProcessor(exporter))
// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
provider.register()

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [new HttpInstrumentation()]
})
