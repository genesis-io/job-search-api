import { Request, Response } from 'express';

import db from '../../config/db';
import {
  success,
  error
} from '../log';

/**
 * @param 
 * 
 */

export const globalQueryHelper = async (payload, query, name) => {
  try {
    const queryString = query(payload);
    const data = await db.queryAsync(queryString);
    success(`${name} - successfully retrieved data ${JSON.stringify(data)}`);
    return data;
  } catch (err) {
    error(`${name} - error= ', err`);
    throw new Error(err);
  }
};

export const globalController = (query: any, name: string): (req: Request, res: Response) => Promise<Response> => {
  return async (req: Request, res: Response): Promise<Response> => {
    const { url, method } = req;
    let payload;
    if (method === 'POST' || method === 'PUT') {
      payload = req.body;
    } else {
      payload = req.params;
    }
    try {
      const { rows } = await query(payload, url);
      success(`${name} - sucessfully retrieved data ${rows}`);
      return res.status(200).send(rows);
    } catch (err) {
      error(`${name} - error= ${err}`);
      return res.status(500).send(err);
    }
  }
};