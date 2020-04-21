import React from 'react';
import moment from 'moment';
import MonthCalendar from './month-calender';
import { Grid } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

const YearCalendar = props => {
    let months = [];

    const getHolidays = (month) => {
        return props.holidays.filter(holiday => {
            return holiday.date.month() == month;
        });
    }

    for (let index = 0; index < 12; index++) {
        var date = moment().month(index).year(props.year);

        months.push({
            date,
            holidays: getHolidays(index)
        });
    }

    return (
        <>
            <Grid>
                <Grid.Row>
                    {
                        months.map((month, i) => {
                            return <Grid.Column mobile={8} computer={4} key={i}><MonthCalendar date={month.date} holidays={month.holidays} /></Grid.Column>
                        })
                    }
                </Grid.Row>
            </Grid>
        </>
    );
};

export default YearCalendar;