import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.5;
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
}

#root {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  isolation: isolate;
}

html {
    font-family: "Rubik", sans-serif;
  /*
    Silence the warning about missing Reach Dialog styles
  */
  --reach-dialog: 1;

--dark-blue: hsl(212, 24%, 26%);
--grayish-blue: hsl(211, 10%, 45%);
--light-gray: hsl(223, 19%, 93%);
--very-light-gray: hsl(228, 33%, 97%);
--white: hsl(0, 0%, 100%);

--moderate-blue: hsl(238, 40%, 52%);
--soft-red: hsl(358, 79%, 66%);
--light-grayish-blue: hsl(239, 57%, 85%);
--pale-red: hsl(357, 100%, 86%);
}

html, body, #root {
 height: 100vh;
}
`;

export default GlobalStyles;
