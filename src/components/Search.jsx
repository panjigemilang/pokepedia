import { useContext, useState } from "react"
import styled from "@emotion/styled"
import { SearchContext } from "../contexts/SearchContext"

const App = styled.div`
  align-items: center;
  display: flex;
  padding: 8px 16px;
  position: relative;
  width: 100%;
`

const SearchInput = styled.input`
  background-color: #a9c0b5;
  border: none;
  border-radius: 20px;
  margin-left: auto;
  padding: 8px 12px;
  transition: 0.3s ease-in-out;
  width: ${({ show }) => (show ? "92%" : "100%")};

  &:focus {
    outline: none;
  }
`

const SearchPlaceholder = styled.span`
  align-items: center;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 50%;
  pointer-events: none;
  transform: translateX(-50%);
  transition: 0.3s ease-in-out;
  opacity: ${({ show }) => (show ? 0 : 1)};
`

const SearchIcon = styled.i`
  margin-right: 8px;
`

const BackButton = styled.i`
  background-color: transparent;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #84b39c;
  }
`

export default function Search() {
  const { search, setSearch } = useContext(SearchContext)
  const [focus, setFocus] = useState(false)

  const triggerFocus = () => setFocus(!focus)

  return (
    <App>
      <BackButton
        className="fas fa-chevron-left"
        show={search || focus}
        onClick={() => setSearch("")}
      />
      <SearchPlaceholder show={search || focus}>
        <SearchIcon className="fas fa-search" />
        <p>Search ...</p>
      </SearchPlaceholder>
      <SearchInput
        onBlur={triggerFocus}
        onFocus={triggerFocus}
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        show={search || focus}
        value={search}
      />
    </App>
  )
}
