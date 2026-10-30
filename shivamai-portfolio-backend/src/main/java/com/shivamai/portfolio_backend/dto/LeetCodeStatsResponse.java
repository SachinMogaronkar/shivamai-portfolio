package com.shivamai.portfolio_backend.dto;

import java.util.List;
import java.util.Map;

public record LeetCodeStatsResponse(
        String username,
        String profileUrl,
        int totalSolved,
        int totalSubmissions,
        int easySolved,
        int mediumSolved,
        int hardSolved,
        long ranking,
        List<Badge> badges,
        List<UpcomingBadge> upcomingBadges,
        CalendarStats calendar
) {
    public record Badge(
            String name,
            String shortName,
            String displayName,
            String icon,
            String hoverText,
            long creationDate,
            String category
    ) {}

    public record UpcomingBadge(String name) {}

    public record CalendarStats(
            List<Integer> activeYears,
            int streak,
            int totalActiveDays,
            Map<String, Integer> submissionCalendar
    ) {}
}