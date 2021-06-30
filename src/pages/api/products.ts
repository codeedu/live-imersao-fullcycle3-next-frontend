// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import http from '../../http'
import { Product } from '../../model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  
  const {data: products} = await http.get('products');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=59');
  res.status(200).json(products)
}

//http://localhost:3001/api/hello