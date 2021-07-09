import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
  VictoryContainer,
  VictoryTooltip,
} from 'victory';

// import { getRounded } from '../Utils/Utils';
/**
 *
 *
 * @class GroupedBarComponent
 * @extends {Component}
 */
class GroupedBarComponent extends Component {
  /**
   *
   *
   * @return {*}
   * @memberof GroupedBarComponent
   */
  render() {
    if (this.props.quarterReport.length === 0) {
      return 'No data.';
    }

    const barData = [];
    const revenues = [];
    const netIncomes = [];

    this.props.quarterReport.forEach(
      ({ year, quarterType, revenue, netIncome }) => {
        revenues.push({
          x: `${quarterType}-${year}`,
          y: revenue,
          z: 'Revenue',
        });
        netIncomes.push({
          x: `${quarterType}-${year}`,
          y: netIncome,
          z: 'Net Income',
        });
      }
    );

    barData.push(revenues);
    barData.push(netIncomes);

    return (
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          width={1200}
          height={400}
          containerComponent={<VictoryContainer responsive={true} />}
        >
          <VictoryGroup
            offset={30}
            style={{ data: { width: 30 } }}
            colorScale={['brown', 'tomato']}
          >
            {barData.map((data, index) => {
              return (
                <VictoryBar
                  key={index}
                  data={data}
                  labels={({ datum }) => `${datum.z}: ${datum.y}`}
                  labelComponent={<VictoryTooltip />}
                />
              );
            })}
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}

export default GroupedBarComponent;
