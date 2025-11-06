import { API_BASE } from '../api'
import { useEffect, useMemo, useState } from 'react'

export function Terms ({ onPickTerm }) {
  const [terms, setTerms] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    let alive = true
    const ac = new AbortController()
    const load = async () => {
      setLoading(true)
      setErr('')
      try {
        const res = await fetch(`${API_BASE}/terms`, { signal: ac.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!alive) return
        setTerms(Array.isArray(data?.terms) ? data.terms : [])
      } catch (e) {
        if (!alive) return
        setErr(`Failed to fetch terms: ${e?.message || e}`)
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => { alive = false; ac.abort() }
  }, [])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return terms
    return terms.filter(t => t.toLowerCase().includes(s))
  }, [terms, search])

  return (
    <div className='terms'>
      <div className='terms__controls'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='搜尋術語…'
          className='terms__search'
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className='terms__clear'
            aria-label='Clear search'
          >
            ✕
          </button>
        )}
      </div>

      {loading && (
        <div className='terms__skeleton'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='terms__skeleton-row' />
          ))}
        </div>
      )}

      {err && (
        <div className='terms__error'>
          <span className='terms__error-icon'>⚠</span>
          {err}
        </div>
      )}

      {!loading && !err && (
        <div className='terms__list'>
          {filtered.length === 0 ? (
            <div className='terms__empty'>
              <span className='terms__empty-icon'>🔍</span>
              {search ? '找不到匹配的術語' : '載入中...'}
            </div>
          ) : (
            <>
              <div className='terms__count'>{filtered.length} 個術語</div>
              <ul className='terms__ul'>
                {filtered.slice(0, 500).map((t, idx) => (
                  <li key={`${t}-${idx}`} className='terms__li'>
                    <button
                      type='button'
                      className='terms__term'
                      title={t}
                      aria-label={`加入術語 ${t}`}
                      onClick={() => onPickTerm?.(t)}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}

