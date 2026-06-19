import { NextRequest, NextResponse } from "next/server";
import { ScrapeGraphAI } from "scrapegraph-js";

// Function to sanitize smart quotes and other problematic characters
function sanitizeQuotes(text: string): string {
  return text
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u00AB\u00BB]/g, '"')
    .replace(/[\u2039\u203A]/g, "'")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u2026]/g, "...")
    .replace(/[\u00A0]/g, " ");
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    console.log("[scrape-url-scrapegraph] Scraping with ScrapeGraph AI:", url);

    const SCRAPEGRAPH_API_KEY = process.env.SCRAPEGRAPH_API_KEY;
    if (!SCRAPEGRAPH_API_KEY) {
      throw new Error("SCRAPEGRAPH_API_KEY environment variable is not set");
    }

    // Initialize ScrapeGraphAI
    const client = ScrapeGraphAI({ apiKey: SCRAPEGRAPH_API_KEY });

    // Use ScrapeGraph’s API to extract webpage content
    const response = await client.extract({
      url,
      prompt:
        "Extract the main content from this webpage including title, description, headings, paragraphs, links, and all readable text. Preserve structure.",
    });

    console.log("[scrape-url-scrapegraph] Response received:", response);

    if (response.status !== "success" || !response.data) {
      throw new Error(response.error || "Failed to scrape content – no result returned");
    }

    const resultData = response.data;
    let markdownContent = "";

    if (typeof resultData === "object") {
      const title =
        resultData.title ||
        resultData.heading ||
        url.split("/").filter(Boolean).pop() ||
        "Untitled";

      const description = resultData.description || resultData.summary || "";
      const content =
        resultData.content ||
        resultData.text ||
        resultData.body ||
        JSON.stringify(resultData, null, 2);

      markdownContent += `# ${title}\n\n`;
      if (description) markdownContent += `${description}\n\n`;
      markdownContent += content;
    } else if (typeof resultData === "string") {
      markdownContent = resultData;
    } else {
      markdownContent = String(resultData);
    }

    const sanitizedMarkdown = sanitizeQuotes(markdownContent);

    const title =
      typeof resultData === "object" && resultData.title
        ? resultData.title
        : url.split("/").filter(Boolean).pop() || "Untitled";

    const description =
      typeof resultData === "object" && resultData.description
        ? resultData.description
        : "";

    const formattedContent = `
Title: ${sanitizeQuotes(String(title))}
Description: ${sanitizeQuotes(String(description))}
URL: ${url}

Main Content:
${sanitizedMarkdown}
    `.trim();

    return NextResponse.json({
      success: true,
      url,
      content: formattedContent,
      screenshot: null, // smartscraper does not support screenshots
      structured: {
        title: sanitizeQuotes(String(title)),
        description: sanitizeQuotes(String(description)),
        content: sanitizedMarkdown,
        url,
        screenshot: null,
      },
      metadata: {
        scraper: "scrapegraph-ai",
        timestamp: new Date().toISOString(),
        contentLength: formattedContent.length,
        requestId: response.request_id || null,
        cached: false,
      },
      message: "URL scraped successfully with ScrapeGraph AI",
    });
  } catch (error) {
    console.error("[scrape-url-scrapegraph] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
