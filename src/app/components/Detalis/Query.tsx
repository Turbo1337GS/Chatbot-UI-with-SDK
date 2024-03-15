import * as React from 'react';
import * as mui from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const searchEngines = [
    { name: 'Google', url: 'https://www.google.com/search?q=' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' },
    { name: 'Baidu', url: 'https://www.baidu.com/s?wd=' },
    { name: 'Yandex', url: 'https://yandex.com/search/?text=' },
    { name: 'Ask', url: 'https://www.ask.com/web?q=' },
    { name: 'AOL', url: 'https://search.aol.com/aol/search?q=' },
    { name: 'WolframAlpha', url: 'https://www.wolframalpha.com/input/?i=' },
    { name: 'StartPage', url: 'https://www.startpage.com/do/dsearch?query=' },
    { name: 'Ecosia', url: 'https://www.ecosia.org/search?q=' },
    { name: 'Qwant', url: 'https://www.qwant.com/?q=' },
    { name: 'Lycos', url: 'https://search.lycos.com/web/?q=' },
    { name: 'MetaGer', url: 'https://metager.org/meta/meta.ger3?eingabe=' },
    { name: 'Swisscows', url: 'https://swisscows.com/web?query=' },
    { name: 'Gibiru', url: 'https://gibiru.com/results.html?q=' },
    { name: 'Mojeek', url: 'https://www.mojeek.com/search?q=' },
];
interface QueryProps {
    Query?: string;
}
const QueryButton: React.FC<QueryProps> = ({ Query }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = (url: string) => {
        window.open(`${url}${Query}`, '_blank');
        handleClose();
    };

    return (
        <>
          <mui.Button
  sx={{ m: 1, padding: '6px 12px',maxWidth:"90%",textWrap:'balance', wordBreak:'break-word' }} 
  variant="outlined"
  onClick={() => handleSearch('https://www.google.com/search?q=')}>
  Click to search Google for: "{Query}"
</mui.Button>

            <mui.Button
                sx={{ m: 1 }}
                variant="outlined"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                ...
            </mui.Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                {searchEngines.map((engine) => (
                    <MenuItem key={engine.name} onClick={() => handleSearch(engine.url)}>
                        Search with {engine.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default QueryButton;
