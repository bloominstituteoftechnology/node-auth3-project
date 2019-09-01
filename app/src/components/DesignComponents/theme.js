const theme = {
  fontStyles: {
    main: "'Open Sans', sans-serif"
  },

  fontSizing: {
    l: '2rem',
    m: '1.6rem',
    s: '1.2rem'
  },

  device: {
    desktop: '(max-width: 1000px)',
    tablet: '(max-width: 800px)',
    mobile: '(max-width: 500px)'
  },

  flex: (direction = 'row', justify = 'flex-start', align = 'stretch') => `{
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  }`
};

export default theme;
