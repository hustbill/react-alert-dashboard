// http://callmedadaxin.github.io/2019/01/09/write-d3-with-reactjs/
/*
React + D3 声明式可视化展示
发表于 2019 - 01 - 09
*/

// 定义getter
const x = d => new Date(d.date);
const y = d => +d.close;
// 定义容器配置
const padding = {
  top: 20,
  left: 40,
  bottom: 20,
  right: 20
};
export default class LineGraph {
  render() {
    return (
      <Container width={1000} height={200} padding={padding} x={x} y={y}>
        {({ width, height }) => {
          // 根据数据定义x,y轴的scale
          const xScale = scaleTime({
            rangeRound: [0, width],
            domain: d3.extent(data, x)
          });
          const yScale = scaleLinear({
            rangeRound: [height, 0],
            domain: d3.extent(data, y)
          });
          return (
            <Group>
              <Grid
                width={width}
                height={height}
                xScale={xScale}
                yScale={yScale}
              />
              <AxisBottom top={height} scale={xScale} />
              <AxisLeft scale={yScale} />
              <AreaClosed
                data={data}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
              />
            </Group>
          );
        }}
      </Container>
    );
  }
}