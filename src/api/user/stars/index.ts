import { internalApi } from 'services/api';
import { IRepoData } from 'types/repos';
import { middleware } from './middleware';

export const listStars = async (
  page: number,
  perPage: number = 30,
): Promise<IRepoData[] | null> => {
  internalApi.defaults.headers.Accept = 'application/vnd.github+json';

  const response = await internalApi.get('/user/starred', {
    params: {
      page,
      per_page: perPage,
    },
  });

  if (Array.isArray(response.data)) {
    return response.data.map(middleware);
  }

  return null;
};
