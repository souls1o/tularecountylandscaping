/**
 * Writes 50 markdown articles with randomized daily volume (1–3 posts per
 * calendar day) starting SCHEDULE_START_YMD. Seeded RNG keeps the schedule
 * reproducible across runs.
 *
 * Usage: node scripts/generate-scheduled-article-batch.mjs
 *         node scripts/generate-scheduled-article-batch.mjs --rewrite
 * Environment: SCHEDULE_START_YMD=YYYY-MM-DD for the first publish day (default: today, America/Los_Angeles).
 * Without --rewrite, existing slugs are skipped.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "content", "articles");

function getTodayYmdLa() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

/** Override with SCHEDULE_START_YMD=YYYY-MM-DD for a fixed batch start. */
const SCHEDULE_START_YMD = process.env.SCHEDULE_START_YMD ?? getTodayYmdLa();

function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function addCalendarDays(ymd, delta) {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + delta);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function allocateDailyCounts(total, rng) {
  const counts = [];
  let rem = total;
  while (rem > 0) {
    const cap = Math.min(3, rem);
    const pick = 1 + Math.floor(rng() * cap);
    counts.push(pick);
    rem -= pick;
  }
  return counts;
}

function buildPublishDates(startYmd, counts) {
  const dates = [];
  let dayOffset = 0;
  for (const c of counts) {
    const ymd = addCalendarDays(startYmd, dayOffset);
    for (let i = 0; i < c; i++) dates.push(ymd);
    dayOffset += 1;
  }
  return dates;
}

function shuffleInPlace(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const CITY_SLUGS = [
  "tulare-ca",
  "visalia-ca",
  "porterville-ca",
  "dinuba-ca",
  "exeter-ca",
  "farmersville-ca",
  "lindsay-ca",
  "woodlake-ca",
  "goshen-ca",
  "tipton-ca",
  "pixley-ca"
];

const SERVICE_PATHS = [
  "/services/irrigation-repair",
  "/services/sod-installation",
  "/services/artificial-turf-installation",
  "/services/gravel-landscaping",
  "/services/landscape-lighting",
  "/services/yard-cleanup"
];

const SERVICE_LABEL = {
  "/services/irrigation-repair": "Irrigation repair",
  "/services/sod-installation": "Sod installation",
  "/services/artificial-turf-installation": "Artificial turf installation",
  "/services/gravel-landscaping": "Gravel landscaping",
  "/services/landscape-lighting": "Landscape lighting",
  "/services/yard-cleanup": "Yard cleanup"
};

function escapeYamlString(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function cityLabel(slug) {
  return slug
    .replace(/-ca$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** @typedef {{ slug: string; title: string; description: string; keywords: string[]; angle: string }} Seed */

/** @param {Seed} seed */
function expandTopic(seed) {
  const a = seed.angle.trim();
  const title = seed.title.trim();
  return {
    slug: seed.slug,
    title,
    description: seed.description.trim(),
    keywords: seed.keywords,
    lead: `${a.charAt(0).toUpperCase() + a.slice(1)} is a common search topic for Tulare County homeowners because long, dry summers punish shortcuts. This guide translates what actually matters on Valley lots—grading, irrigation honesty, and realistic maintenance—before you commit to materials or labor.`,
    takeaway: `Anchor drainage and irrigation honesty first—results only look "finished" when underlying yard mechanics cooperate through July heat, regardless of how you execute on this scope.`,
    h2a: "Why Central Valley heat changes the playbook",
    h2b: "On-site checks before you order materials",
    h2c: "Phasing work so you avoid rework",
    sectionA: `Tulare County yards see months of intense sun, occasional hard frosts, and irrigation stress that coastal guides rarely mention. For this scope, assume evaporation and soil compaction will exaggerate small mistakes—especially where spray hits pavement or beds share valves with thirsty turf. Walk the property after a normal irrigation cycle and mark dry wedges, pooling, and overspray before redesigning.`,
    sectionB: `Bring photos, rough measurements, and a simple sketch of where people actually walk, park gear, and let pets run. Confirm where downspouts discharge, whether the hose bib pressure feels weak, and if valves hiss when stations shut off. If anything looks questionable, plan [irrigation repair](/services/irrigation-repair) diagnostics before locking new layouts.`,
    sectionC: `Most homeowners get better outcomes by splitting demo, drainage fixes, and finish surfaces into clear milestones—especially when schedules slip for material lead times. Ask contractors for written sequencing so finish surfaces are not installed on wet or poorly compacted bases, and keep a punch list for edge restraint, cleanup, and controller settings once planting or hardscape is complete.`
  };
}

/** @type {Seed[]} */
const SEEDS = [
  {
    slug: "river-rock-vs-decomposed-granite-pathways",
    title: "River Rock vs. Decomposed Granite for Side Paths and Patios",
    description: "Compare comfort, compaction, drainage, and long-term upkeep for river rock and DG walkways in Central Valley yards.",
    keywords: ["river rock pathway Visalia", "DG walkway Tulare County", "decomposed granite drainage", "gravel path edging Central Valley"],
    angle: "choosing between river rock and stabilized DG for foot traffic paths"
  },
  {
    slug: "caliche-soil-basics-tulare-county",
    title: "Caliche and Hardpan: What Tulare County Homeowners Should Know",
    description: "Recognize caliche layers, drainage limits, and realistic planting strategies before you invest in major landscape work.",
    keywords: ["caliche soil Central Valley", "hardpan drainage Tulare County", "Visalia soil compaction", "yard drainage testing"],
    angle: "dealing with caliche or hardpan when planning new beds and irrigation"
  },
  {
    slug: "rental-property-curb-appeal-landscaping",
    title: "Low-Maintenance Curb Appeal for Tulare County Rentals",
    description: "Budget-smart exterior upgrades landlords can maintain without constant service calls.",
    keywords: ["rental landscaping Visalia", "low maintenance curb appeal Tulare", "landlord yard cleanup Porterville", "durable gravel front yard"],
    angle: "low-maintenance curb appeal for rental homes"
  },
  {
    slug: "olive-tree-irrigation-basin-tips",
    title: "Olive Tree Irrigation Basins: Sizing and Mulch in Hot Summers",
    description: "Basin dimensions, bubbler placement, and mulch strategies that reduce trunk rot risk while keeping olives healthy.",
    keywords: ["olive tree irrigation Tulare County", "tree basin mulching Visalia", "drip around olives Central Valley", "orchard style yard trees"],
    angle: "irrigation basin design around mature or newly planted olive trees"
  },
  {
    slug: "citrus-tree-watering-winter-vs-summer",
    title: "Citrus Watering Rhythms Through Valley Heat and Winter Cooldowns",
    description: "How to adjust deep watering schedules seasonally without drowning roots or stressing fruit load.",
    keywords: ["citrus irrigation Tulare County", "winter watering citrus Visalia", "summer heat citrus roots", "microspray vs drip citrus"],
    angle: "seasonal citrus watering on drip and micro-spray systems"
  },
  {
    slug: "sprinkler-zone-redesign-before-new-sod",
    title: "Should You Redesign Sprinkler Zones Before Laying Sod?",
    description: "When a zone map refresh saves sod, reduces dry corners, and prevents expensive tear-outs after establishment.",
    keywords: ["sprinkler zones before sod", "sod irrigation layout Visalia", "Tulare County lawn coverage", "rotor spacing sod"],
    angle: "redesigning sprinkler zones before a sod installation"
  },
  {
    slug: "low-voltage-landscape-transformer-sizing",
    title: "Sizing a Low-Voltage Transformer for Landscape Lighting Loads",
    description: "Add fixture wattage safely, plan for cable runs, and avoid dim circuits on long backyard lines.",
    keywords: ["landscape lighting transformer Visalia", "low voltage wattage Tulare County", "12v lighting load calc", "outdoor lighting design CA"],
    angle: "low-voltage transformer sizing for LED landscape lighting"
  },
  {
    slug: "path-light-spacing-along-walkways",
    title: "Path Light Spacing That Feels Natural (and Stays Safe)",
    description: "Spacing rules of thumb for residential walks, glare control, and when to alternate with step lights.",
    keywords: ["path light spacing Visalia", "walkway lighting design Tulare", "bollard spacing Central Valley", "dark sky friendly path lights"],
    angle: "path light spacing and glare control along front walks"
  },
  {
    slug: "synthetic-turf-base-depth-compaction",
    title: "Synthetic Turf Base Depth: Compaction Checks Before Infill",
    description: "Why base thickness matters for pet areas, how to spot soft spots, and drainage ties to existing grade.",
    keywords: ["artificial turf base depth Tulare County", "synthetic turf compaction Visalia", "pet turf base prep", "drainage under turf"],
    angle: "aggregate base depth and compaction under artificial turf"
  },
  {
    slug: "landscape-fabric-under-gravel-tradeoffs",
    title: "Landscape Fabric Under Gravel: When It Helps—and When It Fails",
    description: "Weed suppression vs. clogging fines, maintenance expectations, and better pairing with edging.",
    keywords: ["weed fabric under gravel Visalia", "geotextile gravel path Tulare County", "gravel patio weed control", "DG fabric pros cons"],
    angle: "using landscape fabric beneath decorative gravel"
  },
  {
    slug: "french-drain-vs-bioswale-yard-drainage",
    title: "French Drains vs. Bioswales for Backyard Pooling",
    description: "Pick the right fix for sheet flow, downspout discharge, and tight side yards common in older neighborhoods.",
    keywords: ["french drain Tulare County", "bioswale backyard Visalia", "yard drainage Central Valley", "downspout drainage gravel"],
    angle: "french drains compared to shallow bioswales for yard drainage"
  },
  {
    slug: "small-retaining-wall-gravity-basics",
    title: "Small Retaining Walls: Gravity Basics Homeowners Should Verify",
    description: "Batter, drainage behind the wall, and when a short height still needs engineering input.",
    keywords: ["small retaining wall Visalia", "landscape wall drainage Tulare County", "gravity wall backyard", "block wall setback"],
    angle: "short gravity retaining walls for planter tiers"
  },
  {
    slug: "raised-bed-drip-conversion-checklist",
    title: "Converting Raised Beds from Spray to Drip",
    description: "Emitter choices, pressure regulation, and flushing ports that keep vegetable beds predictable.",
    keywords: ["raised bed drip Visalia", "convert sprinklers to drip Tulare County", "vegetable garden irrigation", "pressure compensating emitters"],
    angle: "converting raised vegetable beds from spray to drip irrigation"
  },
  {
    slug: "shade-tolerant-groundcovers-central-valley",
    title: "Shade-Tolerant Groundcovers That Survive Valley Heat Edges",
    description: "Pairing partial shade microclimates with irrigation zones that will not cook delicate foliage.",
    keywords: ["shade groundcover Visalia", "drought tolerant shade plants Tulare", "north side yard planting", "mulch shade beds"],
    angle: "shade-tolerant groundcovers in hot-summer climates"
  },
  {
    slug: "agapanthus-care-hot-summers",
    title: "Agapanthus in the Central Valley: Watering and Division Timing",
    description: "Bloom performance tips, division windows, and avoiding crown rot with summer irrigation habits.",
    keywords: ["agapanthus care Visalia", "lily of the nile Tulare County", "summer watering perennials", "divide agapanthus timing"],
    angle: "agapanthus care and division timing in hot summers"
  },
  {
    slug: "lawn-aeration-timing-tulare-county",
    title: "Lawn Aeration Timing for Tulare County Warm-Season Grass",
    description: "Why midsummer aeration often backfires and what soil moisture targets reduce stress.",
    keywords: ["lawn aeration Visalia", "aeration timing Tulare County", "Bermuda aeration Central Valley", "soil compaction lawn"],
    angle: "aeration timing for warm-season lawns in the Central Valley"
  },
  {
    slug: "pre-emergent-calendar-central-valley-lawns",
    title: "Pre-Emergent Windows for Valley Lawns and Planter Edges",
    description: "Coordinate herbicide timing with overseeding plans and irrigation start-up dates.",
    keywords: ["pre emergent lawn Visalia", "weed prevention Tulare County", "spring irrigation startup weeds", "crabgrass prevention CA"],
    angle: "pre-emergent herbicide timing around irrigation startups"
  },
  {
    slug: "gopher-wire-under-turf-and-beds",
    title: "Gopher Wire Under Turf and Beds: Worth the Cost?",
    description: "Mesh depth expectations, overlaps at seams, and realistic expectations near orchard borders.",
    keywords: ["gopher wire artificial turf Visalia", "gopher mesh under sod Tulare County", "rodent barrier landscaping", "gopher baskets trees"],
    angle: "installing gopher wire beneath turf and planting beds"
  },
  {
    slug: "dog-run-drainage-synthetic-turf-prep",
    title: "Dog Run Drainage Prep Before Synthetic Turf",
    description: "Slope targets, cleanouts, and odor-management choices that pair with infill decisions.",
    keywords: ["dog run drainage Visalia", "pet turf drainage Tulare County", "synthetic turf dog area", "infill pet turf"],
    angle: "drainage preparation for dog runs with synthetic turf"
  },
  {
    slug: "pool-deck-splash-zone-planting",
    title: "Pool Deck Splash Zones: Plants and Materials That Tolerate Chlorine",
    description: "Salt vs. chlorine considerations, drainage away from coping, and low-litter choices.",
    keywords: ["poolside landscaping Visalia", "chlorine tolerant plants Tulare County", "pool deck drainage", "low litter pool plants"],
    angle: "planting and materials near pool splash zones"
  },
  {
    slug: "rv-pad-gravel-subgrade-compaction",
    title: "RV Pad Gravel: Subgrade and Compaction That Prevent Ruts",
    description: "Layering crushed rock, geogrid options, and edge restraint that survives turning tires.",
    keywords: ["RV pad gravel Visalia", "gravel parking pad Tulare County", "compacted gravel driveway", "geogrid gravel pad"],
    angle: "gravel RV pads with proper subgrade compaction"
  },
  {
    slug: "corner-lot-privacy-screen-spacing",
    title: "Corner Lot Privacy Screens: Spacing and Height Realities",
    description: "Setback reminders, sight-line goals, and faster fill-in strategies without overcrowding roots.",
    keywords: ["corner lot privacy Visalia", "hedge spacing Tulare County", "privacy shrubs Central Valley", "street visibility landscaping"],
    angle: "privacy plant spacing on corner lots"
  },
  {
    slug: "alley-access-yard-cleanup-safety",
    title: "Alley-Access Yards: Cleanup and Safety Checklist",
    description: "Firewood storage, brush clearance, gate swing, and debris hauling logistics on tight lots.",
    keywords: ["alley yard cleanup Visalia", "junk removal landscaping Tulare County", "narrow gate access yard", "brush clearance backyard"],
    angle: "yard cleanup logistics on alley-access lots"
  },
  {
    slug: "mulch-refresh-depth-and-volcano-guards",
    title: "Mulch Refresh Depth (and Avoiding Volcano Mulch)",
    description: "Target depths by plant type, pulled-back trunks, and drip emitter exposure after refresh.",
    keywords: ["mulch depth Visalia", "mulch volcano trees Tulare County", "drip emitter mulch", "bark refresh timing"],
    angle: "mulch refresh depth and trunk clearance around trees"
  },
  {
    slug: "bocce-court-gravel-base-layers",
    title: "Backyard Bocce Courts: Gravel Base Layers Explained",
    description: "Drainage pitch, crushed stone gradations, and when DIY stops being realistic.",
    keywords: ["bocce court base Visalia", "gravel sport court Tulare County", "compacted base layers", "backyard bocce drainage"],
    angle: "gravel base layers for a residential bocce court"
  },
  {
    slug: "paver-fire-pit-footing-basics",
    title: "Paver Fire Pits: Footing Depth and Clearance Basics",
    description: "Non-combustible surrounds, gas line planning, and gravel pads vs. mortared rings.",
    keywords: ["paver fire pit Visalia", "fire pit footing Tulare County", "outdoor fire feature code", "gravel fire pit pad"],
    angle: "footing depth and clearances for paver fire pits"
  },
  {
    slug: "juniper-removal-xeriscape-transition",
    title: "Removing Old Junipers: Phasing Into Water-Wise Beds",
    description: "Irrigation retrofit order, soil improvement after years of dry shade, and gravel transitions.",
    keywords: ["remove juniper Visalia", "xeriscape transition Tulare County", "shrub removal irrigation", "gravel bed after juniper"],
    angle: "removing overgrown juniper and transitioning to xeriscape"
  },
  {
    slug: "shade-sail-vs-pergola-footings",
    title: "Shade Sails vs. Pergolas: Footing and Wind Loads",
    description: "Post sizing anchors, fabric tension maintenance, and when a pergola is the simpler long-term choice.",
    keywords: ["shade sail posts Visalia", "pergola footing Tulare County", "patio shade structure wind", "shade sail tension"],
    angle: "shade sail post footings compared to pergola structures"
  },
  {
    slug: "astronomic-timer-landscape-lighting",
    title: "Astronomic Timers for Landscape Lighting: Fewer Manual Tweaks",
    description: "Why sunset drift matters in the Valley and how to pair astronomical windows with controllers.",
    keywords: ["astronomic timer lighting Visalia", "landscape lighting schedule Tulare County", "photocell vs timer", "low voltage timer tips"],
    angle: "astronomic timers for residential landscape lighting"
  },
  {
    slug: "led-path-light-color-temperature",
    title: "3000K vs. 4000K Path Lights: What Feels Right Near Stucco?",
    description: "Glare, foliage color rendering, and matching porch sconces without looking sterile.",
    keywords: ["3000k path lights Visalia", "4000k landscape lighting Tulare County", "LED color temperature yard", "warm white outdoor lights"],
    angle: "LED color temperature for path lighting near stucco homes"
  },
  {
    slug: "visalia-hoa-landscape-compliance-tips",
    title: "HOA-Friendly Front Yard Updates Common in Visalia Developments",
    description: "Height limits, lawn alternatives that still read “tidy,” and documentation to submit with plans.",
    keywords: ["HOA landscaping Visalia", "front yard rules Tulare County", "HOA turf replacement CA", "HOA gravel front yard"],
    angle: "HOA-friendly front yard landscaping updates in Visalia-style developments"
  },
  {
    slug: "porterville-windbreak-hedge-rows",
    title: "Windbreak Hedges for Exposed Porterville Lots",
    description: "Spacing multiple rows, species that handle heat, and irrigation zones that establish faster.",
    keywords: ["windbreak shrubs Porterville", "hedge row Tulare County", "wind protection yard Visalia", "privacy windbreak CA"],
    angle: "windbreak hedge rows on wind-exposed lots"
  },
  {
    slug: "exeter-curb-appeal-small-lot",
    title: "Exeter Curb Appeal on Smaller Infill Lots",
    description: "Tight setbacks, tidy edges, and gravel ribbons that read intentional rather than sparse.",
    keywords: ["small lot landscaping Exeter", "curb appeal Tulare County", "narrow front yard Visalia", "gravel ribbon driveway"],
    angle: "curb appeal strategies on smaller infill lots"
  },
  {
    slug: "irrigation-main-line-leak-homeowner-checks",
    title: "Irrigation Main Line Leaks: Simple Homeowner Checks",
    description: "Meter spin tests, wet spots along the lateral path, and when to stop digging and call a pro.",
    keywords: ["irrigation leak detection Visalia", "main line leak Tulare County", "sprinkler leak wet spot", "water meter spinning"],
    angle: "homeowner checks for irrigation main line leaks"
  },
  {
    slug: "house-water-pressure-regulator-irrigation",
    title: "House Pressure Regulators and Irrigation Performance",
    description: "Symptoms of failing PRVs, interaction with backflow devices, and safe testing habits.",
    keywords: ["pressure regulator irrigation Visalia", "low water pressure sprinklers Tulare County", "PRV replacement CA", "irrigation pressure issues"],
    angle: "house water pressure regulators affecting irrigation"
  },
  {
    slug: "rotor-vs-spray-lawn-corners",
    title: "Rotors vs. Sprays: Fixing Dry Corners on Tulare County Lawns",
    description: "Arc adjustments, head-to-head coverage math, and when rotor overspray becomes a liability.",
    keywords: ["rotor vs spray lawn Visalia", "dry corners lawn Tulare County", "sprinkler coverage adjustment", "irrigation head types"],
    angle: "rotor versus spray heads for dry lawn corners"
  },
  {
    slug: "backflow-testing-spring-checklist",
    title: "Backflow Testing and Spring Startup: A Practical Checklist",
    description: "Valve exercise order, slow pressurization, and what to log before turning on beds.",
    keywords: ["backflow test Visalia", "sprinkler spring startup Tulare County", "irrigation valve checklist", "RPZ testing CA"],
    angle: "spring irrigation startup with backflow testing context"
  },
  {
    slug: "tree-limb-chipping-vs-haul-off",
    title: "Tree Limb Chipping vs. Haul-Off: Cost Drivers After Pruning",
    description: "Access gates, volume estimates, and how cleanup choices affect the rest of the yard project.",
    keywords: ["limb chipping Visalia", "yard debris haul Tulare County", "tree cleanup cost", "brush removal landscaping"],
    angle: "chipping versus haul-off for tree limb cleanup"
  },
  {
    slug: "gravel-driveway-pothole-patch-steps",
    title: "Gravel Driveway Potholes: Patch Steps That Last Longer",
    description: "Crown shape, fines vs. clean crush, and compaction passes that survive winter storms.",
    keywords: ["gravel driveway repair Visalia", "pothole patch gravel Tulare County", "driveway crown drainage", "compacted gravel repair"],
    angle: "patching potholes in gravel driveways"
  },
  {
    slug: "polymeric-sand-paver-joints-valley-heat",
    title: "Polymeric Sand in Valley Heat: Timing and Cure Windows",
    description: "Moisture activation, cloud cover advantages, and when traditional joint sand is safer.",
    keywords: ["polymeric sand Visalia", "paver joints Tulare County", "hot weather polymeric sand", "patio joint stabilization"],
    angle: "polymeric sand for paver joints in hot climates"
  },
  {
    slug: "turf-infill-sand-for-pet-areas",
    title: "Infill Sand Choices for Pet-Friendly Synthetic Turf",
    description: "Round vs. angular grains, odor additives, and how infill depth interacts with drainage.",
    keywords: ["turf infill sand Visalia", "pet turf infill Tulare County", "synthetic turf odor", "infill depth pet yard"],
    angle: "infill sand selection for pet-friendly synthetic turf"
  },
  {
    slug: "artificial-turf-blade-shapes-explained",
    title: "Artificial Turf Blade Shapes: What Homeowners Actually Notice",
    description: "Shine, lay direction, and durability tradeoffs without getting lost in marketing names.",
    keywords: ["artificial turf blade shape Visalia", "synthetic turf shine Tulare County", "C blade vs S blade turf", "realistic artificial grass"],
    angle: "artificial turf blade shape and shine tradeoffs"
  },
  {
    slug: "solar-vs-low-voltage-path-lights",
    title: "Solar Path Lights vs. Low-Voltage Fixtures: Reliability in the Valley",
    description: "Battery fade, panel dust, and where wired 12V systems pay off for safety-critical walks.",
    keywords: ["solar path lights Visalia", "low voltage path lights Tulare County", "solar vs wired landscape lights", "walkway lighting reliability"],
    angle: "solar path lights compared to low-voltage wired fixtures"
  },
  {
    slug: "smart-irrigation-flow-sensors",
    title: "Smart Irrigation and Flow Sensors: Catching Leaks Early",
    description: "What flow alerts can (and cannot) detect, and pairing sensors with hydraulically sound zones.",
    keywords: ["smart irrigation flow sensor Visalia", "leak alert sprinklers Tulare County", "smart controller irrigation", "high bill sprinkler leak"],
    angle: "smart irrigation controllers with flow-based leak alerts"
  },
  {
    slug: "lindsay-narrow-lot-patio-ideas",
    title: "Narrow Side Yards and Patios: Ideas for Lindsay-Style Lots",
    description: "Linear pavers, wall planters, and drainage along fence lines that stay usable.",
    keywords: ["narrow side yard Lindsay", "small patio ideas Tulare County", "linear pavers Visalia", "side yard drainage fence"],
    angle: "narrow side yard patio layouts on smaller lots"
  },
  {
    slug: "woodlake-slope-erosion-planting",
    title: "Woodlake Slopes: Erosion Control Planting Without Overwatering",
    description: "Hydrozones on grade, jute netting windows, and drip layouts that establish without saturating uphill homes.",
    keywords: ["slope planting Woodlake", "erosion control Tulare County", "hillside drip Visalia", "jute netting landscaping"],
    angle: "erosion-control planting on gentle residential slopes"
  },
  {
    slug: "tipton-dust-barrier-planting",
    title: "Dusty Exposure Near Agriculture: Practical Barrier Planting",
    description: "Row spacing, species that tolerate dust film, and irrigation that does not amplify mud.",
    keywords: ["windbreak planting Tipton", "dust barrier shrubs Tulare County", "farm adjacent yard Visalia", "privacy row irrigation"],
    angle: "dust-reducing barrier planting near agricultural exposure"
  },
  {
    slug: "farmersville-budget-front-yard-rehab",
    title: "Budget Front Yard Rehab Phases for Farmersville Homes",
    description: "What to tackle first for curb appeal, and where gravel beats turf on total cost of ownership.",
    keywords: ["budget front yard Farmersville", "affordable landscaping Tulare County", "gravel front yard Visalia", "phased yard remodel"],
    angle: "phased budget front yard rehabilitation"
  },
  {
    slug: "goshen-highway-buffer-planting",
    title: "Highway-Adjacent Lots: Buffer Planting and Sound Psychology",
    description: "Massing, litter-tolerant species, and realistic expectations where noise is mostly mechanical.",
    keywords: ["highway noise planting Goshen", "buffer shrubs Tulare County", "99 corridor yard Visalia", "sound buffer landscaping"],
    angle: "buffer planting for highway-adjacent residential lots"
  },
  {
    slug: "pixley-water-wise-phased-plan",
    title: "Water-Wise Yard Remodels: A Phased Plan That Stays Affordable",
    description: "Kill-the-lawn last, irrigation first, and gravel transitions that keep mud out of the house.",
    keywords: ["water wise remodel Pixley", "xeriscape phases Tulare County", "remove lawn gradually Visalia", "irrigation first remodel"],
    angle: "phasing a water-wise yard remodel affordably"
  }
];

function buildMarkdown(topic, publishedAt, index) {
  const citySlug = CITY_SLUGS[index % CITY_SLUGS.length];
  const p1 = SERVICE_PATHS[index % SERVICE_PATHS.length];
  const p2 = SERVICE_PATHS[(index + 2) % SERVICE_PATHS.length];
  const p3 = SERVICE_PATHS[(index + 4) % SERVICE_PATHS.length];
  const titleEsc = escapeYamlString(topic.title);
  const descEsc = escapeYamlString(topic.description);
  const kwYaml = topic.keywords.map((k) => `  - ${escapeYamlString(k)}`).join("\n");

  return `---
title: "${titleEsc}"
description: "${descEsc}"
publishedAt: "${publishedAt}"
keywords:
${kwYaml}
---

${topic.lead}

> **Key takeaway:** ${topic.takeaway}

---

## ${topic.h2a}

${topic.sectionA}

---

## ${topic.h2b}

${topic.sectionB}

---

## ${topic.h2c}

${topic.sectionC}

---

## Related services and local pages

- [${SERVICE_LABEL[p1]}](${p1}) when water coverage, retrofits, or diagnostics belong in the same project timeline.
- [${SERVICE_LABEL[p2]}](${p2}) if your scope naturally pairs with the goals above.
- See [${cityLabel(citySlug)} landscaping](/locations/${citySlug}) for neighborhood context, then browse the full [Tulare County locations directory](/locations). Many homeowners also keep [${SERVICE_LABEL[p3]}](${p3}) in mind for phased cleanups.

Use the [estimate request form](/#estimate) when you want introductions to vetted local contractors.
`;
}

function main() {
  if (SEEDS.length !== 50) throw new Error(`Expected 50 seeds, got ${SEEDS.length}`);

  const rewrite = process.argv.includes("--rewrite");
  const rng = makeRng(20260512);
  const counts = allocateDailyCounts(50, rng);
  const dates = buildPublishDates(SCHEDULE_START_YMD, counts);
  const topics = SEEDS.map(expandTopic);
  shuffleInPlace(topics, rng);

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let created = 0;
  let skipped = 0;
  topics.forEach((topic, i) => {
    const publishedAt = dates[i];
    const filePath = path.join(outDir, `${topic.slug}.md`);
    if (fs.existsSync(filePath) && !rewrite) {
      skipped += 1;
      return;
    }
    fs.writeFileSync(filePath, buildMarkdown(topic, publishedAt, i), "utf8");
    created += 1;
  });

  const sum = counts.reduce((a, b) => a + b, 0);
  console.log(`Daily publish counts (sum=${sum}):`, counts.join(", "));
  console.log(`Schedule spans ${counts.length} calendar days from ${SCHEDULE_START_YMD}.`);
  console.log(`Wrote ${created} files, skipped ${skipped} existing.`);
}

main();
