import { AxiosInstance } from 'axios'
import error from './error'
import loading from './loading'
import setHeader from './set-header'
import log from './log'

export default function (instance: AxiosInstance): void {
  error(instance)
  setHeader(instance)
  log(instance)
  loading(instance)
}

