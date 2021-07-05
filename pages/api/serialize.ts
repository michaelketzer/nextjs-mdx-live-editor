import type { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'next-mdx-remote/serialize';

export default async function searialize(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const { content } = req.body;
    try {
      const result = await serialize(content);
      res.status(200).send({ result });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  } else {
    res.status(404).send({});
  }
}
