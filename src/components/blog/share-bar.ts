const COPY_LABEL = "Copy link";

/**
 * Wire up every share bar under `root`: show the copy button when the
 * Clipboard API exists, show the Web Share button when `navigator.share`
 * exists, and announce results in the bar's status line.
 */
export function initShareBars(root: ParentNode = document): void {
  const bars = root.querySelectorAll<HTMLElement>(".cjs-share-bar");

  for (const bar of bars) {
    const url = bar.dataset.url ?? location.href;
    const status = bar.querySelector<HTMLElement>(".cjs-share-status");

    const copyButtons =
      bar.querySelectorAll<HTMLButtonElement>("[data-share-copy]");
    if (navigator.clipboard?.writeText) {
      for (const button of copyButtons) {
        button.hidden = false;
        button.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(url);
          } catch {
            if (status) {
              status.textContent = "Couldn't copy link";
            }
            return;
          }
          if (status) {
            status.textContent = "Link copied";
          }
          for (const other of copyButtons) {
            other
              .querySelector("[data-share-icon]")
              ?.setAttribute("class", "fa-solid fa-check");
            const label = other.querySelector("[data-share-label]");
            if (label) {
              label.textContent = "Copied";
            }
          }
          setTimeout(() => {
            for (const other of copyButtons) {
              other
                .querySelector("[data-share-icon]")
                ?.setAttribute("class", "fa-solid fa-link");
              const label = other.querySelector("[data-share-label]");
              if (label) {
                label.textContent = COPY_LABEL;
              }
            }
          }, 2000);
        });
      }
    }

    if (typeof navigator.share === "function") {
      for (const button of bar.querySelectorAll<HTMLButtonElement>(
        "[data-share-native]",
      )) {
        button.hidden = false;
        button.addEventListener("click", async () => {
          const title = document.querySelector("h1")?.textContent ?? "";
          try {
            await navigator.share({ title, url });
          } catch (error) {
            if ((error as Error).name !== "AbortError") {
              throw error;
            }
          }
        });
      }
    }
  }
}
