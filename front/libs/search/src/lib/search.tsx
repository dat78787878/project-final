import { forwardRef, useMemo, useState } from 'react';
import { NoData, StyleSearch, SuggestionList, WrapperSearch } from './styles';
import { Search as SearchIcon } from 'react-feather';
import Tippy from '@tippyjs/react/headless';
import { Loading } from '@front/loading';
import { bool } from 'yup';

/* eslint-disable-next-line */
export type SearchProps = {
  widthInput?: string;
  heightInput?: string;
  data: string[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  showAll?: boolean;
  color?: string;
  backgroundColor?: string;
  changeSearch?: (value: string, isClick: boolean) => void;
};

export function Search(
  {
    widthInput = '300px',
    heightInput = '38px',
    placeholder = 'Search',
    data,
    value,
    onChange,
    loading,
    showAll = false,
    color = '#000000',
    backgroundColor = 'white',
    changeSearch,
    ...props
  }: SearchProps,
  ref: any
) {
  const [showResult, setShowResult] = useState(false);
  const listSearch = useMemo(
    () => (showAll ? data : data?.slice(0, 5)),
    [data, showAll]
  );

  const handleChange = (value: string) => {
    onChange && onChange(value);
    changeSearch && changeSearch(value, false);
  };

  const handleClick = (item: string) => {
    onChange && onChange(item);
    setShowResult(false);
    changeSearch && changeSearch(item, true);
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <Tippy
      render={(attrs) => (
        <SuggestionList
          data={data}
          widthInput={widthInput}
          heightInput={heightInput}
          color={color}
          {...attrs}
        >
          {loading ? (
            <NoData>
              <Loading size="md" />
            </NoData>
          ) : listSearch.length > 0 ? (
            listSearch?.map((item, index) => (
              <li key={index} onClick={() => handleClick(item)}>
                {item}
              </li>
            ))
          ) : (
            <NoData>No Data</NoData>
          )}
        </SuggestionList>
      )}
      zIndex={90}
      offset={[0, -30]}
      visible={showResult}
      interactive
      placement={'bottom'}
      onClickOutside={handleHideResult}
    >
      <WrapperSearch
        {...props}
        data={data}
        widthInput={widthInput}
        heightInput={heightInput}
        backgroundColor={backgroundColor}
      >
        <SearchIcon />
        <StyleSearch
          type="input"
          backgroundColor={backgroundColor}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          onFocus={() => setShowResult(true)}
          ref={ref}
        />
      </WrapperSearch>
    </Tippy>
  );
}

export default forwardRef(Search);
