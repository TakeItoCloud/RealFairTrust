The RealFairTrust lockup — the roofline-check mark beside the tri-colour wordmark: **"Real" in cream**, **"Fair" in the bright gold gradient**, **"Trust" in muted slate-grey**. Use `full` in headers/footers, `mark` as a favicon/avatar, `wordmark` inline in body.

```jsx
<Logo variant="full" size={28} tagline />
<Logo variant="mark" size={40} />
```

The three-colour split is fixed: never recolour "Real" or "Trust", and "Fair" is always the gold word. On the ivory section pass `onIvory` so "Real"/"Trust" become dark ink (cream/slate would vanish). The tagline ("PERFORMANCE YOU CAN SEE") is optional and only shows on the full variant.
