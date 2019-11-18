import {AsyncRouter} from 'express-async-router';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';

import * as commentController from './controllers/commentController';
import * as organizationMemberController from './controllers/organizationMemberController';

const router = AsyncRouter();

router.use(bodyParser.json());

router.post('/orgs/:name/comments', async (req: Request, res: Response) => {
  const {body, params} = req;

  await commentController.add(params.name, body.comment);
  res.status(200).json({
    message: 'Successfully added new comment',
    data: null
  });
});

router.get('/orgs/:name/comments', async (req: Request, res: Response) => {
  const data = await commentController.get(req.params.name);
  const message = data.length === 0 ? 'Organization has no comment' : data.length === 1 ? 'Here is the comment' : 'Here are the comments';
  res.status(200).json({
    message,
    data
  });
});

router.delete('/orgs/:name/comments', async (req: Request, res: Response) => {
  await commentController.softDelete(req.params.name);
  res.status(200).json({
    message: 'Successfully soft deleted comments',
    data: null
  });
});

router.get('/orgs/:name/members', async (req: Request, res: Response) => {
  const data = await organizationMemberController.get(req.params.name);
  const message = data.length === 0 ? 'Organization has no member' : data.length === 1 ? 'Here is the member' : 'Here are the members';
  res.status(200).json({
    message,
    data
  });
});

export default router;
