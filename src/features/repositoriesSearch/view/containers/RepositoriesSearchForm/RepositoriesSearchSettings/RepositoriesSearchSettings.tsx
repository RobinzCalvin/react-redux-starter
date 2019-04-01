import React from 'react';
import block from 'bem-cn';

import { TextInputField, NumberInputField } from 'shared/view/form';

import { fieldNames, filtersLabels } from '../constants';
import './RepositoriesSearchSettings.scss';

const b = block('repositories-search-settings');

function RepositoriesSearchSettings() {
  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item')}>
          <NumberInputField
            name={fieldNames.starsNumber}
            label={filtersLabels.starsNumber}
          />
        </div>
        <div className={b('item')}>
          <NumberInputField
            name={fieldNames.forksNumber}
            label={filtersLabels.forksNumber}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <TextInputField
            name={fieldNames.language}
            label={filtersLabels.language}
          />
        </div>
        <div className={b('item')}>
          <TextInputField name={fieldNames.owner} label={filtersLabels.owner} />
        </div>
      </div>
    </div>
  );
}

export default RepositoriesSearchSettings;
