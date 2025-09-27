import React from 'react';

export const IndiaFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-full h-full rounded-sm">
    <rect width="900" height="600" fill="#f93"/>
    <rect width="900" height="400" y="200" fill="#fff"/>
    <rect width="900" height="200" y="400" fill="#128807"/>
    <g transform="translate(450 300)">
      <circle r="90" fill="#000080"/>
      <circle r="80" fill="#fff"/>
      <circle r="16" fill="#000080"/>
      <g id="d">
        <g id="c">
          <g id="b">
            <g id="a" fill="#000080">
              <circle r="7" transform="rotate(7.5 -2.4 143.5)"/>
              <path d="M0 80L-2.4 72.5A40 40 0 010 40z"/>
            </g>
            <use href="#a" transform="scale(-1 1)"/>
          </g>
          <use href="#b" transform="rotate(15)"/>
        </g>
        <use href="#c" transform="rotate(30)"/>
      </g>
      <use href="#d" transform="rotate(60)"/>
    </g>
  </svg>
);