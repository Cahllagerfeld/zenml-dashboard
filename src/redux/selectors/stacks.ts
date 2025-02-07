import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/stacksReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.stacks') || {};

const getById = (state: State): Record<TId, TStack> =>
  _.get(stateKey(state), 'byId');

const getMyStackIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myStackIds');

const getMyStackPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

export const mystacks = (state?: State | null): TStack[] => {
  if (!state) return [];
  const myStackIds = getMyStackIds(state);
  const byId = getById(state);

  return (myStackIds || []).reduce((current: TStack[], id: TId) => {
    const stack = byId[id];

    if (stack) {
      current = [...current, stack];
    }

    return current;
  }, [] as TStack[]);
};

export const mystacksPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyStackPaginated(state);

  return paginated;
};

export const stackForId = (stackId: TId): Selector<any, TStack> =>
  createSelector(getById, extractItemFromById(stackId));

const stackSelectors = {
  mystacksPaginated: mystacksPaginated,
  mystacks: mystacks,
  stackForId,
};

export { stackSelectors };
