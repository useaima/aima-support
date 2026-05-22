const searchInput = document.getElementById("search");
const clearButton = document.getElementById("clearSearch");
const topicChips = document.getElementById("topicChips");
const resultsCount = document.getElementById("resultsCount");
const articleResultsCount = document.getElementById("articleResultsCount");
const directoryTitle = document.getElementById("directoryTitle");
const articleDirectoryTitle = document.getElementById("articleDirectoryTitle");
const directoryShell = document.getElementById("directoryShell");
const directoryView = document.getElementById("directoryView");
const articleDirectoryView = document.getElementById("articleDirectoryView");
const collectionsRoot = document.getElementById("collections");
const articlesRoot = document.getElementById("articles");
const productCardsRoot = document.getElementById("productCards");
const articleView = document.getElementById("articleView");
const articleBreadcrumbs = document.getElementById("articleBreadcrumbs");
const articleCategory = document.getElementById("articleCategory");
const articleTitle = document.getElementById("articleTitle");
const articleSummary = document.getElementById("articleSummary");
const articleAnswer = document.getElementById("articleAnswer");
const articleActions = document.getElementById("articleActions");
const relatedArticles = document.getElementById("relatedArticles");
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

const fallbackPlatform = {
  settings: {
    supportEmail: "help@useaima.com",
    supportUrl: "https://support.useaima.com",
    siteUrl: "https://useaima.com",
    blogUrl: "https://blog.useaima.com",
    evaUrl: "https://eva.useaima.com",
    utgUrl: "https://utg.useaima.com",
    utgRepoUrl: "https://github.com/useaima/universal-gateway",
  },
  products: [
    {
      slug: "eva",
      name: "eva",
      summary: "AI finance assistant for clearer spending reviews, recurring-cost visibility, and calmer next-step decisions.",
      primaryUrl: "https://eva.useaima.com",
      primaryLabel: "Open eva",
      categoryLabel: "AI Finance Assistant",
    },
    {
      slug: "utg",
      name: "Orbis",
      summary: "Experimental gateway for agentic commerce with human approval, idempotency, and non-custodial execution boundaries.",
      primaryUrl: "https://utg.useaima.com",
      primaryLabel: "Open Orbis",
      secondaryUrl: "https://github.com/useaima/universal-gateway",
      secondaryLabel: "View GitHub",
      categoryLabel: "Agentic Commerce Infrastructure",
    },
  ],
};

const fallbackSupportIndex = {
  collections: [
    {
      slug: "eva-getting-started",
      title: "Getting started with eva",
      description: "Account setup, first review loops, and the core workspace habits for EVA.",
      productSlug: "eva",
      featured: true,
      articleCount: 2,
    },
    {
      slug: "eva-money-workflows",
      title: "Spending, budgets, and subscriptions",
      description: "Recurring payments, weekly routines, and the money workflows EVA is designed to simplify.",
      productSlug: "eva",
      featured: true,
      articleCount: 1,
    },
    {
      slug: "utg-overview",
      title: "Orbis basics and onboarding",
      description: "What Orbis (UTG) is, how onboarding works, and where to start with the gateway safely.",
      productSlug: "utg",
      featured: true,
      articleCount: 2,
    },
    {
      slug: "utg-approvals-safety",
      title: "Approvals, safety, and control",
      description: "Human approval, idempotency, and why Orbis treats transaction safety as infrastructure.",
      productSlug: "utg",
      featured: true,
      articleCount: 2,
    },
  ],
  articles: [
    {
      slug: "eva-first-review",
      title: "How do I do my first review in eva?",
      summary: "Start with the workspace summary, then review only the areas where behavior changed materially.",
      body: `# How do I do my first review in eva?

Start with the workspace summary so you can answer three questions quickly: what changed, what matters right now, and what action makes sense next. After that, open only the category or subscription area connected to the change you noticed. EVA works best as a short review loop, not a deep audit every time.`,
      productSlug: "eva",
      collectionSlug: "eva-getting-started",
      keywords: ["eva", "first review", "workspace"],
      relatedSlugs: ["eva-subscriptions-review", "eva-weekly-money-routine"],
    },
    {
      slug: "eva-subscriptions-review",
      title: "How do I review subscriptions in eva?",
      summary: "Treat subscriptions as a decision workflow, not just a hidden list of recurring charges.",
      body: `# How do I review subscriptions in eva?

Open the recurring-payment view and start with total subscription pressure before drilling into individual renewals. EVA is most helpful when it helps you decide what stays, what needs review, and what should be cancelled or downgraded. The goal is action, not just awareness.`,
      productSlug: "eva",
      collectionSlug: "eva-money-workflows",
      keywords: ["eva", "subscriptions", "recurring payments"],
      relatedSlugs: ["eva-first-review", "eva-weekly-money-routine"],
    },
    {
      slug: "eva-weekly-money-routine",
      title: "What should a weekly money routine look like in eva?",
      summary: "A lightweight weekly review gives you enough visibility to act before patterns get expensive.",
      body: `# What should a weekly money routine look like in eva?

Start with the summary layer, check which categories moved more than expected, and review any unusual activity or subscription renewals. Then make one or two decisions. A short routine repeated consistently is more valuable than a long review you avoid doing.`,
      productSlug: "eva",
      collectionSlug: "eva-money-workflows",
      keywords: ["eva", "weekly routine", "money habits"],
      relatedSlugs: ["eva-first-review", "eva-subscriptions-review"],
    },
    {
      slug: "what-is-universal-transaction-gateway",
      title: "What is Orbis (UTG)?",
      summary: "Orbis is AIMA's safety boundary between an agent's transaction intent and real money movement.",
      body: `# What is Orbis (UTG)?

Orbis is AIMA's experimental settlement and control layer for AI agents. Instead of letting a model spend directly, the gateway captures intent, applies policy, records the action, and pauses execution until the human owner approves the transaction. It is designed for safer agentic commerce, not raw autonomous spending.`,
      productSlug: "utg",
      collectionSlug: "utg-overview",
      keywords: ["orbis", "utg", "universal transaction gateway", "agentic commerce"],
      relatedSlugs: ["utg-human-approval-flow", "utg-installation-and-onboarding"],
    },
    {
      slug: "utg-installation-and-onboarding",
      title: "How do I install and onboard Orbis?",
      summary: "Install the gateway, run onboarding, verify the runtime, then connect it to your agent workflow.",
      body: `# How do I install and onboard Orbis?

Start with the official Orbis docs or GitHub repository. Install the project, run the onboarding flow, and only then connect the generated configuration to your agent environment. The safe rollout is always install, onboard, verify, then connect to real workflows in a controlled way.`,
      productSlug: "utg",
      collectionSlug: "utg-overview",
      keywords: ["orbis", "utg", "installation", "onboarding"],
      relatedSlugs: ["what-is-universal-transaction-gateway", "utg-human-approval-flow"],
    },
    {
      slug: "utg-human-approval-flow",
      title: "How does the human approval flow work in Orbis?",
      summary: "Orbis records the requested transaction and halts execution until the human owner clears it.",
      body: `# How does the human approval flow work in Orbis?

Orbis is built around strict human-in-the-loop execution. When an agent requests a transaction, the gateway records the intent and stops before settlement. The human owner remains the final authority over whether money moves, which makes the approval step infrastructure rather than a cosmetic confirmation screen.`,
      productSlug: "utg",
      collectionSlug: "utg-approvals-safety",
      keywords: ["orbis", "utg", "human approval", "HITL"],
      relatedSlugs: ["utg-why-idempotency-matters", "what-is-universal-transaction-gateway"],
    },
    {
      slug: "utg-why-idempotency-matters",
      title: "Why does Orbis emphasize idempotency?",
      summary: "Idempotency keeps retries from becoming duplicate financial harm when networks or agents behave unpredictably.",
      body: `# Why does Orbis emphasize idempotency?

Financial infrastructure needs to assume retries, partial failures, and ambiguous network responses. Orbis tracks requests as logical operations so repeated attempts are treated as the same execution unit instead of permission to spend twice. That is one of the clearest signals that the gateway is designed for real transaction safety, not superficial automation demos.`,
      productSlug: "utg",
      collectionSlug: "utg-approvals-safety",
      keywords: ["orbis", "utg", "idempotency", "transaction safety"],
      relatedSlugs: ["utg-human-approval-flow", "utg-installation-and-onboarding"],
    },
  ],
};

let platform = {
  ...fallbackPlatform,
  settings: { ...fallbackPlatform.settings },
  products: [...fallbackPlatform.products],
};

let supportIndex = {
  collections: [...fallbackSupportIndex.collections],
  articles: [...fallbackSupportIndex.articles],
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split(/\n/);
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith("## ")) {
      closeList();
      html += `<h3>${escapeHtml(line.slice(3))}</h3>`;
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      html += `<h2>${escapeHtml(line.slice(2))}</h2>`;
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeHtml(line.slice(2))}</li>`;
      continue;
    }

    closeList();
    html += `<p>${escapeHtml(line)}</p>`;
  }

  closeList();
  return html || "<p>No article body available yet.</p>";
}

function flattenArticles() {
  const collectionBySlug = new Map(supportIndex.collections.map((collection) => [collection.slug, collection]));
  return supportIndex.articles.map((article) => {
    const collection = collectionBySlug.get(article.collectionSlug);
    return {
      ...article,
      collectionTitle: collection?.title || article.collectionSlug,
      collectionDescription: collection?.description || "",
      productName: article.productSlug === "utg" ? "Orbis" : "eva",
    };
  });
}

function matchesQuery(item, query) {
  if (!query) return true;
  const haystack = [
    item.title,
    item.summary,
    item.body,
    item.collectionTitle,
    item.collectionDescription,
    item.productName,
    Array.isArray(item.keywords) ? item.keywords.join(" ") : "",
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function getRoute() {
  const articleMatch = window.location.pathname.match(/^\/article\/([^/]+)$/);
  if (articleMatch) {
    return { type: "article", slug: articleMatch[1] };
  }

  const collectionMatch = window.location.pathname.match(/^\/collection\/([^/]+)$/);
  if (collectionMatch) {
    return { type: "collection", slug: collectionMatch[1] };
  }

  return { type: "home" };
}

function setDocumentTitle(title) {
  document.title = title ? `${title} • AIMA Help Center` : "AIMA Help Center";
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "product-card__eyebrow";
  eyebrow.textContent = product.categoryLabel || "Product";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const summary = document.createElement("p");
  summary.className = "product-card__summary";
  summary.textContent = product.summary;

  const links = document.createElement("div");
  links.className = "product-card__links";
  links.innerHTML = `
    <a href="${product.primaryUrl}" target="_blank" rel="noopener noreferrer">${product.primaryLabel}</a>
    ${product.secondaryUrl ? `<a href="${product.secondaryUrl}" target="_blank" rel="noopener noreferrer">${product.secondaryLabel || "Learn more"}</a>` : ""}
  `;

  card.append(eyebrow, title, summary, links);
  return card;
}

function createCollectionCard(collection) {
  const card = document.createElement("button");
  card.className = "collection-card";
  card.type = "button";
  card.addEventListener("click", () => openCollection(collection.slug));

  const eyebrow = document.createElement("p");
  eyebrow.className = "collection-card__eyebrow";
  eyebrow.textContent = collection.productSlug === "utg" ? "Orbis" : "EVA";

  const title = document.createElement("h3");
  title.textContent = collection.title;

  const description = document.createElement("p");
  description.className = "collection-card__summary";
  description.textContent = collection.description;

  const meta = document.createElement("p");
  meta.className = "collection-card__meta";
  meta.textContent = `${collection.articleCount || 0} article${collection.articleCount === 1 ? "" : "s"}`;

  card.append(eyebrow, title, description, meta);
  return card;
}

function createArticleCard(article) {
  const card = document.createElement("button");
  card.className = "article-card";
  card.type = "button";
  card.addEventListener("click", () => openArticle(article.slug));

  const eyebrow = document.createElement("p");
  eyebrow.className = "article-card__eyebrow";
  eyebrow.textContent = `${article.productName} • ${article.collectionTitle}`;

  const title = document.createElement("h4");
  title.textContent = article.title;

  const summary = document.createElement("p");
  summary.className = "article-card__summary";
  summary.textContent = article.summary;

  card.append(eyebrow, title, summary);
  return card;
}

function renderTopicChips(collections) {
  topicChips.innerHTML = "";

  const allChip = document.createElement("button");
  allChip.className = "chip";
  allChip.type = "button";
  allChip.textContent = "All topics";
  allChip.addEventListener("click", () => {
    searchInput.value = "";
    openHome();
  });
  topicChips.appendChild(allChip);

  collections.forEach((collection) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = collection.title;
    chip.addEventListener("click", () => openCollection(collection.slug));
    topicChips.appendChild(chip);
  });
}

function renderProducts() {
  productCardsRoot.innerHTML = "";
  (platform.products || []).forEach((product) => {
    productCardsRoot.appendChild(createProductCard(product));
  });
}

function renderDirectory(query = "", collectionSlug = null) {
  const collections = supportIndex.collections.filter((collection) => {
    if (collectionSlug) return collection.slug === collectionSlug;
    if (!query) return true;
    return matchesQuery({
      ...collection,
      title: collection.title,
      summary: collection.description,
      body: "",
      collectionTitle: collection.title,
      collectionDescription: collection.description,
      productName: collection.productSlug === "utg" ? "Orbis" : "eva",
      keywords: [],
    }, query);
  });

  collectionsRoot.innerHTML = "";
  collections.forEach((collection) => collectionsRoot.appendChild(createCollectionCard(collection)));

  directoryTitle.textContent = collectionSlug
    ? supportIndex.collections.find((collection) => collection.slug === collectionSlug)?.title || "Support collection"
    : "Browse support collections";
  resultsCount.textContent = `${collections.length} collection${collections.length === 1 ? "" : "s"} shown`;
}

function renderArticleDirectory(query = "", collectionSlug = null) {
  const articles = flattenArticles().filter((article) => {
    if (collectionSlug && article.collectionSlug !== collectionSlug) return false;
    return matchesQuery(article, query);
  });

  articlesRoot.innerHTML = "";
  articles.forEach((article) => articlesRoot.appendChild(createArticleCard(article)));
  articleDirectoryTitle.textContent = collectionSlug ? "Articles in this collection" : "Featured support articles";
  articleResultsCount.textContent = `${articles.length} article${articles.length === 1 ? "" : "s"} shown`;
}

function showHomeShell() {
  directoryShell.classList.remove("is-hidden");
  directoryView.classList.remove("is-hidden");
  articleDirectoryView.classList.remove("is-hidden");
  articleView.classList.add("is-hidden");
}

function showArticleShell() {
  directoryShell.classList.add("is-hidden");
  directoryView.classList.add("is-hidden");
  articleDirectoryView.classList.add("is-hidden");
  articleView.classList.remove("is-hidden");
}

function renderBreadcrumbs(items) {
  articleBreadcrumbs.innerHTML = "";
  items.forEach((item, index) => {
    if (item.href) {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      articleBreadcrumbs.appendChild(link);
    } else {
      const span = document.createElement("span");
      span.textContent = item.label;
      articleBreadcrumbs.appendChild(span);
    }

    if (index < items.length - 1) {
      const divider = document.createElement("span");
      divider.textContent = "›";
      articleBreadcrumbs.appendChild(divider);
    }
  });
}

function renderArticlePage(article) {
  showArticleShell();
  setDocumentTitle(article.title);

  articleCategory.textContent = `${article.productName} • ${article.collectionTitle}`;
  articleTitle.textContent = article.title;
  articleSummary.textContent = article.summary;
  articleAnswer.innerHTML = markdownToHtml(article.body);

  renderBreadcrumbs([
    { label: "Help Center", href: "/" },
    { label: article.collectionTitle, href: `/collection/${article.collectionSlug}` },
    { label: article.title },
  ]);

  articleActions.innerHTML = `
    <a href="${article.productSlug === "utg" ? platform.settings.utgUrl : platform.settings.evaUrl}" target="_blank" rel="noopener noreferrer">Open ${article.productSlug === "utg" ? "Orbis" : "EVA"}</a>
    ${article.productSlug === "utg" ? `<a href="${platform.settings.utgRepoUrl}" target="_blank" rel="noopener noreferrer">View Orbis GitHub</a>` : ""}
    <a href="mailto:${platform.settings.supportEmail}">Email support</a>
  `;

  const related = flattenArticles().filter((item) => {
    if (item.slug === article.slug) return false;
    if ((article.relatedSlugs || []).includes(item.slug)) return true;
    return item.collectionSlug === article.collectionSlug;
  }).slice(0, 3);

  relatedArticles.innerHTML = "";
  related.forEach((item) => relatedArticles.appendChild(createArticleCard(item)));
}

function renderHomeRoute() {
  setDocumentTitle("");
  showHomeShell();
  renderDirectory(searchInput.value.trim());
  renderArticleDirectory(searchInput.value.trim());
}

function openHome() {
  window.history.pushState({}, "", "/");
  renderHomeRoute();
}

function openCollection(slug) {
  window.history.pushState({}, "", `/collection/${slug}`);
  const collection = supportIndex.collections.find((entry) => entry.slug === slug);
  setDocumentTitle(collection?.title || "Support collection");
  showHomeShell();
  renderDirectory(searchInput.value.trim(), slug);
  renderArticleDirectory(searchInput.value.trim(), slug);
}

function openArticle(slug) {
  window.history.pushState({}, "", `/article/${slug}`);
  renderRoute();
}

function renderRoute() {
  const route = getRoute();
  const query = searchInput.value.trim();

  if (route.type === "home") {
    renderHomeRoute();
    return;
  }

  if (route.type === "collection") {
    showHomeShell();
    renderDirectory(query, route.slug);
    renderArticleDirectory(query, route.slug);
    const collection = supportIndex.collections.find((entry) => entry.slug === route.slug);
    setDocumentTitle(collection?.title || "Support collection");
    return;
  }

  const article = flattenArticles().find((entry) => entry.slug === route.slug);
  if (!article) {
    renderHomeRoute();
    resultsCount.textContent = "That article was not found. Showing the full help center instead.";
    return;
  }

  renderArticlePage(article);
}

function updateSharedSupportUi() {
  if (supportEmailTip) {
    supportEmailTip.textContent = `Need direct help? Email ${platform.settings.supportEmail} and include enough context for the team to help quickly.`;
  }

  if (supportFormLead) {
    supportFormLead.textContent = `Send a support request and the aima team will triage it from the shared support inbox. You can also email ${platform.settings.supportEmail} directly.`;
  }
}

async function loadPlatform() {
  const response = await fetch(`${SHARED_PUBLIC_API}/platform`);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error || "Unable to load platform data");
  }
  platform = {
    ...platform,
    ...(payload.platform || {}),
    settings: {
      ...platform.settings,
      ...payload.platform?.settings,
    },
  };
}

async function loadSupportIndex() {
  const response = await fetch(`${SHARED_PUBLIC_API}/support/index`);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error || "Unable to load support content");
  }
  supportIndex = {
    collections: Array.isArray(payload.collections) ? payload.collections : [],
    articles: Array.isArray(payload.articles) ? payload.articles : [],
  };
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
  const failures = [];
  const [platformResult, supportResult] = await Promise.allSettled([loadPlatform(), loadSupportIndex()]);

  if (platformResult.status === "rejected") {
    platform = {
      ...fallbackPlatform,
      settings: { ...fallbackPlatform.settings },
      products: [...fallbackPlatform.products],
    };
    failures.push(platformResult.reason instanceof Error ? platformResult.reason.message : "Unable to load live platform data.");
  }

  if (supportResult.status === "rejected") {
    supportIndex = {
      collections: [...fallbackSupportIndex.collections],
      articles: [...fallbackSupportIndex.articles],
    };
    failures.push(supportResult.reason instanceof Error ? supportResult.reason.message : "Unable to load live support content.");
  }

  showHomeShell();
  renderProducts();
  renderTopicChips(supportIndex.collections);
  updateSharedSupportUi();
  renderRoute();

  if (failures.length) {
    resultsCount.textContent = "Live help content is still syncing. Showing the built-in AIMA help center fallback for now.";
    articleResultsCount.textContent = "";
  }

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    const route = getRoute();
    if (route.type === "article") {
      window.history.pushState({}, "", "/");
    }
    if (route.type === "collection") {
      renderDirectory(query, route.slug);
      renderArticleDirectory(query, route.slug);
      return;
    }
    renderDirectory(query);
    renderArticleDirectory(query);
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderRoute();
  });

  backToDirectory.addEventListener("click", () => {
    openHome();
  });

  window.addEventListener("popstate", renderRoute);
  supportForm.addEventListener("submit", handleSupportSubmit);
}

init();
