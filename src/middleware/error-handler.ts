import { Request, Response, NextFunction } from 'express';

export default ({ genericErrorMessage = 'An error has occurred' } = {}) => {
  return (error: any, req: Request, res: Response, next: NextFunction) => {

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
      console.error({
        error,
        message: error.message || genericErrorMessage
      });
    }

    if (error.status) {
      return res.status(error.status).json({
        type: error.name,
        message: error.message,
        errors: error.errors
      });
    } else {
      return res.status(500).json({ message: error.message || genericErrorMessage });
    }
  };
};
