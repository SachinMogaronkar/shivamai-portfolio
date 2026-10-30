
package com.shivamai.portfolio_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shivamai.portfolio_backend.dto.LeetCodeStatsResponse;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeetCodeService {

    private static final String LEETCODE_API_URL =
            "https://leetcode.com/graphql/";

    private static final String USERNAME = "SachinMogaronkar31";

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public LeetCodeService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;

        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public LeetCodeStatsResponse getUserStats() throws Exception {

        String graphqlQuery = """
                query userDashboard(
                    $username: String!,
                    $year: Int
                ) {
                    matchedUser(username: $username) {
                        username

                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                        }

                        profile {
                            ranking
                        }

                        badges {
                            id
                            name
                            shortName
                            displayName
                            icon
                            hoverText
                            creationDate
                            category
                        }

                        upcomingBadges {
                            name
                        }

                        userCalendar(year: $year) {
                            activeYears
                            streak
                            totalActiveDays
                            submissionCalendar
                        }
                    }
                }
                """;

        Map<String, Object> payload = Map.of(
                "query", graphqlQuery,
                "variables", Map.of(
                        "username", USERNAME,
                        "year", 2025
                )
        );

        String requestBody =
                objectMapper.writeValueAsString(payload);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(LEETCODE_API_URL))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Referer", "https://leetcode.com/")
                .header("User-Agent", "Mozilla/5.0")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        if (response.statusCode() != 200) {
            throw new IllegalStateException(
                    "LeetCode API returned HTTP status "
                            + response.statusCode()
            );
        }

        JsonNode root = objectMapper.readTree(response.body());

        if (root.has("errors")) {
            throw new IllegalStateException(
                    "LeetCode API returned GraphQL errors."
            );
        }

        JsonNode user = root.path("data").path("matchedUser");

        if (user.isMissingNode() || user.isNull()) {
            throw new IllegalStateException(
                    "LeetCode user profile was not found."
            );
        }

        // Solved problem statistics
        JsonNode submissions = user.path("submitStats")
                .path("acSubmissionNum");

        int totalSolved = 0;
        int totalSubmissions = 0;
        int easySolved = 0;
        int mediumSolved = 0;
        int hardSolved = 0;

        for (JsonNode submission : submissions) {

            String difficulty =
                    submission.path("difficulty").asText();

            int count = submission.path("count").asInt();
            int attempts = submission.path("submissions").asInt();

            switch (difficulty) {
                case "All" -> {
                    totalSolved = count;
                    totalSubmissions = attempts;
                }
                case "Easy" -> easySolved = count;
                case "Medium" -> mediumSolved = count;
                case "Hard" -> hardSolved = count;
            }
        }

        long ranking = user.path("profile")
                .path("ranking")
                .asLong();

        // Earned badges
        List<LeetCodeStatsResponse.Badge> badges =
                new ArrayList<>();

        for (JsonNode badge : user.path("badges")) {
            badges.add(new LeetCodeStatsResponse.Badge(
                    badge.path("name").asText(""),
                    badge.path("shortName").asText(""),
                    badge.path("displayName").asText(""),
                    badge.path("icon").asText(""),
                    badge.path("hoverText").asText(""),
                    badge.path("creationDate").asLong(),
                    badge.path("category").asText("")
            ));
        }

        // Upcoming badges
        List<LeetCodeStatsResponse.UpcomingBadge> upcomingBadges =
                new ArrayList<>();

        for (JsonNode badge : user.path("upcomingBadges")) {
            upcomingBadges.add(
                    new LeetCodeStatsResponse.UpcomingBadge(
                            badge.path("name").asText("")
                    )
            );
        }

        // 2025 submission calendar
        JsonNode calendarNode = user.path("userCalendar");

        List<Integer> activeYears = new ArrayList<>();

        for (JsonNode year : calendarNode.path("activeYears")) {
            activeYears.add(year.asInt());
        }

        Map<String, Integer> submissionCalendar =
                new LinkedHashMap<>();

        String calendarJson = calendarNode
                .path("submissionCalendar")
                .asText("{}");

        JsonNode calendarData =
                objectMapper.readTree(calendarJson);

        calendarData.fields().forEachRemaining(entry ->
                submissionCalendar.put(
                        entry.getKey(),
                        entry.getValue().asInt()
                )
        );

        LeetCodeStatsResponse.CalendarStats calendar =
                new LeetCodeStatsResponse.CalendarStats(
                        activeYears,
                        calendarNode.path("streak").asInt(),
                        calendarNode.path("totalActiveDays").asInt(),
                        submissionCalendar
                );

        return new LeetCodeStatsResponse(
                USERNAME,
                "https://leetcode.com/u/" + USERNAME + "/",
                totalSolved,
                totalSubmissions,
                easySolved,
                mediumSolved,
                hardSolved,
                ranking,
                badges,
                upcomingBadges,
                calendar
        );
    }
}
