import { Component } from 'react';
import { VictoryChart, VictoryGroup, VictoryStack, VictoryBar } from 'victory';

class StackBarChartComponent extends Component {
    render() {
        const barData = [1, 2, 3, 4, 5].map(() => {
            return [
                { x: 1, y: Math.random() },
                { x: 2, y: Math.random() },
                { x: 3, y: Math.random() }
            ];
        });

        return (
            <div>
                <VictoryChart domainPadding={{ x: 50 }}
                    width={400} height={400}>
                    <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
                        <VictoryStack colorScale={"red"}>
                            {barData.map((data, index) => {
                                return <VictoryBar key={index} data={data} />
                            })}
                        </VictoryStack>
                        <VictoryStack colorScale={"green"}>
                            {barData.map((data, index) => {
                                return <VictoryBar key={index} data={data} />
                            })}
                        </VictoryStack>
                        <VictoryStack colorScale={"blue"}>
                            {barData.map((data, index) => {
                                return <VictoryBar key={index} data={data} />
                            })}
                        </VictoryStack>
                    </VictoryGroup>
                </VictoryChart>
            </div>
        );
    }
}

export default StackBarChartComponent;