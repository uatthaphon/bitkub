import { ERRORS } from './enum';

export const transform = (data) => {
  const { error } = data;
  const errorMsg = error > -1 ? ERRORS[error] : undefined;
  const response = {
    ...(errorMsg && { errorMsg }),
    ...data,
  };

  return response;
};
