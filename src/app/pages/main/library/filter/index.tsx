import React, { FC } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

export enum FilterOption {
  ALL = 'All',
  DRAFTS = 'Drafts',
  SCHEDULED = 'Schedule'
}

type FilterComponentProps = {
  filterBy: FilterOption;
  setFilterBy: (filterBy: FilterOption) => void;
}

export const FilterComponent: FC<FilterComponentProps> = ({
  filterBy,
  setFilterBy
}) => {

  const renderFilterOption = (filterOption: FilterOption) => {
    const className = classNames(Style.filterOption, {
      [Style.selected]: filterBy === filterOption,
    });

    return (
      <div
        className={className}
        onClick={() => setFilterBy(filterOption)}
      >
        {filterOption}
      </div>
    )
  }

  return (
    <div className={Style.filterHolder}>
      {renderFilterOption(FilterOption.ALL)}
      {renderFilterOption(FilterOption.SCHEDULED)}
      {renderFilterOption(FilterOption.DRAFTS)}
    </div>
  )
}