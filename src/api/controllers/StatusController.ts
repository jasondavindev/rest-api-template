import { Response } from 'express'
import { JsonController, Get, Res } from 'routing-controllers'

@JsonController('/v1/status')
export default class StatusController {
  @Get('/')
  status(@Res() res: Response) {
    return res.json({ status: 'ok' })
  }
}
