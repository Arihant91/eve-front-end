import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Grid, Checkbox, FormControlLabel, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

function OrdersDataForm({ onSubmit, regions, types }) {
  const [selectedRegionNames, setSelectedRegionNames] = useState([]);
  const [selectedTypeNames, setSelectedTypeNames] = useState([]);
  const [regionSearchText, setRegionSearchText] = useState('');
  const [typeSearchText, setTypeSearchText] = useState('');
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isBuyOrder, setIsBuyOrder] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const showDialogMessage = (message) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleTypeSelect = (typeName) => {
    if (selectedTypeNames.length > 0 && selectedRegionNames.length > 1) {
      showDialogMessage("You can only select one type while multiple regions are selected.");
    } else {
      setSelectedTypeNames((prev) => [...prev, typeName]);
      setTypeSearchText('');
      setIsOpenType(false);
    }
  };

  const handleRegionSelect = (regionName) => {
    if (selectedRegionNames.length > 0 && selectedTypeNames.length > 1) {
      showDialogMessage("You can only select one region while multiple types are selected.");
    } else {
      setSelectedRegionNames((prev) => [...prev, regionName]);
      setRegionSearchText('');
      setIsOpenRegion(false);
    }
  };

  const handleTypeRemove = (typeName) => {
    setSelectedTypeNames((prevSelected) => prevSelected.filter((name) => name !== typeName));
  };

  const handleRegionRemove = (regionName) => {
    setSelectedRegionNames((prevSelected) => prevSelected.filter((name) => name !== regionName));
  };

  const filteredRegions = (regions || [])
    .filter((region) =>
      region.name.toLowerCase().includes(regionSearchText.toLowerCase()) &&
      !selectedRegionNames.includes(region.name)
    );

  const filteredTypes = (types || []).flatMap((type) => {
    if (typeSearchText.length > 0 && type.key === typeSearchText[0].toLowerCase()) {
      return type.items.filter(({ name }) =>
        name.toLowerCase().includes(typeSearchText.toLowerCase()) &&
        !selectedTypeNames.includes(name)
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
        selectedRegionNames,
        selectedTypeNames,
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
                value={selectedRegionNames}
                onOpen={() => setIsOpenRegion(true)}
                onClose={() => setIsOpenRegion(false)}
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((regionName) => (
                      <Chip
                        key={regionName}
                        label={regionName}
                        onDelete={(e) => {
                          e.stopPropagation();
                          handleRegionRemove(regionName);
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
                    onClick={() => handleRegionSelect(region.name)}
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
                value={selectedTypeNames}
                onOpen={() => setIsOpenType(true)}
                onClose={() => setIsOpenType(false)}
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((typeName) => (
                      <Chip
                        key={typeName}
                        label={typeName}
                        onDelete={(e) => {
                          e.stopPropagation();
                          handleTypeRemove(typeName);
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
                    onClick={() => handleTypeSelect(type.name)}
                  >
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isBuyOrder} onChange={(e) => setIsBuyOrder(e.target.checked)} />}
              label="Is Buy Order"
            />
          </Grid>
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
