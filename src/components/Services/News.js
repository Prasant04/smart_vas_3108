import React from "react";
import "./News.css";

const NewsFeed = () => {
  // Hardcoded JSON response from backend
  const articles = [
    {
      article_id:
        "CBMisAFBVV95cUxQUjRMeTZFYjFQVHFJakptMDEweXlYak5UVGRmWUJpdnpxY1NtVUVDcEg4ZTdhbDdnSjVMQnpSVk54Z3RGc0hxaXdLdFV3SmtCdm5pSHFRbHBOTVBwb3dENUZmNVVDQ1VOTGNCZVFMZWV2QWpsd0p1TUlOal9wNURhWDllaHZGNnMxbzZSOXJJenZUcHJrVmZkTVY5aFJnM2wzSTJDalVmaGhLUi1PTmRaWA",
      title: "Kamala Harris carries the torch, and the burden, of Bidenomics",
      link: "https://www.economist.com/united-states/2024/07/23/kamala-harris-carries-the-torch-and-the-burden-of-bidenomics",
      snippet:
        "Pinpointing differences in the economic views of Kamala Harris and Joe Biden is no easy task: the two have promoted the same ideas and ...",
      photo_url:
        "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20240727_USP521.jpg",
      published_datetime_utc: "2024-07-23T07:00:00.000Z",
      authors: [],
      source_url: "https://www.economist.com",
      source_name: "The Economist",
      source_logo_url:
        "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.economist.com&client=NEWS_360&size=256&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
    },
    {
      article_id:
        "CBMipgFBVV95cUxQSWhtQmZoZy1pTmpnMHd4enA1TC0tRDlVRlFrYWNyRWUtUjVPSjBjSkx5akxWZmc3SmlkUTl0TTRneVlmLUxNNjNkU3NLN3J2UG5oWFVnOXFDeXZHZGJvYjRiY1ZkcTZFUVFweU81NGlMTFMwazZ0MVlZQ2xPZmZnVVcxeEk1RHhJbTlUcXpuNEtFalk1NlZyV2dGOU9IVk1BNU5CQkNB",
      title:
        "Joe Biden wants to pass the baton to Kamala Harris. Here's how that might work",
      link: "https://bridgemi.com/michigan-government/joe-biden-wants-pass-baton-kamala-harris-heres-how-might-work/",
      snippet:
        "ATLANTA (AP) — With President Joe Biden ending his reelection bid and endorsing Vice President Kamala Harris, Democrats now must navigate a ...",
      photo_url:
        "https://i0.wp.com/bridgemi.com/wp-content/uploads/2024/07/BIDEN-HARRIS-AP.jpg?fit=1200%2C800&ssl=1",
      published_datetime_utc: "2025-05-15T07:00:00.000Z",
      authors: [],
      source_url: "https://bridgemi.com",
      source_name: "Bridge Michigan",
      source_logo_url:
        "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://bridgemi.com&client=NEWS_360&size=256&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
    },
    {
      article_id:
        "CBMigAFBVV95cUxQUkVVblQtX2tqS2kwbkRDdmJNdHlPTFdrSTcwM09BdGlMSEp2Q1ZQX3JleDRXU0wtR25KVVlsaGM4NlZhOWdUQllfTGVrMzc3NVlMSTRjQld1aWpEQVBIOUswOVA0d3ozOW1xUXdpTFVhbTBncVR5OWhjaEFtUWJaag",
      title: "July 22, 2024, presidential campaign news",
      link: "https://www.cnn.com/politics/live-news/joe-biden-election-drop-out-07-22-24",
      snippet:
        "Vice President Kamala Harris has celebrated securing enough delegate endorsements to win the Democratic presidential nomination.",
      photo_url:
        "https://media.cnn.com/api/v1/images/stellar/prod/kamala-harris.jpg?c=16x9&q=w_1280,c_fill",
      published_datetime_utc: "2024-07-22T07:00:00.000Z",
      authors: ["Lex Harvey", "Zoe Sottile", "Aditi Sangal"],
      source_url: "https://www.cnn.com",
      source_name: "CNN",
      source_logo_url:
        "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.cnn.com&client=NEWS_360&size=256&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
    },
    {
      article_id:
        "CBMixwFBVV95cUxPcFZNdS1xekVBQkRZbjNEYmpUN1o1ZkR3SnB6QTk1T2ZrcTF4djNyMURZMEVJdnhxbkFNUERPcWtZSUxtR3J2cVVXamJnRVBKOTFCNEs5WDBnZDZlSUlTTUpRLS1STnFBXzFKeU84VFJEVUZSNjl0eGdpZWlGY3M3aWlWdzljX1VXcXBvREdoM2JhSU5VVjhaQnlYX0VReFJnUHNZamJQeWZKSVZ3WVFaZm8zSTQ3dFE5aU9mRnZ4cE53YmVnMWhr0gFWQVVfeXFMUEtsNGY1dy1paE5TQnotYkMyenJELUZEMmVKT0RQMno2QTI3X3pLdENrZ2Y4ZlktdnVrLVZJZG5OeUloNW9fWFNsc3QzUU5PMUQwRDlGQ3c",
      title:
        "Democratic leaders Chuck Schumer and Hakeem Jeffries endorse Harris for president",
      link: "https://www.nbcnews.com/politics/2024-election/democratic-leaders-chuck-schumer-hakeem-jeffries-endorse-harris-presid-rcna163249",
      snippet:
        "Democratic leaders Chuck Schumer and Hakeem Jeffries endorse Harris for president. The highest-ranking Senate and House Democrats join dozens of ...",
      photo_url:
        "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-07/240723-chuck-schumer-hakeem-jeffries-ew-1220p-0fc6af.jpg",
      published_datetime_utc: "2024-07-23T07:00:00.000Z",
      authors: ["Kate Santaliz", "Ryan Nobles", "Frank Thorp V"],
      source_url: "https://www.nbcnews.com",
      source_name: "NBC News",
      source_logo_url:
        "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://www.nbcnews.com&client=NEWS_360&size=256&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
    },
    {
      article_id:
        "CBMifEFVX3lxTE1MY1NtMXE5Wm13bTEwVWJjdnhUZl9Wc2Q3Q2hNWVRoM1JRTzhhV3U2eTdlT01ZN2x2ZWNHaFJvNHBPX1hqdHhUZ2tRUlpfeV9PYkh5SjF0d2dEbzhEOE1oVWc3UmZfMlNFNHZocVBhVl9wa2FYR3RiTV80Rk4",
      title:
        "How Will Democrats Replace Biden at the Top of the Presidential Ticket? (Published 2024)",
      link: "https://www.nytimes.com/2024/07/21/us/politics/biden-replace-harris.html",
      snippet:
        "Now that President Biden has withdrawn from the presidential race, the question facing the Democratic Party is no longer whether he can be ...",
      photo_url:
        "https://static01.nyt.com/images/2024/06/28/multimedia/replace-biden-2-sub-gztv/replace-biden-2-sub-gztv-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      published_datetime_utc: "2024-07-21T07:00:00.000Z",
      authors: ["Adam Nagourney", "Jennifer Medina"],
      source_url: "https://www.nytimes.com",
      source_name: "The New York Times",
      source_logo_url:
        "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.nytimes.com&client=NEWS_360&size=256&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
    },
  ];

  return (
    <div className="news-grid">
      {articles.map((article) => (
        <a
          key={article.article_id}
          href={article.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card"
        >
          {article.photo_url && (
            <div className="news-image-wrapper">
              <img
                src={article.photo_url}
                alt={article.title}
                className="news-image"
              />
            </div>
          )}

          <div className="news-content">
            <h2 className="news-title">{article.title}</h2>
            <p className="news-snippet">{article.snippet}</p>

            <div className="news-meta">
              {article.source_logo_url && (
                <img
                  src={article.source_logo_url}
                  alt={article.source_name}
                  className="news-source-logo"
                />
              )}
              <span>{article.source_name}</span>
              <span>•</span>
              <span>
                {new Date(article.published_datetime_utc).toLocaleDateString()}
              </span>
              {article.authors && article.authors.length > 0 && (
                <>
                  <span>•</span>
                  <span>{article.authors.join(", ")}</span>
                </>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default NewsFeed;
