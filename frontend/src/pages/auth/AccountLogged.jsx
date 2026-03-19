
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../components/helpers/AuthProvider';
import { Link, Navigate } from 'react-router-dom';
import { WatchLaterSerieItem } from '../../components/helpers/WatchLaterItem';
export const AccountLogged = () => {
  const { isLogged, user } = useAuth();
  const [countVotes, setCountVotes] = useState(0);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [watchLaterSeries, setWatchLaterSeries] = useState([]);
  const [activeWatchLaterTab, setActiveWatchLaterTab] = useState('series');
  const [removingWatchLater, setRemovingWatchLater] = useState({});

  const createdAtLabel = useMemo(() => {
    if (!user?.created_at) return '';
    try {
      const date = new Date(user.created_at);
      if (Number.isNaN(date.getTime())) return String(user.created_at);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return String(user.created_at);
    }
  }, [user?.created_at]);

  const stats = useMemo(() => {
    const safeVotes = typeof countVotes === 'number' ? countVotes : Number(countVotes) || 0;
    return {
      votes: safeVotes,
      watchLaterSeries: Array.isArray(watchLaterSeries) ? watchLaterSeries.length : 0,
      watchLaterMovies: Array.isArray(watchLaterMovies) ? watchLaterMovies.length : 0,
    };
  }, [countVotes, watchLaterMovies, watchLaterSeries]);
        
  useEffect(() => {
    const getInfoVotes = async () => {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/api/vote/getAll`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      })
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setCountVotes(data);
    }
    const getWatchLaterMovies = async () => {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/api/watchLater/getAll?isSerie=false`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        console.log("fail to load watch later");
        return;
      }
      const data = await res.json();
      setWatchLaterMovies(data);
    }
    const getWatchLaterSeries = async () => {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/api/watchLater/getAll?isSerie=true`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        console.log("fail to load watch later");
        return;
      }
      const data = await res.json();
      setWatchLaterSeries(data);
    }
    getWatchLaterSeries();
    getWatchLaterMovies();
    getInfoVotes();
  }, [isLogged])

  const removeWatchLater = async (mediaId, isSerie) => {
    const key = `${mediaId}-${isSerie ? 's' : 'm'}`;
    setRemovingWatchLater((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/api/watchLater/${mediaId}/${isSerie}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) return;

      if (isSerie) {
        setWatchLaterSeries((prev) => prev.filter((item) => item.mediaId !== mediaId));
      } else {
        setWatchLaterMovies((prev) => prev.filter((item) => item.mediaId !== mediaId));
      }
    } finally {
      setRemovingWatchLater((prev) => ({ ...prev, [key]: false }));
    }
  };

  if (!isLogged) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="w-full min-h-screen text-left pt-24 px-10 pb-12 bg-[radial-gradient(circle,_rgb(var(--colorAccentRgb)_/_0.06)_0%,_rgba(12,61,47,0.14)_35%,_rgba(0,0,0,1)_100%)]">
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-[var(--colorAccent)]">Dash</span>board
            </h1>
            <p className="text-sm text-gray-300">
              Manage your account and your watch later list.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/user/changepassword"
              className="inline-flex items-center justify-center rounded-md bg-transparent border border-[var(--colorAccent)] text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-[var(--colorAccent)] hover:text-black transition shadow-[0_0_0_1px_rgb(var(--colorAccentRgb)_/_0.16),0_18px_55px_rgb(var(--colorAccentRgb)_/_0.04)]"
            >
              Change password
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="glass-card bg-[#232426c4] border border-[#2c2d30] p-6 relative overflow-hidden shadow-[0_0_0_1px_rgb(var(--colorAccentRgb)_/_0.18),0_18px_55px_rgb(var(--colorAccentRgb)_/_0.05)]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgb(var(--colorAccentRgb)_/_0.10),_rgba(0,0,0,0)_55%)]" />
            <div className="flex items-center gap-4">
              <img
                src="/1fb4eb9d-c23b-4dcb-9818-c037389947c8.png"
                alt="Avatar"
                className="rounded-full bg-gray-200/10 w-16 h-16 ring-2 ring-[var(--colorAccent)] object-cover"
              />
              <div className="min-w-0">
                <div className="text-sm text-gray-300">Signed in as</div>
                <div className="font-semibold truncate">{user?.email}</div>
                {createdAtLabel ? (
                  <div className="text-xs text-gray-300 mt-0.5">
                    Member since {createdAtLabel}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="rounded-md bg-black/30 border border-white/10 p-4 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--colorAccent)]" />
                <div className="text-xs uppercase tracking-wide text-gray-300">Votes</div>
                <div className="text-2xl font-bold mt-1 text-white">
                  {stats.votes.toLocaleString()}
                </div>
              </div>
              <div className="rounded-md bg-black/30 border border-white/10 p-4 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--colorAccent)]" />
                <div className="text-xs uppercase tracking-wide text-gray-300">Watch later</div>
                <div className="mt-1 text-sm text-gray-200">
                  <span className="font-semibold">{stats.watchLaterSeries}</span> series ·{' '}
                  <span className="font-semibold">{stats.watchLaterMovies}</span> movies
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-2 glass-card bg-[#232426c4] border border-[#2c2d30] p-6 relative overflow-hidden shadow-[0_0_0_1px_rgb(var(--colorAccentRgb)_/_0.18),0_18px_55px_rgb(var(--colorAccentRgb)_/_0.05)]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgb(var(--colorAccentRgb)_/_0.08),_rgba(0,0,0,0)_60%)]" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Watch later</h2>
                <p className="text-sm text-gray-300">Quick access to what you saved.</p>
              </div>

              <div
                role="tablist"
                aria-label="Watch later tabs"
                className="inline-flex rounded-md bg-black/30 border border-white/10 p-1 w-full sm:w-auto"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeWatchLaterTab === 'series'}
                  className={`flex-1 sm:flex-none px-4 cursor-pointer py-2 rounded-md
                     text-sm font-semibold transition ${
                    activeWatchLaterTab === 'series'
                      ? 'text-[var(--colorAccent)] bg-white/10'
                      : 'text-gray-200 hover:bg-white/10 hover:text-[var(--colorAccent)]'
                  }`}
                  onClick={() => setActiveWatchLaterTab('series')}
                >
                  Series ({stats.watchLaterSeries})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeWatchLaterTab === 'movies'}
                  className={`flex-1 sm:flex-none px-4 cursor-pointer py-2 rounded-md text-sm font-semibold transition ${
                    activeWatchLaterTab === 'movies'
                      ? 'text-[var(--colorAccent)] bg-white/10'
                      : 'text-gray-200 hover:bg-white/10 hover:text-[var(--colorAccent)]'
                  }`}
                  onClick={() => setActiveWatchLaterTab('movies')}
                >
                  Movies ({stats.watchLaterMovies})
                </button>
              </div>
            </div>

            <div className="mt-5">
              {activeWatchLaterTab === 'series' ? (
                stats.watchLaterSeries > 0 ? (
                  <div className="grid justify-items-center sm:justify-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {watchLaterSeries.map(({ mediaId, serie }) =>
                      serie ? (
                        <WatchLaterSerieItem
                          key={mediaId}
                          mediaId={mediaId}
                          value={serie}
                          isRemoving={Boolean(removingWatchLater[`${mediaId}-s`])}
                          onRemove={() => removeWatchLater(mediaId, true)}
                        />
                      ) : null
                    )}
                  </div>
                ) : (
                  <div className="rounded-md bg-black/30 border border-white/10 p-6 text-gray-200">
                    <div className="font-semibold">No series saved yet</div>
                    <div className="text-sm text-gray-300 mt-1">
                      Browse premieres and add series to your watch later list.
                    </div>
                    <div className="mt-4">
                      <Link
                        to="/series/premiere"
                        className="inline-flex items-center justify-center rounded-md bg-[var(--colorAccent)] text-black px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:brightness-110 transition shadow-[0_0_0_1px_rgb(var(--colorAccentRgb)_/_0.16),0_18px_55px_rgb(var(--colorAccentRgb)_/_0.05)]"
                      >
                        Explore series
                      </Link>
                    </div>
                  </div>
                )
              ) : stats.watchLaterMovies > 0 ? (
                <div className="grid justify-items-center sm:justify-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {watchLaterMovies.map(({ mediaId, serie }) =>
                    !serie ? (
                      <WatchLaterSerieItem
                        key={mediaId}
                        mediaId={mediaId}
                        value={serie}
                        isRemoving={Boolean(removingWatchLater[`${mediaId}-m`])}
                        onRemove={() => removeWatchLater(mediaId, false)}
                      />
                    ) : null
                  )}
                </div>
              ) : (
                <div className="rounded-md bg-black/30 border border-white/10 p-6 text-gray-200">
                  <div className="font-semibold">No movies saved yet</div>
                  <div className="text-sm text-gray-300 mt-1">
                    Browse premieres and add movies to your watch later list.
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/movies/premiere"
                      className="inline-flex items-center justify-center rounded-md bg-[var(--colorAccent)] text-black px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:brightness-110 transition shadow-[0_0_0_1px_rgb(var(--colorAccentRgb)_/_0.16),0_18px_55px_rgb(var(--colorAccentRgb)_/_0.05)]"
                    >
                      Explore movies
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
