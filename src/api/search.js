import { useMutation, useQuery, useQueryClient } from "react-query";

const { REACT_APP_API_URL } = process.env;
const GET_SEARCH_RESULT_KEY = "results";
const GET_STARRED_RESULT_KEY = "starred";

const getSearchResults = async (params) => {
  const urlParams = new URLSearchParams(params);
  const response = await fetch(`${REACT_APP_API_URL}/search?${urlParams}`);
  const json = await response.json();

  return json;
};

const useSearchResultsQuery = (queryParameters) => {
  return useQuery(
    [GET_SEARCH_RESULT_KEY, queryParameters],
    () => getSearchResults(queryParameters),
    {
      enabled: !!queryParameters,
    }
  );
};

const updateStarredById = async ({ id, ...fields }) => {
  const response = await fetch(`${REACT_APP_API_URL}/search/${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();

  return json;
};

const usePatchResultMutation = (queryParameters) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStarredById,
    onMutate: async (newResult) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [GET_SEARCH_RESULT_KEY, queryParameters],
      });

      // Snapshot the previous value
      const previousResults = queryClient.getQueryData([
        GET_SEARCH_RESULT_KEY,
        queryParameters,
      ]);

      // Optimistically update to the new value
      const newResults = previousResults.map((result) =>
        result.id === newResult.id ? { ...result, ...newResult } : result
      );

      queryClient.setQueryData(
        [GET_SEARCH_RESULT_KEY, queryParameters],
        newResults
      );

      // Return a context with the previous and new todo
      return { previousResults, newResult };
    },
    // If the mutation fails, use the context we returned above
    onError: (err, newResult, context) => {
      queryClient.setQueryData(
        [GET_SEARCH_RESULT_KEY, queryParameters],
        context.previousResults
      );
    },
    // Always refetch after error or success:
    onSettled: (newResult) => {
      queryClient.invalidateQueries({ queryKey: [GET_SEARCH_RESULT_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_STARRED_RESULT_KEY] });
    },
  });
};

const useStarredQuery = () => {
  return useQuery([GET_STARRED_RESULT_KEY], () =>
    getSearchResults({ starred: true })
  );
};

export { useSearchResultsQuery, useStarredQuery, usePatchResultMutation };
