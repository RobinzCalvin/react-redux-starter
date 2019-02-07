import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { IRepository } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actions from './actions';

function getSaga(deps: IDependencies) {
  const searchRepositoryType: NS.ISearchRepositories['type'] = 'REPOSITORY_SEARCH:SEARCH_REPOSITORIES';
  return function* saga(): SagaIterator {
    yield all([
      takeLatest(searchRepositoryType, executeSearchRepository, deps),
    ]);
  };
}

function* executeSearchRepository({ api }: IDependencies, { payload }: NS.ISearchRepositories) {
  try {
    const repositories: IRepository[] = yield call(api.searchRepository, payload);
    yield put(actions.searchRepositoriesSuccess(repositories));
  } catch (error) {
    yield put(actions.searchRepositoriesFail(getErrorMsg(error)));
  }
}

export { getSaga };
