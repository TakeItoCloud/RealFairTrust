import React from "react";

function useStyleOnce(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const CSS = `
.rftselect__wrap{ position:relative; display:flex; flex-direction:column; gap:7px; }
.rftselect__label{ font-family:var(--font-body); font-size:13px; font-weight:var(--fw-medium); color:var(--text-muted); }
.rftselect__field{ position:relative; display:flex; align-items:center; }
.rftselect{
  width:100%; appearance:none; -webkit-appearance:none; cursor:pointer;
  font-family:var(--font-body); font-size:15px; color:var(--text-strong);
  background:var(--surface-inset); border:1px solid var(--hairline-strong);
  border-radius:var(--radius-sm); padding:13px 40px 13px 15px; line-height:1.3;
  transition:border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.rftselect:hover{ border-color:var(--gold-border-soft); }
.rftselect:focus{ outline:none; border-color:var(--gold-border); box-shadow:0 0 0 3px rgba(227,168,18,0.16); }
.rftselect__chev{ position:absolute; right:15px; pointer-events:none; color:var(--text-faint); }
`;

/**
 * Select — a styled native dropdown with a gold focus ring. Used heavily in
 * discovery filters (city, zone, deal type, sort).
 */
export function Select({ label, options = [], id, className = "", ...rest }) {
  useStyleOnce("rft-select", CSS);
  const autoId = React.useId();
  const fieldId = id || autoId;
  return (
    <div className="rftselect__wrap">
      {label && (
        <label className="rftselect__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className="rftselect__field">
        <select id={fieldId} className={`rftselect ${className}`} {...rest}>
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <svg className="rftselect__chev" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
