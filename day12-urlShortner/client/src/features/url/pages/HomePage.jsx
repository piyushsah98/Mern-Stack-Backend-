import { useEffect, useState } from "react";
import { api } from "../../../config/api";
import { Copy, Link, Trash, TriangleAlert } from "lucide-react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [allUrls, setAllUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deleteUrl, setDeleteUrl] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch all URLs
  const fetchAllUrls = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await api.get("/url");
      setAllUrls(res.data.data.urls || []);
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setError("Failed to load URLs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a shortened URL
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    try {
      setIsSubmitting(true);
      setError("");

      const res = await api.post("/url/create", {
        url: url.trim(),
      });

      setCurrentUrl(res.data.data.shortCode);
      setUrl("");

      await fetchAllUrls();
    } catch (error) {
      console.error("Error creating URL:", error);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchAllUrls();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-sky-500" />
          <p className="text-slate-400">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-sky-500 text-lg font-bold text-white">
              U
            </div>
            <div>
              <h1 className="text-md font-bold tracking-tight">
                URL<span className="text-sky-400">Short</span>
              </h1>
              <p className="text-xs text-slate-500">Simple. Fast. Reliable.</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Dashboard
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        {/* Hero */}
        <section className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-400">
            Your links, simplified
          </p>

          <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
            Shorten your URLs.
            <br />
            <span className="text-slate-400">Share them anywhere.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Create short, memorable links and manage all your URLs in one
            beautiful dashboard.
          </p>
        </section>

        {/* Create URL Card */}
        <section className="mx-auto mb-10 max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-2shadow-xl sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-sky-500/10 p-2 text-sky-400">
              <Link size={20} />
            </div>

            <div>
              <h3 className="font-semibold">Create a short link</h3>
              <p className="text-sm text-slate-500">
                Paste your long URL below
              </p>
            </div>
          </div>

          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              required
              placeholder="https://example.com/your-long-url"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Shortening..." : "Shorten URL"}
            </button>
          </form>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Recently created URL */}
          {currentUrl && (
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-emerald-400">
                Your shortened URL is ready
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={`http://localhost:3000/${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm font-medium text-sky-400 hover:text-sky-300"
                >
                  http://localhost:3000/{currentUrl}
                </a>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `http://localhost:3000/${currentUrl}`,
                    )
                  }
                  className="shrink-0 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Copy link
                </button>
              </div>
            </div>
          )}
        </section>

        {/* URLs Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Your URLs</h3>
            <p className="mt-1 text-sm text-slate-500">
              Manage and organize your shortened links
            </p>
          </div>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-400">
            {allUrls.length} links
          </span>
        </div>

        {/* URL List */}
        {allUrls.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-5 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-2xl">
              🔗
            </div>

            <h4 className="font-semibold text-slate-300">No URLs yet</h4>

            <p className="mt-2 text-sm text-slate-500">
              Create your first shortened URL to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {allUrls.map((item, index) => {
              const originalUrl = item.originalUrl || item.url || "";
              const shortUrl = `http://localhost:3000/${item.shortCode}`;

              return (
                <div
                  key={item._id}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700 hover:bg-slate-800/80 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* URL Info */}
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block break-all text-sm font-semibold text-sky-400 hover:text-sky-300"
                        >
                          {shortUrl}
                        </a>

                        <p
                          title={originalUrl}
                          className="mt-1 max-w-2xl truncate text-sm text-slate-500"
                        >
                          {originalUrl || "Original URL unavailable"}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Active link
                        </div>
                      </div>
                    </div>

                    {/* Edit and Delete Buttons */}
                    <div className="flex shrink-0 items-center gap-2 border-t border-slate-800 pt-3 sm:border-0 sm:pt-0">
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:flex-none">
                        <Copy size={15} />
                        Copy
                      </button>

                      <button
                        onClick={() => setDeleteUrl(item)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 sm:flex-none"
                      >
                        <Trash size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {deleteUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            {/* Warning Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <TriangleAlert size={15} />
            </div>

            {/* Content */}
            <div className="mt-5 text-center">
              <h3 className="text-xl font-bold text-white">Delete this URL?</h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Are you sure you want to delete this shortened URL? This action
                cannot be undone.
              </p>

              <div className="mt-4 rounded-lg bg-slate-950 px-4 py-3 text-sm text-sky-400 break-all">
                http://localhost:3000/{deleteUrl.shortCode}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteUrl(null)}
                disabled={isDeleting}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    setError("");

                    await api.delete(`/url/${deleteUrl._id}`);

                    setAllUrls((prev) =>
                      prev.filter((item) => item._id !== deleteUrl._id),
                    );

                    setDeleteUrl(null);
                  } catch (error) {
                    console.error("Error deleting URL:", error);
                    setError("Failed to delete URL.");
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
