import React, { Component } from 'react';
import { 
    VictoryChart, 
    VictoryAxis, 
    VictoryCandlestick, 
    VictoryTheme, 
    VictoryTooltip 
} from 'victory';
import moment from 'moment';

import { getRounded } from '../Utils/Utils';

/**
 *
 *
 * @class CandleStickChartComponent
 * @extends {Component}
 */
class CandleStickChartComponent extends Component {

    render() {
        return (
            <div>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 25 }}
                    scale={{ x: "time" }}>
                    <VictoryAxis 
                        tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
                    <VictoryAxis dependentAxis />
                    <VictoryCandlestick 
                        candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                        data={this.props.stocks}
                        labels={
                            ({ datum }) => `open: ${getRounded(datum.open)}`.concat(
                                `\nclose: ${getRounded(datum.close)}`,
                                `\nhigh: ${getRounded(datum.high)}`,
                                `\nlow: ${getRounded(datum.low)}`,
                                `\nDate: ${moment(datum.x).format('YYYY-MM-DD')}`
                            )
                        }
                        labelComponent={<VictoryTooltip />}
                        animate={{ duration: 2000, onLoad: {duration: 1000} }}
                    />
                </VictoryChart>
            </div>
        );
    }
    
    
}

export default CandleStickChartComponent;