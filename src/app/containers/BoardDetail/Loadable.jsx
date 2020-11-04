import { lazyLoad } from 'utils/loadable';

export const BoardDetail = lazyLoad(
  () => import('./index'),
  module => module.BoardDetail,
);
