
import { useEffect, useState } from 'react'
import '../styles/LeetCode.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const LEETCODE_PROFILE =
  'https://leetcode.com/u/SachinMogaronkar31/'

function LeetCode() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/leetcode/stats`
        )

        if (!response.ok) {
          throw new Error('Unable to fetch LeetCode statistics')
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error('LeetCode API error:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const difficulties = [
    {
      name: 'Easy',
      value: stats?.easySolved ?? 0,
      color: '#00B8A9'
    },
    {
      name: 'Medium',
      value: stats?.mediumSolved ?? 0,
      color: '#D9A441'
    },
    {
      name: 'Hard',
      value: stats?.hardSolved ?? 0,
      color: '#EF6461'
    }
  ]

  const totalSolved = stats?.totalSolved ?? 0
  const badges = stats?.badges ?? []
  const upcomingBadges = stats?.upcomingBadges ?? []
  const calendar = stats?.calendar

  // Convert Unix timestamps into daily submission records.
  const activity = Object.entries(
    calendar?.submissionCalendar ?? {}
  ).map(([timestamp, count]) => ({
    date: new Date(Number(timestamp) * 1000),
    count
  }))

  const activityMap = new Map(
    activity.map(item => [
      item.date.toISOString().slice(0, 10),
      item.count
    ])
  )

  // Heatmap intensity based on daily submission count.
  const getActivityLevel = (count) => {
    if (!count) return 0
    if (count <= 1) return 1
    if (count <= 2) return 2
    if (count <= 4) return 3
    return 4
  }

  // Generate the 2025 calendar.
  const heatmapStart = new Date(Date.UTC(2025, 0, 1))
  const heatmapEnd = new Date(Date.UTC(2025, 11, 31))

  // January 1, 2025 was Wednesday.
  // Add three empty cells for Sunday, Monday and Tuesday.
  const calendarDays = Array.from(
    { length: heatmapStart.getUTCDay() },
    (_, index) => ({
      date: `empty-${index}`,
      count: 0,
      empty: true
    })
  )

  for (
    let date = new Date(heatmapStart);
    date <= heatmapEnd;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const dateKey = date.toISOString().slice(0, 10)

    calendarDays.push({
      date: dateKey,
      count: activityMap.get(dateKey) ?? 0,
      empty: false
    })
  }

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  return (
    <main className="leetcode-page">

      {/* Page Header */}
      <section className="leetcode-header">

        <p className="eyebrow">
          PROBLEM SOLVING · DATA STRUCTURES · ALGORITHMS
        </p>

        <h1>
          LeetCode <span>Activity.</span>
        </h1>

        <p>
          Tracking consistency, problem-solving practice,
          and continuous improvement.
        </p>

      </section>

      {/* Loading State */}
      {loading ? (

        <div className="leetcode-status">
          Loading coding statistics...
        </div>

      ) : error || !stats ? (

        /* Error State */
        <div className="leetcode-status">

          Statistics are temporarily unavailable.

          <a
            href={LEETCODE_PROFILE}
            target="_blank"
            rel="noreferrer"
          >
            Visit LeetCode Profile ↗
          </a>

        </div>

      ) : (

        /* Dashboard */
        <section className="leetcode-dashboard">

          {/* Solved Problems */}
          <div className="leetcode-card leetcode-solved-card">

            <div className="leetcode-card-heading">

              <h2>Solved Problems</h2>

              <span>
                {stats.totalSubmissions} Submissions
              </span>

            </div>

            <div className="leetcode-solved-content">

              <div className="leetcode-circle">

                <div>
                  <strong>{totalSolved}</strong>
                  <span>Solved</span>
                </div>

              </div>

              <div className="leetcode-difficulty-list">

                {difficulties.map((item) => (

                  <div
                    className="leetcode-difficulty"
                    key={item.name}
                  >

                    <div className="leetcode-difficulty-info">

                      <span>{item.name}</span>

                      <strong>{item.value}</strong>

                    </div>

                    <div className="leetcode-progress-track">

                      <div
                        className="leetcode-progress-fill"
                        style={{
                          width: totalSolved
                            ? `${(item.value / totalSolved) * 100}%`
                            : '0%',
                          backgroundColor: item.color
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Global Ranking */}
          <div className="leetcode-card leetcode-ranking-card">

            <h2>Global Ranking</h2>

            <strong>
              {stats.ranking.toLocaleString('en-US')}
            </strong>

            <span>Worldwide ranking</span>

          </div>

          {/* Badges */}
          <div className="leetcode-card leetcode-badges-card">

            <div className="leetcode-card-heading">

              <h2>Badges</h2>

              <span>
                {badges.length} Earned
              </span>

            </div>

            {badges.length > 0 ? (

              <div className="leetcode-badge-list">

                {badges.map((badge, index) => (

                  <div
                    className="leetcode-badge"
                    key={badge.id || index}
                  >

                    {badge.icon && (
                      <img
                        src={badge.icon}
                        alt={badge.displayName || badge.name}
                      />
                    )}

                    <div>

                      <strong>
                        {badge.displayName || badge.name}
                      </strong>

                      <span>{badge.category}</span>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <p className="leetcode-empty">
                No badges earned yet.
              </p>

            )}

            <div className="leetcode-upcoming">

              <h3>Upcoming Challenges</h3>

              {upcomingBadges.length > 0 ? (

                <ul>

                  {upcomingBadges.map((badge, index) => (

                    <li key={`${badge.name}-${index}`}>
                      {badge.name}
                    </li>

                  ))}

                </ul>

              ) : (

                <p>
                  No upcoming challenges available.
                </p>

              )}

            </div>

          </div>

          {/* Submission Activity */}
          <div className="leetcode-card leetcode-activity-card">

            <div className="leetcode-card-heading">

              <h2>Submission Activity</h2>

              <span>2025</span>

            </div>

            {/* Activity Summary */}
            <div className="leetcode-activity-summary">

              <strong>
                {calendar?.totalActiveDays ?? 0}
              </strong>

              <span>Active days</span>

              <strong>
                {calendar?.streak ?? 0}
              </strong>

              <span>Current streak</span>

            </div>

            {/* Heatmap */}
            <div className="leetcode-heatmap-wrapper">

              <div className="leetcode-month-labels">

                {months.map(month => (

                  <span key={month}>
                    {month}
                  </span>

                ))}

              </div>

              <div className="leetcode-heatmap">

                {calendarDays.map((day) => (

                  <div
                    key={day.date}
                    className={`leetcode-heatmap-day level-${getActivityLevel(day.count)}`}
                    title={
                      day.empty
                        ? undefined
                        : `${day.date}: ${day.count} submissions`
                    }
                    aria-hidden="true"
                  />

                ))}

              </div>

            </div>

            {/* Heatmap Legend */}
            <div className="leetcode-heatmap-legend">

              <span>Less</span>

              {[0, 1, 2, 3, 4].map(level => (

                <span
                  key={level}
                  className={`leetcode-heatmap-day level-${level}`}
                />

              ))}

              <span>More</span>

            </div>

            <p className="leetcode-activity-note">
              Based on recorded LeetCode submissions in 2025.
            </p>

          </div>

        </section>

      )}

      {/* LeetCode Profile Link */}
      <div className="leetcode-profile-action">

        <a
          href={LEETCODE_PROFILE}
          target="_blank"
          rel="noreferrer"
        >
          Visit My LeetCode Profile ↗
        </a>

      </div>

    </main>
  )
}

export default LeetCode
