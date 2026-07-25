import React from "react";

/**
 * Admin brand wordmark — replaces Payload's default logo (login + nav header).
 * Styled via `.e-wordmark` in admin-custom.scss (navy on light, white in the
 * navy sidebar). No CSS import here: this file is walked by the config/importMap
 * chain, and CSS in Node-parsed code crashes generate:importmap.
 */
export const Logo: React.FC = () => (
  <span className="e-wordmark">
    EDITORIAL<span className="e-dot">.</span>
  </span>
);

export default Logo;
