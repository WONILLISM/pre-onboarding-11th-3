import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSearch from '../hooks/useSearch';
import { SearchParams, SearchRepo, getSearchRepos } from '../lib/api/github';
import { useQuery } from 'react-query';
import { useState } from 'react';

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
    initialParams: { q: '', per_page: 5, sort: 'stars' },
    options: { debouce: true },
  });

  const { isLoading, data } = useQuery({
    queryKey: ['search_repo', searchParams.q],
    queryFn: () => getSearchRepos(searchParams),
    enabled: !!searchParams.q,
    refetchOnWindowFocus: false,
  });

  const [title, setTitle] = useState<string>('');

  const navigate = useNavigate();

  const handleItemClick = (title: string) => {
    const [owner, repo] = title.split('/');

    setTitle(title);

    navigate(`/issues?owner=${owner}&repo=${repo}`);
    handleFocus(false);
  };

  console.log(data);

  return (
    <SearchBarStyle>
      <RepoTitle>{title}</RepoTitle>
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
              : (isDebouncing || isLoading) && '검색중...'}
          </SearchResultMessage>
          {searchInput !== '' && (
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
          )}
        </SearchResultStyle>
      )}
    </SearchBarStyle>
  );
};

const SearchBarStyle = styled.div`
  width: 100%;
  max-width: 728px;
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const RepoTitle = styled.h1`
  font-size: 20px;
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
  border: 1px solid #a5a5ff;
  background-color: #26414ecc;
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
