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
.rftfield{ display:flex; flex-direction:column; gap:7px; }
.rftfield__label{ font-family:var(--font-body); font-size:13px; font-weight:var(--fw-medium); color:var(--text-muted); letter-spacing:0.01em; }
.rftinput{
  width:100%; font-family:var(--font-body); font-size:15px; color:var(--text-strong);
  background:var(--surface-inset); border:1px solid var(--hairline-strong);
  border-radius:var(--radius-sm); padding:13px 15px; line-height:1.3;
  transition:border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}
.rftinput::placeholder{ color:var(--text-faint); }
.rftinput:hover{ border-color:var(--gold-border-soft); }
.rftinput:focus{ outline:none; border-color:var(--gold-border); box-shadow:0 0 0 3px rgba(227,168,18,0.16); background:rgba(2,8,18,0.6); }
.rftinput[disabled]{ opacity:0.5; cursor:not-allowed; }
.rftinput--withIcon{ padding-left:42px; }
.rftfield__wrap{ position:relative; display:flex; align-items:center; }
.rftfield__icon{ position:absolute; left:14px; display:inline-flex; color:var(--text-faint); pointer-events:none; }
`;

/**
 * Input — a single-line text field. Inset on the navy stage, gold focus ring.
 */
export function Input({ label, iconLeft = null, id, className = "", ...rest }) {
  useStyleOnce("rft-input", CSS);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const field = (
    <div className="rftfield__wrap">
      {iconLeft && <span className="rftfield__icon">{iconLeft}</span>}
      <input
        id={fieldId}
        className={`rftinput ${iconLeft ? "rftinput--withIcon" : ""} ${className}`}
        {...rest}
      />
    </div>
  );
  if (!label) return field;
  return (
    <div className="rftfield">
      <label className="rftfield__label" htmlFor={fieldId}>
        {label}
      </label>
      {field}
    </div>
  );
}
