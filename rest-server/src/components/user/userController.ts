import {
  findUser,
  saveUser
} from './userQueries';

export const getUser = async (req: any, res: any, next: any) => {
    const { email } = req.params;
    try {
      const user = await findUser(email)
      user.length ? res.status(200).send(user) : res.status(400).send('user not found')
    } catch(e) {
      return next(e);
    }
  }
  
  export const postUser = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;
    try {
      await saveUser(email, password);
      return res.status(200).send('user successfully saved');
    } catch (e) {
      return next(e)
    }
  }