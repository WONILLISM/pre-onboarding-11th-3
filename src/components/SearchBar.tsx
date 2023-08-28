import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSearch from '../common/hook/useSearch';
import { SearchParams, SearchRepo, getSearchRepos } from '../common/api/github';
import { useQuery } from 'react-query';

const SearchBar = () => {
  const {
    isFocus,
    isDebouncing,
    searchInput,
    searchParams,
    handleFocus,
    handleSearchParams,
    handleSearchInputChange,
  } = useSearch<SearchParams>({
    initialParams: { q: '', per_page: 5 },
    options: { debouce: true },
  });

  const { status, data } = useQuery({
    queryKey: ['search_repo', searchParams.q],
    queryFn: () => getSearchRepos(searchParams),
    enabled: !!searchParams.q,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const handleItemClick = (title: string) => {
    const [owner, repo] = title.split('/');

    navigate(`/issues?owner=${owner}&repo=${repo}`);
    handleFocus(false);
  };

  console.log(data);

  return (
    <SearchBarStyle>
      <SearchTextArea>
        <SearchTextField>
          <SearchInput
            type="text"
            value={searchInput}
            placeholder="Repository 이름을 입력해주세요."
            onChange={handleSearchInputChange}
            onFocus={() => handleFocus(true)}
          />
        </SearchTextField>
        <SearchButton>검색</SearchButton>
      </SearchTextArea>

      {isFocus && (
        <SearchResultStyle>
          <SearchResultHeader>검색 결과</SearchResultHeader>
          <SearchResultMessage>
            {searchInput === ''
              ? '검색 결과 없음'
              : isDebouncing && '검색중...'}
          </SearchResultMessage>
          <ul>
            {data &&
              data.map((item) => (
                <SearchItem
                  key={item.id}
                  onClick={() => handleItemClick(item.full_name)}
                >
                  {item.full_name}
                </SearchItem>
              ))}
          </ul>
        </SearchResultStyle>
      )}
    </SearchBarStyle>
  );
};

const SearchBarStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 728px;
  gap: 8px;
`;

const SearchTextArea = styled.div`
  display: flex;

  border: 1px solid #456f86;
  background-color: transparent;
  border-radius: 1em;
`;

const SearchTextField = styled.div`
  flex: 1;

  width: 100%;
  display: flex;
  margin: 8px 16px;
`;

const SearchInput = styled.input`
  all: unset;
  width: inherit;
  flex: 1;
  font-size: 1rem;
  cursor: text;
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 40px;

  border-radius: 0 1em 1em 0;
  background-color: #24536a;

  &:hover {
    cursor: pointer;
  }
`;

const SearchResultStyle = styled.div`
  background-color: #24536a;
  border-radius: 1em;

  padding: 8px 16px;
`;

const SearchResultHeader = styled.div`
  font-size: 12px;

  padding: 8px 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #456f86;
`;

const SearchResultMessage = styled.div`
  font-size: 12px;

  text-align: center;
`;

const SearchItem = styled.li`
  padding: 4px 8px;

  &:hover {
    background-color: #456f86;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

export default SearchBar;
