import { NowRequest, NowResponse } from '@now/node';
import got from 'got';

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const packageName = req.query.p;
    const response = await got(`https://registry.npmjs.org/${packageName}`).json();
    res.status(200).send({ body: response });
  } catch (error) {
    res.status(400).send(error);
  }
};
