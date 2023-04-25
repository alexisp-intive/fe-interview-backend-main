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
  const [searchParameters, setSearchParameters] = useState(undefined);
  const [debouncedSearchParameters] = useDebounce(searchParameters, 1000);
  const { isLoading, isSuccess, error, data } = useSearchResultsQuery(
    debouncedSearchParameters
  );
  const starredQuery = useStarredQuery();
  const { mutate } = usePatchResultMutation(debouncedSearchParameters);

  const totalStarred = starredQuery.data?.length || 0;

  const handleOnClick = useCallback(
    ({ id, starred }) => {
      mutate({ id, starred });
    },
    [mutate]
  );

  return (
    <section>
      <Typography variant="h4" fontWeight={600} color="primary" mb={5}>
        Search results
      </Typography>

      <SearchInput
        value={searchParameters?.q || ""}
        id="search-input"
        onChange={(ev) => {
          setSearchParameters({ q: ev.target.value, _limit: 10 });
        }}
      />

      <Box textAlign="right">
        <Button
          variant="outlined"
          onClick={() => setSearchParameters({ starred: true })}
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
    </section>
  );
}
