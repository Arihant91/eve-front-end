import React, {useEffect, useState} from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Grid, Checkbox, FormControlLabel, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

function OrdersDataForm({ onSubmit, regions, types, stations, setAcquireRegionStations }) {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [regionSearchText, setRegionSearchText] = useState('');
  const [stationSearchText, setStationSearchText] = useState('');
  const [typeSearchText, setTypeSearchText] = useState('');
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenStation, setIsOpenStation] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isBuyOrder, setIsBuyOrder] = useState(false);
  const [isStationSearch, setIsStationSearch] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // useEffect(() => {
  //   if(isOpenStation && selectedRegions.length === 1){
  //     setAcquireRegionStations(selectedRegions[0]);
  //   }
  // },[isOpenStation, selectedRegions, setAcquireRegionStations]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const showDialogMessage = (message) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleTypeSelect = (type) => {
    if (selectedTypes.length > 0 && selectedRegions.length > 1) {
      showDialogMessage("You can only select one type while multiple regions are selected.");
    } else {
      setSelectedTypes((prev) => [...prev, type]);
      console.log(typeSearchText)
      setTypeSearchText('');
      setIsOpenType(false);
    }
  };

  const handleStationSelect = (type) => {
    if (selectedRegions.length > 1) {
      showDialogMessage("You can only select one region when searching for stations.");
    } else {
      setSelectedStations((prev) => [...prev, type]);
      setStationSearchText('');
      setIsOpenStation(false);
    }
  };

  const handleRegionSelect = (region) => {
    if (selectedRegions.length > 0 && selectedTypes.length > 1 ) {
      showDialogMessage("You can only select one region while multiple types are selected.");
    } else if(selectedRegions.length >= 1 && isOpenStation) {
      showDialogMessage("You can only select one region while searching in stations")
    } else {
      setSelectedRegions((prev) => [...prev, region]);
      console.log(regionSearchText)
      setRegionSearchText('');
      setIsOpenRegion(false);
    }
  };

  const handleTypeRemove = (typeName) => {
    setSelectedTypes((prevSelected) => prevSelected.filter((type) => type.name !== typeName));
  };

  const handleRegionRemove = (regionName) => {
    setSelectedRegions((prevSelected) => prevSelected.filter(region => region.name !== regionName));
  };
  const handleStationRemove = (stationName) => {
    setSelectedStations((prevSelected) => prevSelected.filter(station => station.name !== stationName));
  };

  const filteredRegions = (regions || []).filter((region) =>{
    return region.name.toLowerCase().includes(regionSearchText.toLowerCase()) &&
      !selectedRegions.includes(region)
  }
    );

  const filteredStations = (stations || []).filter((station) =>{
    return station.name.toLowerCase().includes(stationSearchText.toLowerCase()) &&
      !selectedStations.includes(station.name)
  }
    );



  const filteredTypes = (types || []).flatMap((firstCharHashMap) => {
    if (typeSearchText.length > 0 && firstCharHashMap.key === typeSearchText[0].toLowerCase()) {
      return firstCharHashMap.items.filter((type) =>
        type.name.toLowerCase().includes(typeSearchText.toLowerCase()) &&
        !selectedTypes.includes(type.name)
      );
    }
    return [];
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (startDateTime && endDateTime && endDateTime > startDateTime) {
      const formattedStartDateTime = format(startDateTime, 'yyyy-MM-dd HH');
      const formattedEndDateTime = format(endDateTime, 'yyyy-MM-dd HH');
      onSubmit({
        selectedRegions,
        selectedTypes,
        isBuyOrder,
        formattedStartDateTime,
        formattedEndDateTime,
      });
    } else {
      showDialogMessage("Please fill in all fields and ensure the end date is after the start date.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Regions</InputLabel>
              <Select
                multiple
                open={isOpenRegion}
                value={selectedRegions}
                onOpen={() => setIsOpenRegion(true)}
                onClose={() => setIsOpenRegion(false)}
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(region => (
                      <Chip
                        key={region.id}
                        label={region.name}
                        onDelete={(e) => {
                          e.stopPropagation();
                          handleRegionRemove(region.name);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      />
                    ))}
                  </Box>
                )}
              >
                <TextField
                  autoFocus
                  placeholder="Search regions..."
                  value={regionSearchText}
                  onChange={(e) => setRegionSearchText(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenRegion(true);
                  }}
                  fullWidth
                  variant="standard"
                  sx={{ mx: 2, my: 1 }}
                />
                {filteredRegions.map((region) => (
                  <MenuItem
                    key={region.id}
                    value={region.name}
                    onClick={() => handleRegionSelect(region)}
                  >
                    {region.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Types</InputLabel>
              <Select
                multiple
                open={isOpenType}
                value={selectedTypes}
                onOpen={() => setIsOpenType(true)}
                onClose={() => setIsOpenType(false)}
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(type => (
                      <Chip
                        key={type.id}
                        label={type.name}
                        onDelete={(e) => {
                          e.stopPropagation();
                          handleTypeRemove(type.name);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      />
                    ))}
                  </Box>
                )}
              >
                <TextField
                  autoFocus
                  placeholder="Search types..."
                  value={typeSearchText}
                  onChange={(e) => setTypeSearchText(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenType(true);
                  }}
                  fullWidth
                  variant="standard"
                  sx={{ mx: 2, my: 1 }}
                />
                {filteredTypes.map((type) => (
                  <MenuItem
                    key={type.id}
                    value={type.name}
                    onClick={() => handleTypeSelect(type)}
                  >
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {/*<FormControlLabel*/}
            {/*    control={<Checkbox checked={isStationSearch} onChange={(e) => setIsStationSearch(e.target.checked)} />}*/}
            {/*    label="Search By Stations"*/}
            {/*/>*/}
            <FormControlLabel
              control={<Checkbox checked={isBuyOrder} onChange={(e) => setIsBuyOrder(e.target.checked)} />}
              label="Is Buy Order"
            />
          </Grid>
          {/*{isStationSearch &&*/}
          {/*<Grid item xs={12} sm={6}>*/}
          {/*  <FormControl fullWidth>*/}
          {/*    <InputLabel>Stations</InputLabel>*/}
          {/*    <Select*/}
          {/*        multiple*/}
          {/*        open={isOpenStation}*/}
          {/*        value={selectedStations}*/}
          {/*        onOpen={() => setIsOpenStation(true)}*/}
          {/*        onClose={() => setIsOpenStation(false)}*/}
          {/*        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}*/}
          {/*        renderValue={(selected) => (*/}
          {/*            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>*/}
          {/*              {selected.map(station => (*/}
          {/*                  <Chip*/}
          {/*                      key={station.id}*/}
          {/*                      label={station.name}*/}
          {/*                      onDelete={(e) => {*/}
          {/*                        e.stopPropagation();*/}
          {/*                        handleStationRemove(station.name);*/}
          {/*                      }}*/}
          {/*                      onMouseDown={(e) => e.stopPropagation()}*/}
          {/*                  />*/}
          {/*              ))}*/}
          {/*            </Box>*/}
          {/*        )}*/}
          {/*    >*/}
          {/*      <TextField*/}
          {/*          autoFocus*/}
          {/*          placeholder="Search stations..."*/}
          {/*          value={stationSearchText}*/}
          {/*          onChange={(e) => setStationSearchText(e.target.value)}*/}
          {/*          onClick={(e) => {*/}
          {/*            e.stopPropagation();*/}
          {/*            setIsOpenStation(true);*/}
          {/*          }}*/}
          {/*          fullWidth*/}
          {/*          variant="standard"*/}
          {/*          sx={{ mx: 2, my: 1 }}*/}
          {/*      />*/}
          {/*      {filteredStations.map((station) => (*/}
          {/*          <MenuItem*/}
          {/*              key={station.id}*/}
          {/*              value={station.name}*/}
          {/*              onClick={() => handleStationSelect(station)}*/}
          {/*          >*/}
          {/*            {station.name}*/}
          {/*          </MenuItem>*/}
          {/*      ))}*/}
          {/*    </Select>*/}
          {/*  </FormControl>*/}
          {/*</Grid>}*/}
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Start DateTime"
              value={startDateTime}
              onChange={(newValue) => setStartDateTime(newValue)}
              renderInput={(params) => <TextField {...params} required fullWidth />}
              views={['year', 'month', 'day', 'hours']}
              ampm={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="End DateTime"
              value={endDateTime}
              onChange={(newValue) => {
                if (newValue >= startDateTime) {
                  setEndDateTime(newValue);
                } else {
                  showDialogMessage("End date and time must be after start date and time.");
                  setEndDateTime(null);
                }
              }}
              minDateTime={startDateTime}
              views={['year', 'month', 'day', 'hours']}
              ampm={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Button  onClick={handleSubmit} message ="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Notice</DialogTitle>
          <DialogContent>{dialogMessage}</DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}

export default OrdersDataForm;
