import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/joy/Input';
import React from 'react';

interface Props {
  placeholder?: string;
  autoFocus?: boolean;
  children: (query: string) => React.ReactNode;
}

export default function SearchProvider({
  placeholder = 'Search…',
  autoFocus = true,
  children,
}: Props) {
  const [query, setQuery] = React.useState('');

  return (
    <>
      <Input
        autoFocus={autoFocus}
        placeholder={placeholder}
        size="sm"
        startDecorator={
          <SearchIcon sx={{ fontSize: '1rem', color: 'var(--joy-palette-text-icon)' }} />
        }
        value={query}
        variant="soft"
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 1, width: '100%' }}
      />
      {children(query)}
    </>
  );
}
