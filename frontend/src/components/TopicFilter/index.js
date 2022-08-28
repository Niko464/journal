import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import Description from 'components/Description';
import Theme from 'Theme';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function TopicFilter({ allTopics, selectedTopics, setSelectedTopics }) {
  return (
    <Theme>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Description>Get all the articles that are about one of these topics:</Description>
        <FormControl sx={{ margin: "15px", width: 300, fontSize: 5 }} size="small">
          <InputLabel>Topics</InputLabel>
          <Select
            multiple
            value={selectedTopics}
            onChange={(event) => {
              setSelectedTopics(event.target.value)
            }}
            input={<OutlinedInput label="Topics" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {
              allTopics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  <Checkbox checked={selectedTopics.indexOf(topic) > -1} />
                  <ListItemText primary={topic} />
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    </Theme>
  )
}