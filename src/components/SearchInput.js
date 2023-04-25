import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = (props) => (
  <TextField
    id="search-input"
    label="search by name or keyword"
    size="medium"
    sx={{
      width: "40ch",
      boxShadow: "0px 8px 20px rgba(0,0,0,0.06)",
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    {...props}
  />
);
