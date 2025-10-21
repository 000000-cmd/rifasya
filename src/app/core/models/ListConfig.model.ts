import {ListRegistryModel} from './ListRegistry.model';
import {ListItem} from './TypeListItem.model';

export interface ListConfigModel{
  listRegistry: ListRegistryModel;
  listItems: ListItem[];
}
