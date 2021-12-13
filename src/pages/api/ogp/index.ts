import type { NextApiRequest, NextApiResponse } from 'next';
import * as playwright from 'playwright-aws-lambda';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StoryOgpTemplate } from '~/components/parts/layout/StoryOgpTemplate';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;
  // サイズの設定
  const viewport = { width: 1200, height: 630 };

  // ブラウザインスタンスの生成
  const browser = await playwright.launchChromium();
  const page = await browser.newPage({ viewport });

  // HTMLの生成
  const props = { title: title as string };
  const element = React.createElement(StoryOgpTemplate, props);
  const markup = ReactDOMServer.renderToStaticMarkup(element);
  const html = `<!doctype html>${markup}`;

  // HTMLをセットして、ページの読み込み完了を待つ
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // スクリーンショットを取得する
  const image = await page.screenshot({ type: 'png' });
  await browser.close();

  // Vercel Edge Networkのキャッシュを利用するための設定
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');

  // Content Type を設定
  res.setHeader('Content-Type', 'image/png');

  // レスポンスを返す
  res.end(image);
};
