import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "public", "portfolio");
const port = Number(process.env.PDF_PORT ?? 3456);
const baseUrl = `http://127.0.0.1:${port}`;

const exports = [
  {
    route: "/export/cv",
    filename: "htet-htet-aung-resume.pdf",
    title: "Htet Htet Aung — Resume",
  },
  {
    route: "/export/portfolio-summary",
    filename: "portfolio-summary.pdf",
    title: "Portfolio Summary",
  },
  {
    route: "/export/design-system",
    filename: "visionary-design-system.pdf",
    title: "Visionary Design System",
  },
  {
    route: "/export/dream-fund-case-study",
    filename: "dream-fund-case-study.pdf",
    title: "Dream Fund Case Study",
  },
];

function waitForServer(url, timeoutMs = 120_000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          resolve();
          return;
        }
      } catch {
        // Server not ready yet.
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }

      setTimeout(check, 500);
    };

    check();
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const server = spawn("npm", ["run", "dev", "--", "-p", String(port)], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "development" },
  });

  let serverOutput = "";
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });

  try {
    await waitForServer(`${baseUrl}/export/portfolio-summary`);

    const browser = await chromium.launch();
    const context = await browser.newContext();

    for (const item of exports) {
      const page = await context.newPage();
      await page.goto(`${baseUrl}${item.route}`, { waitUntil: "networkidle" });
      await page.waitForSelector("[data-export-ready='true']");

      const outputPath = path.join(outputDir, item.filename);
      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        margin: { top: "16mm", right: "14mm", bottom: "16mm", left: "14mm" },
        displayHeaderFooter: true,
        headerTemplate: "<span></span>",
        footerTemplate: `
          <div style="width:100%;font-size:8px;color:#666;padding:0 14mm;font-family:sans-serif;">
            <span>${item.title}</span>
            <span style="float:right;"><span class="pageNumber"></span> / <span class="totalPages"></span></span>
          </div>
        `,
      });

      console.log(`Wrote ${outputPath}`);
      await page.close();
    }

    await context.close();
    await browser.close();
  } catch (error) {
    console.error(serverOutput);
    throw error;
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
