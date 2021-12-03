import React, { FC } from 'react';
import classNames from 'classnames';

import { Pill } from 'app/elements';

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
    const selected = filterBy === filterOption;
    const className = classNames(Style.pill, {
      [Style.selected]: selected,
    });
    const onClick = !selected ? () => setFilterBy(filterOption) : undefined;

    return (
      <div className={Style.filterOption}>
        <Pill
          background={selected ? 'purple' : 'none'}
          label={filterOption}
          onClick={onClick}
          className={className}
        />
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