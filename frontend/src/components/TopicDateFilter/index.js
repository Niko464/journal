import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Description from 'components/Description';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Theme from 'Theme';

export default function TopicDateFilter({ startDate, setStartDate, endDate, setEndDate }) {
  

  return (
    <Theme>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Description>Get all the articles that are in range of these dates:</Description>
        <DatePicker

          selected={startDate}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          placeholderText={"placeholder"}
          dateFormat={"P"}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          locale="fr"
        />
      </div>
    </Theme>
  )
}