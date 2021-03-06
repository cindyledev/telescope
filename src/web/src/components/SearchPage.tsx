import { FormEvent, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import BackToTopButton from './BackToTopButton';

type FilterProp = {
  filter: 'post' | 'author';
};

const useStyles = makeStyles((theme: Theme) => ({
  searchPage: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
  anchor: {
    position: 'absolute',
    top: 0,
  },
  anchorMobile: {
    position: 'relative',
    bottom: '71px',
  },
}));

const SearchPage = () => {
  const classes = useStyles();
  const router = useRouter();
  // We synchronize the `text` and `filter` values to the URL's query string
  // Router query object for a query can be an array if url becomes text=123&text=456
  // https://stackoverflow.com/questions/60110364/type-string-string-is-not-assignable-to-type-string
  const textParam = Array.isArray(router.query.text)
    ? router.query.text[0]
    : router.query.text || '';
  const filterParam = router.query.filter === 'post' || !router.query.filter ? 'post' : 'author';

  // We manage the state of `text` and `filter` internally, and update URL on
  // form submit only.  These are used in the <SearchBar>, and the user can change them.
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<FilterProp['filter']>('post');

  // Form was submitted, so go ahead and sync to URL, (re)triggering search.
  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();
    router.push(`/search?text=${text}&filter=${filter}`);
  }

  useEffect(() => {
    setText(textParam);
    setFilter(filterParam);
  }, [textParam, filterParam]);

  return (
    <div className={classes.searchPage}>
      <div className={classes.anchor} id="back-to-top-anchor" />
      <div className={classes.anchorMobile} id="back-to-top-anchor-mobile" />
      <SearchBar
        text={text}
        onTextChange={(value: string) => setText(value)}
        filter={filter}
        onFilterChange={(value: FilterProp['filter']) => setFilter(value)}
        onSubmit={onSubmitHandler}
      />
      <br />
      <SearchResults text={textParam} filter={filterParam} />
      <BackToTopButton />
    </div>
  );
};

export default SearchPage;
