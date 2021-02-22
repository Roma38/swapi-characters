import axios from "axios";
import { useEffect, useReducer, useRef, useCallback } from "react";
import { Search } from "semantic-ui-react";

import { history } from "../history";
import { API_HOST } from "../constants";

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function searchReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return history.push(`/profile/${action.url.split("/")[5]}`)

    default:
      throw new Error()
  }
}

function CharactersSearch() {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const { loading, results, value } = state

  const timeoutRef = useRef()
  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return
      }

      axios
        .get(`${API_HOST}/people/?search=${data.value}`)
        .then(({ data }) => dispatch({ type: 'FINISH_SEARCH', results: data.results }))
        .catch(error => alert(error));
    }, 700)
  }, [])
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return <Search
    loading={loading}
    onResultSelect={(e, data) =>
      dispatch({ type: 'UPDATE_SELECTION', url: data.result.url })
    }
    onSearchChange={handleSearchChange}
    results={results.map(({ name, url }) => ({ title: name, url }))}
    value={value}
  />
}

export default CharactersSearch;
