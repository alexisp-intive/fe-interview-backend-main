import { Box, Typography } from "@mui/material";
import { SearchItem } from "./SearchItem";

export const SearchList = ({
  isLoading,
  showEmptyMessage,
  error,
  data,
  handleOnClick,
}) => {
  if (error) {
    return (
      <Typography variant="h5" color="error" component="p" role="alert">
        Opps something happened, try again!
      </Typography>
    );
  }

  if (showEmptyMessage) {
    return (
      <Typography variant="h5" textAlign="center" component="p">
        Sorry! No results found
      </Typography>
    );
  }

  const results = isLoading
    ? Array.from(Array(10).keys()).map((id) => ({ id }))
    : data || [];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(345px, 1fr))"
      gridAutoRows="1fr"
      gap={4}
      component="section"
    >
      {results.map((result) => (
        <SearchItem
          {...result}
          key={result.id}
          isLoading={isLoading}
          handleOnClick={handleOnClick}
        />
      ))}
    </Box>
  );
};
