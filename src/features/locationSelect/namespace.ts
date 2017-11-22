import {
  IArea, ICity, IAreaEntities, ICityEntities, INormalizedLocation, INormalizedCities, INormalizedArea,
} from 'shared/types/models';
import { ICommunicationState } from 'shared/helpers/redux';
import { IPlainAction, IAction } from 'shared/types/app';

export interface IAreaEntities { [key: number]: IArea; }
export interface ICityEntities { [key: number]: ICity; }

export interface IReduxState {
  communications: {
    citiesFetching: ICommunicationState;
  };
  data: {
    entities: {
      areas: IAreaEntities;
      cities: ICityEntities;
    },
    citiesSet: number[],
    selectedLocation?: INormalizedLocation;
  };
  ui: {
    showSelectedLocation: boolean;
  };
}

export type ILoadCitiesAction = IPlainAction<'LOCATION_SELECT:LOAD_CITIES'>;
export type ILoadCitiesCompletedAction = IAction<'LOCATION_SELECT:LOAD_CITIES_COMPLETED', INormalizedCities>;
export type ILoadCitiesFailedAction = IPlainAction<'LOCATION_SELECT:LOAD_CITIES_FAILED'>;

export type ISelectLocationByAreaIDAction
  = IAction<'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', ISelectLocationByAreaIDActionPayload>;

export interface ISelectLocationByAreaIDActionPayload {
  location?: INormalizedArea;
  showOnMap: boolean;
}

export type LocationSelectAction =
  | ILoadCitiesAction
  | ILoadCitiesCompletedAction
  | ILoadCitiesFailedAction
  | ISelectLocationByAreaIDAction;
