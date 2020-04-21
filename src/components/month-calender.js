import React from 'react';
import { Table, Label, Popup } from 'semantic-ui-react';
import moment from 'moment';

const MonthCalendar = (props) => {
    let currentDay = moment(props.date);
    const firstDayOfMonth = currentDay.startOf('month');
    
    let holidays = {};
    props.holidays.forEach(item => {
        var day = item.date.date();
        holidays[day] = <Popup trigger={<Label color="orange">{day}</Label>}
            content={item.title}
            basic
        /> ;
    });
       
    var weekdays = moment.weekdaysShort();
    weekdays.push(weekdays.shift());
    
    let dayOfWeek = firstDayOfMonth.format('d');
    
    dayOfWeek = dayOfWeek == 0 ? 7 : dayOfWeek;
    let totalCells = [];
    for (let index = 1; index < dayOfWeek; index++) {
        totalCells.push('');
    }
    for (let index = 1; index <= currentDay.daysInMonth(); index++) {
        totalCells.push(index)
    }

    let rows =[];
    let cells = [];

    totalCells.forEach((item, i) => {
        let content = item;
        if (item) {
            content = holidays[item] || item;
        }

        let className = item && 'day ';
        className += i % 7 > 4 ? 'weekly-holiday' : 'office-day';
        cells.push(<Table.Cell key={i} className={className}>{content}</Table.Cell>);
        
        if (i % 7 == 6) {
            rows.push(cells);
            cells = [];
        }
        
        if (i === totalCells.length-1) {
            while(i % 7 != 6) {
                cells.push(<Table.Cell key={-i} className="calendar-day-empty"></Table.Cell>);
                ++i;
            }
            rows.push(cells);
        }
    });

    const weekDaysInMonth = weekdays.map((day, index) => {
        return <Table.HeaderCell width="3" className={index > 4 ? "weekly-holiday" : ""} key={index}>{day}</Table.HeaderCell>
    });
    const daysInMonth = rows.map((row, index) => {
        return <Table.Row key={index}>{row}</Table.Row>
    });
    
    return(
        <>
            <Table size="small" basic="very" compact textAlign="center" className="calendar">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'>{currentDay.format('MMMM')}</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>{weekDaysInMonth}</Table.Row>
                </Table.Header>
                <Table.Body>{daysInMonth}</Table.Body>
            </Table>
        </>
    );
}

export default MonthCalendar;