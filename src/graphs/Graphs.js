import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../navbar/components/Navbar';
import axios from 'axios';
import { endpoints, queries } from '../Constants';
import OrdersDataForm from './OrdersDataForm'; 
import OrdersLineChart from './OrdersLineChart';

function Graphs() {
  const [acquireRegionStations, setAcquireRegionStations] = useState(null);
  const [graphDataAvgPrice, setGraphDataAvgPrice] = useState({});
  const [graphDataHighestPrice, setGraphDataHighestPrice] = useState({});
  const [graphDataLowestPrice, setGraphDataLowestPrice] = useState({});
  const [graphDataMedianPrice, setGraphDataMedianPrice] = useState({});
  const [graphDataOrderCount, setGraphDataOrderCount] = useState({});
  const [graphDataVolumeRemain, setGraphDataVolumeRemain] = useState({});
  const [graphDataStdDeviation, setGraphDataStdDeviation] = useState({});
  const [ordersMean, setOrdersMean] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState(null);
  const [stations, setStations] = useState(null);
  const [items, setItems] = useState(null)

  useEffect(() => {
    let regionsResp =  false;
    let itemsResp = false;
    const fetchData = async () => {
      try {
        const response = await axios.post(endpoints.eveBackend, { query: queries.getRegions });
        if (response.data && response.data.data && response.data.data.getRegions) {
          setRegions(response.data.data.getRegions);
          regionsResp = true;
        } else {
          console.error('Error fetching regions: unexpected data format', response.data);
          regionsResp = true;
        }
  
        const resp =  await axios.post(endpoints.eveBackend, { query: queries.getAllItems });
        if (resp.data && resp.data.data  && resp.data.data.getAllItems){
          setItems(resp.data.data.getAllItems);
          itemsResp = true;
        }  else {
          console.error('Error fetching items: unexpected data format', response.data);
          itemsResp = true;
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      
      }
      
      if(itemsResp && regionsResp){
        setLoading(false);
      }
        };

    if (!regions) {
      fetchData();
    }
  }, [regions]);

  useEffect(() => {
    const fetchOrdersMean = async () => {
      if (!formData) return;
      if(formData.selectedStations.length === 0){
        try {
          let selectedRegionIds = formData.selectedRegions.map(region => region.id);
          let selectedTypeIds = formData.selectedTypes.map(type => type.id)

          const query = queries.getOrdersStatsByRegion
              .replace("$regionId", JSON.stringify(selectedRegionIds))
              .replace("$typeId", JSON.stringify(selectedTypeIds))
              .replace("$isBuyOrder", formData.isBuyOrder ? "true" : "false")
              .replace("$startDate", `"${formData.formattedStartDateTime}"`)
              .replace("$endDate", `"${formData.formattedEndDateTime}"`);
          const response = await axios.post(endpoints.eveBackend, { query });
          if (response.data && response.data.data && response.data.data.getOrdersStatsByRegion) {
            setOrdersMean(response.data.data.getOrdersStatsByRegion);
          } else {
            console.error('Error fetching orders: unexpected data format', response.data);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      } else {
        try {
          let selectedStations = formData.selectedStations.map(stations => stations.id);
          let selectedTypeIds = formData.selectedTypes.map(type => type.id)
          const query = queries.getOrdersStatsByLocation
              .replace("$locationId", JSON.stringify(selectedStations))
              .replace("$typeId", JSON.stringify(selectedTypeIds))
              .replace("$isBuyOrder", formData.isBuyOrder ? "true" : "false")
              .replace("$startDate", `"${formData.formattedStartDateTime}"`)
              .replace("$endDate", `"${formData.formattedEndDateTime}"`);
          const response = await axios.post(endpoints.eveBackend, { query });
          if (response.data && response.data.data && response.data.data.getOrdersStatsByLocation) {
            setOrdersMean(response.data.data.getOrdersStatsByLocation);
          } else {
            console.error('Error fetching orders: unexpected data format', response.data);
          }

        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrdersMean();
  }, [formData]);

  useEffect(() => {
    setStations([]);
    if(acquireRegionStations) {
      const fetchStations = async () => {

        try {
          const query = queries.getStructuresByRegion
              .replace("$regionId", JSON.stringify(acquireRegionStations.id))

          const response = await axios.post(endpoints.eveBackend, {query});
          if (response.data && response.data.data && response.data.data.getStructuresByRegion) {
            setStations(response.data.data.getStructuresByRegion.structures);
          } else {
            console.error('Error fetching regions: unexpected data format', response.data);
          }
        } catch (error) {
          console.error('Error fetching stations:', error);
        }
      }
      fetchStations();
    }
  }, [acquireRegionStations]);


  useEffect(() => {
    if (formData && regions) {
      const uniqueTimeList = Array.from(new Set(ordersMean.map(item => item.timeOfScraping)))
        .sort((a, b) => new Date(a) - new Date(b));
      let entityIdsInOrders = [];
      let entities;
      if(formData.selectedTypes.length === 1 && formData.selectedRegions.length === 1 && formData.selectedStations.length  > 0){
        entityIdsInOrders = formData.selectedStations.map(station => station.id);
        entities = formData.selectedStations;
      } else if( formData.selectedRegions.length === 1 && formData.selectedTypes.length === 1 && formData.selectedStations.length  === 0){
        entityIdsInOrders = formData.selectedRegions.map(region => region.id);
        entities = formData.selectedRegions;
      } else if( formData.selectedRegions.length > 1){
        entityIdsInOrders = formData.selectedRegions.map(region => region.id);
        entities = formData.selectedRegions;
      } else {
        entityIdsInOrders =formData.selectedTypes.map(type => type.id);
        entities = formData.selectedTypes;
      }

      const generateMetricData = (metric) => {
        return uniqueTimeList.map(time => {
          const entry = { timeOfScraping: time };
          entityIdsInOrders.forEach(entityId => {
            let regionEntry = null
            if(formData.selectedTypes.length === 1 && formData.selectedRegions.length === 1 && formData.selectedStations.length  > 0){
              regionEntry = ordersMean.find(order => order.locationId === entityId && order.timeOfScraping === time)
            } else if( formData.selectedRegions.length === 1 && formData.selectedTypes.length === 1 && formData.selectedStations.length  === 0){
              regionEntry = ordersMean.find(order => order.regionId === entityId && order.timeOfScraping === time)
            } else if( formData.selectedRegions.length > 1){
              regionEntry = ordersMean.find(order => order.regionId === entityId && order.timeOfScraping === time)
            } else {
              regionEntry = ordersMean.find(order => order.typeId === entityId && order.timeOfScraping === time)
            }
            entry[entityId] = regionEntry ? regionEntry[metric] : null;
          });
          return entry;
        });
      };

      const metrics = [
        { name: "Average price", key: "avgPrice", setter: setGraphDataAvgPrice },
        { name: "Highest price", key: "highestPrice", setter: setGraphDataHighestPrice },
        { name: "Lowest price", key: "lowestPrice", setter: setGraphDataLowestPrice },
        { name: "Median price", key: "medianPrice", setter: setGraphDataMedianPrice },
        { name: "Order count", key: "orderCount", setter: setGraphDataOrderCount },
        { name: "Std deviation", key: "stdDeviation", setter: setGraphDataStdDeviation },
        { name: "Volume remain", key: "volumeRemain", setter: setGraphDataVolumeRemain },
      ];
      
      metrics.forEach(({ name, key, setter }) => {
        const metricData = generateMetricData(key);
        setter({
          dataList: metricData,
          startDateTime: formData.formattedStartDateTime,
          endDateTime: formData.formattedEndDateTime,
          name,
          entities
        });
      });
      console.log(ordersMean)
      console.log(graphDataAvgPrice)

    }
  }, [ordersMean, formData, regions]);
  
  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Box>
      <Navbar />
      {!loading ? (
        <>
          <Typography variant="h5" gutterBottom>Orders Data</Typography>
          <OrdersDataForm onSubmit={handleFormSubmit} regions={regions} types={items} stations={stations} setAcquireRegionStations={setAcquireRegionStations}/>
          
          {graphDataAvgPrice && graphDataAvgPrice.dataList && graphDataAvgPrice.dataList.length > 0 && (
            <>
              <OrdersLineChart graphData={graphDataAvgPrice}  />
              <OrdersLineChart graphData={graphDataHighestPrice}  />
              <OrdersLineChart graphData={graphDataLowestPrice}  />
              <OrdersLineChart graphData={graphDataMedianPrice}  />
              <OrdersLineChart graphData={graphDataOrderCount}  />
              <OrdersLineChart graphData={graphDataVolumeRemain}  />
              <OrdersLineChart graphData={graphDataStdDeviation}  />
            </>
          )}
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
}

export default Graphs;