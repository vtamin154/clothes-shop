import React from 'react';
import { makeStyles, Slider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: '40px',
    width: '100%',
  },
  thumb: {
    color: '#000000',
  },
  rail: {
    color: `rgba(0,0,0,0.27)`,
  },
  track: {
    color: '#000000',
  },
});
const FilterByPrice = ({ value, changePrice }) => {
  const classes = useStyles();
  const customPrice = [
    {
      value: 100,
      label: '100k'
    },
    {
      value: 300,
      label: '300k'
    },
    {
      value: 500,
      label: '500k'
    },
  ]
  // console.log(value);
  return (
    <div className={classes.root}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={changePrice}
        valueLabelDisplay="on"
        min={100}
        max={500}
        step = {25}
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
        }}
        marks = {customPrice}
      />
    </div>
  );
};

export default FilterByPrice;
