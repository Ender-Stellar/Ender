import { NextRequest, NextResponse } from "next/server";
import { ScrapeGraphAI } from "scrapegraph-js";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.SCRAPEGRAPH_API_KEY;

    if (!apiKey) {
      console.error("SCRAPEGRAPH_API_KEY not configured");
      return NextResponse.json(
        { error: "ScrapeGraph API key not configured" },
        { status: 500 }
      );
    }

    console.log(
      "[scrape-screenshot-scrapegraph] Attempting scrape:",
      url
    );

    // Initialize ScrapeGraphAI client
    const client = ScrapeGraphAI({ apiKey });

    const scrapeResult = await client.extract({
      url,
      prompt: "Extract the page title, description, and main visual elements description.",
    });

    if (scrapeResult.status !== "success" || !scrapeResult.data) {
      throw new Error(scrapeResult.error || "Failed to scrape content – no result returned");
    }

    console.log(
      "[scrape-screenshot-scrapegraph] Scrape result:",
      scrapeResult
    );

    return NextResponse.json({
      success: true,
      screenshot: null,
      metadata: {
        scraper: "scrapegraph-ai",
        requestId: (scrapeResult as any).request_id || null,
        note:
          "ScrapeGraph AI does not provide screenshot functionality. Use Firecrawl for live browser screenshots.",
        result: scrapeResult.data,
      },
      message:
        "Content scraped successfully, but screenshots are not supported by ScrapeGraph AI.",
    });
  } catch (error: any) {
    console.error(
      "[scrape-screenshot-scrapegraph] Error:",
      error
    );

    return NextResponse.json(
      {
        error: error.message || "Failed to scrape content",
        note:
          "ScrapeGraph AI does not provide screenshot functionality. Use Firecrawl for screenshot capture.",
      },
      { status: 500 }
    );
  }
}
