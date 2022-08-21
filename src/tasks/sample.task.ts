import axios from "axios"
import { Service } from "typedi"

import { Logger } from "../common/utils/logger.util"
import { REGISTERED_EVENT_TYPE } from "../constant"
import { TaskBase } from "./base.task"

@Service(REGISTERED_EVENT_TYPE.SAMPLE_EVENT)
export class SampleTask extends TaskBase {
  async execute(payload) {
    Logger.info(payload)
    await axios("https://jsonplaceholder.typicode.com/todos/1")
  }
}
