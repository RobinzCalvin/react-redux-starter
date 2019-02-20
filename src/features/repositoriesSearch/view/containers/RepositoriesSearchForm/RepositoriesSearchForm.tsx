import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { SearchForm } from 'shared/view/components';
import RepositoriesSearchSettings from './RepositoriesSearchSettings/RepositoriesSearchSettings';

import { selectors, actions } from './../../../redux';
import { IRepositoriesSearchFormFields } from '../../../namespace';
import { fieldNames } from './constants';

interface IOwnProps {
  onSubmit(formValues: IRepositoriesSearchFormFields): void;
}

interface IStateProps {
  isRepositoriesSearchRequesting: boolean;
}

interface IActionProps {
  searchRepositories: typeof actions.searchRepositories;
  resetSearchResults: typeof actions.resetSearchResults;
}

type IProps = IOwnProps & IStateProps & IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchRepositories: actions.searchRepositories,
    resetSearchResults: actions.resetSearchResults,
  }, dispatch);
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isRepositoriesSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

class RepositoriesSearchForm extends React.PureComponent<IProps> {
  public render() {
    const { isRepositoriesSearchRequesting, resetSearchResults } = this.props;
    return (
      <SearchForm<IRepositoriesSearchFormFields>
        searchInputName={fieldNames.searchString}
        isSearchRequesting={isRepositoriesSearchRequesting}
        onSubmit={this.handleFormSubmit}
        resetSearchResults={resetSearchResults}
        renderSettings={RepositoriesSearchSettings}
      />
    );
  }

  @bind
  private handleFormSubmit(formValues: IRepositoriesSearchFormFields) {
    const { searchRepositories, onSubmit } = this.props;
    searchRepositories({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

export default connect(mapState, mapDispatch)(RepositoriesSearchForm);
