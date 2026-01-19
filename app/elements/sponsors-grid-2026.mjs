import { sponsors } from "../../shared/data/sponsors.mjs";

const sponsors2025 = sponsors["2026"];

export default function Sponsors({ html }) {
  return html` <style>
      .tier-wrap {
        text-align: center;
        margin: 20px;
        position: relative;
      }

      .tier-inner {
        padding: 0 10px;
        display: flex;
        justify-content: center;
        position: relative;
      }

      .tier-wrap:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        border-top: 1px solid #112378;
        width: 100%;
        transform: translateY(-50%);
        opacity: 0.2;
      }

      .tier-label {
        height: 20px;
        padding: 8px;
        background: #d1f3e5;
        color: #112378;
        display: inline-block;
      }

      .tier div img {
        display: block;
        margin: 32px auto;
        height: 50px;
      }

      @media only screen and (min-width: 768px) {
        .tier {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tier div img {
          height: 100%;
          display: inline;
          margin: 0;
        }

        .tier div {
          margin: 32px;
        }

        .platinum div {
          height: 142px;
        }

        .gold div {
          height: 110px;
        }

        .silver div {
          height: 84px;
        }

        .bronze div {
          height: 65px;
        }

        .community div {
          height: 50px;
        }

        .media div {
          height: 50px;
        }

        .sponsored div {
          height: 30px;
        }
      }
    </style>
    <div class="sponsors-grid">
      ${["platinum", "gold", "silver", "bronze", "community", "media"]
        .map(
          (tier) => /*html*/ `
            ${
              sponsors2025.filter((s) => s.tier === tier).length > 0
                ? /*html*/ `
                <div class="tier-wrap"><div class="tier-inner"><div class="tier-label">${tier}</div></div></div>
                <div class="${tier} tier">
                ${sponsors2025
                  .filter((s) => s.tier === tier)
                  .map(
                    (s) => /*html*/ `
                    ${
                      ["platinum", "gold", "silver"].includes(s.tier)
                        ? `<div><a href="${s.url}"><img src="/_public/images/sponsors/${s.logo}" alt="${s.name} logo"/></a></div>`
                        : `<div><img src="/_public/images/sponsors/${s.logo}" alt="${s.name} logo"/></div>`
                    }
                `
                  )
                  .join("")}
                </div>
            `
                : ""
            }        
        `
        )
        .join("")}
    </div>`;
}
