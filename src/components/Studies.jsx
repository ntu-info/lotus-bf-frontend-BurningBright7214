import { API_BASE } from '../api'
import { useEffect, useMemo, useState } from 'react'

function classNames (...xs) { return xs.filter(Boolean).join(' ') }

export function Studies ({ query }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [sortKey, setSortKey] = useState('year')
  const [sortDir, setSortDir] = useState('desc') // 'asc' | 'desc'
  const [page, setPage] = useState(1)
  const pageSize = 20

  useEffect(() => { setPage(1) }, [query])

  useEffect(() => {
    if (!query) return
    let alive = true
    const ac = new AbortController()
    ;(async () => {
      setLoading(true)
      setErr('')
      try {
        const url = `${API_BASE}/query/${encodeURIComponent(query)}/studies`
        const res = await fetch(url, { signal: ac.signal })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`)
        if (!alive) return
        const list = Array.isArray(data?.results) ? data.results : []
        setRows(list)
      } catch (e) {
        if (!alive) return
        setErr(`Unable to fetch studies: ${e?.message || e}`)
        setRows([])
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false; ac.abort() }
  }, [query])

  const changeSort = (key) => {
    if (key === sortKey) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = useMemo(() => {
    const arr = [...rows]
    const dir = sortDir === 'asc' ? 1 : -1
    arr.sort((a, b) => {
      const A = a?.[sortKey]
      const B = b?.[sortKey]
      // Numeric comparison for year; string comparison for other fields
      if (sortKey === 'year') return (Number(A || 0) - Number(B || 0)) * dir
      return String(A || '').localeCompare(String(B || ''), 'en') * dir
    })
    return arr
  }, [rows, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className='studies'>
      <div className='studies__header'>
        <div className='card__title'>研究結果</div>
        {query && (
          <div className='studies__subtitle'>
            共找到 <strong>{sorted.length}</strong> 項研究
          </div>
        )}
      </div>


      {query && loading && (
        <div className='studies__skeleton'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='studies__skeleton-row' />
          ))}
        </div>
      )}

      {query && err && (
        <div className='studies__error'>
          <span className='studies__error-icon'>⚠</span>
          {err}
        </div>
      )}

      {query && !loading && !err && (
        <div className='studies__table-wrapper'>
          <table className='studies__table'>
            <thead className='studies__thead'>
              <tr>
                {[
                  { key: 'year', label: '年份' },
                  { key: 'journal', label: '期刊' },
                  { key: 'title', label: '標題' },
                  { key: 'authors', label: '作者' }
                ].map(({ key, label }) => (
                  <th 
                    key={key} 
                    className={`studies__th ${sortKey === key ? 'studies__th--active' : ''}`}
                    onClick={() => changeSort(key)}
                  >
                    <span className='studies__th-content'>
                      {label}
                      {sortKey === key && (
                        <span className='studies__sort-icon'>{sortDir === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='studies__tbody'>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className='studies__empty-cell'>
                    <span className='studies__empty-icon'>📄</span>
                    無資料
                  </td>
                </tr>
              ) : (
                pageRows.map((r, i) => (
                  <tr key={i} className={`studies__row ${i % 2 === 0 ? 'studies__row--even' : ''}`}>
                    <td className='studies__cell studies__cell--year'>{r.year ?? ''}</td>
                    <td className='studies__cell studies__cell--journal'>{r.journal || ''}</td>
                    <td className='studies__cell studies__cell--title'>
                      <div className='studies__title-text' title={r.title}>{r.title || ''}</div>
                    </td>
                    <td className='studies__cell studies__cell--authors'>{r.authors || ''}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {query && !loading && !err && sorted.length > 0 && (
        <div className='studies__pagination'>
          <div className='studies__pagination-info'>
            共 <strong>{sorted.length}</strong> 筆，第 <strong>{page}</strong> / <strong>{totalPages}</strong> 頁
          </div>
          <div className='studies__pagination-controls'>
            <button 
              disabled={page <= 1} 
              onClick={() => setPage(1)} 
              className='studies__pagination-btn'
              aria-label='第一頁'
            >
              ⏮
            </button>
            <button 
              disabled={page <= 1} 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              className='studies__pagination-btn'
            >
              上一頁
            </button>
            <button 
              disabled={page >= totalPages} 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              className='studies__pagination-btn'
            >
              下一頁
            </button>
            <button 
              disabled={page >= totalPages} 
              onClick={() => setPage(totalPages)} 
              className='studies__pagination-btn'
              aria-label='最後一頁'
            >
              ⏭
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

