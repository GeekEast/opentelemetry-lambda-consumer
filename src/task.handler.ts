import { SQSRecord } from "aws-lambda"
import Container from "typedi"

import { extractEventPayload } from "./common/utils/extractEventPayload.util"
import { extractEventType } from "./common/utils/extractEventType.util"
import { Logger } from "./common/utils/logger.util"
import { TaskBase } from "./tasks/base.task"

export const handleEvent = async (event: SQSRecord) => {
  const eventPayload = extractEventPayload(event)
  const eventType = extractEventType(eventPayload)
  if (!eventType) return

  const executeTaskInstance = Container.get<TaskBase>(eventType)
  if (!executeTaskInstance) {
    Logger.warn(`No executable found for event type: ${eventType}`)
    return
  }

  try {
    await executeTaskInstance.trace(eventPayload)
  } catch (error) {
    Logger.error(error)
    throw error
  }
}
