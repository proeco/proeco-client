import { Storage } from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
  const bucketName = 'sample-upload-img';
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(req.query.fileName as string);
  const options = {
    expires: Date.now() + 1 * 60 * 1000,
    fields: { 'x-goog-meta-test': 'data' },
  };
  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
}
