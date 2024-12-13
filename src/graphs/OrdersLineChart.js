import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { Typography } from '@mui/material';

const OrdersLineChart = ({ graphData }) => {
 

  

  const generateTimeTicks = (start, end) => {
    const timeTicks = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      timeTicks.push(new Date(currentDate));
      currentDate.setHours(currentDate.getHours() + 1);
    }
    return timeTicks;
  };

  const timeTicks = generateTimeTicks(new Date(graphData.startDate), new Date(graphData.endDate));

  return (
    <div>
      <Typography variant="h6" gutterBottom>{graphData.name}</Typography>
      <LineChart 
        width={800} 
        height={400} 
        data={graphData.dataList}
        margin={{ top: 20, right: 60, left: 40, bottom: 20 }} // Adjust the margins
      >
        <CartesianGrid strokeDasharray="3 3" />
        
        <XAxis
          dataKey="timeOfScraping"
          ticks={timeTicks}
          tickFormatter={(time) => {
            const date = new Date(time);
            return date.toLocaleString('en-US', 
              {
              hour: '2-digit',
              hour12: false,
            });
          }}
          interval="preserveStartEnd"
        >
          <Label value="Hours" offset={-8} position="insideBottom" />
        </XAxis>

        <YAxis>
          <Label angle={-90} position="insideLeft" />
        </YAxis>
        
        <Tooltip
          labelFormatter={(label) => {
            const date = new Date(label);
            return date.toLocaleString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              hour12: false,
            }) + "h";
          }}
          formatter={(value) => [`${value}`, 'Value']}
        />
        
        <Legend 
          layout="vertical" 
          verticalAlign="top" 
          align="right"
          wrapperStyle={{ right: 20 }} // Add extra space to the right for the legend
        />

        {graphData.entities
          .filter(entity => graphData.dataList.some(order => order[entity.id] != null))
          .map((entity, index) => (
            <Line
              key={entity.id}
              type="monotone"
              dataKey={`${entity.id}`}
              name={entity.name}
              stroke={`hsl(${index * 60}, 70%, 50%)`}
              connectNulls
            />
          ))}
      </LineChart>
    </div>
  );
};

export default OrdersLineChart;
