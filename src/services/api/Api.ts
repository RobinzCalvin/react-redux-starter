import { bind } from 'decko';

import { IUserSearchOptions } from 'shared/types/github';
import { IUser, ISearchUserResponse, IDetailedServerUser } from 'shared/types/models';

import { constructUserSearchQuery } from './helpers';
import { convertUser, convertUserDetails } from './converters';
import HttpActions from './HttpActions';

class Api {
  private actions: HttpActions;

  constructor() {
    this.actions = new HttpActions('https://api.github.com/');
  }

  @bind
  public async searchUser(searchString: string, options: IUserSearchOptions): Promise<IUser[]> {
    const URL = `/search/users?q=${constructUserSearchQuery(searchString, options)}`;
    const response = await this.actions.get<ISearchUserResponse>(URL);
    const users = response.data.items;
    return users.map(convertUser);
  }

  @bind
  public async loadUserDetails(username: string) {
    const URL = `/users/${username}`;
    const response = await this.actions.get<IDetailedServerUser>(URL);
    return convertUserDetails(response.data);
  }
}

export default Api;
