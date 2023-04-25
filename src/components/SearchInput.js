import { InputAdornment, TextField as MuiTextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

const TextField = styled(MuiTextField)`
  width: 40ch;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.13);
`;

export const SearchInput = (props) => (
  <TextField
    id="search-input"
    label="search by name or keyword"
    size="medium"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    {...props}
  />
);
