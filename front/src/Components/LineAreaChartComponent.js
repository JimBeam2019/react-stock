import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryContainer,
} from 'victory';
import {
  scaleDiscontinuous,
  discontinuitySkipWeekends,
} from '@d3fc/d3fc-discontinuous-scale';
import { scaleTime } from 'd3-scale';

/**
 *
 *
 * @class LineAreaChartComponent
 * @extends {Component}
 */
class LineAreaChartComponent extends Component {
  /**
   *
   *
   * @return {*}
   * @memberof LineAreaChartComponent
   */
  render() {
    if (this.props.stocks.length === 0) {
      return 'No data.';
    }

    const discontinuousScale = scaleDiscontinuous(
      scaleTime()
    ).discontinuityProvider(discontinuitySkipWeekends());

    return (
      <VictoryChart
        width={1200}
        height={400}
        theme={VictoryTheme.material}
        scale={{ x: discontinuousScale }}
        domain={{ y: [0.5, 50.5] }}
        containerComponent={<VictoryContainer responsive={true} />}
      >
        <VictoryArea
          data={this.props.stocks}
          style={{ data: { fill: 'lightblue', stroke: 'teal' } }}
        />
      </VictoryChart>
    );
  }
}

export default LineAreaChartComponent;
