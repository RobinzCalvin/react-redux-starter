import { createSelector } from 'reselect';
import { IReduxState, ICategory, ICommunication } from '../namespace';

function selectCategories(state: IReduxState): ICategory[] {
  return state.data.options;
}

function selectChosenCategory (state: IReduxState): number | undefined {
  return state.data.selected;
}

const selectChosenCategoryObject: () => ICategory = createSelector(
  [ selectCategories, selectChosenCategory ],
  (categories: ICategory[], uid: number) => {
    return categories.find((category: ICategory) => category.uid === uid);
  },
);

function selectCategoriesFetching(state: IReduxState): ICommunication {
  return state.communications.categoriesFetching;
}

export {
  selectCategories,
  selectChosenCategory,
  selectChosenCategoryObject,
  selectCategoriesFetching,
};

export default {
  selectCategories,
  selectChosenCategory,
  selectChosenCategoryObject,
  selectCategoriesFetching,
};