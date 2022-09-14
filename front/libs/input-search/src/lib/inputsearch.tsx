import { useEffect, useMemo, useState } from 'react';
import {
  Item,
  ItemSuggestion,
  NoData,
  StyleSearch,
  SuggestionList,
  WrapperSearch,
} from './styles';
import Tippy from '@tippyjs/react/headless';
import { Loading } from '@front/loading';

/* eslint-disable-next-line */
export type InputSearchProps = {
  background?: string;
  isError?: boolean;
  fontSize?: string;
  placeholder?: string;
  colorPlaceholder?: string;
  paddingTB?: string;
  paddingL?: string;
  widthInput?: string;
  heightInput?: string;
  data: string[];
  value?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  name?: string;
};

function InputSearch({
  background = '#FFFFFF',
  isError = false,
  fontSize = '14px',
  placeholder = '',
  colorPlaceholder = '#b1b1b1',
  paddingTB = '8px',
  paddingL = '15px',
  widthInput = '300px',
  heightInput = '38px',
  data,
  value,
  onChange,
  loading,
  name = '',
  ...props
}: InputSearchProps) {
  const [showResult, setShowResult] = useState(false);
  const listSearch = useMemo(() => data?.slice(0, 5), [data]);
  const [suggestions, setSuggestions] = useState<string[]>(listSearch);
  const handleChange = (value: string) => {
    setSuggestions(
      listSearch?.filter((item: any) =>
        item.trim().toLowerCase().includes(value.trim().toLowerCase())
      )
    );
    onChange && onChange(value);
  };

  const handleClick = (item: string) => {
    onChange && onChange(item);
    setShowResult(false);
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  useEffect(() => {
    setSuggestions(listSearch);
  }, [listSearch]);

  return (
    <Tippy
      render={(attrs) => (
        <SuggestionList data={data} heightInput={heightInput} {...attrs}>
          {loading ? (
            <NoData>
              <Loading size="md" />
            </NoData>
          ) : suggestions?.length > 0 ? (
            <>
              {suggestions?.map((item, index) => (
                <ItemSuggestion key={index} onClick={() => handleClick(item)}>
                  {item}
                </ItemSuggestion>
              ))}
              <Item>※応募者数の順に5件まで表示中</Item>
            </>
          ) : (
            <>
              <NoData> 候補がありません</NoData>
              <Item>※応募者数の順に5件まで表示中</Item>
            </>
          )}
        </SuggestionList>
      )}
      offset={[0, 4]}
      visible={showResult}
      interactive
      placement={'bottom'}
      onClickOutside={handleHideResult}
    >
      <StyleSearch
        name={name}
        data={data}
        background={background}
        isError={isError}
        fontSize={fontSize}
        placeholder={placeholder}
        colorPlaceholder={colorPlaceholder}
        paddingTB={paddingTB}
        paddingL={paddingL}
        onChange={(e: any) => handleChange(e.target.value)}
        value={value}
        onFocus={() => setShowResult(true)}
      />
    </Tippy>
  );
}

export default InputSearch;
