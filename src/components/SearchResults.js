import { Box, Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  usePatchResultMutation,
  useSearchResultsQuery,
  useStarredQuery,
} from "../api/search";
import { SearchInput } from "./SearchInput";
import { SearchList } from "./SearchList";

export function SearchResults() {
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [searchParameters] = useDebounce(searchQuery, 1000);
  const { isLoading, isSuccess, error, data } =
    useSearchResultsQuery(searchParameters);
  const starredQuery = useStarredQuery();
  const { mutate } = usePatchResultMutation(searchParameters);

  const totalStarred = starredQuery.data?.length || 0;

  const handleOnClick = useCallback(
    ({ id, starred }) => {
      mutate({ id, starred });
    },
    [mutate]
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} color="primary" mb={5}>
        Search results
      </Typography>

      <SearchInput
        value={searchQuery?.q || ""}
        id="search-input"
        onChange={(e) => {
          setSearchQuery({ q: e.target.value, _limit: 10 });
        }}
      />
      <Box textAlign="right">
        <Button
          variant="outlined"
          onClick={() => setSearchQuery({ starred: true })}
        >
          Starred: {totalStarred}
        </Button>
      </Box>
      <Box mt={4}>
        <SearchList
          isLoading={isLoading}
          error={error}
          showEmptyMessage={isSuccess && data.length === 0}
          data={data}
          handleOnClick={handleOnClick}
        />
      </Box>
    </Box>
  );
}
