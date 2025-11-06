export function QueryBuilder({ query, setQuery }) {
  const append = (token) => setQuery((q) => (q ? `${q} ${token}` : token));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setQuery(e.currentTarget.value);
    }
  };

  const operators = [
    { label: 'AND', onClick: () => append('AND'), type: 'logic' },
    { label: 'OR', onClick: () => append('OR'), type: 'logic' },
    { label: 'NOT', onClick: () => append('NOT'), type: 'logic' },
    { label: '(', onClick: () => append('('), type: 'bracket' },
    { label: ')', onClick: () => append(')'), type: 'bracket' },
    { label: 'Reset', onClick: () => setQuery(''), type: 'action' },
  ];

  return (
    <div className="qb">
      <div className="qb__header">
        <div className="card__title">查詢建立器</div>
      </div>

      <div className="qb__input-wrapper">
        <input
          value={query || ''}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="建立查詢，例如：[-22,-4,18] NOT emotion"
          className="qb__input"
        />
        {query && (
          <button
            className="qb__clear"
            onClick={() => setQuery('')}
            aria-label="清除查詢"
            title="清除查詢"
          >
            ✕
          </button>
        )}
      </div>

      <div className="qb__toolbar">
        {operators.map((op) => (
          <button
            key={op.label}
            onClick={op.onClick}
            className={`qb__op qb__op--${op.type}`}
            title={`加入 ${op.label}`}
          >
            {op.label}
          </button>
        ))}
      </div>

      {query && (
        <div className="qb__preview">
          <span className="qb__preview-label">目前查詢：</span>
          <code className="qb__preview-code">{query}</code>
        </div>
      )}
    </div>
  );
}
