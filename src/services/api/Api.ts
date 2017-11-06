import { bind } from 'decko';
import HttpActions from './HttpActions';

import { сonvertCityResponse, convertTravelToRequest } from './converters';
import { ICityResponse, ICategoriesResponse, ITravelOrderResponse } from './types/responses';
import { INormalizedCities, ICategory, IFields, ITravelOrder } from 'shared/types/models';

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  @bind
  public async loadCategories(): Promise<ICategory[]> {
    const response = await this.actions.get<ICategoriesResponse>('/categories/');
    return response.data;
  }

  @bind
  public async loadFields(uid: number): Promise<IFields> {
    const response = await this.actions.get(`/categories/${uid}/`);
    return response.data;
  }

  @bind
  public async loadCities(): Promise<INormalizedCities> {
    const response = await this.actions.get<ICityResponse[]>('/cities/');
    return сonvertCityResponse(response.data);
  }

  @bind
  public async createTravelOrder(travelOrder: ITravelOrder): Promise<string> {
    const request = convertTravelToRequest(travelOrder);
    const response = await this.actions.post<ITravelOrderResponse>('/travels/create/', request);
    return response.data;
  }
}

export default Api;
