const searchInput = document.getElementById("search");
const clearButton = document.getElementById("clearSearch");
const categoriesRoot = document.getElementById("categories");
const topicChips = document.getElementById("topicChips");
const resultsCount = document.getElementById("resultsCount");
const directoryShell = document.getElementById("directoryShell");
const directoryView = document.getElementById("directoryView");
const articleView = document.getElementById("articleView");
const articleCategory = document.getElementById("articleCategory");
const articleTitle = document.getElementById("articleTitle");
const articleSummary = document.getElementById("articleSummary");
const articleAnswer = document.getElementById("articleAnswer");
const backToDirectory = document.getElementById("backToDirectory");
const supportEmailTip = document.getElementById("supportEmailTip");
const supportForm = document.getElementById("supportForm");
const supportFormStatus = document.getElementById("supportFormStatus");
const supportFormLead = document.getElementById("supportFormLead");
const supportSubmit = document.getElementById("supportSubmit");
const supportName = document.getElementById("supportName");
const supportEmail = document.getElementById("supportEmail");
const supportTopic = document.getElementById("supportTopic");
const supportMessage = document.getElementById("supportMessage");

const SHARED_PUBLIC_API = "https://blog.useaima.com/api/public";

let supportData = null;
let sharedSettings = {
  supportEmail: "help@useaima.com",
  supportUrl: "https://support.useaima.com",
};

function getArticlePath(articleId) {
  return `/articles/${articleId}`;
}

function flattenArticles(categories) {
  return categories.flatMap((category) =>
    category.articles.map((article) => ({
      ...article,
      categoryId: category.id,
      categoryTitle: category.title,
    })),
  );
}

function createArticleCard(article) {
  const wrapper = document.createElement("button");
  wrapper.className = "article-card";
  wrapper.type = "button";
  wrapper.addEventListener("click", () => openArticle(article.id));

  const eyebrow = document.createElement("p");
  eyebrow.className = "article-card__eyebrow";
  eyebrow.textContent = article.categoryTitle;

  const title = document.createElement("h4");
  title.textContent = article.question;

  const summary = document.createElement("p");
  summary.className = "article-card__summary";
  summary.textContent = article.summary;

  wrapper.append(eyebrow, title, summary);
  return wrapper;
}

function createCategory(category, query) {
  const wrapper = document.createElement("div");
  wrapper.className = "category";

  const heading = document.createElement("h3");
  heading.textContent = category.title;

  const articles = category.articles
    .map((article) => ({ ...article, categoryTitle: category.title }))
    .filter((article) => {
      if (!query) return true;
      const keywords = Array.isArray(article.keywords) ? article.keywords.join(" ") : "";
      const haystack =
        `${article.question} ${article.summary} ${article.answer} ${keywords}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });

  if (!articles.length) {
    return null;
  }

  wrapper.appendChild(heading);
  articles.forEach((article) => wrapper.appendChild(createArticleCard(article)));
  return wrapper;
}

function renderChips(categories) {
  topicChips.innerHTML = "";

  categories.forEach((category) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = category.title;
    chip.addEventListener("click", () => {
      searchInput.value = category.title;
      renderDirectory(category.title);
    });
    topicChips.appendChild(chip);
  });
}

function renderDirectory(query = "") {
  const categories = supportData?.categories || [];
  categoriesRoot.innerHTML = "";

  const blocks = categories
    .map((category) => createCategory(category, query))
    .filter(Boolean);

  blocks.forEach((block) => categoriesRoot.appendChild(block));

  resultsCount.textContent = query
    ? `${blocks.length} categories match "${query}"`
    : `${blocks.length} categories available`;
}

function showDirectory() {
  document.title = `${supportData?.site_title || "EVA Help Center"}`;
  directoryShell.classList.remove("is-hidden");
  directoryView.classList.remove("is-hidden");
  articleView.classList.add("is-hidden");
}

function showArticle(article) {
  directoryShell.classList.add("is-hidden");
  directoryView.classList.add("is-hidden");
  articleView.classList.remove("is-hidden");

  articleCategory.textContent = article.categoryTitle;
  articleTitle.textContent = article.question;
  articleSummary.textContent = article.summary;
  articleAnswer.textContent = article.answer;
  document.title = `${article.question} • ${supportData?.site_title || "EVA Help Center"}`;
}

function getRequestedArticleId() {
  const match = window.location.pathname.match(/^\/articles\/([^/]+)$/);
  return match?.[1] || null;
}

function renderRoute() {
  const articleId = getRequestedArticleId();
  const allArticles = flattenArticles(supportData?.categories || []);

  if (!articleId) {
    showDirectory();
    renderDirectory(searchInput.value.trim());
    return;
  }

  const article = allArticles.find((item) => item.id === articleId);
  if (!article) {
    showDirectory();
    renderDirectory("");
    resultsCount.textContent = "That article was not found. Showing the full help center instead.";
    return;
  }

  showArticle(article);
}

function openArticle(articleId) {
  window.history.pushState({}, "", getArticlePath(articleId));
  renderRoute();
}

function updateSharedSupportUi() {
  if (supportEmailTip) {
    supportEmailTip.textContent = `Need direct help? Email ${sharedSettings.supportEmail} and include your EVA account email.`;
  }

  if (supportFormLead) {
    supportFormLead.textContent = `Send a support request and the aima team will triage it from the shared support inbox. You can also email ${sharedSettings.supportEmail} directly.`;
  }
}

async function loadSharedSettings() {
  try {
    const response = await fetch(`${SHARED_PUBLIC_API}/settings`);
    const payload = await response.json();
    if (response.ok && payload?.settings) {
      sharedSettings = {
        ...sharedSettings,
        ...payload.settings,
      };
      updateSharedSupportUi();
    }
  } catch (error) {
    updateSharedSupportUi();
  }
}

async function handleSupportSubmit(event) {
  event.preventDefault();
  supportFormStatus.textContent = "";
  supportFormStatus.className = "support-status";
  supportSubmit.disabled = true;
  supportSubmit.textContent = "Sending…";

  try {
    const response = await fetch(`${SHARED_PUBLIC_API}/support-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: supportName.value,
        email: supportEmail.value,
        topic: supportTopic.value,
        message: supportMessage.value,
        source: "aima-support",
        pageUrl: window.location.href,
        origin: window.location.origin,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.error || "Failed to submit support request");
    }

    supportForm.reset();
    supportFormStatus.textContent = "Support request sent. The team can now triage it from the shared inbox.";
    supportFormStatus.classList.add("is-success");
  } catch (error) {
    supportFormStatus.textContent = error instanceof Error ? error.message : "Unable to send your support request.";
    supportFormStatus.classList.add("is-error");
  } finally {
    supportSubmit.disabled = false;
    supportSubmit.textContent = "Send support request";
  }
}

async function init() {
  try {
    const response = await fetch("/data.json");
    supportData = await response.json();
    const categories = supportData.categories || [];

    renderChips(categories);
    renderRoute();
    loadSharedSettings();

    searchInput.addEventListener("input", (event) => {
      if (getRequestedArticleId()) {
        window.history.pushState({}, "", "/");
      }
      renderDirectory(event.target.value.trim());
    });

    clearButton.addEventListener("click", () => {
      searchInput.value = "";
      if (getRequestedArticleId()) {
        window.history.pushState({}, "", "/");
      }
      renderDirectory("");
    });

    backToDirectory.addEventListener("click", () => {
      window.history.pushState({}, "", "/");
      renderRoute();
    });

    if (supportForm) {
      supportForm.addEventListener("submit", handleSupportSubmit);
    }

    window.addEventListener("popstate", renderRoute);
  } catch (error) {
    resultsCount.textContent = "Unable to load support content.";
  }
}

init();
