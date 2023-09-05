import { rest } from 'msw'
import changeLogsResponse from '../mockData/changelog.mock.json'

export const handlers = [
  rest.post('https://stage.monitoring360.io/changelog/read/:id', (req, res, ctx) => {
    const { id } = req.params
    return res(
      ctx.json({ message: `Message ${id} marked as read`}
      )
    )
  }),
  rest.get('https://stage.monitoring360.io/changelog/last', (req, res, ctx) => {
    return res(
      ctx.json(changeLogsResponse
      )
    )
  })
]
