import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppReduxState } from 'shared/types/app';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';

import { IUserSearchFormFields } from '../../../namespace';
import { actions, selectors } from './../../../redux';

interface IOwnProps {
  formFields: IUserSearchFormFields;
}

interface IStateProps {
  paginationState: IPaginationState | null;
}

interface IActionProps {
  searchUser: typeof actions.searchUser;
}

type IProps = IOwnProps & IStateProps & IActionProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    paginationState: selectors.selectUserSearchPaginationState(state),
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchUser: actions.searchUser,
  }, dispatch);
}

const b = block('user-search-pagination');

class UserSearchPagination extends React.PureComponent<IProps> {
  public render() {
    const { paginationState } = this.props;
    return paginationState && (
      <div className={b()}>
        <PaginationControls
          totalPages={paginationState.totalPages}
          currentPage={paginationState.page}
          onPageRequest={this.handlePageRequest}
        />
      </div>
    );
  }

  @bind
  private handlePageRequest(page: number) {
    const { searchUser, formFields } = this.props;
    searchUser({ ...formFields, page });
  }
}

export default connect(mapState, mapDispatch)(UserSearchPagination);
