import React, { Component } from 'react';
import classNames from 'classnames';

import * as Helpers from './helpers';

import './style.scss';

type CalendarProps = {
  selectedDay: Date;
  onChange: (newDate: Date) => void;
}

type CalendarState = {
  year: number;
  month: number;
  monthDetails: Helpers.MonthDetails;
}

export class Calendar extends Component<CalendarProps, CalendarState> {

  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      ...this.getToday(),
    }
  }

  getToday = (): CalendarState => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    return {
      year,
      month,
      monthDetails: Helpers.getMonthDetails(year, month)
    }
  }

  isSelectedDay = (day: Helpers.DayDetails): boolean => {
    return day.timestamp === this.props.selectedDay.getTime();
  }

  onDateClick = (day: Helpers.DayDetails): void => {
    if (this.props.onChange) {
      this.props.onChange(new Date(day.timestamp));
    }
  }

  setToday = (): void => {
    this.setState(this.getToday());
  }

  setYear = (offset: number): void => {
    const year = this.state.year + offset;
    const month = this.state.month;
    this.setState({
      year,
      monthDetails: Helpers.getMonthDetails(year, month)
    })
  }

  setMonth = (offset: number): void => {
    let year = this.state.year;
    let month = this.state.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    this.setState({
      year,
      month,
      monthDetails: Helpers.getMonthDetails(year, month)
    })
  }

  // Render

  renderDays(): JSX.Element[] {
    const { monthDetails } = this.state;
    return monthDetails.map((day, index) => {
      const className = classNames('c-day-container', {
        disabled: day.month !== 0,
        highlight: Helpers.isCurrentDay(day),
        'hightlight-selected': this.isSelectedDay(day),
      })
      return (
        <div className={className} key={index}>
          <div className='cdc-day'>
            <span onClick={() => this.onDateClick(day)}>
              {day.date}
            </span>
          </div>
        </div>
      )
    });
  }

  renderCalendar(): JSX.Element {
    return (
      <div className='c-container'>
        <div className='cc-head'>
          {Helpers.SHORT_DAYS.map((d, i) => <div key={i} className='cch-name'>{d}</div>)}
        </div>
        <div className='cc-body'>
          {this.renderDays()}
        </div>
      </div>
    )
  }

  render(): JSX.Element {
    return (
      <div className='calendar'>
        <div className='mdp-container'>
          <div className='mdpc-head'>
            <div className='mdpch-button'>
              <div className='mdpchb-inner' onClick={() => this.setYear(-1)}>
                <span className='mdpchbi-left-arrows'></span>
              </div>
            </div>
            <div className='mdpch-button'>
              <div className='mdpchb-inner' onClick={() => this.setMonth(-1)}>
                <span className='mdpchbi-left-arrow'></span>
              </div>
            </div>
            <div className='mdpch-container' onClick={() => this.setToday()}>
              <div className='mdpchc-year'>{this.state.year}</div>
              <div className='mdpchc-month'>{Helpers.getMonthStr(this.state.month)}</div>
            </div>
            <div className='mdpch-button'>
              <div className='mdpchb-inner' onClick={() => this.setMonth(1)}>
                <span className='mdpchbi-right-arrow'></span>
              </div>
            </div>
            <div className='mdpch-button' onClick={() => this.setYear(1)}>
              <div className='mdpchb-inner'>
                <span className='mdpchbi-right-arrows'></span>
              </div>
            </div>
          </div>
          <div className='mdpc-body'>
            {this.renderCalendar()}
          </div>
        </div>
      </div>
    )
  }

}