import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from 'canvas';

const WIDTH = 1200 as const;
const HEIGHT = 630 as const;

const createOgp = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { title } = req.query;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const backgroundImage = await loadImage(path.resolve('./public/images/story-ogp.png'));
  ctx.drawImage(backgroundImage, 0, 0, WIDTH, HEIGHT);

  ctx.font = '60px ipagp';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const text = String(title);
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
  const buffer = canvas.toBuffer();
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
};

export default createOgp;
