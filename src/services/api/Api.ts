import { bind } from 'decko';

import { IUserSearchOptions } from 'shared/types/github';
import { IUser, ISearchUserResponse } from 'shared/types/models';

import { constructUserSearchQuery } from './helpers';
import { convertUser } from './converters';
import HttpActions from './HttpActions';

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    // this.actions = new HttpActions(`${baseUrl}/${version}`);
    this.actions = new HttpActions('');
  }

  @bind
  public async searchUser(queryText: string, options: IUserSearchOptions): Promise<IUser[]> {
    const URL = `https://api.github.com/search/users?q=${constructUserSearchQuery(queryText, options)}`;
    const response = await this.actions.get<ISearchUserResponse>(URL);
    console.log(response.data);
    const users = response.data.items;
    return users.map(x => convertUser(x));
  }
}

export default Api;
