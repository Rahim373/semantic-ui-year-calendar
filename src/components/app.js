import React, { useState, Component } from 'react';
import YearCalendar from './year-calendar';
import moment from 'moment';
import { Container, Grid } from 'semantic-ui-react';
import '../assets/styles/stylesheet';

const App = (props) => {
    const year = moment().year();
    const [holidays, updateHolidays] = useState([
        { date: moment().date(1).month(4), title: 'World Labor Day'}
    ]);
    const yearString = `Calendar of ${year}`;

    return (
        <Container>
            <Grid>
                <Grid.Row textAlign="center">
                    <Grid.Column>
                        <h3>{yearString}</h3>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <YearCalendar holidays={holidays} year={year}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default App;