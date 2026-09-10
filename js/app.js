(function () {
    "use strict";

    var searchInput = document.getElementById("post-search");
    var resultsBox = document.getElementById("search-results");
    var moduleList = document.getElementById("module-list");
    var editorialList = document.getElementById("editorial-list");
    var modules = DATA.modules.slice().sort(function (first, second) { return first.id - second.id; });
    var posts = DATA.posts;
    var problems = modules.reduce(function (all, module) { return all.concat(module.problems); }, []);
    var editorials = [];

    function publishedTimestamp(post) {
        var value = post.createdAt || post.updatedAt || "2025-02-05T00:00:00+07:00";
        var timestamp = new Date(value).getTime();
        return Number.isNaN(timestamp) ? 0 : timestamp;
    }

    function newestFirst(postsToSort) {
        return postsToSort.slice().sort(function (first, second) {
            return publishedTimestamp(second) - publishedTimestamp(first);
        });
    }

    function normalise(value) {
        return String(value || "").toLocaleLowerCase("vi");
    }

    function createPostCard(post) {
        var card = document.createElement("article");
        card.className = "post-card";
        card.innerHTML = "<a class=\"post-card-main\" href=\"post.html?id=" + encodeURIComponent(post.id) + "\"><span class=\"post-level\"></span><h3></h3><p></p><span class=\"post-tags\"></span></a><div class=\"exercise-list\"></div>";
        card.querySelector(".post-level").textContent = post.level;
        card.querySelector("h3").textContent = post.title;
        card.querySelector("p").textContent = post.description;
        card.querySelector(".post-tags").textContent = "#" + post.tags.join("  #");
        var exerciseList = card.querySelector(".exercise-list");
        (post.exercises || []).forEach(function (exercise) {
            var badge = document.createElement("span");
            badge.className = "exercise-badge";
            badge.innerHTML = "<a class=\"exercise-route\"></a><span class=\"exercise-rating\"></span><a class=\"exercise-original\" target=\"_blank\" rel=\"noopener\" title=\"Mở đề gốc\">↗</a>";
            var route = badge.querySelector(".exercise-route");
            route.textContent = exercise.name;
            route.href = exercise.url || "#";
            badge.querySelector(".exercise-rating").textContent = exercise.rating ? "Rating " + exercise.rating : "";
            var original = badge.querySelector(".exercise-original");
            if (exercise.originalUrl) original.href = exercise.originalUrl;
            else original.remove();
            exerciseList.appendChild(badge);
        });
        return card;
    }

    function createProblemCard(item) {
        var card = document.createElement("a");
        card.className = "post-card problem-card";
        card.href = "post.html?editorial=" + encodeURIComponent("editorial-" + item.id);
        card.innerHTML = "<span class=\"post-level\"></span><h3></h3><p></p><div class=\"problem-meta\"><span class=\"problem-badge rating\"></span><span class=\"problem-badge category\"></span><span class=\"problem-badge tags\"></span></div>";
        card.querySelector(".post-level").textContent = item.source;
        card.querySelector("h3").textContent = item.problemCode + " - " + item.title;
        card.querySelector("p").textContent = item.description;
        card.querySelector(".rating").textContent = "Rating: " + item.rating;
        card.querySelector(".category").textContent = item.category;
        card.querySelector(".tags").textContent = "#" + item.tags.join(" #");
        return card;
    }

    function createEditorialCard(editorial) {
        var card = document.createElement("a");
        card.className = "post-card editorial-card";
        card.href = "post.html?editorial=" + encodeURIComponent(editorial.editorialId);
        card.innerHTML = "<span class=\"post-level\"></span><h3></h3><p></p><span class=\"post-tags\"></span>";
        card.querySelector(".post-level").textContent = editorial.source + " | " + editorial.rating;
        card.querySelector("h3").textContent = editorial.title;
        card.querySelector("p").textContent = editorial.category + " | " + editorial.complexity;
        card.querySelector(".post-tags").textContent = "#editorial #" + editorial.tags.join(" #");
        return card;
    }

    function buildEditorialCatalog(overrides) {
        var byCode = {};
        (overrides || []).forEach(function (item) { byCode[item.problemCode] = item; });
        editorials = newestFirst(problems.map(function (item) {
            var generated = {
                editorialId: "editorial-" + item.id,
                problemCode: item.problemCode,
                title: item.problemCode + " - " + item.title,
                rating: item.rating,
                category: item.category,
                tags: item.tags,
                source: item.source,
                link: item.link,
                statement: item.statement,
                sampleInput: item.sampleInput,
                sampleOutput: item.sampleOutput,
                analysis: item.analysis,
                complexity: item.category.indexOf("Segment") >= 0 || item.category.indexOf("Fenwick") >= 0 ? "O(log N) mỗi thao tác" : "Theo giới hạn bài toán",
                dryRun: item.dryRun,
                code: item.code
            };
            return Object.assign(generated, byCode[item.problemCode] || {});
        }));
    }

    function renderModules() {
        moduleList.innerHTML = "";
        modules.forEach(function (module) {
            var section = document.createElement("section");
            section.className = "module";
            section.id = "module-" + module.id;
            var heading = document.createElement("div");
            heading.className = "module-heading";
            heading.innerHTML = "<span class=\"module-number\"></span><h2></h2>";
            heading.querySelector(".module-number").textContent = "MODULE " + module.id;
            heading.querySelector("h2").textContent = module.title;
            var description = document.createElement("p");
            description.textContent = module.description;
            var algorithmTitle = document.createElement("h3");
            algorithmTitle.className = "catalog-section-title";
            algorithmTitle.textContent = "Thuật toán (Algorithms)";
            var algorithmList = document.createElement("div");
            algorithmList.className = "post-list";
            module.topics.algorithms.forEach(function (post) { algorithmList.appendChild(createPostCard(post)); });
            var dataTitle = document.createElement("h3");
            dataTitle.className = "catalog-section-title";
            dataTitle.textContent = "Cấu trúc dữ liệu (Data Structures)";
            var dataList = document.createElement("div");
            dataList.className = "post-list";
            module.topics.dataStructures.forEach(function (post) { dataList.appendChild(createPostCard(post)); });
            var problemDetails = document.createElement("details");
            problemDetails.className = "problem-directory";
            var problemTitle = document.createElement("summary");
            problemTitle.textContent = "Bài tập luyện tập Codeforces (bấm để xem danh sách)";
            var problemList = document.createElement("div");
            problemList.className = "post-list problem-list";
            module.problems.forEach(function (item) { problemList.appendChild(createProblemCard(item)); });
            problemDetails.appendChild(problemTitle);
            problemDetails.appendChild(problemList);
            section.appendChild(heading);
            section.appendChild(description);
            if (module.topics.algorithms.length) { section.appendChild(algorithmTitle); section.appendChild(algorithmList); }
            if (module.topics.dataStructures.length) { section.appendChild(dataTitle); section.appendChild(dataList); }
            section.appendChild(problemDetails);
            moduleList.appendChild(section);
        });
    }

    function renderEditorials() {
        editorialList.innerHTML = "";
        editorials.forEach(function (editorial) {
            editorialList.appendChild(createEditorialCard(editorial));
        });
    }

    function renderResults(query) {
        var normalisedQuery = normalise(query);
        var matches = posts.filter(function (post) {
            return [post.title, post.description, post.level].concat(post.tags).map(normalise).join(" ").indexOf(normalisedQuery) !== -1;
        }).map(function (post) { return { item: post, href: "post.html?id=" + encodeURIComponent(post.id), level: post.level, title: post.title, description: post.description }; });
        problems.forEach(function (problem) {
            var text = [problem.problemCode, problem.title, problem.category, problem.rating].concat(problem.tags).map(normalise).join(" ");
            if (text.indexOf(normalisedQuery) !== -1 && !matches.some(function (result) { return result.href === "post.html?editorial=editorial-" + problem.id; })) {
                matches.push({ item: problem, href: "post.html?editorial=editorial-" + problem.id, level: problem.source, title: problem.problemCode + " - " + problem.title, description: problem.category + " - Rating " + problem.rating });
            }
        });
        editorials.forEach(function (editorial) {
            var text = [editorial.source, editorial.title, editorial.category, editorial.rating, editorial.statement].concat(editorial.tags).map(normalise).join(" ");
            if (text.indexOf(normalisedQuery) !== -1) matches.push({ item: editorial, href: "post.html?editorial=" + encodeURIComponent(editorial.editorialId), level: editorial.source, title: editorial.title, description: editorial.category + " - Rating " + editorial.rating });
        });
        var uniqueMatches = [];
        var seenResults = {};
        matches.forEach(function (result) {
            if (!seenResults[result.href]) {
                seenResults[result.href] = true;
                uniqueMatches.push(result);
            }
        });
        matches = uniqueMatches.slice(0, 8);
        resultsBox.innerHTML = "";
        if (!normalisedQuery || !matches.length) {
            resultsBox.classList.remove("is-visible");
            return;
        }
        matches.forEach(function (result) {
            var link = document.createElement("a");
            link.className = "search-result";
            link.href = result.href;
            link.setAttribute("role", "option");
            link.innerHTML = "<strong></strong><small></small>";
            link.querySelector("strong").textContent = result.title;
            link.querySelector("small").textContent = result.level + " - " + result.description;
            resultsBox.appendChild(link);
        });
        resultsBox.classList.add("is-visible");
    }

    function populateFilters() {
        var tagFilter = document.getElementById("tag-filter");
        if (!tagFilter) return;
        var tags = [];
        problems.forEach(function (item) { tags = tags.concat(item.tags); });
        Array.from(new Set(tags)).sort(function (a, b) { return a.localeCompare(b); }).forEach(function (tag) {
            var option = document.createElement("option"); option.value = tag; option.textContent = tag; tagFilter.appendChild(option);
        });
        var applyButton = document.getElementById("tag-filter-apply");
        function applySelectedTag() { applyTagFilter(tagFilter.value); }
        tagFilter.addEventListener("change", applySelectedTag);
        tagFilter.addEventListener("keydown", function (event) { if (event.key === "Enter") applySelectedTag(); });
        if (applyButton) applyButton.addEventListener("click", applySelectedTag);
    }

    function applyTagFilter(tag) {
        document.querySelectorAll(".problem-card").forEach(function (card) {
            var item = problems.find(function (problem) { return card.href.indexOf(encodeURIComponent("editorial-" + problem.id)) !== -1; });
            card.style.display = item && (!tag || item.tags.indexOf(tag) !== -1) ? "block" : "none";
        });
    }

    function updateView() {
        var hash = window.location.hash;
        var homePost = document.getElementById("home-post");
        var moduleView = document.getElementById("modules");
        var editorialView = document.getElementById("editorial");
        homePost.hidden = hash === "#modules" || hash === "#editorial";
        moduleView.classList.toggle("is-active", hash === "#modules");
        editorialView.classList.toggle("is-active", hash === "#editorial");
        if (hash === "#modules" || hash === "#editorial") {
            document.getElementById(hash.slice(1)).scrollIntoView({ behavior: "smooth" });
        }
    }

    function loadEditorialDatabase() {
        return fetch("data/editorials/index.json")
            .then(function (response) { return response.ok ? response.json() : { files: [] }; })
            .then(function (manifest) {
                return Promise.all((manifest.files || []).map(function (file) {
                    return fetch("data/editorials/" + file).then(function (response) { return response.json(); });
                }));
            })
            .catch(function () { return []; });
    }

    function loadLessonDatabase() {
        return fetch("data/lessons/index.json")
            .then(function (response) { return response.ok ? response.json() : { files: [] }; })
            .then(function (manifest) {
                return Promise.all((manifest.files || []).map(function (file) {
                    return fetch("data/lessons/" + file).then(function (response) { return response.json(); });
                }));
            })
            .catch(function () { return []; });
    }

    function applyLessonOverrides(overrides) {
        var byId = {};
        overrides.forEach(function (lesson) { byId[lesson.id] = lesson; });
        function normalizeExercises(lesson) {
            lesson.exercises = (lesson.exercises || []).map(function (exercise) {
                if (typeof exercise === "object") return exercise;
                var code = String(exercise).split(" - ")[0];
                var item = problems.find(function (problem) { return problem.problemCode === code; });
                return item ? { id: "editorial-" + item.id, name: item.problemCode + " - " + item.title, rating: item.rating, tags: item.tags, url: "post.html?editorial=editorial-" + item.id, originalUrl: item.link } : { id: "", name: String(exercise), rating: "", tags: [], url: "", originalUrl: "" };
            });
            return lesson;
        }
        modules.forEach(function (module) {
            ["algorithms", "dataStructures"].forEach(function (kind) {
                module.topics[kind] = newestFirst(module.topics[kind].map(function (lesson) { return normalizeExercises(byId[lesson.id] ? Object.assign({}, lesson, byId[lesson.id]) : lesson); }));
            });
        });
        posts = newestFirst(modules.reduce(function (all, module) { return all.concat(module.topics.algorithms, module.topics.dataStructures); }, []));
    }

    Promise.all([loadEditorialDatabase(), loadLessonDatabase()]).then(function (loaded) {
            applyLessonOverrides(loaded[1]);
            var entries = loaded[0];
            buildEditorialCatalog(entries);
            renderModules();
            renderEditorials();
            populateFilters();
            updateView();
        });

    searchInput.addEventListener("input", function () { renderResults(searchInput.value.trim()); });
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            searchInput.value = "";
            resultsBox.classList.remove("is-visible");
        }
    });
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".cp-search")) resultsBox.classList.remove("is-visible");
    });
    window.addEventListener("hashchange", updateView);
})();
